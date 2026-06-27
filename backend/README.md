# Backend

Backend-specific code and documentation can live here.

The frontend app lives in `../frontend`. If the site uses Next.js route handlers, they belong under `../frontend/app/api`.

Add a separate backend service here only when it needs its own runtime, dependencies, or deployment path.

## Folder structure

- `src/routes/` - HTTP route definitions for a standalone backend service.
- `src/controllers/` - Request and response handlers.
- `src/services/` - Business logic that should stay independent of HTTP details.
- `src/data/` - Database clients, models, repositories, and persistence code.
- `src/middleware/` - Request middleware such as auth, validation, and logging.
- `src/config/` - Environment and runtime configuration.
- `src/lib/` - Shared backend-only helpers.
- `tests/` - Backend tests.
- `docs/` - Backend notes, API docs, and design decisions.
