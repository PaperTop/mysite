"use client";

import { useEffect, useMemo, useState } from "react";
import { CheerProgressPanel, type CheerProgressRow } from "./brain/CheerProgressPanel";
import { StatsMetricGrid, type StatsMetric } from "./brain/StatsMetricGrid";
import { WeeklyCheerChart } from "./brain/WeeklyCheerChart";
import { sectionClass } from "./ui";

const metrics: StatsMetric[] = [
  { color: "#d12b3a", delta: "live ●", emoji: "🎁", label: "Gifts delivered", start: 1284003291, bars: [40, 55, 48, 70, 62, 85, 100] },
  { color: "#e6b24a", delta: "▲ 8%", emoji: "🍪", label: "Cookies eaten", start: 4213, bars: [30, 45, 40, 55, 60, 72, 90] },
  { color: "#2a6fdb", delta: "▲ 3%", emoji: "🛷", label: "Sleigh miles", start: 510038277, bars: [60, 58, 65, 62, 70, 68, 80] },
  { color: "#1a7a4e", delta: "▲ 15%", emoji: "☕", label: "Cocoa cups", start: 247, bars: [20, 35, 30, 50, 55, 68, 85] },
  { color: "#d12b3a", delta: "▲ 2%", emoji: "🧝", label: "Elves managed", start: 1824, bars: [70, 72, 68, 75, 74, 78, 82] },
  { color: "#e6b24a", delta: "▲ 4", emoji: "😇", label: "Nice score", start: 98, suffix: "/ 100", bars: [80, 82, 85, 88, 90, 94, 98] },
];

const ringRows: CheerProgressRow[] = [
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
      <CheerProgressPanel rows={ringRows} />
      <StatsMetricGrid liveGifts={liveGifts} metrics={metrics} />
      <WeeklyCheerChart bars={weekBars} />
    </section>
  );
}
