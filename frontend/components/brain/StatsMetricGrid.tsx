import type { CSSProperties } from "react";
import { revealInClass, tiltClass, tiltGlareClass } from "../ui";

export type StatsMetric = {
  color: string;
  delta: string;
  detail: StatMetricDetail;
  emoji: string;
  featured?: boolean;
  label: string;
  lastUpdated: string;
  prefix?: string;
  start: number;
  suffix?: string;
  bars: number[];
  visual?: "bars" | "heatmap" | "line";
};

export type StatMetricDetail =
  | {
      description: string;
      points: StatDetailPoint[];
      source: string;
      title: string;
      type: "line" | "poker";
      unit: string;
    }
  | {
      days: GithubContributionDay[];
      description: string;
      source: string;
      title: string;
      type: "github";
    };

export type StatDetailPoint = {
  detail: string;
  label: string;
  meta: string;
  value: number;
};

export type GithubContributionDay = {
  count: number;
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
};

type StatsMetricGridProps = {
  metrics: StatsMetric[];
  onMetricSelect: (metric: StatsMetric) => void;
};

export function StatsMetricGrid({ metrics, onMetricSelect }: StatsMetricGridProps) {
  return (
    <div className="mb-[26px] grid grid-cols-[repeat(auto-fit,minmax(244px,1fr))] gap-[18px]">
      {metrics.map((metric) => (
        <button
          aria-label={`Open ${metric.label} details`}
          className={`${revealInClass} ${tiltClass} ${metric.featured ? "md:col-span-2" : ""} group relative overflow-hidden rounded-[20px] border-t-4 border-t-[var(--ec,#d12b3a)] bg-[var(--surface)] px-6 py-[22px] text-left shadow-[var(--shadow-sm)] outline-none transition-[transform,box-shadow] focus-visible:ring-4 focus-visible:ring-[color-mix(in_srgb,var(--ec)_30%,transparent)] hover:-translate-y-1 hover:shadow-[var(--shadow)]`}
          key={metric.label}
          onClick={() => onMetricSelect(metric)}
          style={{ "--ec": metric.color } as CSSProperties}
          type="button"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[color-mix(in_srgb,var(--ec)_16%,transparent)] font-display text-[1rem] font-bold text-[var(--ec)]">{metric.emoji}</span>
            <span className="flex-1 text-[.92rem] font-semibold text-[var(--ink-soft)]">{metric.label}</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className="font-mono text-[2rem] font-bold leading-none text-[var(--ink)]">
              {metric.prefix}
              {metric.start.toLocaleString()}
            </span>
            {metric.suffix ? <span className="text-[.9rem] font-semibold text-[var(--ink-soft)]">{metric.suffix}</span> : null}
            <span className="whitespace-nowrap rounded-full bg-[rgba(26,122,78,.13)] px-[9px] py-0.5 font-display text-[.82rem] font-semibold text-[var(--pine)]">
              {metric.delta}
            </span>
          </div>
          {metric.visual === "line" ? (
            <LineMetricChart values={metric.bars} />
          ) : metric.visual === "heatmap" ? (
            <GithubContributionPreview metric={metric} />
          ) : (
            <div className="mt-4 flex h-[46px] items-end gap-1">
              {metric.bars.map((height, barIndex) => (
                <i
                  className="h-[var(--h)] min-w-1 flex-1 rounded-t-[5px] bg-[var(--ec,#d12b3a)] opacity-90 transition-[height] duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)]"
                  key={barIndex}
                  style={{ "--h": `${height}%`, transitionDelay: `${barIndex * 0.05}s` } as CSSProperties}
                />
              ))}
            </div>
          )}
          <p className="mt-3 font-mono text-[.72rem] font-semibold text-[var(--ink-soft)]">{metric.lastUpdated}</p>
          <p className="mt-2 font-display text-[.75rem] font-semibold text-[var(--ec)] opacity-80">Open details</p>
          <div className={tiltGlareClass} />
        </button>
      ))}
    </div>
  );
}

function GithubContributionPreview({ metric }: { metric: StatsMetric }) {
  const days = metric.detail.type === "github" ? metric.detail.days.slice(-35) : [];

  return (
    <div className="github-contribution-preview mt-4 overflow-hidden rounded-[14px] bg-[var(--gh-panel)] p-3">
      <div className="grid h-[104px] w-max max-w-full grid-flow-col grid-rows-7 gap-1" aria-hidden="true">
        {days.map((day, index) => (
          <i
            className="aspect-square rounded-[3px] border border-[var(--gh-border)]"
            key={`${day.date}-${index}`}
            style={{
              backgroundColor: `var(--gh-${day.level})`,
              transitionDelay: `${index * 0.025}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function LineMetricChart({ values }: { values: number[] }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((value, index) => {
    const x = values.length === 1 ? 50 : (index / (values.length - 1)) * 100;
    const y = 38 - ((value - min) / range) * 32;

    return { x, y };
  });
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
  const areaPath = `${path} L 100 42 L 0 42 Z`;

  return (
    <div className="mt-4 h-[88px] rounded-[14px] bg-[color-mix(in_srgb,var(--ec)_9%,transparent)] p-2">
      <svg aria-hidden="true" className="h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 42">
        <path d={areaPath} fill="var(--ec)" opacity=".12" />
        <path d={path} fill="none" stroke="var(--ec)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
        {points.map((point, index) => (
          <circle cx={point.x} cy={point.y} fill="var(--surface)" key={index} r="1.9" stroke="var(--ec)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
    </div>
  );
}
