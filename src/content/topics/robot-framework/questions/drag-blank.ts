import type { DragBlankQuestion } from '../../../types'
import { robotGuideReference } from './shared'

export const dragBlankQuestions = [
  {
    id: 'robot-framework.drag.library-import',
    topicId: 'robot-framework',
    kind: 'drag-blank',
    prompt: 'Complete the Settings section import.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: '*** Settings ***\n',
      after: '    Collections',
    },
    options: [
      { id: 'library', label: 'Library', code: 'Library' },
      { id: 'resource', label: 'Resource', code: 'Resource' },
      { id: 'variables', label: 'Variables', code: 'Variables' },
    ],
    correctOptionId: 'library',
    explanation:
      'Library imports a test library. Resource imports a resource file, and Variables imports a variable file.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.drag.test-tags',
    topicId: 'robot-framework',
    kind: 'drag-blank',
    prompt: 'Add tags to this individual test case.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: 'Valid login\n    ',
      after: '    smoke    critical',
    },
    options: [
      { id: 'tags', label: '[Tags]', code: '[Tags]' },
      { id: 'setup', label: '[Setup]', code: '[Setup]' },
      { id: 'template', label: '[Template]', code: '[Template]' },
    ],
    correctOptionId: 'tags',
    explanation:
      '[Tags] adds metadata to an individual test. Tags can later be used for selection and reporting.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.drag.assertion',
    topicId: 'robot-framework',
    kind: 'drag-blank',
    prompt: 'Choose the BuiltIn assertion that compares these values.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: '',
      after: '    ${actual}    ${expected}',
    },
    options: [
      { id: 'equal', label: 'Should Be Equal', code: 'Should Be Equal' },
      { id: 'log', label: 'Log', code: 'Log' },
      { id: 'set-variable', label: 'Set Variable', code: 'Set Variable' },
    ],
    correctOptionId: 'equal',
    explanation:
      'Should Be Equal fails the test when its two arguments differ. It is provided by the automatically available BuiltIn library.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.drag.include-tag',
    topicId: 'robot-framework',
    kind: 'drag-blank',
    prompt: 'Complete the command so only tests tagged smoke are executed.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: 'robot ',
      after: ' smoke tests/',
    },
    options: [
      { id: 'include', label: '--include', code: '--include' },
      { id: 'exclude', label: '--exclude', code: '--exclude' },
      { id: 'test', label: '--test', code: '--test' },
      { id: 'variable', label: '--variable', code: '--variable' },
    ],
    correctOptionId: 'include',
    explanation:
      '--include selects tests whose tags match the given pattern. Here it limits execution to tests tagged smoke.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.drag.test-template',
    topicId: 'robot-framework',
    kind: 'drag-blank',
    prompt: 'Choose the setting that turns these rows into data-driven test iterations.',
    instruction: 'Drag an option to the blank, or select it directly.',
    template: {
      before: 'Invalid credentials\n    ',
      after: '    Login should fail\n    bad-user    valid-pass\n    valid-user    bad-pass',
    },
    options: [
      { id: 'template', label: '[Template]', code: '[Template]' },
      { id: 'setup', label: '[Setup]', code: '[Setup]' },
      { id: 'tags', label: '[Tags]', code: '[Tags]' },
      { id: 'timeout', label: '[Timeout]', code: '[Timeout]' },
    ],
    correctOptionId: 'template',
    explanation:
      '[Template] names the keyword that each following data row invokes, making repeated input combinations concise.',
    reference: robotGuideReference,
  },
] as const satisfies readonly DragBlankQuestion[]
