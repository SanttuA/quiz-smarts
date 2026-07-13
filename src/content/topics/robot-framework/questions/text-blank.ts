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
] as const satisfies readonly TextBlankQuestion[]
