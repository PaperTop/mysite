import { randomBytes } from "crypto";

import {
  getGoogleHealthOAuthConfig,
  getGoogleHealthTokenConfig,
  GOOGLE_HEALTH_SCOPE,
} from "./config";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

type GoogleTokenResponse = {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
};

export class GoogleHealthOAuthError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status = 500,
  ) {
    super(message);
  }
}

export function createGoogleHealthOAuthState() {
  return randomBytes(32).toString("base64url");
}

export function createGoogleHealthAuthorizationUrl(state: string) {
  const config = getGoogleHealthOAuthConfig();
  const url = new URL(GOOGLE_AUTH_URL);

  url.search = new URLSearchParams({
    access_type: "offline",
    client_id: config.clientId,
    prompt: "consent",
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: GOOGLE_HEALTH_SCOPE,
    state,
  }).toString();

  return url;
}

export async function exchangeGoogleHealthCode(code: string) {
  const config = getGoogleHealthOAuthConfig();
  const tokenResponse = await requestGoogleTokens({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: config.redirectUri,
  });

  if (!tokenResponse.refresh_token) {
    throw new GoogleHealthOAuthError(
      "Google did not return a refresh token. Disconnect and connect again with consent.",
      "missing_refresh_token",
      400,
    );
  }

  return {
    refreshToken: tokenResponse.refresh_token,
    scope: tokenResponse.scope ?? GOOGLE_HEALTH_SCOPE,
  };
}

export async function refreshGoogleHealthAccessToken(refreshToken: string) {
  const config = getGoogleHealthTokenConfig();
  const tokenResponse = await requestGoogleTokens({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  if (!tokenResponse.access_token) {
    throw new GoogleHealthOAuthError(
      "Google did not return an access token.",
      "missing_access_token",
      502,
    );
  }

  return tokenResponse.access_token;
}

async function requestGoogleTokens(body: Record<string, string>) {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    body: new URLSearchParams(body),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  const data = (await response.json()) as GoogleTokenResponse;

  if (!response.ok || data.error) {
    throw new GoogleHealthOAuthError(
      data.error_description ?? data.error ?? "Google OAuth request failed.",
      data.error ?? "oauth_request_failed",
      response.status,
    );
  }

  return data;
}
