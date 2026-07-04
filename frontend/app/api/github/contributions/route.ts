import { NextResponse, type NextRequest } from "next/server";

import {
  fetchGithubContributions,
  GithubContributionsError,
} from "@/lib/github/contributions";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const token =
    process.env.GITHUB_CONTRIBUTIONS_TOKEN ?? process.env.GITHUB_TOKEN;
  const username =
    process.env.GITHUB_CONTRIBUTIONS_USERNAME ?? process.env.GITHUB_USERNAME;

  if (!token || !username) {
    return NextResponse.json(
      {
        connected: false,
        days: [],
        error: "github_contributions_not_configured",
        message:
          "Set GITHUB_CONTRIBUTIONS_USERNAME and GITHUB_CONTRIBUTIONS_TOKEN on the server.",
        todayCount: 0,
        totalContributions: 0,
        username: username ?? null,
      },
      { status: 500 },
    );
  }

  const days = parseDays(request.nextUrl.searchParams.get("days"));

  try {
    const contributions = await fetchGithubContributions({
      days,
      token,
      username,
    });

    return NextResponse.json({
      connected: true,
      ...contributions,
    });
  } catch (error) {
    if (error instanceof GithubContributionsError) {
      return NextResponse.json(
        {
          connected: false,
          days: [],
          error: "github_contributions_fetch_failed",
          message: error.message,
          todayCount: 0,
          totalContributions: 0,
          username,
        },
        { status: error.status },
      );
    }

    return NextResponse.json(
      {
        connected: false,
        days: [],
        error: "github_contributions_fetch_failed",
        todayCount: 0,
        totalContributions: 0,
        username,
      },
      { status: 502 },
    );
  }
}

function parseDays(value: string | null) {
  if (!value) {
    return 365;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 365;
  }

  return Math.min(Math.max(Math.round(parsed), 1), 365);
}
