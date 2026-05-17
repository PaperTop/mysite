import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type ResponseContent = {
  text?: unknown;
  type?: unknown;
};

type ResponseOutput = {
  content?: unknown;
  type?: unknown;
};

type OpenAIResponse = {
  error?: {
    message?: string;
  };
  output?: unknown;
  output_text?: unknown;
};

const MAX_MESSAGES = 24;
const MAX_MESSAGE_LENGTH = 4_000;
const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const RATE_LIMIT_MAX_REQUESTS = 12;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_CLIENTS = 1_000;
const UPSTREAM_TIMEOUT_MS = 30_000;

const requestCounts = new Map<string, { count: number; resetAt: number }>();

function jsonResponse(
  body: { error: string } | { reply: string },
  init?: ResponseInit,
) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...init?.headers,
    },
  });
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const message = value as Record<string, unknown>;

  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= MAX_MESSAGE_LENGTH
  );
}

function normalizeMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  const messages = value.slice(-MAX_MESSAGES);

  if (!messages.every(isChatMessage)) {
    return null;
  }

  return messages.map((message) => ({
    role: message.role,
    content: message.content.trim(),
  }));
}

function getClientId(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function pruneExpiredRateLimits(now: number) {
  if (requestCounts.size < RATE_LIMIT_MAX_CLIENTS) {
    return;
  }

  for (const [clientId, current] of requestCounts) {
    if (current.resetAt <= now) {
      requestCounts.delete(clientId);
    }
  }
}

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  pruneExpiredRateLimits(now);

  const current = requestCounts.get(clientId);

  if (!current || current.resetAt <= now) {
    requestCounts.set(clientId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  return false;
}

async function readOpenAIResponse(response: Response): Promise<OpenAIResponse> {
  const text = await response.text();

  if (!text) {
    return {};
  }

  return JSON.parse(text) as OpenAIResponse;
}

function extractResponseText(payload: OpenAIResponse): string {
  if (typeof payload.output_text === "string") {
    return payload.output_text.trim();
  }

  if (!Array.isArray(payload.output)) {
    return "";
  }

  return payload.output
    .flatMap((outputItem: ResponseOutput) =>
      Array.isArray(outputItem.content) ? outputItem.content : [],
    )
    .map((contentItem: ResponseContent) =>
      typeof contentItem.text === "string" ? contentItem.text : "",
    )
    .join("")
    .trim();
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const clientId = getClientId(request);

  if (isRateLimited(clientId)) {
    return jsonResponse(
      { error: "Too many chat requests. Try again shortly." },
      { status: 429 },
    );
  }

  if (!apiKey) {
    return jsonResponse(
      { error: "Missing OPENAI_API_KEY in the server environment." },
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = normalizeMessages(
    body && typeof body === "object"
      ? (body as Record<string, unknown>).messages
      : undefined,
  );

  if (!messages || !messages.some((message) => message.role === "user")) {
    return jsonResponse(
      { error: "Send at least one user message under messages." },
      { status: 400 },
    );
  }

  let upstreamResponse: Response;
  const timeout = AbortSignal.timeout(UPSTREAM_TIMEOUT_MS);

  try {
    upstreamResponse = await fetch(OPENAI_RESPONSES_URL, {
      body: JSON.stringify({
        input: messages.map((message) => ({
          content: message.content,
          role: message.role,
        })),
        instructions:
          "You are a concise, friendly assistant on Jaden's personal website. Answer directly and avoid pretending you can access private information.",
        max_output_tokens: 900,
        model: process.env.OPENAI_MODEL || "gpt-5-nano",
        reasoning: {
          effort: "low",
        },
        text: {
          verbosity: "medium",
        },
      }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      signal: timeout,
    });
  } catch {
    return jsonResponse(
      { error: "Could not reach the chat service." },
      { status: 502 },
    );
  }

  let payload: OpenAIResponse;

  try {
    payload = await readOpenAIResponse(upstreamResponse);
  } catch {
    return jsonResponse(
      { error: "The chat service returned an unreadable response." },
      { status: 502 },
    );
  }

  if (!upstreamResponse.ok) {
    return jsonResponse(
      {
        error:
          payload.error?.message ||
          "The chat service returned an unexpected error.",
      },
      { status: upstreamResponse.status },
    );
  }

  const reply = extractResponseText(payload);

  if (!reply) {
    return jsonResponse(
      { error: "The chat service returned an empty response." },
      { status: 502 },
    );
  }

  return jsonResponse({ reply });
}
