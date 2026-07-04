const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

export type GithubContributionDay = {
  count: number;
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GithubContributions = {
  days: GithubContributionDay[];
  generatedAt: string;
  todayCount: number;
  totalContributions: number;
  username: string;
};

type GithubContributionCalendarDay = {
  contributionCount: number;
  date: string;
};

type GithubContributionsGraphqlResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: GithubContributionCalendarDay[];
          }[];
        };
      };
    } | null;
  };
  errors?: {
    message: string;
  }[];
};

export class GithubContributionsError extends Error {
  constructor(
    message: string,
    readonly status = 502,
  ) {
    super(message);
    this.name = "GithubContributionsError";
  }
}

export async function fetchGithubContributions({
  days = 365,
  token,
  username,
}: {
  days?: number;
  token: string;
  username: string;
}): Promise<GithubContributions> {
  const to = new Date();
  const from = new Date(to);

  from.setDate(from.getDate() - Math.min(Math.max(days, 1), 365));

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    body: JSON.stringify({
      query: GITHUB_CONTRIBUTIONS_QUERY,
      variables: {
        from: from.toISOString(),
        login: username,
        to: to.toISOString(),
      },
    }),
    cache: "no-store",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "mysite-brain-dashboard",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new GithubContributionsError(
      `GitHub contributions request failed: ${response.status}`,
      response.status,
    );
  }

  const data = (await response.json()) as GithubContributionsGraphqlResponse;
  const errorMessage = data.errors?.[0]?.message;

  if (errorMessage) {
    throw new GithubContributionsError(errorMessage);
  }

  const calendar =
    data.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    throw new GithubContributionsError(
      `GitHub user "${username}" was not found or returned no contribution calendar.`,
      404,
    );
  }

  const contributionDays = calendar.weeks.flatMap((week) => week.contributionDays);
  const maxCount = Math.max(...contributionDays.map((day) => day.contributionCount), 0);
  const normalizedDays = contributionDays.map((day) => ({
    count: day.contributionCount,
    date: day.date,
    level: contributionLevel(day.contributionCount, maxCount),
  }));
  const latestDay = normalizedDays[normalizedDays.length - 1];

  return {
    days: normalizedDays,
    generatedAt: to.toISOString(),
    todayCount: latestDay?.count ?? 0,
    totalContributions: calendar.totalContributions,
    username,
  };
}

function contributionLevel(count: number, maxCount: number): GithubContributionDay["level"] {
  if (count <= 0 || maxCount <= 0) {
    return 0;
  }

  const ratio = count / maxCount;

  if (ratio >= 0.75) {
    return 4;
  }

  if (ratio >= 0.5) {
    return 3;
  }

  if (ratio >= 0.25) {
    return 2;
  }

  return 1;
}

const GITHUB_CONTRIBUTIONS_QUERY = `
  query GithubContributions($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;
