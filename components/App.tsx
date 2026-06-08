"use client";
import { useState } from "react";
import { Hero } from "./Hero";
import { Pillars } from "./Pillars";
import { HowItWorks } from "./HowItWorks";
import { FinderForm } from "./FinderForm";
import { Loading } from "./Loading";
import { ResultCard } from "./ResultCard";
import { ContactForm } from "./ContactForm";
import { WFFooter } from "./WFFooter";
import { type Objective, type RecommendResult, fallbackResult, prettyDomain, WF_MODELS } from "@/lib/data";

export function App() {
  const [stage, setStage] = useState<"intro" | "loading" | "result">("intro");
  const [showContact, setShowContact] = useState(false);
  const [submission, setSubmission] = useState<{ url: string; objective: Objective } | null>(null);
  const [result, setResult] = useState<RecommendResult | null>(null);

  const goFinder = () => {
    document.getElementById("finder")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  async function handleSubmit(url: string, objective: Objective) {
    setSubmission({ url, objective });
    setShowContact(false);
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
    setResult(null);
    setTimeout(goFinder, 60);
  }

  const contactPrefill = result && submission ? {
    company: result.companyName || prettyDomain(submission.url),
    message: `Hi WeForest Partnerships team,

We're exploring a partnership and the Partnership Finder recommended: "${result.modelTitle || WF_MODELS[result.modelKey] || ""}".

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
            onContact={() => setShowContact(true)}
            onRestart={restart}
          />
          {showContact && (
            <ContactForm
              prefill={contactPrefill}
              onClose={() => { setShowContact(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            />
          )}
        </>
      )}

      <WFFooter />
    </div>
  );
}
