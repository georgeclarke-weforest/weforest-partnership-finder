import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import * as cheerio from "cheerio";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Simple in-memory rate limiter: max 10 req/min per IP
const rateLimitMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = parseInt(process.env.RATE_LIMIT_RPM || "10");

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

async function fetchWebsiteText(url: string): Promise<string> {
  const normalized = url.startsWith("http") ? url : `https://${url}`;
  const res = await fetch(normalized, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; WeForestBot/1.0)" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  $("script, style, nav, footer, header, [aria-hidden='true']").remove();
  const text = $("body").text().replace(/\s+/g, " ").trim();
  // Truncate to ~3000 chars (~750 tokens)
  return text.slice(0, 3000);
}

function buildPrompt(url: string, objectiveLabel: string, websiteText: string | null): string {
  const websiteSection = websiteText
    ? `\nHere is text from their website:\n"""\n${websiteText}\n"""\n`
    : "";

  return `You are a WeForest business-partnership advisor. A company is exploring how forest and landscape restoration could help them reach a business goal.

Company website: ${url}
Their primary objective: ${objectiveLabel}
${websiteSection}
WeForest offers three business partnership models:
1. "Climate & Nature Commitments" (key: climate) — verified restoration to meet carbon, biodiversity and water targets; certified under Verra, CCB and Preferred by Nature; aligned to the UN SDGs, the Kunming-Montreal Global Biodiversity Framework, and SBTi/SBTN.
2. "Nature-Positive Branding & Campaigns" (key: branding) — co-branding, product-linked campaigns, high-visibility storytelling and content for long-term customer engagement.
3. "Employee Engagement" (key: employee) — wellness challenges linked to restoration, expert-led learning on nature and climate, and talent attraction and retention.

WeForest restoration programmes to match against:
- "The Great Green Wall" (West Africa)
- "Blue Carbon" (West Africa, coastal mangroves)
- "Miombo Belt Regeneration" (Southern Africa)
- "Eastern Afromontane Biodiversity Hotspot" (East Africa)
- "Wildlife Corridors" (South America)

Infer the company's likely name, industry and brand from the domain and anything you know about it. Then choose the single best-fitting model and one programme for their objective.

Respond with ONLY a raw JSON object (no markdown, no backticks) with exactly this shape:
{
 "companyName": "best guess at the company name from the domain",
 "industry": "short industry descriptor, e.g. 'outdoor apparel retailer'",
 "modelKey": "climate | branding | employee",
 "modelTitle": "the matching model name, optionally lightly tailored to them",
 "tagline": "a 4-8 word rallying line for this partnership",
 "whyItFits": "2 to 3 sentences in second person (you/your), specific to this company and objective, hopeful and scientifically credible, no exclamation marks",
 "programme": "exact name of ONE programme from the list",
 "programmeReason": "one sentence on why this programme suits them",
 "activations": ["three concrete, specific activation ideas tailored to them"]
}
Follow WeForest voice: clear, hopeful, credible, Oxford comma, American English.`;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { url?: string; objective?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { url, objective } = body;
  if (!url || typeof url !== "string" || url.length < 4 || !url.includes(".")) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }
  if (!objective || typeof objective !== "string") {
    return NextResponse.json({ error: "objective is required" }, { status: 400 });
  }

  // Fetch website text server-side for more accurate results
  let websiteText: string | null = null;
  try {
    websiteText = await fetchWebsiteText(url);
  } catch {
    // Fall back to domain-only inference — non-fatal
  }

  const prompt = buildPrompt(url, objective, websiteText);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const message = await (client.messages.create as any)({
    model: "claude-opus-4-8",
    max_tokens: 1024,
    thinking: { type: "adaptive" },
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    return NextResponse.json({ error: "No response from AI" }, { status: 502 });
  }

  const raw = textBlock.text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) {
    return NextResponse.json({ error: "Could not parse AI response" }, { status: 502 });
  }

  let result: unknown;
  try {
    result = JSON.parse(raw.slice(start, end + 1));
  } catch {
    return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 502 });
  }

  // Validate shape
  const r = result as Record<string, unknown>;
  if (
    typeof r.companyName !== "string" ||
    typeof r.modelKey !== "string" ||
    !["climate", "branding", "employee"].includes(r.modelKey) ||
    !Array.isArray(r.activations)
  ) {
    return NextResponse.json({ error: "AI response did not match expected shape" }, { status: 502 });
  }

  return NextResponse.json(result);
}
