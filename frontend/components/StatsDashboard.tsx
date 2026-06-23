"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

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
    <section className="section dash" id="dash">
      <div className="dash-hero reveal in">
        <div className="rings-stage">
          <div className="rings-center">
            <b>81%</b>
            <small>daily cheer</small>
          </div>
        </div>
        <div className="rings-legend">
          {ringRows.map((row) => (
            <div className="legend-row" key={row.label}>
              <span className="legend-dot" style={{ background: row.color, color: row.color }} />
              <div className="lr-main">
                <div className="lr-label">{row.label}</div>
                <div className="lr-sub">{row.sub}</div>
              </div>
              <div className="lr-val">{row.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="stat-grid">
        {metrics.map((metric, index) => (
          <article
            className="stat-card reveal in tilt"
            key={metric.label}
            style={{ "--ec": metric.color } as CSSProperties}
          >
            <div className="stat-head">
              <span className="stat-ic">{metric.emoji}</span>
              <span className="stat-label">{metric.label}</span>
            </div>
            <div className="stat-row">
              <span className="stat-num">{(index === 0 ? liveGifts : metric.start).toLocaleString()}</span>
              {metric.suffix ? <span className="stat-unit">{metric.suffix}</span> : null}
              <span className="delta up">{metric.delta}</span>
            </div>
            <div className="bars mini go">
              {metric.bars.map((height, barIndex) => (
                <i className="bar" key={barIndex} style={{ "--h": `${height}%` } as CSSProperties} />
              ))}
            </div>
            <div className="tilt-glare" />
          </article>
        ))}
      </div>

      <div className="dash-wide reveal in" data-screen-label="Stats — weekly chart">
        <h3>Cheer delivered this week</h3>
        <p className="dw-sub">Heart-points, but make it holiday. Saturday was a big one.</p>
        <div className="bars go" style={{ "--ec": "#1a7a4e" } as CSSProperties}>
          {weekBars.map((height, index) => (
            <i className="bar" key={index} style={{ "--h": `${height}%` } as CSSProperties} />
          ))}
        </div>
        <div className="bar-labels">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
