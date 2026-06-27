import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "crypto";

import { isSecureCookieEnvironment } from "./config";

const SESSION_VERSION = "v1";

export type GoogleHealthSession = {
  refreshToken: string;
  connectedAt: string;
  scope: string;
};

export function createGoogleHealthSessionCookie(
  session: GoogleHealthSession,
  sessionSecret: string,
) {
  const iv = randomBytes(12);
  const cipher = createCipheriv(
    "aes-256-gcm",
    sessionKey(sessionSecret),
    iv,
  );
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(session), "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [
    SESSION_VERSION,
    toBase64Url(iv),
    toBase64Url(authTag),
    toBase64Url(encrypted),
  ].join(".");
}

export function readGoogleHealthSessionCookie(
  cookieValue: string,
  sessionSecret: string,
): GoogleHealthSession | null {
  const [version, encodedIv, encodedAuthTag, encodedEncrypted] =
    cookieValue.split(".");

  if (
    version !== SESSION_VERSION ||
    !encodedIv ||
    !encodedAuthTag ||
    !encodedEncrypted
  ) {
    return null;
  }

  try {
    const decipher = createDecipheriv(
      "aes-256-gcm",
      sessionKey(sessionSecret),
      fromBase64Url(encodedIv),
    );
    decipher.setAuthTag(fromBase64Url(encodedAuthTag));

    const decrypted = Buffer.concat([
      decipher.update(fromBase64Url(encodedEncrypted)),
      decipher.final(),
    ]);

    const parsed = JSON.parse(decrypted.toString("utf8"));

    if (!isGoogleHealthSession(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function googleHealthSessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 90,
    path: "/",
    sameSite: "lax" as const,
    secure: isSecureCookieEnvironment(),
  };
}

export function googleHealthStateCookieOptions() {
  return {
    httpOnly: true,
    maxAge: 60 * 10,
    path: "/",
    sameSite: "lax" as const,
    secure: isSecureCookieEnvironment(),
  };
}

function sessionKey(sessionSecret: string) {
  return createHash("sha256").update(sessionSecret).digest();
}

function toBase64Url(value: Buffer) {
  return value.toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url");
}

function isGoogleHealthSession(value: unknown): value is GoogleHealthSession {
  if (!value || typeof value !== "object") {
    return false;
  }

  const session = value as Partial<GoogleHealthSession>;

  return (
    typeof session.refreshToken === "string" &&
    typeof session.connectedAt === "string" &&
    typeof session.scope === "string"
  );
}
