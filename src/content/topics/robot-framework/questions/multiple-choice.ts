import type { MultipleChoiceQuestion } from '../../../types'
import { robotGuideReference } from './shared'

export const multipleChoiceQuestions = [
  {
    id: 'robot-framework.mcq.token-separation',
    topicId: 'robot-framework',
    kind: 'multiple-choice',
    prompt: 'How are cells normally separated in Robot Framework’s space-separated format?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'one-space', label: 'Exactly one space' },
      { id: 'two-spaces', label: 'Two or more spaces, or one or more tabs' },
      { id: 'comma', label: 'A comma followed by a space' },
      { id: 'semicolon', label: 'A semicolon' },
    ],
    correctChoiceId: 'two-spaces',
    explanation:
      'Robot Framework splits cells on two or more spaces or on tabs. Four spaces are recommended because the separation is easier to see.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.mcq.resource-extension',
    topicId: 'robot-framework',
    kind: 'multiple-choice',
    prompt: 'Which extension is recommended for a dedicated Robot Framework resource file?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'robot', label: '.robot' },
      { id: 'resource', label: '.resource' },
      { id: 'variables', label: '.variables' },
      { id: 'keyword', label: '.keyword' },
    ],
    correctChoiceId: 'resource',
    explanation:
      'Resource files can use .robot, but .resource is the dedicated and recommended extension.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.mcq.keyword-section',
    topicId: 'robot-framework',
    kind: 'multiple-choice',
    prompt: 'What belongs in the *** Keywords *** section?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'test-results', label: 'Generated test results' },
      { id: 'cli-options', label: 'Command-line options' },
      { id: 'user-keywords', label: 'Reusable user keywords built from other keywords' },
      { id: 'python-imports', label: 'Python import statements' },
    ],
    correctChoiceId: 'user-keywords',
    explanation:
      'The Keywords section defines reusable, higher-level user keywords that can combine library keywords and other user keywords.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.mcq.dictionary-expansion',
    topicId: 'robot-framework',
    kind: 'multiple-choice',
    prompt: 'Which syntax expands the dictionary variable config as named arguments?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'scalar', label: '${config}' },
      { id: 'list', label: '@{config}' },
      { id: 'dictionary', label: '&{config}' },
      { id: 'environment', label: '%{config}' },
    ],
    correctChoiceId: 'dictionary',
    explanation:
      '&{config} expands a dictionary into named arguments. ${config} passes the dictionary as one value, while @{config} is list syntax.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.mcq.continuation-marker',
    topicId: 'robot-framework',
    kind: 'multiple-choice',
    prompt: 'Which marker starts a continuation row in Robot Framework data?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'ellipsis', label: '...' },
      { id: 'backslash', label: '\\' },
      { id: 'plus', label: '+' },
      { id: 'arrow', label: '->' },
    ],
    correctChoiceId: 'ellipsis',
    explanation:
      'An ellipsis in the first cell marks a continuation row, allowing a long setting, keyword call, or variable definition to span multiple rows.',
    reference: robotGuideReference,
  },
] as const satisfies readonly MultipleChoiceQuestion[]
