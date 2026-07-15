import type { MultipleChoiceQuestion } from '../../../types'
import {
  playwrightAssertionsReference,
  playwrightAutoWaitingReference,
  playwrightConfigurationReference,
  playwrightFixturesReference,
  playwrightLocatorsReference,
  playwrightProjectsReference,
  playwrightWritingTestsReference,
} from './shared'

export const multipleChoiceQuestions = [
  {
    id: 'playwright.mcq.page-fixture',
    topicId: 'playwright',
    kind: 'multiple-choice',
    prompt: 'What does the built-in page fixture provide to a Playwright test?',
    instruction: 'Choose the object used for browser-page interactions.',
    choices: [
      { id: 'tab', label: 'A browser tab in an isolated browser context' },
      { id: 'server', label: 'A production web server deployed for the test' },
      { id: 'database', label: 'A fresh application database' },
      { id: 'report', label: 'A completed HTML test report' },
    ],
    correctChoiceId: 'tab',
    explanation:
      'The page fixture is a Page object representing a browser tab, and its browser context is isolated for the current test.',
    reference: playwrightWritingTestsReference,
  },
  {
    id: 'playwright.mcq.await-navigation',
    topicId: 'playwright',
    kind: 'multiple-choice',
    prompt: 'How should a test navigate to the dashboard before interacting with it?',
    instruction: 'Choose the correctly awaited Playwright call.',
    choices: [
      { id: 'goto', label: "await page.goto('/dashboard')", code: "await page.goto('/dashboard')" },
      { id: 'visit', label: "page.visit('/dashboard')", code: "page.visit('/dashboard')" },
      {
        id: 'open',
        label: "await browser.open('/dashboard')",
        code: "await browser.open('/dashboard')",
      },
      { id: 'url', label: "page.url = '/dashboard'", code: "page.url = '/dashboard'" },
    ],
    correctChoiceId: 'goto',
    explanation:
      'page.goto navigates the page, returns a promise, and should be awaited before the test continues with the loaded document.',
    reference: playwrightWritingTestsReference,
  },
  {
    id: 'playwright.mcq.resilient-locator',
    topicId: 'playwright',
    kind: 'multiple-choice',
    prompt: 'Which locator best targets a visible Save button through its user-facing contract?',
    instruction: 'Choose the preferred semantic locator.',
    choices: [
      {
        id: 'role',
        label: "page.getByRole('button', { name: 'Save' })",
        code: "page.getByRole('button', { name: 'Save' })",
      },
      { id: 'class', label: "page.locator('.blue-btn')", code: "page.locator('.blue-btn')" },
      { id: 'nth', label: "page.locator('button').nth(3)", code: "page.locator('button').nth(3)" },
      {
        id: 'xpath',
        label: "page.locator('//div/button[4]')",
        code: "page.locator('//div/button[4]')",
      },
    ],
    correctChoiceId: 'role',
    explanation:
      'A role locator with the accessible button name mirrors how users identify the control and avoids styling or position details.',
    reference: playwrightLocatorsReference,
  },
  {
    id: 'playwright.mcq.form-fill',
    topicId: 'playwright',
    kind: 'multiple-choice',
    prompt: 'Which locator action replaces the current contents of a text field?',
    instruction: 'Choose the common form-entry action.',
    choices: [
      { id: 'fill', label: 'fill()', code: "await field.fill('Ada')" },
      { id: 'check', label: 'check()', code: 'await field.check()' },
      { id: 'hover', label: 'hover()', code: 'await field.hover()' },
      { id: 'select', label: 'selectOption()', code: "await field.selectOption('Ada')" },
    ],
    correctChoiceId: 'fill',
    explanation:
      'locator.fill sets the value of an editable text control after Playwright waits for the required actionability checks.',
    reference: playwrightLocatorsReference,
  },
  {
    id: 'playwright.mcq.web-first-assertion',
    topicId: 'playwright',
    kind: 'multiple-choice',
    prompt: 'Why is await expect(status).toHaveText("Saved") resilient to a short UI update?',
    instruction: 'Choose the behavior of a web-first assertion.',
    choices: [
      { id: 'retry', label: 'It retries the locator assertion until it passes or times out' },
      { id: 'sleep', label: 'It always sleeps for a fixed five seconds first' },
      { id: 'mock', label: 'It replaces the application response with "Saved"' },
      { id: 'single', label: 'It reads the text exactly once without waiting' },
    ],
    correctChoiceId: 'retry',
    explanation:
      'Async locator assertions poll the current UI until the expected state appears or the configured assertion timeout expires.',
    reference: playwrightAssertionsReference,
  },
  {
    id: 'playwright.mcq.click-actionability',
    topicId: 'playwright',
    kind: 'multiple-choice',
    prompt: 'What does Playwright check automatically before locator.click()?',
    instruction: 'Choose the relevant actionability behavior.',
    choices: [
      {
        id: 'actionable',
        label: 'The unique target is visible, stable, enabled, and receives events',
      },
      { id: 'screenshot', label: 'A matching screenshot already exists on disk' },
      { id: 'network', label: 'Every network request in the browser has permanently stopped' },
      { id: 'database', label: 'The application database contains no records' },
    ],
    correctChoiceId: 'actionable',
    explanation:
      'Click waits for a unique element that is visible, stable, able to receive events, and enabled before performing the action.',
    reference: playwrightAutoWaitingReference,
  },
  {
    id: 'playwright.mcq.test-isolation',
    topicId: 'playwright',
    kind: 'multiple-choice',
    prompt: 'What gives each Playwright test isolated cookies and local storage by default?',
    instruction: 'Choose the browser-level isolation boundary.',
    choices: [
      { id: 'context', label: 'A fresh BrowserContext' },
      { id: 'locator', label: 'A fresh Locator' },
      { id: 'reporter', label: 'A fresh Reporter' },
      { id: 'config', label: 'A fresh configuration file' },
    ],
    correctChoiceId: 'context',
    explanation:
      'Each test uses an isolated BrowserContext, which behaves like a clean browser profile without sharing session state.',
    reference: playwrightFixturesReference,
  },
  {
    id: 'playwright.mcq.before-each',
    topicId: 'playwright',
    kind: 'multiple-choice',
    prompt: 'Which hook should navigate to the same starting page independently before every test?',
    instruction: 'Choose the per-test setup hook.',
    choices: [
      { id: 'before-each', label: 'test.beforeEach()' },
      { id: 'before-all', label: 'test.beforeAll()' },
      { id: 'after-each', label: 'test.afterEach()' },
      { id: 'describe', label: 'test.describe()' },
    ],
    correctChoiceId: 'before-each',
    explanation:
      'test.beforeEach runs once before every test in its scope, preserving independent setup for each isolated page.',
    reference: playwrightWritingTestsReference,
  },
  {
    id: 'playwright.mcq.projects-purpose',
    topicId: 'playwright',
    kind: 'multiple-choice',
    prompt: 'What is a primary use of Playwright projects?',
    instruction: 'Choose the configuration capability projects provide.',
    choices: [
      {
        id: 'configurations',
        label: 'Run tests under named browser, device, or environment configurations',
      },
      { id: 'implementation', label: 'Bundle application source code for production' },
      { id: 'database', label: 'Create database migrations before every assertion' },
      { id: 'types', label: 'Replace TypeScript with generated JavaScript types' },
    ],
    correctChoiceId: 'configurations',
    explanation:
      'Projects define named test configurations so the same suite can cover different browsers, devices, or environments.',
    reference: playwrightProjectsReference,
  },
  {
    id: 'playwright.mcq.trace-first-retry',
    topicId: 'playwright',
    kind: 'multiple-choice',
    prompt: "What does use: { trace: 'on-first-retry' } configure?",
    instruction: 'Choose when trace evidence is recorded.',
    choices: [
      { id: 'first-retry', label: 'Record a trace when a test makes its first retry' },
      { id: 'every-action', label: 'Retry every browser action once' },
      { id: 'first-test', label: 'Trace only the first test discovered in the suite' },
      { id: 'disabled', label: 'Disable both traces and retries' },
    ],
    correctChoiceId: 'first-retry',
    explanation:
      'The on-first-retry mode captures a trace for the first retry, providing diagnostic evidence without tracing every passing run.',
    reference: playwrightConfigurationReference,
  },
] as const satisfies readonly MultipleChoiceQuestion[]
