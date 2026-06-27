import { NextResponse, type NextRequest } from "next/server";

import {
  getGoogleHealthConfig,
  GOOGLE_HEALTH_SESSION_COOKIE,
  GOOGLE_HEALTH_STATE_COOKIE,
} from "@/lib/google-health/config";
import {
  exchangeGoogleHealthCode,
  GoogleHealthOAuthError,
} from "@/lib/google-health/oauth";
import {
  createGoogleHealthSessionCookie,
  googleHealthSessionCookieOptions,
} from "@/lib/google-health/session";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const oauthError = searchParams.get("error");
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const expectedState = request.cookies.get(GOOGLE_HEALTH_STATE_COOKIE)?.value;

  if (oauthError) {
    return redirectWithStatus(request, "error");
  }

  if (!code || !state || state !== expectedState) {
    return redirectWithStatus(request, "invalid_state");
  }

  try {
    const config = getGoogleHealthConfig();
    const tokens = await exchangeGoogleHealthCode(code);
    const response = redirectWithStatus(request, "connected");

    response.cookies.set(
      GOOGLE_HEALTH_SESSION_COOKIE,
      createGoogleHealthSessionCookie(
        {
          connectedAt: new Date().toISOString(),
          refreshToken: tokens.refreshToken,
          scope: tokens.scope,
        },
        config.sessionSecret,
      ),
      googleHealthSessionCookieOptions(),
    );
    response.cookies.delete(GOOGLE_HEALTH_STATE_COOKIE);

    return response;
  } catch (error) {
    if (error instanceof GoogleHealthOAuthError) {
      return NextResponse.json(
        {
          error: error.code,
          message: error.message,
        },
        { status: error.status },
      );
    }

    return NextResponse.json(
      {
        error: "google_health_callback_failed",
        message:
          error instanceof Error
            ? error.message
            : "Google Health callback failed.",
      },
      { status: 500 },
    );
  }
}

function redirectWithStatus(request: NextRequest, status: string) {
  const config = getGoogleHealthConfig();
  const url = new URL(config.successRedirectPath, request.url);

  url.searchParams.set("googleHealth", status);

  return NextResponse.redirect(url);
}
