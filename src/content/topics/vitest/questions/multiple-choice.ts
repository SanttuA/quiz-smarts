import type { MultipleChoiceQuestion } from '../../../types'
import {
  testingLibraryAsyncReference,
  testingLibraryJestDomReference,
  testingLibraryQueriesReference,
  testingLibraryUserEventReference,
  vitestCoverageReference,
  vitestEnvironmentReference,
  vitestMockFunctionsReference,
  vitestWritingTestsReference,
} from './shared'

export const multipleChoiceQuestions = [
  {
    id: 'vitest.mcq.test-file-discovery',
    topicId: 'vitest',
    kind: 'multiple-choice',
    prompt: 'Which file name does Vitest discover as a test file by default?',
    instruction: 'Choose a conventional Vitest test file name.',
    choices: [
      { id: 'test', label: 'Counter.test.tsx', code: 'Counter.test.tsx' },
      { id: 'story', label: 'Counter.story.tsx', code: 'Counter.story.tsx' },
      { id: 'fixture', label: 'Counter.fixture.tsx', code: 'Counter.fixture.tsx' },
      { id: 'example', label: 'Counter.example.tsx', code: 'Counter.example.tsx' },
    ],
    correctChoiceId: 'test',
    explanation:
      'Vitest includes common .test and .spec naming patterns by default, so Counter.test.tsx is discovered without a custom include rule.',
    reference: vitestWritingTestsReference,
  },
  {
    id: 'vitest.mcq.describe-purpose',
    topicId: 'vitest',
    kind: 'multiple-choice',
    prompt: 'What is describe primarily used for in a Vitest file?',
    instruction: 'Choose the organizational purpose of describe.',
    choices: [
      { id: 'group', label: 'Group related tests and scope their hooks' },
      { id: 'render', label: 'Render a React component into jsdom' },
      { id: 'assert', label: 'Compare an actual value with an expected value' },
      { id: 'coverage', label: 'Generate a code coverage report' },
    ],
    correctChoiceId: 'group',
    explanation:
      'describe creates a suite that organizes related tests and provides a scope for lifecycle hooks such as beforeEach and afterEach.',
    reference: vitestWritingTestsReference,
  },
  {
    id: 'vitest.mcq.semantic-button-query',
    topicId: 'vitest',
    kind: 'multiple-choice',
    prompt: 'Which query best finds a visible Save button the way a user identifies it?',
    instruction: 'Choose the preferred semantic Testing Library query.',
    choices: [
      {
        id: 'role',
        label: "screen.getByRole('button', { name: 'Save' })",
        code: "screen.getByRole('button', { name: 'Save' })",
      },
      {
        id: 'class',
        label: "document.querySelector('.blue')",
        code: "document.querySelector('.blue')",
      },
      { id: 'tag', label: "screen.getByText('<button>')", code: "screen.getByText('<button>')" },
      {
        id: 'position',
        label: "document.querySelectorAll('button')[2]",
        code: "document.querySelectorAll('button')[2]",
      },
    ],
    correctChoiceId: 'role',
    explanation:
      'A role query with the accessible button name follows the user-facing contract and avoids styling or document-position details.',
    reference: testingLibraryQueriesReference,
  },
  {
    id: 'vitest.mcq.find-by-async',
    topicId: 'vitest',
    kind: 'multiple-choice',
    prompt: 'Which query should await a status element that appears after a request finishes?',
    instruction: 'Choose the query variant that retries asynchronously.',
    choices: [
      {
        id: 'find',
        label: "await screen.findByRole('status')",
        code: "await screen.findByRole('status')",
      },
      { id: 'get', label: "screen.getByRole('status')", code: "screen.getByRole('status')" },
      { id: 'query', label: "screen.queryByRole('status')", code: "screen.queryByRole('status')" },
      {
        id: 'dom',
        label: "document.querySelector('[role=status]')",
        code: "document.querySelector('[role=status]')",
      },
    ],
    correctChoiceId: 'find',
    explanation:
      'findBy queries return a promise and retry until the element appears or the timeout expires, which fits asynchronously rendered UI.',
    reference: testingLibraryAsyncReference,
  },
  {
    id: 'vitest.mcq.await-user-event',
    topicId: 'vitest',
    kind: 'multiple-choice',
    prompt: 'Why should a test await user.click(saveButton)?',
    instruction: 'Choose the reason user-event interactions are awaited.',
    choices: [
      {
        id: 'async',
        label: 'The interaction dispatches asynchronous event steps before it completes',
      },
      { id: 'sleep', label: 'Every click waits a fixed five seconds' },
      { id: 'coverage', label: 'Awaiting enables code coverage collection' },
      { id: 'snapshot', label: 'Awaiting automatically updates snapshots' },
    ],
    correctChoiceId: 'async',
    explanation:
      'user-event models a sequence of browser interactions and returns a promise, so awaiting it lets those events and React updates complete.',
    reference: testingLibraryUserEventReference,
  },
  {
    id: 'vitest.mcq.dom-visibility-matcher',
    topicId: 'vitest',
    kind: 'multiple-choice',
    prompt: 'Which matcher clearly asserts that a rendered dialog is visible?',
    instruction: 'Choose the jest-dom matcher for user-visible presence.',
    choices: [
      { id: 'visible', label: 'toBeVisible()', code: 'expect(dialog).toBeVisible()' },
      { id: 'truthy', label: 'toBeTruthy()', code: 'expect(dialog).toBeTruthy()' },
      { id: 'defined', label: 'toBeDefined()', code: 'expect(dialog).toBeDefined()' },
      { id: 'equal', label: 'toEqual(true)', code: 'expect(dialog).toEqual(true)' },
    ],
    correctChoiceId: 'visible',
    explanation:
      'toBeVisible is a DOM-specific matcher that communicates the intended user-observable state instead of merely checking that an object exists.',
    reference: testingLibraryJestDomReference,
  },
  {
    id: 'vitest.mcq.mock-callback',
    topicId: 'vitest',
    kind: 'multiple-choice',
    prompt:
      'What should a test pass as an onSave prop when it needs to inspect how the callback was called?',
    instruction: 'Choose the Vitest test double that records calls.',
    choices: [
      { id: 'fn', label: 'vi.fn()', code: 'const onSave = vi.fn()' },
      { id: 'mock', label: 'vi.mock()', code: 'const onSave = vi.mock()' },
      { id: 'expect', label: 'expect()', code: 'const onSave = expect()' },
      { id: 'describe', label: 'describe()', code: 'const onSave = describe()' },
    ],
    correctChoiceId: 'fn',
    explanation:
      'vi.fn creates a callable mock whose call count and arguments can be asserted after the component invokes the prop.',
    reference: vitestMockFunctionsReference,
  },
  {
    id: 'vitest.mcq.spy-existing-method',
    topicId: 'vitest',
    kind: 'multiple-choice',
    prompt: 'Which API observes calls to the existing window.matchMedia method?',
    instruction: 'Choose the API that spies on an object method.',
    choices: [
      {
        id: 'spy',
        label: "vi.spyOn(window, 'matchMedia')",
        code: "vi.spyOn(window, 'matchMedia')",
      },
      { id: 'fn', label: "vi.fn(window, 'matchMedia')", code: "vi.fn(window, 'matchMedia')" },
      { id: 'mock', label: "vi.mock(window, 'matchMedia')", code: "vi.mock(window, 'matchMedia')" },
      {
        id: 'stub',
        label: "expect.stub(window, 'matchMedia')",
        code: "expect.stub(window, 'matchMedia')",
      },
    ],
    correctChoiceId: 'spy',
    explanation:
      'vi.spyOn wraps a named method on an existing object so the test can track calls, replace its implementation, and restore it later.',
    reference: vitestMockFunctionsReference,
  },
  {
    id: 'vitest.mcq.react-environment',
    topicId: 'vitest',
    kind: 'multiple-choice',
    prompt: 'Which Vitest environment commonly supplies document and window for React DOM tests?',
    instruction: 'Choose the browser-like environment used by component tests.',
    choices: [
      { id: 'jsdom', label: 'jsdom' },
      { id: 'node', label: 'node' },
      { id: 'coverage', label: 'v8' },
      { id: 'typescript', label: 'typescript' },
    ],
    correctChoiceId: 'jsdom',
    explanation:
      'jsdom emulates browser APIs such as document and window inside Node, allowing React Testing Library to render DOM components.',
    reference: vitestEnvironmentReference,
  },
  {
    id: 'vitest.mcq.coverage-command',
    topicId: 'vitest',
    kind: 'multiple-choice',
    prompt: 'Which command runs the suite once and collects configured coverage?',
    instruction: 'Choose the Vitest run-mode command with coverage enabled.',
    choices: [
      { id: 'coverage', label: 'vitest run --coverage', code: 'vitest run --coverage' },
      { id: 'watch', label: 'vitest --watch-only', code: 'vitest --watch-only' },
      { id: 'build', label: 'vite build --tests', code: 'vite build --tests' },
      { id: 'typecheck', label: 'tsc --coverage', code: 'tsc --coverage' },
    ],
    correctChoiceId: 'coverage',
    explanation:
      'vitest run performs one non-interactive pass, and --coverage enables the configured provider and reporters for that run.',
    reference: vitestCoverageReference,
  },
] as const satisfies readonly MultipleChoiceQuestion[]
