# PropFirm Frontend

The separate PropFirm by BitDx trading workspace for accounts purchased through BitDx.

## Current scope

- PropFirm credential login interface
- Responsive Trade workspace
- Account balance, equity, loss-limit, and leverage presentation
- Market selection and demo order-entry interactions
- Positions, open-orders, and history states
- Profile, trading-account, and security interface

This phase is frontend-only. Authentication, payment verification, account
provisioning, balances, PnL, rules, and order execution use demo presentation
until the PropFirm backend contracts are available.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The supplied demo login fields navigate to the trading screen; they do not
represent real authentication.

## Validate

```bash
npm run build
npm test
```
