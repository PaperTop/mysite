export const GOOGLE_HEALTH_SCOPE =
  "https://www.googleapis.com/auth/googlehealth.health_metrics_and_measurements.readonly";

export const GOOGLE_HEALTH_STATE_COOKIE = "google_health_oauth_state";
export const GOOGLE_HEALTH_SESSION_COOKIE = "google_health_session";

export type GoogleHealthConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  sessionSecret: string;
  successRedirectPath: string;
};

export function getGoogleHealthConfig(): GoogleHealthConfig {
  return {
    clientId: getRequiredEnv("GOOGLE_HEALTH_CLIENT_ID"),
    clientSecret: getRequiredEnv("GOOGLE_HEALTH_CLIENT_SECRET"),
    redirectUri: getRequiredEnv("GOOGLE_HEALTH_REDIRECT_URI"),
    sessionSecret: getRequiredEnv("GOOGLE_HEALTH_SESSION_SECRET"),
    successRedirectPath:
      process.env.GOOGLE_HEALTH_SUCCESS_REDIRECT_PATH ?? "/brain",
  };
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
