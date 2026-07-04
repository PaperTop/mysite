import { NextResponse, type NextRequest } from "next/server";

import {
  getGoogleHealthConfig,
  getGoogleHealthOwnerRefreshToken,
  GOOGLE_HEALTH_SESSION_COOKIE,
  isGoogleHealthOAuthSetupAllowed,
} from "@/lib/google-health/config";
import { fetchRecentHeartRates } from "@/lib/google-health/heart-rate";
import {
  fetchRecentHrv,
  fetchRecentSleep,
  GoogleHealthApiRequestError,
} from "@/lib/google-health/health-metrics";
import {
  GoogleHealthOAuthError,
  refreshGoogleHealthAccessToken,
} from "@/lib/google-health/oauth";
import { readGoogleHealthSessionCookie } from "@/lib/google-health/session";

export const runtime = "nodejs";

type MetricErrorCode =
  | "google_health_metric_fetch_failed"
  | "google_health_scope_missing";

type MetricResult<T> = {
  error?: MetricErrorCode;
  latest: T | null;
};

export async function GET(request: NextRequest) {
  const ownerRefreshToken = getGoogleHealthOwnerRefreshToken();
  const lookbackHours = parseLookbackHours(
    request.nextUrl.searchParams.get("lookbackHours"),
  );

  if (ownerRefreshToken) {
    return getLatestBrainMetrics(ownerRefreshToken, lookbackHours, "owner");
  }

  if (!isGoogleHealthOAuthSetupAllowed()) {
    return NextResponse.json(
      {
        connected: false,
        error: "google_health_owner_not_configured",
        message:
          "Set GOOGLE_HEALTH_OWNER_REFRESH_TOKEN on the server before using this endpoint in production.",
        metrics: {
          heartRate: null,
          hrv: null,
          sleep: null,
        },
        history: {
          heartRate: [],
          hrv: [],
          sleep: [],
        },
        mode: "owner",
      },
      { status: 500 },
    );
  }

  const sessionCookie = request.cookies.get(GOOGLE_HEALTH_SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    return NextResponse.json(
      {
        connected: false,
        metrics: {
          heartRate: null,
          hrv: null,
          sleep: null,
        },
        history: {
          heartRate: [],
          hrv: [],
          sleep: [],
        },
      },
      { status: 401 },
    );
  }

  let config: ReturnType<typeof getGoogleHealthConfig>;

  try {
    config = getGoogleHealthConfig();
  } catch (error) {
    return NextResponse.json(
      {
        connected: false,
        error: "google_health_not_configured",
        message:
          error instanceof Error
            ? error.message
            : "Google Health API is not configured.",
        metrics: {
          heartRate: null,
          hrv: null,
          sleep: null,
        },
        history: {
          heartRate: [],
          hrv: [],
          sleep: [],
        },
      },
      { status: 500 },
    );
  }

  const session = readGoogleHealthSessionCookie(
    sessionCookie,
    config.sessionSecret,
  );

  if (!session) {
    const response = NextResponse.json(
      {
        connected: false,
        error: "invalid_google_health_session",
        metrics: {
          heartRate: null,
          hrv: null,
          sleep: null,
        },
        history: {
          heartRate: [],
          hrv: [],
          sleep: [],
        },
      },
      { status: 401 },
    );

    response.cookies.delete(GOOGLE_HEALTH_SESSION_COOKIE);

    return response;
  }

  return getLatestBrainMetrics(session.refreshToken, lookbackHours, "session");
}

async function getLatestBrainMetrics(
  refreshToken: string,
  lookbackHours: number,
  mode: "owner" | "session",
) {
  try {
    const accessToken = await refreshGoogleHealthAccessToken(refreshToken);
    const [heartRate, hrv, sleep] = await Promise.all([
      getMetric(() => fetchRecentHeartRates(accessToken, lookbackHours)),
      getMetric(() => fetchRecentHrv(accessToken, lookbackHours)),
      getMetric(() => fetchRecentSleep(accessToken, lookbackHours)),
    ]);
    const heartRateHistory = heartRate.latest ?? [];
    const hrvHistory = hrv.latest ?? [];
    const sleepHistory = sleep.latest ?? [];

    return NextResponse.json({
      connected: true,
      errors: {
        heartRate: heartRate.error ?? null,
        hrv: hrv.error ?? null,
        sleep: sleep.error ?? null,
      },
      metrics: {
        heartRate: heartRateHistory[heartRateHistory.length - 1] ?? null,
        hrv: hrvHistory[hrvHistory.length - 1] ?? null,
        sleep: sleepHistory[sleepHistory.length - 1] ?? null,
      },
      history: {
        heartRate: heartRateHistory,
        hrv: hrvHistory,
        sleep: sleepHistory,
      },
      mode,
      units: {
        heartRate: "bpm",
        hrv: "ms",
        sleep: "hours",
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.startsWith("Missing required environment variable:")
    ) {
      return NextResponse.json(
        {
          connected: false,
          error: "google_health_not_configured",
          message: error.message,
          metrics: {
            heartRate: null,
            hrv: null,
            sleep: null,
          },
          history: {
            heartRate: [],
            hrv: [],
            sleep: [],
          },
          mode,
        },
        { status: 500 },
      );
    }

    if (
      error instanceof GoogleHealthOAuthError &&
      error.code === "invalid_grant"
    ) {
      const response = NextResponse.json(
        {
          connected: false,
          error:
            mode === "owner"
              ? "google_health_owner_reauthorization_required"
              : "google_health_reauthorization_required",
          metrics: {
            heartRate: null,
            hrv: null,
            sleep: null,
          },
          history: {
            heartRate: [],
            hrv: [],
            sleep: [],
          },
          mode,
        },
        { status: 401 },
      );

      if (mode === "session") {
        response.cookies.delete(GOOGLE_HEALTH_SESSION_COOKIE);
      }

      return response;
    }

    return NextResponse.json(
      {
        connected: mode === "owner",
        error: "google_health_brain_metrics_fetch_failed",
        metrics: {
          heartRate: null,
          hrv: null,
          sleep: null,
        },
        history: {
          heartRate: [],
          hrv: [],
          sleep: [],
        },
        mode,
      },
      { status: 502 },
    );
  }
}

async function getMetric<T>(
  fetchMetric: () => Promise<T | null>,
): Promise<MetricResult<T>> {
  try {
    return {
      latest: await fetchMetric(),
    };
  } catch (error) {
    return {
      error: classifyMetricError(error),
      latest: null,
    };
  }
}

function classifyMetricError(error: unknown): MetricErrorCode {
  if (error instanceof GoogleHealthApiRequestError && error.status === 403) {
    return "google_health_scope_missing";
  }

  return "google_health_metric_fetch_failed";
}

function parseLookbackHours(value: string | null) {
  if (!value) {
    return 168;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 168;
  }

  return Math.min(Math.max(parsed, 1), 168);
}
