# Google Health API backend notes

This project uses Next.js route handlers as a small backend-for-frontend for Google Health data.

The intended portfolio setup is owner mode: Jaden authorizes Google Health once, stores the refresh token in server-side environment variables, and the public API always reads from that owner account. Visitors cannot connect their own Google account when owner mode is configured.

## Endpoints

- `GET /api/auth/google-health/start` redirects to Google OAuth while setting up the owner token locally. It is disabled in production and once `GOOGLE_HEALTH_OWNER_REFRESH_TOKEN` is configured.
- `GET /api/auth/google-health/callback` receives the OAuth callback. It is local-only; in setup mode it returns the owner refresh token so it can be copied into env.
- `POST /api/auth/google-health/disconnect` clears the local Google Health session.
- `DELETE /api/auth/google-health/disconnect` also clears the local Google Health session.
- `GET /api/health/heart-rate/latest` returns the latest normalized heart-rate sample from `GOOGLE_HEALTH_OWNER_REFRESH_TOKEN` when configured.
- `GET /api/health/brain/latest` returns the latest normalized heart-rate, HRV, and sleep-duration samples for the Brain page. It returns per-metric errors, so HRV can still update if sleep needs a new OAuth scope.

## Environment variables

Copy `frontend/.env.example` to `frontend/.env.local` and fill in the Google OAuth values.

```bash
GOOGLE_HEALTH_CLIENT_ID=
GOOGLE_HEALTH_CLIENT_SECRET=
GOOGLE_HEALTH_REDIRECT_URI=http://localhost:3000/api/auth/google-health/callback
GOOGLE_HEALTH_SESSION_SECRET=
GOOGLE_HEALTH_SUCCESS_REDIRECT_PATH=/brain
GOOGLE_HEALTH_OWNER_REFRESH_TOKEN=
GOOGLE_HEALTH_OWNER_TOKEN_SETUP=false
```

Use a long random value for `GOOGLE_HEALTH_SESSION_SECRET` only if you use the legacy local-session flow.

Never prefix the refresh token with `NEXT_PUBLIC_`; it must stay server-side.

## Owner-token setup flow

1. Start the frontend with `npm run dev`.
2. Set `GOOGLE_HEALTH_OWNER_TOKEN_SETUP=true` locally.
3. Visit `/api/auth/google-health/start`.
4. Approve the Google Health scope with Jaden's Google account.
5. The callback returns JSON containing `refreshToken`.
6. Copy that value into `GOOGLE_HEALTH_OWNER_REFRESH_TOKEN`.
7. Set `GOOGLE_HEALTH_OWNER_TOKEN_SETUP=false` and restart the dev server.
8. Call `/api/health/heart-rate/latest`.

After `GOOGLE_HEALTH_OWNER_REFRESH_TOKEN` is set, `/api/auth/google-health/start` returns `google_health_oauth_disabled` instead of letting another visitor connect.

If `/api/health/brain/latest` returns `google_health_scope_missing` for sleep, repeat the owner-token setup flow after clearing `GOOGLE_HEALTH_OWNER_REFRESH_TOKEN` locally. The newer OAuth request includes the Google Health sleep readonly scope.

## Legacy local-session flow

If `GOOGLE_HEALTH_OWNER_REFRESH_TOKEN` is not set in local development, the API can still use the older browser-cookie flow:

1. Start the frontend with `npm run dev`.
2. Visit `/api/auth/google-health/start`.
3. Approve the Google Health scope.
4. After redirect, call `/api/health/heart-rate/latest`.

The heart-rate endpoint returns synced health data, not a live sensor stream. The UI should label it as the latest synced heart rate and show the `measuredAt` timestamp.

## Production note

Deploy `GOOGLE_HEALTH_OWNER_REFRESH_TOKEN`, `GOOGLE_HEALTH_CLIENT_ID`, and `GOOGLE_HEALTH_CLIENT_SECRET` as production environment variables. Do not commit real token values.
