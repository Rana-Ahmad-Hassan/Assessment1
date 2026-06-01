# Counselor Student Action Center


## Quick start

1. Install dependencies for both apps:

```bash
# from repo root
cd client && npm install
cd ../server && npm install
```

2. Start the server (defaults to port 4000):

```bash
cd server
npm run dev
```

3. Start the frontend (Vite dev server):

```bash
cd client
npm run dev
```

Open the address printed by the Vite server in your browser.

To create a production build for the frontend:

```bash
cd client
npm run build
```

## API (short contract)

Base URL: `http://localhost:4000`

- GET `/students`
  - Returns the list of students.

- GET `/students/:id/action-center`
  - Returns a payload with the student's profile, tasks, messages, unread message count, and simple urgency counts.

- PATCH `/tasks/:taskId/status`
  - Body: `{ "status": "todo" | "in_progress" | "completed" }`
  - Returns the updated task.

The server uses in-memory mock data (see `server/src/mockData.ts`) so changes are ephemeral.

## Project layout (server)

The backend follows a lightweight MVC-style layout to keep responsibilities clear:

- `server/src/models/` — Type definitions.
- `server/src/services/` — Business logic that reads mock data and updates it.
- `server/src/controllers/` — HTTP handlers that call services and shape responses.
- `server/src/routes/` — Express route modules mounted in `server/src/index.ts`.
- `server/src/middleware/` — Request logging and error-handling middleware.

This structure keeps the HTTP layer thin and makes the core logic easy to test or swap for a real database later.

## Performance decisions and tradeoffs

Here’s a short, human-friendly summary of decisions we made and why:

- Fast build feedback: we use SWC (`@vitejs/plugin-react-swc`) and `esbuild` for minification. That makes development snappy and production builds quick. The tradeoff is that some niche Babel plugins or transforms are not available out of the box.

- Modern target: the bundle targets modern browsers (ES2020). This helps reduce bundle size and avoids polyfills for modern code. If you need broad legacy support, bump the target and add polyfills.

- Tailwind: configured with proper `content` paths so unused CSS is removed. Be careful to include any dynamically generated class names—Tailwind’s purge can remove classes it can’t find.

- Runtime work: I added memoization and stable callbacks for lists and items to reduce unnecessary re-renders. It helps here because the UI re-renders frequently during interactions, but overusing `memo`/`useCallback` can make code harder to follow.

- Backend simplicity: the server uses in-memory mock data for speed and clarity. That’s great for development but not suitable for production — you’ll want a proper database, migrations, and a real logger.

- Observability: lightweight request logging and an error handler with a request ID are included so you can trace and debug requests easily. For production, swap console logging for a structured logger like `pino` and send logs to a central store.

If you want, I can take a few targeted follow-ups: add structured logging, enable compression and cache headers, split large UI code paths for route-level lazy loading, or run a Lighthouse audit against the production preview and share the report.

## Performance decisions and tradeoffs

This project balances developer ergonomics with production performance. Key decisions and tradeoffs made during development:

- Frontend build
  - Using `@vitejs/plugin-react-swc` and SWC for fast compilations and smaller dev feedback loops. Tradeoff: SWC is very fast but some advanced transforms/plugins available for Babel may not be available.
  - `esbuild` is used for minification and fast bundling in `vite build`. Tradeoff: esbuild is extremely fast but may produce slightly different minification compared to `terser` for edge JS semantics.
  - Targeting modern browsers (ES2020) to reduce polyfill and transpilation overhead. Tradeoff: older browsers may need additional polyfills or a different build target.
  - Tailwind CSS is configured to remove unused styles (via content paths) so final CSS is small. Tradeoff: if component paths are not included in `content` Tailwind may purge classes you rely on.

- Runtime optimizations
  - React component memoization and stable callbacks were added to reduce re-renders on the Task and Message lists. Tradeoff: adding `memo`/`useCallback` increases cognitive overhead and can mask bugs if props change shape frequently.
  - Lazy-loading / code-splitting is supported by Vite; for this demo the app is small so we prioritized build-time speed and simplicity over aggressive route-based splitting. Tradeoff: a larger app should adopt dynamic imports for routes and heavy components.

- Server-side
  - The server is intentionally simple and uses in-memory mock data for fast iterations. Tradeoff: no persistence or horizontal scaling; production would require a database and connection pooling.
  - Added lightweight request logging and error middleware with `X-Request-Id` to trace requests and correlate logs. Tradeoff: console logs are simple but for production you should use a structured logger (e.g., `pino`) and log aggregation.




