# PropFirm Frontend

The separate BitDX Prop Firm trading workspace for accounts purchased through
BitDX. See `PROP_FIRM_PLAN.md` at the workspace root for the full product
design.

## Stack

Vite + React + React Router + Tailwind + shadcn/ui — the same stack as the
main exchange frontend ("Dex New Frontend"), so the trade page can use its
real, ported components (market list, chart, positions, trade panel, order
book) rather than a separate hand-styled approximation.

## Current scope — all real, no mock data

- Login against BitDX Prop Firm's own backend (`POST /auth/login`), separate
  from the exchange's own auth.
- Trade workspace: real market list + live prices (`GET /markets`), real
  order-book depth and recent trades proxied from the exchange's own
  matching-engine (`GET /depth`, `GET /trades` — shown for market reference;
  simulated evaluation-stage orders don't execute against this book), and
  order placement/close/cancel against the simulated trading engine
  (`POST /trading/orders`, `/trading/close`, `/trading/cancel`).
- Positions, open orders, and trade history (`GET /trading/positions`,
  `/trading/history`).
- Profile page: account status, balance/equity, and full per-phase risk
  rules (`GET /accounts`, `GET /packages`).

A network/auth failure surfaces as an honest error state, never a fabricated
fallback value. The one exception is the login page's demo-credentials
banner, which is clearly labeled as a real provisioned test account, not a
disguised default.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open `http://localhost:3001` (or whatever port `--port` is passed). Set
`VITE_PROPFIRM_API_URL` to point at a running BitDX Prop Firm backend
(defaults to `http://localhost:8090`); see `.env.example`.

## Validate

```bash
npx tsc --noEmit
npx eslint .
npm run build
```
