import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    attachmentsDir: './test-results/vitest-browser/attachments',
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['src/**/*.browser.test.{ts,tsx}'],
        },
      },
      {
        extends: true,
        test: {
          name: 'browser',
          retry: 0,
          include: ['src/**/*.browser.test.{ts,tsx}'],
          setupFiles: ['./src/test/setup.browser.ts'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({
              contextOptions: {
                colorScheme: 'light',
                reducedMotion: 'reduce',
              },
            }),
            instances: [
              {
                browser: 'chromium',
                name: 'chromium',
                screenshotDirectory: './test-results/vitest-browser/screenshots/chromium',
              },
              {
                browser: 'firefox',
                name: 'firefox',
                screenshotDirectory: './test-results/vitest-browser/screenshots/firefox',
              },
            ],
            screenshotFailures: true,
            trace: {
              mode: 'retain-on-failure',
              tracesDir: './test-results/vitest-browser/traces',
            },
          },
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/features/quiz/**/*.ts', 'src/lib/**/*.ts'],
      exclude: ['src/**/*.test.{ts,tsx}'],
    },
  },
})
