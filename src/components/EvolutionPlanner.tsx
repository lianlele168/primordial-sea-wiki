"use client";

import { useMemo, useState } from "react";
import { Check, Clipboard, RotateCcw, Sigma } from "lucide-react";
import { evolutionStages } from "@/data/site";

type Pressure = "open" | "busy" | "critical";

const pressureAdvice: Record<Pressure, string> = {
  open: "Keep building nearby pairs while preserving one clear lane for late-chain worlds.",
  busy: "Prioritize merges that remove two bodies now; avoid adding a new isolated tier to the disk.",
  critical: "Protect the largest body and consider a cleanup or reset effect before chasing the next tier.",
};

export default function EvolutionPlanner() {
  const [current, setCurrent] = useState(0);
  const [target, setTarget] = useState(9);
  const [owned, setOwned] = useState(0);
  const [pressure, setPressure] = useState<Pressure>("busy");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const [ownedText, setOwnedText] = useState("0");
  const inputValid = /^\d+$/.test(ownedText) && Number(ownedText) <= 999;

  const calculation = useMemo(() => {
    const distance = Math.max(0, target - current);
    const required = 2 ** distance;
    const additional = Math.max(0, required - owned);
    const merges = Math.max(0, required - 1);
    const milestones = evolutionStages.slice(current + 1, target + 1).map((stage, step) => ({
      name: stage.name,
      sourceBodies: 2 ** (step + 1),
    }));
    return { distance, required, additional, merges, milestones };
  }, [current, target, owned]);

  const summary = `Primordial Sea merge plan: ${evolutionStages[current].name} -> ${evolutionStages[target].name}. Theoretical minimum: ${calculation.required} ${evolutionStages[current].name} bodies (${calculation.additional} more after the ${owned} already available), with ${calculation.merges} pair merges. Board advice: ${pressureAdvice[pressure]}`;

  async function copySummary() {
    setCopyError("");
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      setCopyError("Clipboard unavailable. Select and copy the plan text below.");
    }
  }

  function resetPlanner() {
    setCurrent(0);
    setTarget(9);
    setOwned(0);
    setOwnedText("0");
    setCopyError("");
    setCopied(false);
    setPressure("busy");
  }

  function changeCurrent(nextCurrent: number) {
    setCurrent(nextCurrent);
    if (target <= nextCurrent) setTarget(Math.min(nextCurrent + 1, evolutionStages.length - 1));
  }

  return (
    <div className="planner-shell">
      <div className="planner-controls">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="eyebrow">Interactive utility</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">Merge Evolution Planner</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Calculate the theoretical minimum for any documented segment of the normal chain.</p>
          </div>
          <button type="button" onClick={resetPlanner} className="icon-button" title="Reset planner" aria-label="Reset planner">
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-5 pt-5 sm:grid-cols-2">
          <label className="field-label">
            Current body
            <select value={current} onChange={(event) => changeCurrent(Number(event.target.value))} className="field-control">
              {evolutionStages.slice(0, -1).map((stage, index) => <option key={stage.name} value={index}>{stage.name}</option>)}
            </select>
          </label>
          <label className="field-label">
            Target body
            <select value={target} onChange={(event) => setTarget(Number(event.target.value))} className="field-control">
              {evolutionStages.map((stage, index) => <option key={stage.name} value={index} disabled={index <= current}>{stage.name}</option>)}
            </select>
          </label>
          <label className="field-label sm:col-span-2">
            Current bodies at the starting tier
            <input type="text" inputMode="numeric" value={ownedText} aria-invalid={!inputValid} aria-describedby="owned-help" onChange={(event) => { const value=event.target.value; setOwnedText(value); if (/^\d+$/.test(value) && Number(value)<=999) setOwned(Number(value)); }} className="field-control" />
            <span id="owned-help">Enter a whole number of bodies from 0 to 999.</span>
          </label>
        </div>

        <fieldset className="mt-5">
          <legend className="field-label mb-2">Board pressure</legend>
          <div className="segmented-control">
            {(["open", "busy", "critical"] as Pressure[]).map((value) => (
              <button key={value} type="button" onClick={() => setPressure(value)} className={pressure === value ? "active" : ""} aria-pressed={pressure === value}>
                {value === "open" ? "Open" : value === "busy" ? "Busy" : "Critical"}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="planner-output" aria-live="polite">
        {!inputValid ? <p role="alert" className="rounded-md border border-amber-400 p-4 text-amber-200">Enter a whole number from 0 to 999. Results are hidden until the input is valid.</p> : <>
        <div className="flex items-center gap-2 text-tide-300">
          <Sigma className="h-5 w-5" />
          <span className="text-xs font-black uppercase tracking-[0.14em]">Theoretical minimum</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10">
          <div className="metric-cell">
            <strong>{calculation.required}</strong>
            <span>{evolutionStages[current].short} bodies</span>
          </div>
          <div className="metric-cell">
            <strong>{calculation.additional}</strong>
            <span>still needed</span>
          </div>
          <div className="metric-cell">
            <strong>{calculation.merges}</strong>
            <span>pair merges</span>
          </div>
          <div className="metric-cell">
            <strong>{calculation.distance}</strong>
            <span>stages climbed</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-black text-white">Milestones</h3>
          <ol className="mt-3 space-y-2">
            {calculation.milestones.map((milestone) => (
              <li key={milestone.name} className="flex items-center justify-between gap-3 border-b border-white/10 pb-2 text-sm">
                <span className="text-slate-300">{milestone.name}</span>
                <span className="font-bold text-solar-400">{milestone.sourceBodies}x source</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-5 rounded-md border border-tide-400/20 bg-tide-500/[0.06] p-4 text-sm leading-6 text-slate-300"><strong>Suggested priority (not a game-tested rule): </strong>{pressureAdvice[pressure]}</p>

        <button type="button" onClick={copySummary} className="btn-primary mt-5 w-full justify-center">
          {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
          {copied ? "Plan copied" : "Copy merge plan"}
        </button>
        <p className="mt-3 text-xs leading-5 text-slate-500">Math assumes perfect pair merges with no losses. It is not a score, drop, or time prediction.</p>
        {copyError ? <><p role="alert" className="mt-3 text-amber-200">{copyError}</p><textarea aria-label="Copyable merge plan" readOnly value={summary} className="field-control mt-3 min-h-40 w-full"/></> : null}
        <span className="sr-only" aria-live="polite">{copied ? "Merge plan copied to clipboard" : ""}</span>
        </>}
      </div>
    </div>
  );
}
