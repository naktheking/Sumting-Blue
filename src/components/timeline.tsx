import type { Milestone } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function Timeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <ol className="border-t-2 border-ink">
      {milestones.map((m, i) => (
        <li key={m.title} className="border-b border-ink/20">
          <Reveal
            delay={0.04 * i}
            className="grid gap-2 py-7 sm:grid-cols-[220px_1fr] sm:gap-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted sm:whitespace-nowrap">
              {String(i + 1).padStart(2, "0")} — {m.date}
            </p>
            <div>
              <h3 className="font-display text-2xl font-medium tracking-tight">
                {m.title}
                {i === milestones.length - 1 && (
                  <span className="ml-2 text-cobalt" aria-hidden>
                    ★
                  </span>
                )}
              </h3>
              <p className="mt-2 max-w-lg leading-relaxed text-muted">
                {m.body}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
