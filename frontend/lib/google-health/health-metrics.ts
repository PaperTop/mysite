const HRV_DATA_POINTS_URL =
  "https://health.googleapis.com/v4/users/me/dataTypes/heart-rate-variability/dataPoints";
const SLEEP_DATA_POINTS_URL =
  "https://health.googleapis.com/v4/users/me/dataTypes/sleep/dataPoints";

type GoogleHealthDataPointSource = {
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
    platform?: string;
  };
};

type GoogleHealthHrvPoint = GoogleHealthDataPointSource & {
  heartRateVariability?: {
    rootMeanSquareOfSuccessiveDifferencesMilliseconds?: number | string;
    sampleTime?: {
      physicalTime?: string;
    };
  };
};

type GoogleHealthSleepPoint = GoogleHealthDataPointSource & {
  sleep?: {
    duration?: string;
    endTime?: {
      physicalTime?: string;
    };
    interval?: {
      endTime?: string;
      startTime?: string;
    };
    score?: number | string;
    sleepScore?: {
      score?: number | string;
    };
    startTime?: {
      physicalTime?: string;
    };
  };
};

type GoogleHealthHrvResponse = {
  dataPoints?: GoogleHealthHrvPoint[];
};

type GoogleHealthSleepResponse = {
  dataPoints?: GoogleHealthSleepPoint[];
};

export type LatestHrv = {
  measuredAt: string;
  ms: number;
  source: string | null;
  stale: boolean;
};

export type LatestSleep = {
  durationHours: number | null;
  measuredAt: string;
  score: number | null;
  source: string | null;
  stale: boolean;
};

export class GoogleHealthApiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "GoogleHealthApiRequestError";
  }
}

export async function fetchLatestHrv(
  accessToken: string,
  lookbackHours = 168,
): Promise<LatestHrv | null> {
  const samples = await fetchRecentHrv(accessToken, lookbackHours);

  return samples[samples.length - 1] ?? null;
}

export async function fetchRecentHrv(
  accessToken: string,
  lookbackHours = 168,
): Promise<LatestHrv[]> {
  const url = new URL(HRV_DATA_POINTS_URL);
  const since = new Date(Date.now() - lookbackHours * 60 * 60 * 1000);

  url.searchParams.set("pageSize", "10");
  url.searchParams.set(
    "filter",
    `heart_rate_variability.sample_time.physical_time >= "${since.toISOString()}"`,
  );

  const data = await fetchGoogleHealthJson<GoogleHealthHrvResponse>(
    url,
    accessToken,
  );

  return normalizeHrvSamples(data);
}

export async function fetchLatestSleep(
  accessToken: string,
  lookbackHours = 168,
): Promise<LatestSleep | null> {
  const samples = await fetchRecentSleep(accessToken, lookbackHours);

  return samples[samples.length - 1] ?? null;
}

export async function fetchRecentSleep(
  accessToken: string,
  lookbackHours = 168,
): Promise<LatestSleep[]> {
  void lookbackHours;

  const url = new URL(SLEEP_DATA_POINTS_URL);

  url.searchParams.set("pageSize", "10");

  const data = await fetchGoogleHealthJson<GoogleHealthSleepResponse>(
    url,
    accessToken,
  );

  return normalizeSleepSamples(data);
}

async function fetchGoogleHealthJson<T>(url: URL, accessToken: string) {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new GoogleHealthApiRequestError(
      `Google Health API request failed: ${response.status}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}

function normalizeHrvSamples(data: GoogleHealthHrvResponse): LatestHrv[] {
  return (
    data.dataPoints
    ?.map((point) => {
      const ms = Number(
        point.heartRateVariability
          ?.rootMeanSquareOfSuccessiveDifferencesMilliseconds,
      );
      const measuredAt =
        point.heartRateVariability?.sampleTime?.physicalTime;

      if (!Number.isFinite(ms) || !measuredAt) {
        return null;
      }

      return {
        measuredAt,
        measuredAtMs: Date.parse(measuredAt),
        ms,
        point,
      };
    })
    .filter((point) => point !== null)
    .filter((point) => Number.isFinite(point.measuredAtMs))
    .sort((a, b) => a.measuredAtMs - b.measuredAtMs)
    .map((point) => ({
      measuredAt: point.measuredAt,
      ms: Math.round(point.ms),
      source: formatSource(point.point),
      stale: Date.now() - point.measuredAtMs > 36 * 60 * 60 * 1000,
    })) ?? []
  );
}

function normalizeSleepSamples(
  data: GoogleHealthSleepResponse,
): LatestSleep[] {
  return (
    data.dataPoints
    ?.map((point) => {
      const measuredAt =
        point.sleep?.interval?.endTime ??
        point.sleep?.endTime?.physicalTime ??
        point.sleep?.interval?.startTime ??
        point.sleep?.startTime?.physicalTime;
      const measuredAtMs = measuredAt ? Date.parse(measuredAt) : Number.NaN;
      const durationHours =
        parseDurationHours(point.sleep?.duration) ??
        parseIntervalHours(point.sleep?.interval?.startTime, point.sleep?.interval?.endTime);
      const score =
        toFiniteNumber(point.sleep?.score) ??
        toFiniteNumber(point.sleep?.sleepScore?.score);

      if (!measuredAt || !Number.isFinite(measuredAtMs)) {
        return null;
      }

      return {
        durationHours,
        measuredAt,
        measuredAtMs,
        point,
        score,
      };
    })
    .filter((point) => point !== null)
    .filter((point) => Number.isFinite(point.measuredAtMs))
    .sort((a, b) => a.measuredAtMs - b.measuredAtMs)
    .map((point) => ({
      durationHours: point.durationHours,
      measuredAt: point.measuredAt,
      score: point.score,
      source: formatSource(point.point),
      stale: Date.now() - point.measuredAtMs > 36 * 60 * 60 * 1000,
    })) ?? []
  );
}

function parseDurationHours(duration: string | undefined) {
  if (!duration) {
    return null;
  }

  const secondsMatch = duration.match(/^([0-9.]+)s$/);

  if (secondsMatch) {
    return roundToTenth(Number(secondsMatch[1]) / 60 / 60);
  }

  const isoMatch = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?$/);

  if (!isoMatch) {
    return null;
  }

  const hours = Number(isoMatch[1] ?? 0);
  const minutes = Number(isoMatch[2] ?? 0);

  return roundToTenth(hours + minutes / 60);
}

function parseIntervalHours(
  startTime: string | undefined,
  endTime: string | undefined,
) {
  if (!startTime || !endTime) {
    return null;
  }

  const startMs = Date.parse(startTime);
  const endMs = Date.parse(endTime);

  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) {
    return null;
  }

  return roundToTenth((endMs - startMs) / 1000 / 60 / 60);
}

function toFiniteNumber(value: number | string | undefined) {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : null;
}

function roundToTenth(value: number) {
  return Math.round(value * 10) / 10;
}

function formatSource(point: GoogleHealthDataPointSource) {
  const device = point.dataSource?.device;
  const application = point.dataSource?.application;
  const deviceName = [device?.manufacturer, device?.model]
    .filter(Boolean)
    .join(" ");

  return (
    deviceName ||
    application?.name ||
    application?.packageName ||
    point.dataSource?.platform ||
    null
  );
}
