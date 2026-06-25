"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { revealInClass, sectionClass, tiltClass, tiltGlareClass } from "./ui";

const metrics = [
  { color: "#d12b3a", delta: "live ●", emoji: "🎁", label: "Gifts delivered", start: 1284003291, bars: [40, 55, 48, 70, 62, 85, 100] },
  { color: "#e6b24a", delta: "▲ 8%", emoji: "🍪", label: "Cookies eaten", start: 4213, bars: [30, 45, 40, 55, 60, 72, 90] },
  { color: "#2a6fdb", delta: "▲ 3%", emoji: "🛷", label: "Sleigh miles", start: 510038277, bars: [60, 58, 65, 62, 70, 68, 80] },
  { color: "#1a7a4e", delta: "▲ 15%", emoji: "☕", label: "Cocoa cups", start: 247, bars: [20, 35, 30, 50, 55, 68, 85] },
  { color: "#d12b3a", delta: "▲ 2%", emoji: "🧝", label: "Elves managed", start: 1824, bars: [70, 72, 68, 75, 74, 78, 82] },
  { color: "#e6b24a", delta: "▲ 4", emoji: "😇", label: "Nice score", start: 98, suffix: "/ 100", bars: [80, 82, 85, 88, 90, 94, 98] },
];

const ringRows = [
  { color: "#d12b3a", label: "Gifts wrapped", sub: "820 of 1,000 daily goal", value: "82%" },
  { color: "#1a7a4e", label: "Cheer spread", sub: "goal smashed — go take a cocoa break", value: "100%" },
  { color: "#e6b24a", label: "Cookies baked", sub: "360 of 600 — pace is slipping", value: "60%" },
];

export default function StatsDashboard() {
  const [liveGifts, setLiveGifts] = useState(metrics[0].start);
  const weekBars = useMemo(() => [52, 63, 48, 80, 70, 100, 88], []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLiveGifts((value) => value + Math.floor(Math.random() * 1400 + 300));
    }, 650);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className={sectionClass} id="dash">
      <div className={`${revealInClass} mb-[26px] grid grid-cols-[minmax(260px,360px)_1fr] items-center gap-6 rounded-[26px] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] lg:gap-12 lg:p-[38px] max-[760px]:grid-cols-1 max-[760px]:text-center`}>
        <div className="relative mx-auto aspect-square w-[min(340px,78vw)]">
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <b className="font-display text-[2.8rem] leading-none text-[var(--ink)]">81%</b>
            <small className="mt-1 text-[.74rem] font-semibold uppercase tracking-[.1em] text-[var(--ink-soft)]">daily cheer</small>
          </div>
        </div>
        <div className="flex flex-col gap-[18px] max-[760px]:mx-auto max-[760px]:max-w-[380px] max-[760px]:text-left">
          {ringRows.map((row) => (
            <div className="flex items-center gap-3.5" key={row.label}>
              <span className="h-[15px] w-[15px] flex-none rounded-full shadow-[0_0_10px_currentColor]" style={{ background: row.color, color: row.color }} />
              <div className="flex-1">
                <div className="font-display text-[1.05rem] font-semibold">{row.label}</div>
                <div className="text-[.84rem] text-[var(--ink-soft)]">{row.sub}</div>
              </div>
              <div className="font-mono text-[1.4rem] font-bold">{row.value}</div>
            </div>
          ))}
        </div>
      </div>

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

      <div className={`${revealInClass} rounded-3xl bg-[var(--surface)] p-[22px] shadow-[var(--shadow-sm)] lg:p-[34px]`} data-screen-label="Stats — weekly chart">
        <h3 className="mb-1 font-display text-[1.4rem] leading-[1.05]">Cheer delivered this week</h3>
        <p className="mb-[22px] text-[.92rem] text-[var(--ink-soft)]">Heart-points, but make it holiday. Saturday was a big one.</p>
        <div className="flex h-40 items-end gap-1.5" style={{ "--ec": "#1a7a4e" } as CSSProperties}>
          {weekBars.map((height, index) => (
            <i
              className="h-[var(--h)] min-w-1 flex-1 rounded-t-[5px] bg-[var(--ec,#d12b3a)] opacity-90 transition-[height] duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)]"
              key={index}
              style={{ "--h": `${height}%`, transitionDelay: `${index * 0.05}s` } as CSSProperties}
            />
          ))}
        </div>
        <div className="mt-2.5 flex gap-1.5">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <span className="flex-1 text-center font-mono text-[.78rem] text-[var(--ink-soft)]" key={day}>{day}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
