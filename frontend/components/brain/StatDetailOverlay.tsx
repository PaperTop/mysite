"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { GithubContributionDay, StatDetailPoint, StatsMetric } from "./StatsMetricGrid";

type StatDetailOverlayProps = {
  metric: StatsMetric | null;
  onClose: () => void;
};

export function StatDetailOverlay({ metric, onClose }: StatDetailOverlayProps) {
  useEffect(() => {
    if (!metric) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [metric, onClose]);

  if (!metric) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  const detail = metric.detail;

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[rgba(21,12,17,.38)] px-4 py-6 backdrop-blur-sm" onClick={onClose}>
      <section
        aria-label={`${metric.label} details`}
        aria-modal="true"
        className="max-h-[calc(100dvh-48px)] w-full max-w-[1040px] overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-5 text-[var(--ink)] shadow-[0_28px_80px_-30px_rgba(21,12,17,.75)] md:p-7"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        style={{ "--ec": metric.color } as CSSProperties}
      >
        <div className="mb-6 flex items-start justify-between gap-5">
          <div className="min-w-0">
            <p className="mb-2 font-mono text-[.78rem] font-semibold uppercase text-[var(--ec)]">{detail.source}</p>
            <h3 className="font-display text-[clamp(2rem,5vw,3.4rem)] leading-[.95]">{detail.title}</h3>
            <p className="mt-3 max-w-[720px] text-[.96rem] leading-7 text-[var(--ink-soft)]">{detail.description}</p>
          </div>
          <button
            aria-label="Close details"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--cream)] font-display text-[1.2rem] font-bold text-[var(--ink)] transition-[background,transform] hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--ec)_14%,var(--cream))] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color-mix(in_srgb,var(--ec)_30%,transparent)]"
            onClick={onClose}
            type="button"
          >
            x
          </button>
        </div>

        {detail.type === "github" ? (
          <GitHubDetail days={detail.days} />
        ) : (
          <LineDetail key={metric.label} points={detail.points} unit={detail.unit} variant={detail.type} />
        )}

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <DetailStat label="Current" value={`${metric.prefix ?? ""}${metric.start.toLocaleString()}${metric.suffix ?? ""}`} />
          <DetailStat label="Freshness" value={metric.lastUpdated.replace("Updated ", "")} />
          <DetailStat label="Source" value={detail.source} />
        </div>
      </section>
    </div>,
    document.body,
  );
}

function LineDetail({
  points,
  unit,
  variant,
}: {
  points: StatDetailPoint[];
  unit: string;
  variant: "line" | "poker";
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const chart = useMemo(() => buildLineChart(points), [points]);
  const activePoint = points[activeIndex] ?? points[0];
  const activeChartPoint = chart.points[activeIndex] ?? chart.points[0];
  const valuePrefix = unit === "$" ? "$" : "";
  const valueSuffix = unit === "$" ? "" : ` ${unit}`;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div className="rounded-[20px] bg-[var(--cream)] p-4 md:p-5">
        <div className="relative h-[280px]">
          <svg aria-label="Detailed metric graph" className="h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 52">
            <path d={chart.areaPath} fill="var(--ec)" opacity=".12" />
            <path d={chart.zeroPath} stroke="rgba(108,85,96,.3)" strokeDasharray="3 3" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path d={chart.path} fill="none" stroke="var(--ec)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" vectorEffect="non-scaling-stroke" />
            {chart.points.map((point, index) => (
              <g key={points[index].label} onFocus={() => setActiveIndex(index)} onMouseEnter={() => setActiveIndex(index)} tabIndex={0}>
                <circle cx={point.x} cy={point.y} fill="transparent" r="4.8" />
                <circle cx={point.x} cy={point.y} fill={index === activeIndex ? "var(--ec)" : "var(--surface)"} r="2.2" stroke="var(--ec)" strokeWidth="1.7" vectorEffect="non-scaling-stroke" />
              </g>
            ))}
          </svg>
          <div
            className="pointer-events-none absolute rounded-[12px] bg-[var(--surface)] px-3 py-2 text-left shadow-[var(--shadow-sm)]"
            style={{
              left: `${Math.min(Math.max(activeChartPoint.x, 10), 82)}%`,
              top: `${Math.min(Math.max(activeChartPoint.y * 1.9, 7), 74)}%`,
            }}
          >
            <p className="font-mono text-[.72rem] text-[var(--ink-soft)]">{activePoint.label}</p>
            <p className="font-mono text-[1rem] font-bold text-[var(--ink)]">
              {valuePrefix}
              {activePoint.value.toLocaleString()}
              {valueSuffix}
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {points.map((point, index) => (
            <button
              aria-pressed={index === activeIndex}
              className="rounded-full bg-[var(--surface)] px-3 py-1.5 font-mono text-[.72rem] font-semibold text-[var(--ink-soft)] transition-[background,color] aria-pressed:bg-[var(--ec)] aria-pressed:text-white"
              key={point.label}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              {point.label}
            </button>
          ))}
        </div>
      </div>

      <aside className="rounded-[20px] border border-[var(--line)] p-5">
        <p className="font-display text-[.85rem] font-semibold text-[var(--ink-soft)]">{variant === "poker" ? "Selected game" : "Selected sample"}</p>
        <p className="mt-2 font-mono text-[2rem] font-bold leading-none">
          {valuePrefix}
          {activePoint.value.toLocaleString()}
          {valueSuffix}
        </p>
        <p className="mt-3 font-mono text-[.82rem] font-semibold text-[var(--ec)]">{activePoint.label}</p>
        <p className="mt-2 text-[.92rem] leading-6 text-[var(--ink-soft)]">{activePoint.detail}</p>
        <p className="mt-4 rounded-[14px] bg-[color-mix(in_srgb,var(--ec)_10%,transparent)] px-3 py-2 font-mono text-[.78rem] text-[var(--ink-soft)]">{activePoint.meta}</p>
      </aside>
    </div>
  );
}

function GitHubDetail({ days }: { days: GithubContributionDay[] }) {
  const visibleDays = days.slice(-84);
  const [activeDayIndex, setActiveDayIndex] = useState(visibleDays.length - 1);
  const activeDay = visibleDays[activeDayIndex] ?? visibleDays[0];

  function setActive(index: number) {
    setActiveDayIndex(index);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">
      <div className="github-contribution-preview rounded-[20px] bg-[var(--gh-panel)] p-4 md:p-5">
        <div className="grid h-[180px] w-max max-w-full grid-flow-col grid-rows-7 gap-1.5">
          {visibleDays.map((day, index) => (
            <button
              aria-label={`${day.count} contributions on ${day.date}`}
              className="aspect-square rounded-[4px] border border-[var(--gh-border)] outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#0969da]"
              key={day.date}
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              style={{ background: `var(--gh-${day.level})` }}
              type="button"
            />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 font-mono text-[.72rem] text-[var(--ink-soft)]">
          <span>Recent 12 weeks</span>
          <span className="ml-auto">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span className="h-3 w-3 rounded-[3px] border border-[var(--gh-border)]" key={level} style={{ background: `var(--gh-${level})` }} />
          ))}
          <span>More</span>
        </div>
      </div>

      <aside className="rounded-[20px] border border-[var(--line)] p-5">
        <p className="font-display text-[.85rem] font-semibold text-[var(--ink-soft)]">Selected day</p>
        <p className="mt-2 font-mono text-[2rem] font-bold leading-none">{activeDay?.count ?? 0}</p>
        <p className="mt-3 font-mono text-[.82rem] font-semibold text-[var(--ec)]">{formatContributionDate(activeDay?.date)}</p>
        <p className="mt-2 text-[.92rem] leading-6 text-[var(--ink-soft)]">Actual GitHub contribution activity for this day.</p>
      </aside>
    </div>
  );
}

function formatContributionDate(date: string | undefined) {
  if (!date) {
    return "No day selected";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] bg-[color-mix(in_srgb,var(--ec)_8%,transparent)] px-4 py-3">
      <p className="font-display text-[.78rem] font-semibold text-[var(--ink-soft)]">{label}</p>
      <p className="mt-1 font-mono text-[.94rem] font-bold text-[var(--ink)]">{value}</p>
    </div>
  );
}

function buildLineChart(points: StatDetailPoint[]) {
  const values = points.map((point) => point.value);
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 0);
  const range = max - min || 1;
  const chartPoints = values.map((value, index) => {
    const x = values.length === 1 ? 50 : (index / (values.length - 1)) * 100;
    const y = 46 - ((value - min) / range) * 40;

    return { x, y };
  });
  const path = chartPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(" ");
  const zeroY = 46 - ((0 - min) / range) * 40;
  const zeroPath = `M 0 ${zeroY.toFixed(2)} L 100 ${zeroY.toFixed(2)}`;
  const areaPath = `${path} L 100 52 L 0 52 Z`;

  return { areaPath, path, points: chartPoints, zeroPath };
}
