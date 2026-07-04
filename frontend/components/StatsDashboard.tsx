"use client";

import { useEffect, useMemo, useState } from "react";
import { StatDetailOverlay } from "./brain/StatDetailOverlay";
import { StateSummaryPanel, type DailySummary } from "./brain/StateSummaryPanel";
import { StatsMetricGrid, type StatsMetric } from "./brain/StatsMetricGrid";
import { sectionClass } from "./ui";

type BrainHealthApiResponse = {
  connected: boolean;
  errors?: {
    heartRate: string | null;
    hrv: string | null;
    sleep: string | null;
  };
  metrics: {
    heartRate: {
      bpm: number;
      measuredAt: string;
      source: string | null;
      stale: boolean;
    } | null;
    hrv: {
      measuredAt: string;
      ms: number;
      source: string | null;
      stale: boolean;
    } | null;
    sleep: {
      durationHours: number | null;
      measuredAt: string;
      score: number | null;
      source: string | null;
      stale: boolean;
    } | null;
  };
  history?: {
    heartRate: {
      bpm: number;
      measuredAt: string;
      source: string | null;
      stale: boolean;
    }[];
    hrv: {
      measuredAt: string;
      ms: number;
      source: string | null;
      stale: boolean;
    }[];
    sleep: {
      durationHours: number | null;
      measuredAt: string;
      score: number | null;
      source: string | null;
      stale: boolean;
    }[];
  };
};

type LiveBrainHealth = {
  errors?: BrainHealthApiResponse["errors"];
  history?: BrainHealthApiResponse["history"];
  metrics: BrainHealthApiResponse["metrics"];
};

type GithubContributionsApiResponse = {
  connected: boolean;
  days: {
    count: number;
    date: string;
    level: 0 | 1 | 2 | 3 | 4;
  }[];
  generatedAt?: string;
  todayCount: number;
  totalContributions: number;
  username: string | null;
};

type LiveGithubContributions = {
  days: GithubContributionsApiResponse["days"];
  generatedAt: string;
  todayCount: number;
  totalContributions: number;
  username: string;
};

const metricDisplayOrder = new Map([
  ["Heart rate", 0],
  ["HRV", 1],
  ["Sleep duration", 2],
  ["Poker winnings", 3],
  ["GitHub contributions", 4],
]);

const metrics: StatsMetric[] = [
  {
    color: "#d12b3a",
    delta: "resting",
    detail: {
      description: "Minute-level heart-rate samples from the Google Health API sync window.",
      points: [
        { detail: "Settled after waking", label: "8:02 AM", meta: "Google Health", value: 62 },
        { detail: "Coffee and planning", label: "8:16 AM", meta: "Google Health", value: 68 },
        { detail: "Walking", label: "8:31 AM", meta: "Google Health", value: 76 },
        { detail: "Back at desk", label: "8:44 AM", meta: "Google Health", value: 64 },
        { detail: "Focused work", label: "8:58 AM", meta: "Google Health", value: 61 },
        { detail: "Latest synced sample", label: "9:12 AM", meta: "Google Health", value: 64 },
      ],
      source: "Google Health API",
      title: "Heart rate detail",
      type: "line",
      unit: "bpm",
    },
    emoji: "♥",
    label: "Heart rate",
    lastUpdated: "Updated 8 min ago",
    start: 64,
    suffix: " bpm",
    bars: [62, 66, 61, 70, 68, 64, 63],
    visual: "line",
  },
  {
    color: "#1a7a4e",
    delta: "+$420",
    detail: {
      description: "Session-by-session poker results. Hover a point to inspect the game and net result.",
      points: [
        { detail: "1/3 NLH, 2h 10m", label: "Game 1", meta: "+$180", value: 180 },
        { detail: "1/3 NLH, 1h 35m", label: "Game 2", meta: "-$270", value: -90 },
        { detail: "2/5 NLH, 3h 05m", label: "Game 3", meta: "+$450", value: 360 },
        { detail: "1/3 NLH, 55m", label: "Game 4", meta: "-$150", value: 210 },
        { detail: "2/5 NLH, 2h 40m", label: "Game 5", meta: "+$510", value: 720 },
        { detail: "Tournament cash", label: "Game 6", meta: "+$1,120", value: 1840 },
      ],
      source: "Manual poker session log",
      title: "Poker winnings detail",
      type: "poker",
      unit: "$",
    },
    emoji: "$",
    featured: true,
    label: "Poker winnings",
    lastUpdated: "Updated yesterday at 11:48 PM",
    start: 1840,
    prefix: "$",
    bars: [0, 180, -90, 360, 210, 720, 1840],
    visual: "line",
  },
  {
    color: "#2a6fdb",
    delta: "+12",
    detail: {
      description: "Contribution intensity in the familiar GitHub square-grid style.",
      days: [
        { count: 0, date: "Jun 10", level: 0 },
        { count: 2, date: "Jun 11", level: 1 },
        { count: 5, date: "Jun 12", level: 2 },
        { count: 1, date: "Jun 13", level: 1 },
        { count: 7, date: "Jun 14", level: 3 },
        { count: 11, date: "Jun 15", level: 4 },
        { count: 0, date: "Jun 16", level: 0 },
        { count: 3, date: "Jun 17", level: 1 },
        { count: 8, date: "Jun 18", level: 3 },
        { count: 12, date: "Jun 19", level: 4 },
        { count: 4, date: "Jun 20", level: 2 },
        { count: 6, date: "Jun 21", level: 2 },
        { count: 9, date: "Jun 22", level: 3 },
        { count: 14, date: "Jun 23", level: 4 },
        { count: 2, date: "Jun 24", level: 1 },
        { count: 0, date: "Jun 25", level: 0 },
        { count: 5, date: "Jun 26", level: 2 },
        { count: 10, date: "Jun 27", level: 3 },
        { count: 16, date: "Jun 28", level: 4 },
        { count: 1, date: "Jun 29", level: 1 },
        { count: 7, date: "Jun 30", level: 3 },
        { count: 12, date: "Jul 1", level: 4 },
        { count: 4, date: "Jul 2", level: 2 },
        { count: 8, date: "Jul 3", level: 3 },
      ],
      source: "GitHub contributions",
      title: "GitHub contributions detail",
      type: "github",
    },
    emoji: "GH",
    featured: true,
    label: "GitHub contributions",
    lastUpdated: "Updated 22 min ago",
    start: 37,
    bars: [18, 38, 30, 55, 42, 70, 90],
    visual: "heatmap",
  },
  {
    color: "#8d5fd3",
    delta: "+6",
    detail: {
      description: "HRV trend from synced Google Health recovery samples.",
      points: [
        { detail: "Lower recovery baseline", label: "Mon", meta: "Google Health", value: 49 },
        { detail: "Normal range", label: "Tue", meta: "Google Health", value: 52 },
        { detail: "Slight dip", label: "Wed", meta: "Google Health", value: 51 },
        { detail: "Improving", label: "Thu", meta: "Google Health", value: 55 },
        { detail: "Stable", label: "Fri", meta: "Google Health", value: 53 },
        { detail: "Good recovery", label: "Sat", meta: "Google Health", value: 56 },
        { detail: "Latest synced sample", label: "Sun", meta: "Google Health", value: 58 },
      ],
      source: "Google Health API",
      title: "HRV detail",
      type: "line",
      unit: "ms",
    },
    emoji: "HRV",
    label: "HRV",
    lastUpdated: "Updated 8 min ago",
    start: 58,
    suffix: " ms",
    bars: [49, 52, 51, 55, 53, 56, 58],
    visual: "line",
  },
  {
    color: "#e6b24a",
    delta: "7h 12m",
    detail: {
      description: "Sleep-duration trend from Google Health sleep-session summaries.",
      points: [
        { detail: "6h 21m", label: "Mon", meta: "Google Health", value: 6.4 },
        { detail: "6h 48m", label: "Tue", meta: "Google Health", value: 6.8 },
        { detail: "6h 30m", label: "Wed", meta: "Google Health", value: 6.5 },
        { detail: "6h 56m", label: "Thu", meta: "Google Health", value: 6.9 },
        { detail: "7h 08m", label: "Fri", meta: "Google Health", value: 7.1 },
        { detail: "6h 59m", label: "Sat", meta: "Google Health", value: 7 },
        { detail: "7h 12m", label: "Sun", meta: "Google Health", value: 7.2 },
      ],
      source: "Google Health API",
      title: "Sleep duration detail",
      type: "line",
      unit: "h",
    },
    emoji: "Zz",
    label: "Sleep duration",
    lastUpdated: "Updated today at 7:06 AM",
    start: 7.2,
    suffix: " h",
    bars: [6.4, 6.8, 6.5, 6.9, 7.1, 7, 7.2],
    visual: "line",
  },
];

const dailySummaries: DailySummary[] = [
  {
    date: "Yesterday, 9:42 PM",
    highlights: [
      { label: "Body", value: "64 bpm", tone: "body" },
      { label: "Money", value: "+$420", tone: "money" },
      { label: "Code", value: "37 commits", tone: "code" },
    ],
    tabLabel: "Yesterday",
    title: "Calm baseline, strong output",
    text: "Heart rate stayed low, poker finished positive, and GitHub activity beat your normal pace. Sleep is the main signal to protect tonight.",
  },
  {
    date: "Today, 9:15 AM",
    highlights: [
      { label: "Body", value: "62 bpm", tone: "body" },
      { label: "Money", value: "$0", tone: "money" },
      { label: "Code", value: "8 commits", tone: "code" },
    ],
    tabLabel: "Today",
    title: "Fresh start with good recovery",
    text: "Sleep quality is solid and recovery looks steady. The dashboard is waiting on fresher Google Health and GitHub pulls before the day has a real shape.",
  },
  {
    date: "Tuesday, 10:08 PM",
    highlights: [
      { label: "Body", value: "71 bpm", tone: "body" },
      { label: "Money", value: "-$180", tone: "money" },
      { label: "Code", value: "44 commits", tone: "code" },
    ],
    tabLabel: "Previous",
    title: "High effort, uneven recovery",
    text: "Output ran high and contribution volume was strong, but late poker and shorter sleep made the overall state look more strained.",
  },
];

export default function StatsDashboard() {
  const [liveHealth, setLiveHealth] = useState<LiveBrainHealth | null>(null);
  const [liveGithubContributions, setLiveGithubContributions] =
    useState<LiveGithubContributions | null>(null);
  const [selectedSummaryIndex, setSelectedSummaryIndex] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState<StatsMetric | null>(null);
  const hydratedMetrics = useMemo(
    () =>
      applyGithubContributions(
        applyLiveHealth(metrics, liveHealth),
        liveGithubContributions,
      ),
    [liveGithubContributions, liveHealth],
  );
  const orderedMetrics = useMemo(() => orderMetricsForDashboard(hydratedMetrics), [hydratedMetrics]);
  const hydratedSummaries = useMemo(
    () =>
      applyGithubContributionsToSummaries(
        applyLiveHealthToSummaries(dailySummaries, liveHealth),
        liveGithubContributions,
      ),
    [liveGithubContributions, liveHealth],
  );

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBrainMetrics() {
      try {
        const response = await fetch("/api/health/brain/latest", {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = (await response.json()) as BrainHealthApiResponse;

        if (data.connected) {
          setLiveHealth({
            errors: data.errors,
            history: data.history,
            metrics: data.metrics,
          });
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    void fetchBrainMetrics();
    const timer = window.setInterval(fetchBrainMetrics, 60_000);

    return () => {
      controller.abort();
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGithubContributions() {
      try {
        const response = await fetch("/api/github/contributions", {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = (await response.json()) as GithubContributionsApiResponse;

        if (data.connected && data.generatedAt && data.username) {
          setLiveGithubContributions({
            days: data.days,
            generatedAt: data.generatedAt,
            todayCount: data.todayCount,
            totalContributions: data.totalContributions,
            username: data.username,
          });
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    void fetchGithubContributions();
  }, []);

  return (
    <section className={sectionClass} id="dash">
      <StateSummaryPanel selectedIndex={selectedSummaryIndex} summaries={hydratedSummaries} onSelect={setSelectedSummaryIndex} />
      <StatsMetricGrid metrics={orderedMetrics} onMetricSelect={setSelectedMetric} />
      <StatDetailOverlay metric={selectedMetric} onClose={() => setSelectedMetric(null)} />
    </section>
  );
}

function orderMetricsForDashboard(baseMetrics: StatsMetric[]) {
  return [...baseMetrics].sort(
    (a, b) =>
      (metricDisplayOrder.get(a.label) ?? Number.MAX_SAFE_INTEGER) -
      (metricDisplayOrder.get(b.label) ?? Number.MAX_SAFE_INTEGER),
  );
}

function applyLiveHealth(baseMetrics: StatsMetric[], liveHealth: LiveBrainHealth | null) {
  if (!liveHealth) {
    return baseMetrics;
  }

  const { history, metrics: liveMetrics } = liveHealth;

  return baseMetrics.map((metric) => {
    if (metric.detail.type !== "line") {
      return metric;
    }

    if (metric.label === "Heart rate" && liveMetrics.heartRate) {
      const points = (history?.heartRate.length ? history.heartRate : [liveMetrics.heartRate]).map((sample) =>
        createHealthDetailPoint({
          measuredAt: sample.measuredAt,
          source: sample.source,
          stale: sample.stale,
          unit: "bpm",
          value: sample.bpm,
        }),
      );

      return {
        ...metric,
        bars: points.map((point) => point.value),
        delta: liveMetrics.heartRate.stale ? "stale" : "live",
        detail: {
          ...metric.detail,
          description: "Recent synced heart-rate samples from Google Health.",
          points,
        },
        lastUpdated: formatMetricFreshness(liveMetrics.heartRate.measuredAt),
        start: liveMetrics.heartRate.bpm,
      };
    }

    if (metric.label === "HRV" && liveMetrics.hrv) {
      const points = (history?.hrv.length ? history.hrv : [liveMetrics.hrv]).map((sample) =>
        createHealthDetailPoint({
          measuredAt: sample.measuredAt,
          source: sample.source,
          stale: sample.stale,
          unit: "ms",
          value: sample.ms,
        }),
      );

      return {
        ...metric,
        bars: points.map((point) => point.value),
        delta: liveMetrics.hrv.stale ? "stale" : "live",
        detail: {
          ...metric.detail,
          description: "Recent synced HRV recovery samples from Google Health.",
          points,
        },
        lastUpdated: formatMetricFreshness(liveMetrics.hrv.measuredAt),
        start: liveMetrics.hrv.ms,
      };
    }

    if (metric.label.startsWith("Sleep") && liveMetrics.sleep) {
      const sleepValue = liveMetrics.sleep.durationHours;

      if (sleepValue === null) {
        return metric;
      }

      const points = (history?.sleep.length ? history.sleep : [liveMetrics.sleep])
        .filter((sample) => sample.durationHours !== null)
        .map((sample) =>
          createHealthDetailPoint({
            measuredAt: sample.measuredAt,
            source: sample.source,
            stale: sample.stale,
            unit: "h",
            value: sample.durationHours ?? 0,
          }),
        );

      return {
        ...metric,
        bars: points.map((point) => point.value),
        delta: liveMetrics.sleep.stale ? "stale" : "live",
        detail: {
          ...metric.detail,
          description: "Recent synced sleep-duration sessions from Google Health.",
          points: points.length ? points : metric.detail.points,
          unit: "h",
        },
        lastUpdated: formatMetricFreshness(liveMetrics.sleep.measuredAt),
        start: sleepValue,
        suffix: " h",
      };
    }

    if (metric.label.startsWith("Sleep") && liveHealth.errors?.sleep === "google_health_scope_missing") {
      return {
        ...metric,
        delta: "scope needed",
        lastUpdated: "Reconnect Google Health for sleep",
      };
    }

    return metric;
  });
}

function applyGithubContributions(
  baseMetrics: StatsMetric[],
  liveGithubContributions: LiveGithubContributions | null,
) {
  if (!liveGithubContributions) {
    return baseMetrics;
  }

  return baseMetrics.map((metric) => {
    if (metric.detail.type !== "github") {
      return metric;
    }

    const recentWeek = liveGithubContributions.days.slice(-7);

    return {
      ...metric,
      bars: recentWeek.map((day) => day.count),
      delta:
        liveGithubContributions.todayCount === 1
          ? "1 today"
          : `${liveGithubContributions.todayCount} today`,
      detail: {
        ...metric.detail,
        description: `Actual contribution activity from @${liveGithubContributions.username}.`,
        days: liveGithubContributions.days,
        source: `GitHub @${liveGithubContributions.username}`,
        title: `GitHub @${liveGithubContributions.username}`,
      },
      lastUpdated: formatMetricFreshness(liveGithubContributions.generatedAt),
      start: liveGithubContributions.totalContributions,
    };
  });
}

function applyLiveHealthToSummaries(baseSummaries: DailySummary[], liveHealth: LiveBrainHealth | null) {
  if (!liveHealth) {
    return baseSummaries;
  }

  const { metrics: liveMetrics } = liveHealth;

  return baseSummaries.map((summary, summaryIndex) => {
    if (summaryIndex !== 1) {
      return summary;
    }

    return {
      ...summary,
      highlights: summary.highlights.map((highlight) =>
        highlight.label === "Body"
          ? {
              ...highlight,
              value: liveMetrics.heartRate ? `${liveMetrics.heartRate.bpm} bpm` : highlight.value,
            }
          : highlight,
      ),
    };
  });
}

function applyGithubContributionsToSummaries(
  baseSummaries: DailySummary[],
  liveGithubContributions: LiveGithubContributions | null,
) {
  if (!liveGithubContributions) {
    return baseSummaries;
  }

  return baseSummaries.map((summary, summaryIndex) => {
    if (summaryIndex !== 1) {
      return summary;
    }

    return {
      ...summary,
      highlights: summary.highlights.map((highlight) =>
        highlight.label === "Code"
          ? {
              ...highlight,
              value:
                liveGithubContributions.todayCount === 1
                  ? "1 today"
                  : `${liveGithubContributions.todayCount} today`,
            }
          : highlight,
      ),
    };
  });
}

function formatMetricFreshness(measuredAt: string) {
  const measuredTime = new Date(measuredAt).getTime();

  if (!Number.isFinite(measuredTime)) {
    return "Updated from Google Health";
  }

  const minutes = Math.max(0, Math.round((Date.now() - measuredTime) / 60_000));

  if (minutes < 1) {
    return "Updated just now";
  }

  if (minutes < 60) {
    return `Updated ${minutes} min ago`;
  }

  const hours = Math.round(minutes / 60);

  if (hours < 24) {
    return `Updated ${hours} ${hours === 1 ? "hr" : "hrs"} ago`;
  }

  const days = Math.round(hours / 24);

  return `Updated ${days} ${days === 1 ? "day" : "days"} ago`;
}

function createHealthDetailPoint({
  measuredAt,
  source,
  stale,
  unit,
  value,
}: {
  measuredAt: string;
  source: string | null;
  stale: boolean;
  unit: string;
  value: number;
}) {
  return {
    detail: stale ? "Older synced Google Health sample." : "Synced from Google Health.",
    label: formatMetricSampleLabel(measuredAt),
    meta: source ?? "Google Health",
    value: unit === "h" ? Math.round(value * 10) / 10 : Math.round(value),
  };
}

function formatMetricSampleLabel(measuredAt: string) {
  const measuredDate = new Date(measuredAt);

  if (Number.isNaN(measuredDate.getTime())) {
    return "Latest";
  }

  const day = measuredDate.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
  const time = measuredDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${day}, ${time}`;
}
