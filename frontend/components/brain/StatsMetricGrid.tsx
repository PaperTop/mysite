import type { CSSProperties } from "react";
import { revealInClass, tiltClass, tiltGlareClass } from "../ui";

export type StatsMetric = {
  color: string;
  delta: string;
  emoji: string;
  label: string;
  start: number;
  suffix?: string;
  bars: number[];
};

type StatsMetricGridProps = {
  liveGifts: number;
  metrics: StatsMetric[];
};

export function StatsMetricGrid({ liveGifts, metrics }: StatsMetricGridProps) {
  return (
    <div className="mb-[26px] grid grid-cols-[repeat(auto-fit,minmax(244px,1fr))] gap-[18px]">
      {metrics.map((metric, index) => (
        <article
          className={`${revealInClass} ${tiltClass} relative overflow-hidden rounded-[20px] border-t-4 border-t-[var(--ec,#d12b3a)] bg-[var(--surface)] px-6 py-[22px] shadow-[var(--shadow-sm)]`}
          key={metric.label}
          style={{ "--ec": metric.color } as CSSProperties}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[color-mix(in_srgb,var(--ec)_16%,transparent)] text-[1.35rem]">{metric.emoji}</span>
            <span className="flex-1 text-[.92rem] font-semibold text-[var(--ink-soft)]">{metric.label}</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className="font-mono text-[2rem] font-bold leading-none text-[var(--ink)]">{(index === 0 ? liveGifts : metric.start).toLocaleString()}</span>
            {metric.suffix ? <span className="text-[.9rem] font-semibold text-[var(--ink-soft)]">{metric.suffix}</span> : null}
            <span className="whitespace-nowrap rounded-full bg-[rgba(26,122,78,.13)] px-[9px] py-0.5 font-display text-[.82rem] font-semibold text-[var(--pine)]">
              {metric.delta}
            </span>
          </div>
          <div className="mt-4 flex h-[46px] items-end gap-1">
            {metric.bars.map((height, barIndex) => (
              <i
                className="h-[var(--h)] min-w-1 flex-1 rounded-t-[5px] bg-[var(--ec,#d12b3a)] opacity-90 transition-[height] duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)]"
                key={barIndex}
                style={{ "--h": `${height}%`, transitionDelay: `${barIndex * 0.05}s` } as CSSProperties}
              />
            ))}
          </div>
          <div className={tiltGlareClass} />
        </article>
      ))}
    </div>
  );
}
