export const GOOGLE_HEALTH_SCOPE = [
  "https://www.googleapis.com/auth/googlehealth.health_metrics_and_measurements.readonly",
  "https://www.googleapis.com/auth/googlehealth.sleep.readonly",
].join(" ");

export const GOOGLE_HEALTH_STATE_COOKIE = "google_health_oauth_state";
export const GOOGLE_HEALTH_SESSION_COOKIE = "google_health_session";

export type GoogleHealthConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  sessionSecret: string;
  successRedirectPath: string;
};

export type GoogleHealthTokenConfig = {
  clientId: string;
  clientSecret: string;
};

export type GoogleHealthOAuthConfig = GoogleHealthTokenConfig & {
  redirectUri: string;
};

export function getGoogleHealthConfig(): GoogleHealthConfig {
  const oauthConfig = getGoogleHealthOAuthConfig();

  return {
    ...oauthConfig,
    sessionSecret: getRequiredEnv("GOOGLE_HEALTH_SESSION_SECRET"),
    successRedirectPath: getGoogleHealthSuccessRedirectPath(),
  };
}

export function getGoogleHealthTokenConfig(): GoogleHealthTokenConfig {
  return {
    clientId: getRequiredEnv("GOOGLE_HEALTH_CLIENT_ID"),
    clientSecret: getRequiredEnv("GOOGLE_HEALTH_CLIENT_SECRET"),
  };
}

export function getGoogleHealthOAuthConfig(): GoogleHealthOAuthConfig {
  return {
    ...getGoogleHealthTokenConfig(),
    redirectUri: getRequiredEnv("GOOGLE_HEALTH_REDIRECT_URI"),
  };
}

export function getGoogleHealthSuccessRedirectPath() {
  return process.env.GOOGLE_HEALTH_SUCCESS_REDIRECT_PATH ?? "/brain";
}

export function getGoogleHealthOwnerRefreshToken() {
  return process.env.GOOGLE_HEALTH_OWNER_REFRESH_TOKEN?.trim() || null;
}

export function isGoogleHealthOwnerTokenSetupMode() {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.GOOGLE_HEALTH_OWNER_TOKEN_SETUP === "true"
  );
}

export function isGoogleHealthOAuthSetupAllowed() {
  return (
    process.env.NODE_ENV !== "production" && !getGoogleHealthOwnerRefreshToken()
  );
}

export function isSecureCookieEnvironment() {
  return process.env.NODE_ENV === "production";
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
