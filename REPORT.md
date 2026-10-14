# Project and Test Report

## Project overview

This project is a JavaScript Playwright Test suite for SauceDemo. It uses Page Object Model classes for login, inventory, cart, and checkout interactions. The suite currently contains two UI tests.

## Test coverage

| Test | Coverage | Key checks |
| --- | --- | --- |
| `test/validlogin.spec.js` | Valid user login | Submits configured credentials, checks navigation to the inventory page, and verifies the inventory container is visible. |
| `test/E2E-Onesie.spec.js` | Onesie purchase end to end | Logs in, adds Sauce Labs Onesie ($7.99), checks the cart and checkout summary, enters checkout information, finishes the order, and verifies the order confirmation. |

## Test configuration

Playwright configuration is in `playwright.config.js`:

- Test directory: `./test`
- Test timeout: 60 seconds
- Assertion timeout: 10 seconds
- Browser: headless Chromium by default
- Slow motion: 1,000 ms between browser actions
- Reporter: HTML report, not opened automatically
- Failure artifacts: screenshot on failure and trace retained on failure
- Environment: `.env` loaded using Node.js `process.loadEnvFile`

## Required environment variables

Set the following values in a local `.env` file. Do not publish real credentials or other sensitive values in reports.

| Variable | Purpose |
| --- | --- |
| `BASEURL` | SauceDemo base URL |
| `BASEUSERNAME` | SauceDemo username |
| `BASEPASSWORD` | SauceDemo password |
| `FIRSTNAME` | Checkout first name |
| `LASTNAME` | Checkout last name |
| `POSTALCODE` | Checkout postal code |

The login key is named `BASEUSERNAME` to avoid collision with Windows' predefined `USERNAME` environment variable.

## Run commands

Install dependencies and Chromium:

```powershell
npm ci
npx playwright install chromium
```

Run all tests:

```powershell
npx playwright test
```

Run tests individually:

```powershell
npx playwright test test/validlogin.spec.js
npx playwright test test/E2E-Onesie.spec.js
```

Open the generated HTML report after a run:

```powershell
npx playwright show-report
```

## Execution status

This document summarizes the current test code and configuration. No test run was performed while preparing this report, so it does not claim that the current tests passed. Run the commands above to produce fresh results. The HTML report and failure artifacts in `playwright-report/` and `test-results/` depend on the most recent local test run.

## Main project files

```text
.
├── pages/
│   ├── cart.js
│   ├── checkout.js
│   ├── inventory.js
│   └── login.js
├── test/
│   ├── E2E-Onesie.spec.js
│   └── validlogin.spec.js
├── playwright.config.js
├── .env.example
├── package.json
└── package-lock.json
```