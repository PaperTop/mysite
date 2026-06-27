import { NextResponse, type NextRequest } from "next/server";

import {
  getGoogleHealthConfig,
  GOOGLE_HEALTH_SESSION_COOKIE,
} from "@/lib/google-health/config";
import {
  GoogleHealthOAuthError,
  refreshGoogleHealthAccessToken,
} from "@/lib/google-health/oauth";
import { fetchLatestHeartRate } from "@/lib/google-health/heart-rate";
import { readGoogleHealthSessionCookie } from "@/lib/google-health/session";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get(GOOGLE_HEALTH_SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    return NextResponse.json(
      {
        connected: false,
        latest: null,
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
        latest: null,
        message:
          error instanceof Error
            ? error.message
            : "Google Health API is not configured.",
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
        latest: null,
      },
      { status: 401 },
    );

    response.cookies.delete(GOOGLE_HEALTH_SESSION_COOKIE);

    return response;
  }

  try {
    const accessToken = await refreshGoogleHealthAccessToken(
      session.refreshToken,
    );
    const latest = await fetchLatestHeartRate(
      accessToken,
      parseLookbackHours(request.nextUrl.searchParams.get("lookbackHours")),
    );

    return NextResponse.json({
      connected: true,
      latest,
      unit: "bpm",
    });
  } catch (error) {
    if (
      error instanceof GoogleHealthOAuthError &&
      error.code === "invalid_grant"
    ) {
      const response = NextResponse.json(
        {
          connected: false,
          error: "google_health_reauthorization_required",
          latest: null,
        },
        { status: 401 },
      );

      response.cookies.delete(GOOGLE_HEALTH_SESSION_COOKIE);

      return response;
    }

    return NextResponse.json(
      {
        connected: true,
        error: "google_health_heart_rate_fetch_failed",
        latest: null,
      },
      { status: 502 },
    );
  }
}

function parseLookbackHours(value: string | null) {
  if (!value) {
    return 24;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 24;
  }

  return Math.min(Math.max(parsed, 1), 168);
}
