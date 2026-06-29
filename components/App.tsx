"use client";
import { useState, useEffect } from "react";
import { Hero } from "./Hero";
import { Pillars } from "./Pillars";
import { HowItWorks } from "./HowItWorks";
import { FinderForm } from "./FinderForm";
import { Loading } from "./Loading";
import { ResultCard } from "./ResultCard";
import { ContactForm } from "./ContactForm";
import { EmailCaptureForm } from "./EmailCaptureForm";
import { WFFooter } from "./WFFooter";
import {
  type Objective,
  type RecommendResult,
  fallbackResult,
  prettyDomain,
  WF_MODELS,
  programmeMeta,
  buildShareLink,
  decodeShareState,
} from "@/lib/data";

export function App() {
  const [stage, setStage] = useState<"intro" | "loading" | "result">("intro");
  const [showContact, setShowContact] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [submission, setSubmission] = useState<{ url: string; objective: Objective } | null>(null);
  const [result, setResult] = useState<RecommendResult | null>(null);

  // Restore a partnership from a shared/emailed link (#p=...).
  useEffect(() => {
    const restored = decodeShareState(window.location.hash);
    if (restored) {
      setSubmission(restored.submission);
      setResult(restored.result);
      setStage("result");
    }
  }, []);

  const goFinder = () => {
    document.getElementById("finder")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  async function handleSubmit(url: string, objective: Objective) {
    setSubmission({ url, objective });
    setShowContact(false);
    setShowEmail(false);
    setStage("loading");
    window.scrollTo({ top: 0, behavior: "auto" });
    const started = Date.now();
    let data: RecommendResult;
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, objective: objective.label }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data = await res.json();
    } catch {
      data = fallbackResult(url, objective);
    }
    const wait = Math.max(0, 2600 - (Date.now() - started));
    setTimeout(() => {
      setResult(data);
      setStage("result");
    }, wait);
  }

  function restart() {
    setStage("intro");
    setShowContact(false);
    setShowEmail(false);
    setResult(null);
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
    setTimeout(goFinder, 60);
  }

  const shareLink = result && submission ? buildShareLink(result, submission) : "";

  const emailPartnership = result && submission ? (() => {
    const prog = programmeMeta(result.programme);
    return {
      campaignName: result.campaignName || WF_MODELS[result.modelKey] || "",
      modelName: WF_MODELS[result.modelKey] || "",
      programmeName: prog.name || result.programme || "",
      programmeRegion: prog.region || "",
      whyItFits: result.whyItFits || "",
      objective: submission.objective.label || "",
    };
  })() : {};

  const contactPrefill = result && submission ? {
    company: result.companyName || prettyDomain(submission.url),
    message: `Hi WeForest Partnerships team,

We're exploring a partnership and the Partnership Finder recommended: "${result.campaignName || WF_MODELS[result.modelKey] || ""}".

Our primary objective: ${submission.objective.label}
Our website: ${submission.url}
Suggested programme: ${result.programme || ""}

We'd love to talk about what this could look like for us.

Thanks!`,
  } : { company: "", message: "" };

  return (
    <div>
      {stage === "intro" && (
        <>
          <Hero onStart={goFinder} />
          <Pillars />
          <HowItWorks onStart={goFinder} />
          <FinderForm onSubmit={handleSubmit} />
        </>
      )}

      {stage === "loading" && submission && (
        <Loading domain={prettyDomain(submission.url)} />
      )}

      {stage === "result" && result && submission && (
        <>
          <ResultCard
            data={result}
            domain={prettyDomain(submission.url)}
            objective={submission.objective}
            onContact={() => { setShowEmail(false); setShowContact(true); }}
            onEmail={() => { setShowContact(false); setShowEmail(true); }}
            onRestart={restart}
          />
          {showContact && (
            <ContactForm
              prefill={contactPrefill}
              onClose={() => { setShowContact(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            />
          )}
          {showEmail && (
            <EmailCaptureForm
              shareLink={shareLink}
              partnership={emailPartnership}
              onClose={() => { setShowEmail(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            />
          )}
        </>
      )}

      <WFFooter />
    </div>
  );
}
