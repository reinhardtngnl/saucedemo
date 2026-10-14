const { defineConfig } = require('@playwright/test');

process.loadEnvFile('.env');

if (!process.env.BASEURL) {
  throw new Error('BASEURL must be set in the environment or .env file.');
}

module.exports = defineConfig({
  testDir: './test',
  fullyParallel: true,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASEURL,
    headless: true,
    launchOptions: {
      slowMo: 1000,
    },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});