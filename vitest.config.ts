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
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/content/topics/**',
        'src/test/**',
        'src/main.tsx',
        'src/routeTree.gen.ts',
        'src/vite-env.d.ts',
      ],
      thresholds: {
        statements: 90,
        branches: 80,
        functions: 90,
        lines: 90,
        'src/features/quiz/model/**': { statements: 95, branches: 85, functions: 100, lines: 95 },
        'src/lib/**': { statements: 90, branches: 90, functions: 100, lines: 95 },
      },
    },
  },
})
