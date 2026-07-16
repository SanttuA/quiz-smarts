import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'html',
  use: {
    baseURL: 'http://127.0.0.1:4173/quiz-smarts/',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'corepack pnpm build && corepack pnpm preview --host 127.0.0.1',
    url: 'http://127.0.0.1:4173/quiz-smarts/',
    reuseExistingServer: !process.env.CI,
    env: {
      ...process.env,
      VITE_E2E_SEED: 'quiz-smarts-e2e',
    },
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
    {
      name: 'firefox-a11y',
      testMatch: /accessibility\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
  ],
})
