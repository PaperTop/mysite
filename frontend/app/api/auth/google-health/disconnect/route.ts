import { NextResponse } from "next/server";

import {
  GOOGLE_HEALTH_SESSION_COOKIE,
  GOOGLE_HEALTH_STATE_COOKIE,
} from "@/lib/google-health/config";

export const runtime = "nodejs";

export async function POST() {
  return disconnect();
}

export async function DELETE() {
  return disconnect();
}

function disconnect() {
  const response = NextResponse.json({
    connected: false,
  });

  response.cookies.delete(GOOGLE_HEALTH_SESSION_COOKIE);
  response.cookies.delete(GOOGLE_HEALTH_STATE_COOKIE);

  return response;
}
