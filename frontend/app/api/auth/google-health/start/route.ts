import { NextResponse } from "next/server";

import {
  GOOGLE_HEALTH_STATE_COOKIE,
  isGoogleHealthOAuthSetupAllowed,
} from "@/lib/google-health/config";
import {
  createGoogleHealthAuthorizationUrl,
  createGoogleHealthOAuthState,
} from "@/lib/google-health/oauth";
import { googleHealthStateCookieOptions } from "@/lib/google-health/session";

export const runtime = "nodejs";

export async function GET() {
  if (!isGoogleHealthOAuthSetupAllowed()) {
    return NextResponse.json(
      {
        error: "google_health_oauth_disabled",
        message: "Google Health OAuth setup is only available locally.",
      },
      { status: 404 },
    );
  }

  try {
    const state = createGoogleHealthOAuthState();
    const response = NextResponse.redirect(
      createGoogleHealthAuthorizationUrl(state),
    );

    response.cookies.set(
      GOOGLE_HEALTH_STATE_COOKIE,
      state,
      googleHealthStateCookieOptions(),
    );

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: "google_health_oauth_not_configured",
        message:
          error instanceof Error
            ? error.message
            : "Google Health OAuth is not configured.",
      },
      { status: 500 },
    );
  }
}
