# Google Health API backend notes

This project uses Next.js route handlers as a small backend-for-frontend for Google Health data.

## Endpoints

- `GET /api/auth/google-health/start` redirects to Google OAuth.
- `GET /api/auth/google-health/callback` receives the OAuth callback and stores an encrypted `httpOnly` session cookie.
- `POST /api/auth/google-health/disconnect` clears the local Google Health session.
- `DELETE /api/auth/google-health/disconnect` also clears the local Google Health session.
- `GET /api/health/heart-rate/latest` returns the latest normalized heart-rate sample.

## Environment variables

Copy `frontend/.env.example` to `frontend/.env.local` and fill in the Google OAuth values.

```bash
GOOGLE_HEALTH_CLIENT_ID=
GOOGLE_HEALTH_CLIENT_SECRET=
GOOGLE_HEALTH_REDIRECT_URI=http://localhost:3000/api/auth/google-health/callback
GOOGLE_HEALTH_SESSION_SECRET=
GOOGLE_HEALTH_SUCCESS_REDIRECT_PATH=/brain
```

Use a long random value for `GOOGLE_HEALTH_SESSION_SECRET`.

## Local flow

1. Start the frontend with `npm run dev`.
2. Visit `/api/auth/google-health/start`.
3. Approve the Google Health scope.
4. After redirect, call `/api/health/heart-rate/latest`.

The heart-rate endpoint returns synced health data, not a live sensor stream. The UI should label it as the latest synced heart rate and show the `measuredAt` timestamp.

## Production note

The first version stores the refresh token in an encrypted `httpOnly` cookie to avoid adding a database too early. A production version should usually store tokens server-side in a database and put only a session id in the browser cookie.
