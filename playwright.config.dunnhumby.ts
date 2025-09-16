import { defineConfig, devices } from '@playwright/test';

import {} from 'dotenv/config';

export const auth = 'dunnhumby-test-results/.auth';
export const testResults = 'dunnhumby-test-results';
export const playwrightReport = 'dunnhumby-playwright-report';

export default defineConfig({
  testDir: './tests/dunnhumby',
  globalSetup: require.resolve('./config/dunnhumby/global-setup.ts'),
  globalTeardown: require.resolve('./config/dunnhumby/global-teardown.ts'),
  timeout: 30 * 1000,
  expect: {
    timeout: 30 * 1000,
    toHaveScreenshot: {
      maxDiffPixels: 100,
    },
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  workers: process.env.CI ? 5 : 5,
  reporter: [['html'], ['list']],
  use: {
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    viewport: { width: 1920, height: 1080 },
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    storageState: auth,
    baseURL:'https://the-internet.herokuapp.com/',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']},
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
