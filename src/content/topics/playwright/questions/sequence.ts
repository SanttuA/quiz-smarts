import type { SequenceQuestion } from '../../../types'
import {
  playwrightBestPracticesReference,
  playwrightConfigurationReference,
  playwrightFixturesReference,
  playwrightLocatorsReference,
  playwrightProjectsReference,
  playwrightRunningTestsReference,
  playwrightTraceViewerReference,
  playwrightWritingTestsReference,
} from './shared'

export const sequenceQuestions = [
  {
    id: 'playwright.sequence.first-test',
    topicId: 'playwright',
    kind: 'sequence',
    prompt: 'Arrange a complete Playwright test that verifies the dashboard heading.',
    instruction:
      'Import the APIs, declare the test, navigate, assert the heading, and close the test.',
    items: [
      { id: 'import', code: "import { test, expect } from '@playwright/test'" },
      { id: 'test', code: "test('shows dashboard', async ({ page }) => {" },
      { id: 'goto', code: "  await page.goto('/dashboard')" },
      {
        id: 'assert',
        code: "  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()",
      },
      { id: 'close', code: '})' },
    ],
    correctOrder: ['import', 'test', 'goto', 'assert', 'close'],
    explanation:
      'The APIs must be imported before the test declaration, and navigation must complete before the heading is asserted inside the callback.',
    reference: playwrightWritingTestsReference,
  },
  {
    id: 'playwright.sequence.login-flow',
    topicId: 'playwright',
    kind: 'sequence',
    prompt: 'Arrange a login flow that enters credentials and verifies navigation.',
    instruction:
      'Open login, fill email then password, submit the form, and assert the resulting URL.',
    items: [
      { id: 'goto', code: "await page.goto('/login')" },
      { id: 'email', code: "await page.getByLabel('Email').fill('ada@example.com')" },
      { id: 'password', code: "await page.getByLabel('Password').fill('secret')" },
      { id: 'submit', code: "await page.getByRole('button', { name: 'Sign in' }).click()" },
      { id: 'url', code: "await expect(page).toHaveURL('/dashboard')" },
    ],
    correctOrder: ['goto', 'email', 'password', 'submit', 'url'],
    explanation:
      'The page must load before its labeled fields are filled, the credentials precede submission, and the URL is checked after the action.',
    reference: playwrightLocatorsReference,
  },
  {
    id: 'playwright.sequence.filtered-product',
    topicId: 'playwright',
    kind: 'sequence',
    prompt: 'Arrange a test flow that adds Product 2 and verifies the cart status.',
    instruction:
      'Load the products, narrow the matching row, act within it, and assert the updated status.',
    items: [
      { id: 'goto', code: "await page.goto('/products')" },
      {
        id: 'product',
        code: "const product = page.getByRole('listitem').filter({ hasText: 'Product 2' })",
      },
      { id: 'add', code: "await product.getByRole('button', { name: 'Add' }).click()" },
      { id: 'assert', code: "await expect(page.getByTestId('cart-status')).toHaveText('1 item')" },
    ],
    correctOrder: ['goto', 'product', 'add', 'assert'],
    explanation:
      'Navigation exposes the list, the filtered locator identifies the correct row, and its action must occur before checking the cart state.',
    reference: playwrightLocatorsReference,
  },
  {
    id: 'playwright.sequence.describe-hook',
    topicId: 'playwright',
    kind: 'sequence',
    prompt: 'Arrange a grouped test with setup that runs before each scenario.',
    instruction:
      'Open the group, define its beforeEach hook, then declare the assertion test and close the group.',
    items: [
      { id: 'describe', code: "test.describe('settings', () => {" },
      { id: 'hook', code: '  test.beforeEach(async ({ page }) => {' },
      { id: 'goto', code: "    await page.goto('/settings')" },
      { id: 'hook-close', code: '  })' },
      { id: 'test', code: "  test('shows profile form', async ({ page }) => {" },
      {
        id: 'assert',
        code: "    await expect(page.getByRole('form', { name: 'Profile' })).toBeVisible()",
      },
      { id: 'test-close', code: '  })' },
      { id: 'describe-close', code: '})' },
    ],
    correctOrder: [
      'describe',
      'hook',
      'goto',
      'hook-close',
      'test',
      'assert',
      'test-close',
      'describe-close',
    ],
    explanation:
      'Both the hook and test belong inside the describe group, while their browser steps remain inside their respective async callbacks.',
    reference: playwrightWritingTestsReference,
  },
  {
    id: 'playwright.sequence.custom-fixture',
    topicId: 'playwright',
    kind: 'sequence',
    prompt: 'Arrange a typed dashboard fixture and a test that requests it.',
    instruction:
      'Import and extend the base test, construct and provide the fixture, then consume it in a test.',
    items: [
      { id: 'import', code: "import { test as base } from '@playwright/test'" },
      { id: 'type', code: 'type Fixtures = { dashboard: DashboardPage }' },
      { id: 'extend', code: 'const test = base.extend<Fixtures>({' },
      { id: 'fixture', code: '  dashboard: async ({ page }, use) => {' },
      { id: 'construct', code: '    const dashboard = new DashboardPage(page)' },
      { id: 'provide', code: '    await use(dashboard)' },
      { id: 'fixture-close', code: '  },\n})' },
      { id: 'consume', code: "test('opens dashboard', async ({ dashboard }) => dashboard.open())" },
    ],
    correctOrder: [
      'import',
      'type',
      'extend',
      'fixture',
      'construct',
      'provide',
      'fixture-close',
      'consume',
    ],
    explanation:
      'The fixture type and extended test must exist before setup constructs and provides dashboard, which the final test can then request.',
    reference: playwrightFixturesReference,
  },
  {
    id: 'playwright.sequence.base-url-config',
    topicId: 'playwright',
    kind: 'sequence',
    prompt: 'Arrange a Playwright configuration with a shared base URL.',
    instruction:
      'Import the helper, open the configuration and use block, assign baseURL, then close both objects.',
    items: [
      { id: 'import', code: "import { defineConfig } from '@playwright/test'" },
      { id: 'config', code: 'export default defineConfig({' },
      { id: 'use', code: '  use: {' },
      { id: 'base-url', code: "    baseURL: 'http://127.0.0.1:4173'," },
      { id: 'use-close', code: '  },' },
      { id: 'config-close', code: '})' },
    ],
    correctOrder: ['import', 'config', 'use', 'base-url', 'use-close', 'config-close'],
    explanation:
      'defineConfig must be imported before use, and baseURL belongs inside the use object nested within the exported configuration.',
    reference: playwrightConfigurationReference,
  },
  {
    id: 'playwright.sequence-browser-projects',
    topicId: 'playwright',
    kind: 'sequence',
    prompt: 'Arrange a configuration that runs Chromium before Firefox.',
    instruction:
      'Import helpers, open the configuration and projects array, add both named projects, then close it.',
    items: [
      { id: 'import', code: "import { defineConfig, devices } from '@playwright/test'" },
      { id: 'config', code: 'export default defineConfig({' },
      { id: 'projects', code: '  projects: [' },
      {
        id: 'chromium',
        code: "    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },",
      },
      {
        id: 'firefox',
        code: "    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },",
      },
      { id: 'close', code: '  ],\n})' },
    ],
    correctOrder: ['import', 'config', 'projects', 'chromium', 'firefox', 'close'],
    explanation:
      'The projects array belongs inside defineConfig and contains the requested Chromium entry before the Firefox entry.',
    reference: playwrightProjectsReference,
  },
  {
    id: 'playwright.sequence-ui-debugging',
    topicId: 'playwright',
    kind: 'sequence',
    prompt: 'Order a focused UI Mode debugging session.',
    instruction:
      'Start UI Mode, select a failing test, inspect its steps, fix the cause, and rerun it.',
    items: [
      { id: 'start', code: 'pnpm exec playwright test --ui' },
      { id: 'select', code: 'Select the failing test' },
      { id: 'inspect', code: 'Inspect its actions, errors, and DOM snapshots' },
      { id: 'fix', code: 'Correct the failing behavior or test expectation' },
      { id: 'rerun', code: 'Rerun the selected test' },
    ],
    correctOrder: ['start', 'select', 'inspect', 'fix', 'rerun'],
    explanation:
      'UI Mode must be running before selecting and inspecting a failure, and the identified cause should be corrected before rerunning the test.',
    reference: playwrightRunningTestsReference,
  },
  {
    id: 'playwright.sequence-first-retry-trace',
    topicId: 'playwright',
    kind: 'sequence',
    prompt: 'Order the workflow for diagnosing a trace recorded on first retry.',
    instruction:
      'Configure tracing, run the test, let the first retry be captured, then open and inspect its trace.',
    items: [
      { id: 'configure', code: "Configure use: { trace: 'on-first-retry' }" },
      { id: 'run', code: 'Run the Playwright test suite' },
      { id: 'failure', code: 'A test fails its initial attempt' },
      { id: 'retry', code: 'The first retry records trace data' },
      { id: 'report', code: 'Open the failed test in the HTML report' },
      { id: 'inspect', code: 'Inspect the recorded actions and DOM snapshots' },
    ],
    correctOrder: ['configure', 'run', 'failure', 'retry', 'report', 'inspect'],
    explanation:
      'Tracing must be configured before execution, and a failed first attempt triggers the traced retry that can then be opened from the report.',
    reference: playwrightTraceViewerReference,
  },
  {
    id: 'playwright.sequence-resilient-assertion',
    topicId: 'playwright',
    kind: 'sequence',
    prompt: 'Arrange a resilient save flow without a fixed timeout.',
    instruction:
      'Navigate, locate and fill the form, save it, then wait for user-visible confirmation.',
    items: [
      { id: 'goto', code: "await page.goto('/profile')" },
      { id: 'fill', code: "await page.getByLabel('Display name').fill('Ada')" },
      { id: 'save', code: "await page.getByRole('button', { name: 'Save' }).click()" },
      { id: 'assert', code: "await expect(page.getByText('Profile saved')).toBeVisible()" },
    ],
    correctOrder: ['goto', 'fill', 'save', 'assert'],
    explanation:
      'Semantic locators follow the user flow, and the final web-first assertion waits for confirmation without an arbitrary sleep.',
    reference: playwrightBestPracticesReference,
  },
] as const satisfies readonly SequenceQuestion[]
