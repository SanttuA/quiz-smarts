import type { TextBlankQuestion } from '../../../types'
import { robotGuideReference } from './shared'

export const textBlankQuestions = [
  {
    id: 'robot-framework.text.scalar-variable',
    topicId: 'robot-framework',
    kind: 'text-blank',
    prompt: 'Complete the scalar variable syntax.',
    instruction: 'Type the missing Robot Framework syntax.',
    template: {
      before: 'A scalar variable named BROWSER is written as ',
      after: '.',
    },
    canonicalAnswer: '${BROWSER}',
    acceptedAnswers: ['${BROWSER}'],
    explanation:
      'Scalar variables use dollar-curly syntax. Variable names are case-insensitive, so ${browser} is equivalent here.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.text.keyword-arguments',
    topicId: 'robot-framework',
    kind: 'text-blank',
    prompt: 'Name the setting used to declare arguments for a user keyword.',
    instruction: 'Include the square brackets.',
    template: {
      before: 'Create user\n    ',
      after: '    ${name}    ${role}=viewer',
    },
    canonicalAnswer: '[Arguments]',
    acceptedAnswers: ['[Arguments]'],
    explanation:
      '[Arguments] declares a user keyword’s accepted arguments. Defaults use the same name=value style as normal keyword calls.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.text.cli-command',
    topicId: 'robot-framework',
    kind: 'text-blank',
    prompt: 'Complete the command that runs every suite in the tests directory.',
    instruction: 'Type the missing command.',
    template: {
      before: '',
      after: ' tests/',
    },
    canonicalAnswer: 'robot',
    acceptedAnswers: ['robot', 'python -m robot'],
    explanation:
      'The robot command runs suites and directories. Python installations can also invoke the same runner with python -m robot.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.text.return-statement',
    topicId: 'robot-framework',
    kind: 'text-blank',
    prompt: 'Complete the statement that returns a value from this user keyword.',
    instruction: 'Type the missing Robot Framework syntax.',
    template: {
      before:
        'Build greeting\n    [Arguments]    ${name}\n    ${message}=    Catenate    Hello    ${name}\n    ',
      after: '    ${message}',
    },
    canonicalAnswer: 'RETURN',
    acceptedAnswers: ['RETURN'],
    explanation:
      'The RETURN statement returns values from a user keyword. It can return one value, multiple values, or no value.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.text.test-name-variable',
    topicId: 'robot-framework',
    kind: 'text-blank',
    prompt: 'Complete the keyword call with the automatic variable for the current test name.',
    instruction: 'Type the variable, including its sigil and braces.',
    template: {
      before: 'Log    ',
      after: '',
    },
    canonicalAnswer: '${TEST_NAME}',
    acceptedAnswers: ['${TEST_NAME}', '${TEST NAME}'],
    explanation:
      '${TEST_NAME} contains the current test case name. Robot Framework treats spaces and underscores in variable names equivalently.',
    reference: robotGuideReference,
  },
] as const satisfies readonly TextBlankQuestion[]
