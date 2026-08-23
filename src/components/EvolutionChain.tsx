import { evolutionStages } from "@/data/site";

export default function EvolutionChain({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`evolution-grid ${compact ? "evolution-grid-compact" : ""}`} aria-label="Primordial Sea normal evolution chain">
      {evolutionStages.map((stage, index) => (
        <li key={stage.name} className="evolution-node">
          <span className="planet-orb" style={{ "--planet-color": stage.color } as React.CSSProperties}>
            <span>{index + 1}</span>
          </span>
          <span className="min-w-0">
            <strong>{stage.name}</strong>
            {!compact ? <small>{index === 0 ? "Start" : `2 x ${evolutionStages[index - 1].short}`}</small> : null}
          </span>
        </li>
      ))}
    </ol>
  );
}
