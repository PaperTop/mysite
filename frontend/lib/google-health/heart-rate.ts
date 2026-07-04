const HEART_RATE_DATA_POINTS_URL =
  "https://health.googleapis.com/v4/users/me/dataTypes/heart-rate/dataPoints";

type GoogleHealthHeartRatePoint = {
  dataSource?: {
    application?: {
      name?: string;
      packageName?: string;
    };
    device?: {
      manufacturer?: string;
      model?: string;
      uid?: string;
    };
  };
  heartRate?: {
    beatsPerMinute?: string;
    sampleTime?: {
      physicalTime?: string;
    };
  };
};

type GoogleHealthDataPointsResponse = {
  dataPoints?: GoogleHealthHeartRatePoint[];
  nextPageToken?: string;
};

export type LatestHeartRate = {
  bpm: number;
  measuredAt: string;
  source: string | null;
  stale: boolean;
};

export async function fetchLatestHeartRate(
  accessToken: string,
  lookbackHours = 24,
): Promise<LatestHeartRate | null> {
  const samples = await fetchRecentHeartRates(accessToken, lookbackHours);

  return samples[samples.length - 1] ?? null;
}

export async function fetchRecentHeartRates(
  accessToken: string,
  lookbackHours = 24,
): Promise<LatestHeartRate[]> {
  const url = new URL(HEART_RATE_DATA_POINTS_URL);
  const since = new Date(Date.now() - lookbackHours * 60 * 60 * 1000);

  url.searchParams.set("pageSize", "10");
  url.searchParams.set(
    "filter",
    `heart_rate.sample_time.physical_time >= "${since.toISOString()}"`,
  );

  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Google Health API request failed: ${response.status}`);
  }

  const data = (await response.json()) as GoogleHealthDataPointsResponse;

  return normalizeHeartRateSamples(data);
}

function normalizeHeartRateSamples(
  data: GoogleHealthDataPointsResponse,
): LatestHeartRate[] {
  return (
    data.dataPoints
    ?.map((point) => {
      const bpm = Number(point.heartRate?.beatsPerMinute);
      const measuredAt = point.heartRate?.sampleTime?.physicalTime;

      if (!Number.isFinite(bpm) || !measuredAt) {
        return null;
      }

      return {
        bpm,
        measuredAt,
        point,
        measuredAtMs: Date.parse(measuredAt),
      };
    })
    .filter((point) => point !== null)
    .filter((point) => Number.isFinite(point.measuredAtMs))
    .sort((a, b) => a.measuredAtMs - b.measuredAtMs)
    .map((point) => ({
      bpm: point.bpm,
      measuredAt: point.measuredAt,
      source: formatSource(point.point),
      stale: Date.now() - point.measuredAtMs > 15 * 60 * 1000,
    })) ?? []
  );
}

function formatSource(point: GoogleHealthHeartRatePoint) {
  const device = point.dataSource?.device;
  const application = point.dataSource?.application;
  const deviceName = [device?.manufacturer, device?.model]
    .filter(Boolean)
    .join(" ");

  return deviceName || application?.name || application?.packageName || null;
}
