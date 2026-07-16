import type { SequenceQuestion } from '../../../types'
import {
  testingLibraryAsyncReference,
  testingLibraryReactReference,
  testingLibraryUserEventReference,
  vitestConfigReference,
  vitestCoverageReference,
  vitestHooksReference,
  vitestMockFunctionsReference,
  vitestMockingReference,
  vitestTimersReference,
  vitestWritingTestsReference,
} from './shared'

export const sequenceQuestions = [
  {
    id: 'vitest.sequence-first-unit-test',
    topicId: 'vitest',
    kind: 'sequence',
    prompt: 'Arrange a complete Vitest test for a sum function.',
    instruction: 'Import the APIs, declare the test, assert the result, and close the callback.',
    items: [
      { id: 'vitest-import', code: "import { expect, it } from 'vitest'" },
      { id: 'sum-import', code: "import { sum } from './sum'" },
      { id: 'test', code: "it('adds two numbers', () => {" },
      { id: 'assert', code: '  expect(sum(2, 3)).toBe(5)' },
      { id: 'close', code: '})' },
    ],
    correctOrder: ['vitest-import', 'sum-import', 'test', 'assert', 'close'],
    acceptedOrders: [['sum-import', 'vitest-import', 'test', 'assert', 'close']],
    explanation:
      'The Vitest APIs and production function may be imported in either order. Both imports must precede the test, whose assertion belongs inside the callback.',
    reference: vitestWritingTestsReference,
  },
  {
    id: 'vitest.sequence-render-heading',
    topicId: 'vitest',
    kind: 'sequence',
    prompt: 'Arrange a React component test that verifies its heading.',
    instruction:
      'Import the test tools, declare the test, render Dashboard, assert the heading, and close it.',
    items: [
      {
        id: 'testing-library-import',
        code: "import { render, screen } from '@testing-library/react'",
      },
      { id: 'vitest-import', code: "import { expect, it } from 'vitest'" },
      { id: 'test', code: "it('shows the dashboard heading', () => {" },
      { id: 'render', code: '  render(<Dashboard />)' },
      {
        id: 'assert',
        code: "  expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()",
      },
      { id: 'close', code: '})' },
    ],
    correctOrder: ['testing-library-import', 'vitest-import', 'test', 'render', 'assert', 'close'],
    acceptedOrders: [
      ['vitest-import', 'testing-library-import', 'test', 'render', 'assert', 'close'],
    ],
    explanation:
      'Both imports may appear first in either order; the component must then be rendered before its semantic heading query can be asserted.',
    reference: testingLibraryReactReference,
  },
  {
    id: 'vitest.sequence-counter-interaction',
    topicId: 'vitest',
    kind: 'sequence',
    prompt: 'Arrange the body of a test that increments a Counter through a user click.',
    instruction:
      'Create the user, render the component, locate and click Add, then assert the new count.',
    items: [
      { id: 'user', code: 'const user = userEvent.setup()' },
      { id: 'render', code: 'render(<Counter />)' },
      { id: 'button', code: "const add = screen.getByRole('button', { name: 'Add' })" },
      { id: 'click', code: 'await user.click(add)' },
      { id: 'assert', code: "expect(screen.getByText('Count: 1')).toBeInTheDocument()" },
    ],
    correctOrder: ['user', 'render', 'button', 'click', 'assert'],
    explanation:
      'The session and component must exist before querying the button, and the click must finish before checking the updated rendered count.',
    reference: testingLibraryUserEventReference,
  },
  {
    id: 'vitest.sequence-async-save',
    topicId: 'vitest',
    kind: 'sequence',
    prompt: 'Arrange a component test that waits for an asynchronous save confirmation.',
    instruction: 'Set up the user, render, save, await the status, and verify its message.',
    items: [
      { id: 'user', code: 'const user = userEvent.setup()' },
      { id: 'render', code: 'render(<ProfileForm />)' },
      { id: 'click', code: "await user.click(screen.getByRole('button', { name: 'Save' }))" },
      { id: 'status', code: "const status = await screen.findByRole('status')" },
      { id: 'assert', code: "expect(status).toHaveTextContent('Profile saved')" },
    ],
    correctOrder: ['user', 'render', 'click', 'status', 'assert'],
    explanation:
      'The user initiates the save after rendering, findByRole waits for the asynchronous status, and only then can its message be asserted.',
    reference: testingLibraryAsyncReference,
  },
  {
    id: 'vitest.sequence-before-each-state',
    topicId: 'vitest',
    kind: 'sequence',
    prompt: 'Arrange a suite that clears local storage before each ThemeBanner test.',
    instruction:
      'Open the suite, define and close the hook, then declare, run, and close the test and suite.',
    items: [
      { id: 'describe', code: "describe('ThemeBanner', () => {" },
      { id: 'hook', code: '  beforeEach(() => {' },
      { id: 'clear', code: '    localStorage.clear()' },
      { id: 'hook-close', code: '  })' },
      { id: 'test', code: "  it('uses the default theme', () => {" },
      { id: 'render', code: '    render(<ThemeBanner />)' },
      { id: 'assert', code: "    expect(screen.getByText('Light')).toBeInTheDocument()" },
      { id: 'test-close', code: '  })' },
      { id: 'describe-close', code: '})' },
    ],
    correctOrder: [
      'describe',
      'hook',
      'clear',
      'hook-close',
      'test',
      'render',
      'assert',
      'test-close',
      'describe-close',
    ],
    explanation:
      'The beforeEach hook belongs inside the suite and closes before the test, ensuring storage is cleared before the component is rendered and asserted.',
    reference: vitestHooksReference,
  },
  {
    id: 'vitest.sequence-callback-prop',
    topicId: 'vitest',
    kind: 'sequence',
    prompt: 'Arrange a test that verifies a form calls its onSave prop.',
    instruction:
      'Create the user and mock, render the form, type a name, save, and inspect the call.',
    items: [
      { id: 'user', code: 'const user = userEvent.setup()' },
      { id: 'mock', code: 'const onSave = vi.fn()' },
      { id: 'render', code: 'render(<ProfileForm onSave={onSave} />)' },
      { id: 'type', code: "await user.type(screen.getByLabelText('Name'), 'Ada')" },
      { id: 'click', code: "await user.click(screen.getByRole('button', { name: 'Save' }))" },
      { id: 'assert', code: "expect(onSave).toHaveBeenCalledWith({ name: 'Ada' })" },
    ],
    correctOrder: ['user', 'mock', 'render', 'type', 'click', 'assert'],
    acceptedOrders: [['mock', 'user', 'render', 'type', 'click', 'assert']],
    explanation:
      'The user and mock may be created in either order, but both must be passed into the rendered flow before typing, saving, and asserting the payload.',
    reference: vitestMockFunctionsReference,
  },
  {
    id: 'vitest.sequence-match-media-global',
    topicId: 'vitest',
    kind: 'sequence',
    prompt: 'Arrange a test that stubs and restores window.matchMedia.',
    instruction:
      'Create a matchMedia mock, stub the missing global, render, assert the theme, and restore globals.',
    items: [
      {
        id: 'mock',
        code: "const matchMedia = vi.fn(() => ({\n  matches: true,\n  media: '(prefers-color-scheme: dark)',\n  onchange: null,\n  addListener: vi.fn(),\n  removeListener: vi.fn(),\n  addEventListener: vi.fn(),\n  removeEventListener: vi.fn(),\n  dispatchEvent: vi.fn(),\n}))",
      },
      { id: 'stub', code: "vi.stubGlobal('matchMedia', matchMedia)" },
      { id: 'render', code: 'render(<ThemeBanner />)' },
      { id: 'assert', code: "expect(screen.getByText('Dark')).toBeInTheDocument()" },
      { id: 'restore', code: 'vi.unstubAllGlobals()' },
    ],
    correctOrder: ['mock', 'stub', 'render', 'assert', 'restore'],
    explanation:
      'Fresh jsdom environments do not provide matchMedia. stubGlobal installs the mock on window, and unstubAllGlobals restores the original value or absence afterward.',
    reference: vitestMockingReference,
  },
  {
    id: 'vitest.sequence-fake-timer',
    topicId: 'vitest',
    kind: 'sequence',
    prompt: 'Arrange a deterministic test for a callback scheduled after one second.',
    instruction:
      'Enable fake time, create and schedule the mock, advance time, assert the call, and restore real timers.',
    items: [
      { id: 'fake', code: 'vi.useFakeTimers()' },
      { id: 'mock', code: 'const callback = vi.fn()' },
      { id: 'schedule', code: 'scheduleAfterOneSecond(callback)' },
      { id: 'advance', code: 'vi.advanceTimersByTime(1000)' },
      { id: 'assert', code: 'expect(callback).toHaveBeenCalledOnce()' },
      { id: 'real', code: 'vi.useRealTimers()' },
    ],
    correctOrder: ['fake', 'mock', 'schedule', 'advance', 'assert', 'real'],
    explanation:
      'Fake timers must be enabled before scheduling, advancing one second triggers the callback, and real timers are restored after verification.',
    reference: vitestTimersReference,
  },
  {
    id: 'vitest.sequence-react-config',
    topicId: 'vitest',
    kind: 'sequence',
    prompt: 'Arrange a Vitest configuration for React DOM tests and shared setup.',
    instruction:
      'Import the helper, open the configuration and test object, set both options, and close the objects.',
    items: [
      { id: 'import', code: "import { defineConfig } from 'vitest/config'" },
      { id: 'config', code: 'export default defineConfig({' },
      { id: 'test', code: '  test: {' },
      { id: 'environment', code: "    environment: 'jsdom'," },
      { id: 'setup', code: "    setupFiles: ['./src/test/setup.ts']," },
      { id: 'close', code: '  },\n})' },
    ],
    correctOrder: ['import', 'config', 'test', 'environment', 'setup', 'close'],
    acceptedOrders: [['import', 'config', 'test', 'setup', 'environment', 'close']],
    explanation:
      'The test options belong inside defineConfig, while environment and setupFiles are independent properties and may appear in either order.',
    reference: vitestConfigReference,
  },
  {
    id: 'vitest.sequence-debug-coverage',
    topicId: 'vitest',
    kind: 'sequence',
    prompt:
      'Order a focused workflow for fixing a failing component test before measuring coverage.',
    instruction:
      'Run the failure in isolation, inspect it, fix the cause, verify the focused test, then run the full measured suite.',
    items: [
      { id: 'focus', code: 'pnpm exec vitest run src/ProfileForm.test.tsx' },
      { id: 'inspect', code: 'Inspect the assertion error and rendered DOM output' },
      { id: 'fix', code: 'Correct the component behavior or test expectation' },
      { id: 'verify', code: 'Rerun src/ProfileForm.test.tsx' },
      { id: 'coverage', code: 'pnpm exec vitest run --coverage' },
    ],
    correctOrder: ['focus', 'inspect', 'fix', 'verify', 'coverage'],
    explanation:
      'A focused reproduction gives fast feedback, the corrected test should pass in isolation, and coverage belongs after the full suite is healthy.',
    reference: vitestCoverageReference,
  },
] as const satisfies readonly SequenceQuestion[]
