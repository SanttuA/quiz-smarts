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
  {
    id: 'robot-framework.mcq.comments-section',
    topicId: 'robot-framework',
    kind: 'multiple-choice',
    prompt: 'How does Robot Framework handle data in a *** Comments *** section?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'logged', label: 'It writes the data to the execution log' },
      { id: 'ignored', label: 'It ignores the data' },
      { id: 'metadata', label: 'It adds the data as suite metadata' },
      { id: 'documentation', label: 'It appends the data to suite documentation' },
    ],
    correctChoiceId: 'ignored',
    explanation:
      'The Comments section is ignored by Robot Framework. Use documentation, metadata, or logging when information must appear in generated outputs.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.mcq.rest-extension',
    topicId: 'robot-framework',
    kind: 'multiple-choice',
    prompt:
      'Which reStructuredText file extension is parsed by default when executing a directory?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'robot-rst', label: '.robot.rst' },
      { id: 'rst', label: '.rst' },
      { id: 'rest', label: '.rest' },
      { id: 'robot-rest', label: '.robot.rest' },
    ],
    correctChoiceId: 'robot-rst',
    explanation:
      'Robot Framework parses .robot.rst files by default. Plain .rst and .rest files require explicit parser configuration.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.mcq.suite-init-file',
    topicId: 'robot-framework',
    kind: 'multiple-choice',
    prompt: 'What is the typical name of a suite initialization file for a directory?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'suite', label: 'suite.robot' },
      { id: 'setup', label: 'setup.robot' },
      { id: 'init', label: '__init__.robot' },
      { id: 'resource', label: '__init__.resource' },
    ],
    correctChoiceId: 'init',
    explanation:
      'Directory-suite settings belong in an initialization file named __init__ with a supported extension, typically __init__.robot.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.mcq.continue-semantics',
    topicId: 'robot-framework',
    kind: 'multiple-choice',
    prompt: 'What does CONTINUE do inside a Robot Framework loop?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'next-iteration', label: 'Stops the current iteration and starts the next one' },
      { id: 'exit-loop', label: 'Exits the entire loop immediately' },
      { id: 'restart-loop', label: 'Restarts the loop from its first item' },
      { id: 'return-keyword', label: 'Returns from the enclosing user keyword' },
    ],
    correctChoiceId: 'next-iteration',
    explanation:
      'CONTINUE skips the rest of the current FOR or WHILE iteration. BREAK is the statement that exits the whole loop.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.mcq.dry-run',
    topicId: 'robot-framework',
    kind: 'multiple-choice',
    prompt: 'What is the main purpose of running Robot Framework with --dryrun?',
    instruction: 'Choose one answer.',
    choices: [
      { id: 'validate', label: 'Validate test data without executing library keywords' },
      { id: 'quiet', label: 'Execute tests without creating logs or reports' },
      { id: 'failed', label: 'Execute only tests that failed previously' },
      { id: 'random', label: 'Randomize suite and test execution order' },
    ],
    correctChoiceId: 'validate',
    explanation:
      'Dry-run mode processes the test data but does not execute keywords originating from test libraries, making it useful for syntax validation.',
    reference: robotGuideReference,
  },
] as const satisfies readonly MultipleChoiceQuestion[]
