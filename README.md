# SauceDemo Playwright tests

This project contains two Playwright UI tests for SauceDemo:

- **Onesie checkout** (`test/E2E-Onesie.spec.js`): logs in, adds the Sauce Labs Onesie ($7.99) to the cart, verifies it in the cart and checkout summary, completes checkout, and checks the order confirmation.
- **Login** (`test/validlogin.spec.js`): verifies a user can log in and reach the inventory page.

Tests run in headless Chromium by default. Browser actions use a 1-second slow motion (`slowMo: 1000`) to make the run easier to observe; remove that setting from `playwright.config.js` for faster execution.

## Requirements

- Node.js 20.12 or later and npm. The Playwright configuration uses Node's `process.loadEnvFile`.
- Access to SauceDemo and a valid test account.

## Setup

Install dependencies and the Chromium browser:

```powershell
npm ci
npx playwright install chromium
```

Create `.env` from the provided template:

```powershell
Copy-Item .env.example .env
```

The test configuration reads these variables from `.env`:

| Variable | Description |
| --- | --- |
| `BASEURL` | SauceDemo base URL |
| `BASEUSERNAME` | SauceDemo test account username |
| `BASEPASSWORD` | SauceDemo test account password |
| `FIRSTNAME` | Checkout first name |
| `LASTNAME` | Checkout last name |
| `POSTALCODE` | Checkout postal code |

`BASEUSERNAME` is used instead of Windows' built-in `USERNAME` variable to avoid an environment-variable name collision. Keep credentials private and do not commit a local `.env` file.

## Run tests

Run both tests:

```powershell
npx playwright test
```

Run only the Onesie checkout journey:

```powershell
npx playwright test test/E2E-Onesie.spec.js
```

Run only the login test:

```powershell
npx playwright test test/validlogin.spec.js
```

## HTML report

Playwright generates the HTML report after a run but does not open it automatically. View it with:

```powershell
npx playwright show-report
```

## Project structure

```text
.
├── pages/                      # Login, inventory, cart, and checkout page objects
├── test/
│   ├── E2E-Onesie.spec.js       # Full Onesie checkout journey
│   └── validlogin.spec.js       # Login-only test
├── playwright.config.js         # Playwright settings and .env loading
├── .env.example                 # Environment-variable template
├── package.json
└── package-lock.json
```