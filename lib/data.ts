export interface Objective {
  id: string;
  label: string;
  blurb: string;
  icon: string;
}

export interface Programme {
  id: string;
  name: string;
  region: string;
  color: string;
}

export interface RecommendResult {
  companyName: string;
  industry: string;
  modelKey: "climate" | "branding" | "employee";
  modelTitle: string;
  tagline: string;
  whyItFits: string;
  programme: string;
  programmeReason: string;
  activations: string[];
}

export const WF_OBJECTIVES: Objective[] = [
  { id: "brand", label: "Build brand reputation & differentiation", blurb: "Stand out with a credible, nature-positive story.", icon: "sparkle" },
  { id: "sales", label: "Increase sales & drive conversions", blurb: "Link products and campaigns to real restoration.", icon: "trend" },
  { id: "employees", label: "Motivate, retain & attract employees", blurb: "Bring your team along on a purpose-driven mission.", icon: "people" },
  { id: "loyalty", label: "Deepen customer loyalty & change behaviour", blurb: "Turn one-off buyers into long-term advocates.", icon: "heart" },
  { id: "esg", label: "Meet ESG & sustainability commitments", blurb: "Verified, science-based progress you can report.", icon: "shield" },
  { id: "b2b", label: "Engage B2B clients & partners", blurb: "Shared impact that strengthens key relationships.", icon: "handshake" },
];

export const WF_MODELS: Record<string, string> = {
  climate: "Climate & Nature Commitments",
  branding: "Nature-Positive Branding & Campaigns",
  employee: "Employee Engagement",
};

export const WF_PROGRAMMES: Programme[] = [
  { id: "great-green-wall", name: "The Great Green Wall", region: "West Africa", color: "var(--wf-leaf)" },
  { id: "blue-carbon", name: "Blue Carbon", region: "West Africa — coastal mangroves", color: "var(--wf-teal)" },
  { id: "miombo", name: "Miombo Belt Regeneration", region: "Southern Africa", color: "var(--wf-clay)" },
  { id: "eastern-afromontane", name: "Eastern Afromontane Biodiversity Hotspot", region: "East Africa", color: "var(--wf-program-eastern-afromontane)" },
  { id: "wildlife-corridors", name: "Wildlife Corridors", region: "South America", color: "var(--wf-pollen)" },
];

export const WF_PILLARS = [
  { icon: "heart", eyebrow: "Change behaviour", title: "Move your customers", body: "Link products, campaigns and milestones to living forests. People act — and keep acting — when their choices visibly restore nature." },
  { icon: "sparkle", eyebrow: "Improve your brand", title: "Strengthen your reputation", body: "Align your brand with some of the world's most important ecosystems, with credible data and stories your stakeholders find genuinely meaningful." },
  { icon: "people", eyebrow: "Reward employees", title: "Bring your team with you", body: "From wellness challenges to expert-led learning, give your people a cause that matters — and a culture they want to stay for." },
];

export const WF_INCLUDES = [
  "A digital map of your growing forest, with stories and updates from the field.",
  "A personalised company page on weforest.org for your stakeholders to explore.",
  "A content library of videos, photos and stories from your project.",
  "A Partner Badge for your website and email signatures.",
  "Twice-yearly progress reports on socio-economic and ecological impact.",
  "Expert communications guidance to make the most of your partnership.",
];

export const WF_INCLUDES_ICONS = ["map", "badge", "library", "badge", "report", "chat"];

export function programmeMeta(name: string): Programme {
  const found = WF_PROGRAMMES.find((p) => p.name.toLowerCase() === String(name || "").toLowerCase());
  return found || WF_PROGRAMMES.find((p) => name && p.name.toLowerCase().includes(String(name).toLowerCase().split(" ")[0])) || WF_PROGRAMMES[0];
}

export function prettyDomain(url: string): string {
  let u = url.trim().replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/.*$/, "");
  return u || "your company";
}

export function fallbackResult(url: string, objective: Objective): RecommendResult {
  const map: Record<string, string> = { brand: "branding", sales: "branding", loyalty: "branding", employees: "employee", esg: "climate", b2b: "climate" };
  const key = (map[objective.id] || "branding") as "climate" | "branding" | "employee";
  const domain = prettyDomain(url);
  const name = domain.split(".")[0].replace(/^\w/, (c) => c.toUpperCase());
  const progByKey: Record<string, string> = { branding: "Wildlife Corridors", employee: "Miombo Belt Regeneration", climate: "The Great Green Wall" };
  return {
    companyName: name,
    industry: "",
    modelKey: key,
    modelTitle: WF_MODELS[key],
    tagline: "Real impact your stakeholders can see.",
    whyItFits: `Your goal to ${objective.label.toLowerCase()} maps naturally onto a WeForest partnership. We help you turn a nature commitment into verified, on-the-ground restoration — with stories and data you can share with the people who matter most to you.`,
    programme: progByKey[key],
    programmeReason: "A flagship WeForest programme with strong community impact and a compelling story to tell.",
    activations: [
      "Co-create a branded forest with a public, sharable impact map.",
      "Link a product, campaign or milestone to measurable restoration.",
      "Bring your team in with an engagement moment around the project.",
    ],
  };
}
