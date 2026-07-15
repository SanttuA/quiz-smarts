import type { CheatSheetSection } from '../../types'

export const playwrightCheatSheet = [
  {
    id: 'test-structure-navigation',
    title: 'Test structure and navigation',
    summary: 'Declare focused tests, use the page fixture, and await browser interactions.',
    items: [
      {
        term: 'Test API',
        detail: 'Import test to declare a scenario and expect to verify its observable result.',
        code: "import { test, expect } from '@playwright/test'",
      },
      {
        term: 'Test declaration',
        detail: 'Give each test a descriptive title and an async function containing its steps.',
        code: "test('shows the dashboard', async ({ page }) => {\n  // steps\n})",
      },
      {
        term: 'Page fixture',
        detail:
          'The built-in page fixture provides a browser tab in a fresh browser context for the current test.',
        code: "test('example', async ({ page }) => {\n  // use page\n})",
      },
      {
        term: 'Navigation',
        detail: 'Use page.goto to navigate and await the returned promise before continuing.',
        code: "await page.goto('/dashboard')",
      },
      {
        term: 'Async interactions',
        detail:
          'Browser actions are asynchronous, so await navigation, locator actions, and web-first assertions.',
        code: "await page.getByRole('button', { name: 'Save' }).click()",
      },
      {
        term: 'Clear test flow',
        detail:
          'Keep setup, user action, and expected outcome readable so a failure points to useful behavior.',
        code: "await page.goto('/login')\nawait page.getByLabel('Email').fill('ada@example.com')",
      },
    ],
  },
  {
    id: 'locators-actions',
    title: 'Locators and actions',
    summary: 'Find elements through user-facing contracts and interact with them like a user.',
    items: [
      {
        term: 'Role locators',
        detail:
          'Prefer getByRole with an accessible name for interactive elements such as buttons and links.',
        code: "page.getByRole('button', { name: 'Submit' })",
      },
      {
        term: 'Label locators',
        detail: 'Use getByLabel to find form controls through their associated visible labels.',
        code: "page.getByLabel('Password')",
      },
      {
        term: 'Text locators',
        detail: 'Use getByText for non-interactive content that users identify by its text.',
        code: "page.getByText('Welcome back')",
      },
      {
        term: 'Explicit test IDs',
        detail:
          'Use getByTestId when user-facing attributes do not provide a stable, unambiguous contract.',
        code: "page.getByTestId('save-status')",
      },
      {
        term: 'Chaining and filtering',
        detail:
          'Narrow a collection by chaining locators or filtering it by text or another locator.',
        code: "page.getByRole('listitem').filter({ hasText: 'Product 2' })",
      },
      {
        term: 'Locator actions',
        detail: 'Locators expose actions such as click, fill, check, press, and selectOption.',
        code: "await page.getByLabel('Remember me').check()",
      },
    ],
  },
  {
    id: 'assertions-auto-waiting',
    title: 'Assertions and auto-waiting',
    summary: 'Let Playwright wait for actionable elements and eventually consistent UI state.',
    items: [
      {
        term: 'Web-first assertions',
        detail:
          'Async locator assertions retry until the expectation passes or its timeout is reached.',
        code: "await expect(page.getByText('Saved')).toBeVisible()",
      },
      {
        term: 'Text and value assertions',
        detail: 'Use toHaveText, toContainText, or toHaveValue to verify rendered state.',
        code: "await expect(page.getByLabel('Name')).toHaveValue('Ada')",
      },
      {
        term: 'Page assertions',
        detail: 'Assert navigation outcomes with page matchers such as toHaveURL and toHaveTitle.',
        code: 'await expect(page).toHaveURL(/dashboard/)',
      },
      {
        term: 'Actionability',
        detail:
          'Before an action, Playwright waits for relevant checks such as visibility, stability, and enabled state.',
      },
      {
        term: 'Locator strictness',
        detail:
          'An action that requires one target fails when its locator resolves to multiple elements, exposing ambiguity.',
      },
      {
        term: 'Avoid manual sleeps',
        detail:
          'Prefer locators and web-first assertions over fixed delays, which make tests slower and race-prone.',
        code: "await expect(status).toHaveText('Complete')",
      },
    ],
  },
  {
    id: 'isolation-hooks-fixtures',
    title: 'Isolation, hooks, and fixtures',
    summary: 'Give tests clean state and share setup without coupling scenarios together.',
    items: [
      {
        term: 'Browser contexts',
        detail:
          'Each test receives an isolated browser context with its own cookies, local storage, and session storage.',
      },
      {
        term: 'Independent tests',
        detail:
          'A test should prepare the state it needs instead of relying on another test to run first.',
      },
      {
        term: 'beforeEach',
        detail:
          'Use beforeEach for setup that must run independently before every test in its scope.',
        code: "test.beforeEach(async ({ page }) => {\n  await page.goto('/dashboard')\n})",
      },
      {
        term: 'describe groups',
        detail: 'Use test.describe to group related scenarios and scope hooks or configuration.',
        code: "test.describe('account settings', () => {\n  // tests\n})",
      },
      {
        term: 'Built-in fixtures',
        detail:
          'Fixtures such as page, context, browser, and request are prepared only when a test asks for them.',
      },
      {
        term: 'Custom fixtures',
        detail:
          'Extend the base test to package reusable setup, values, and teardown behind a typed fixture.',
        code: 'const test = base.extend<{ dashboard: DashboardPage }>({\n  // fixture\n})',
      },
    ],
  },
  {
    id: 'configuration-projects',
    title: 'Configuration and projects',
    summary: 'Centralize defaults and exercise the same tests across browsers and environments.',
    items: [
      {
        term: 'defineConfig',
        detail: 'Export defineConfig from playwright.config.ts to configure the test runner.',
        code: "import { defineConfig } from '@playwright/test'\nexport default defineConfig({})",
      },
      {
        term: 'Test discovery',
        detail: 'Set testDir when test files live outside the default tests directory.',
        code: "export default defineConfig({ testDir: './e2e' })",
      },
      {
        term: 'Shared use options',
        detail: 'Put context and page defaults such as baseURL or trace collection under use.',
        code: "use: { baseURL: 'http://127.0.0.1:4173' }",
      },
      {
        term: 'Web server',
        detail:
          'The webServer option can launch a local application and wait for its URL before tests run.',
        code: "webServer: { command: 'pnpm preview', url: 'http://127.0.0.1:4173' }",
      },
      {
        term: 'Projects',
        detail:
          'Projects run tests with named configurations, commonly covering browsers, devices, or environments.',
        code: "projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]",
      },
      {
        term: 'Retries and traces',
        detail:
          'Retries can expose flaky behavior, while traces capture evidence for a configured attempt such as the first retry.',
        code: "retries: 2,\nuse: { trace: 'on-first-retry' }",
      },
    ],
  },
  {
    id: 'running-debugging-reliability',
    title: 'Running, debugging, and reliability',
    summary: 'Run the right scope, inspect failures, and favor stable user-visible behavior.',
    items: [
      {
        term: 'Standard run',
        detail:
          'playwright test runs configured projects headlessly and reports results in the terminal.',
        code: 'pnpm exec playwright test',
      },
      {
        term: 'Focused runs',
        detail: 'Pass a file, line, or --project option to narrow a local run while investigating.',
        code: 'pnpm exec playwright test e2e/login.spec.ts --project=chromium',
      },
      {
        term: 'UI Mode',
        detail:
          'Use --ui for an interactive runner with filters, watch mode, step details, and locator inspection.',
        code: 'pnpm exec playwright test --ui',
      },
      {
        term: 'Inspector',
        detail: 'Use --debug to open the Playwright Inspector and step through test actions.',
        code: 'pnpm exec playwright test --debug',
      },
      {
        term: 'Reports and traces',
        detail:
          'The HTML report summarizes results, while Trace Viewer exposes actions, DOM snapshots, logs, and network activity.',
        code: 'pnpm exec playwright show-report',
      },
      {
        term: 'Resilient intent',
        detail:
          'Test user-visible behavior, keep scenarios isolated, and prefer semantic locators over CSS implementation details.',
      },
    ],
  },
] as const satisfies readonly CheatSheetSection[]
