import type { CheatSheetSection } from '../../types'

export const vitestCheatSheet = [
  {
    id: 'setup-structure',
    title: 'Setup and test structure',
    summary:
      'Run Vitest through project scripts and organize small tests around observable behavior.',
    items: [
      {
        term: 'Install Vitest',
        detail: 'Add Vitest as a development dependency in the project that owns the tests.',
        code: 'pnpm add -D vitest',
      },
      {
        term: 'Test files',
        detail:
          'Vitest discovers common .test and .spec file names by default, including TypeScript and JSX variants.',
        code: 'Counter.test.tsx',
      },
      {
        term: 'Test APIs',
        detail: 'Import test or it to declare behavior and expect to verify the result.',
        code: "import { expect, it } from 'vitest'",
      },
      {
        term: 'Individual tests',
        detail:
          'Give each test a behavior-focused name and keep its arrange, act, and assert flow readable.',
        code: "it('adds one', () => {\n  expect(1 + 1).toBe(2)\n})",
      },
      {
        term: 'Describe groups',
        detail:
          'Use describe to group related behavior and scope hooks without making tests depend on each other.',
        code: "describe('Counter', () => {\n  // tests\n})",
      },
      {
        term: 'Watch and run modes',
        detail:
          'Use the default command while developing and vitest run for a single non-interactive pass.',
        code: 'pnpm exec vitest\npnpm exec vitest run',
      },
    ],
  },
  {
    id: 'rendering-queries',
    title: 'Rendering and semantic queries',
    summary: 'Render components into a test DOM and find elements through user-facing semantics.',
    items: [
      {
        term: 'Render a component',
        detail: 'React Testing Library render mounts a React element into the test document.',
        code: 'render(<Counter />)',
      },
      {
        term: 'screen',
        detail:
          'screen exposes queries bound to the document body and keeps tests focused on rendered output.',
        code: "screen.getByRole('heading')",
      },
      {
        term: 'Role queries',
        detail:
          'Prefer getByRole with an accessible name for controls and landmarks users can identify.',
        code: "screen.getByRole('button', { name: 'Save' })",
      },
      {
        term: 'Label queries',
        detail:
          'Use getByLabelText for form controls associated with a visible or accessible label.',
        code: "screen.getByLabelText('Email')",
      },
      {
        term: 'Query variants',
        detail:
          'getBy expects an element now, queryBy checks possible absence, and findBy awaits an element that appears later.',
        code: "screen.queryByRole('alert')\nawait screen.findByRole('status')",
      },
      {
        term: 'Test IDs as fallback',
        detail:
          'Use getByTestId only when semantic text, role, label, or other user-facing attributes cannot express the target.',
        code: "screen.getByTestId('save-state')",
      },
    ],
  },
  {
    id: 'interactions-async',
    title: 'Interactions and asynchronous UI',
    summary: 'Drive components through realistic user actions and await observable updates.',
    items: [
      {
        term: 'User session',
        detail: 'Create a user-event session before rendering and interacting with the component.',
        code: 'const user = userEvent.setup()',
      },
      {
        term: 'Await interactions',
        detail:
          'user-event methods are asynchronous, so await clicks, typing, selection, and keyboard input.',
        code: "await user.click(screen.getByRole('button', { name: 'Add' }))",
      },
      {
        term: 'Typing',
        detail:
          'Use user.type to enter text through the same sequence of input events a user produces.',
        code: "await user.type(screen.getByLabelText('Name'), 'Ada')",
      },
      {
        term: 'Async tests',
        detail:
          'Mark a test callback async and await the promises that must settle before the test completes.',
        code: "it('loads a profile', async () => {\n  // awaited work\n})",
      },
      {
        term: 'findBy queries',
        detail:
          'Use findBy when a successful interaction causes an element to appear asynchronously.',
        code: "expect(await screen.findByRole('status')).toHaveTextContent('Saved')",
      },
      {
        term: 'waitFor',
        detail:
          'Use waitFor when a callback assertion must be retried until an asynchronous condition passes.',
        code: 'await waitFor(() => expect(save).toHaveBeenCalled())',
      },
    ],
  },
  {
    id: 'assertions-lifecycle',
    title: 'Assertions, lifecycle, and isolation',
    summary: 'Assert visible behavior and reset shared state so every test remains independent.',
    items: [
      {
        term: 'Core assertions',
        detail:
          'Wrap the received value with expect and choose a matcher that states the intended result.',
        code: 'expect(total).toBe(3)',
      },
      {
        term: 'DOM matchers',
        detail:
          'jest-dom adds readable matchers for presence, visibility, accessible state, text, and form values.',
        code: "expect(button).toBeEnabled()\nexpect(status).toHaveTextContent('Saved')",
      },
      {
        term: 'Absence checks',
        detail:
          'Combine queryBy with .not when the expected result is that an element is not in the document.',
        code: "expect(screen.queryByRole('alert')).not.toBeInTheDocument()",
      },
      {
        term: 'Per-test setup',
        detail: 'beforeEach prepares fresh state before every test in its scope.',
        code: 'beforeEach(() => localStorage.clear())',
      },
      {
        term: 'Per-test cleanup',
        detail:
          'afterEach releases or restores state created by a test, including mocks and fake timers.',
        code: 'afterEach(() => vi.restoreAllMocks())',
      },
      {
        term: 'Independent tests',
        detail:
          'Each test should arrange the state it needs instead of relying on another test to run first.',
      },
    ],
  },
  {
    id: 'mocks-timers',
    title: 'Mocks, spies, and timers',
    summary:
      'Replace boundaries deliberately, observe calls, and keep test-controlled time deterministic.',
    items: [
      {
        term: 'Mock functions',
        detail:
          'vi.fn creates a callable test double that records arguments, results, and invocation counts.',
        code: 'const onSave = vi.fn()',
      },
      {
        term: 'Controlled results',
        detail:
          'Configure a mock return or implementation to drive the component through a chosen branch.',
        code: "const load = vi.fn().mockResolvedValue({ name: 'Ada' })",
      },
      {
        term: 'Spies',
        detail: 'vi.spyOn observes or replaces an existing object method and can later restore it.',
        code: "const spy = vi.spyOn(storage, 'getItem')",
      },
      {
        term: 'Module mocks',
        detail:
          'vi.mock replaces module exports for the test file and is hoisted so the mock is registered before imports execute.',
        code: "vi.mock(import('./api'), () => ({ loadUser: vi.fn() }))",
      },
      {
        term: 'Restore state',
        detail:
          'Restore mocks between tests so replaced implementations do not leak into later scenarios.',
        code: 'afterEach(() => vi.restoreAllMocks())',
      },
      {
        term: 'Fake timers',
        detail:
          'Use fake timers to advance scheduled work without waiting for real time, then return to real timers.',
        code: 'vi.useFakeTimers()\nvi.advanceTimersByTime(1000)\nvi.useRealTimers()',
      },
    ],
  },
  {
    id: 'configuration-coverage',
    title: 'Configuration, execution, and coverage',
    summary:
      'Configure a browser-like environment, share setup, and run focused or measured test passes.',
    items: [
      {
        term: 'Vitest configuration',
        detail: 'Use defineConfig from vitest/config to type the test options in vitest.config.ts.',
        code: "import { defineConfig } from 'vitest/config'",
      },
      {
        term: 'jsdom environment',
        detail:
          'React DOM component tests need a browser-like document, commonly supplied by jsdom.',
        code: "test: { environment: 'jsdom' }",
      },
      {
        term: 'Setup files',
        detail:
          'setupFiles run before test files and can install matchers or consistent cleanup behavior.',
        code: "test: { setupFiles: ['./src/test/setup.ts'] }",
      },
      {
        term: 'Vitest DOM matchers',
        detail:
          'Import the Vitest entrypoint once in setup to extend expect with jest-dom matchers.',
        code: "import '@testing-library/jest-dom/vitest'",
      },
      {
        term: 'Focused runs',
        detail:
          'Pass a file path or name filter while investigating, and avoid committing .only markers.',
        code: 'pnpm exec vitest run src/Counter.test.tsx',
      },
      {
        term: 'Coverage',
        detail:
          'Run with --coverage to measure executed statements, branches, functions, and lines; interpret gaps instead of chasing a number alone.',
        code: 'pnpm exec vitest run --coverage',
      },
    ],
  },
] as const satisfies readonly CheatSheetSection[]
