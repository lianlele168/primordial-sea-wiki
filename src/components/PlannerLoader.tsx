"use client";

import dynamic from "next/dynamic";

const EvolutionPlanner = dynamic(() => import("@/components/EvolutionPlanner"), {
  ssr: false,
  loading: () => (
    <div className="planner-shell grid min-h-[520px] place-items-center" aria-live="polite">
      <p className="text-sm font-bold text-slate-400">Loading merge planner...</p>
    </div>
  ),
});

export default function PlannerLoader() {
  return <EvolutionPlanner />;
}
