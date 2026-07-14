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
  {
    id: 'robot-framework.text.environment-variable',
    topicId: 'robot-framework',
    kind: 'text-blank',
    prompt: 'Complete the log call with the HOME environment variable.',
    instruction: 'Type the variable, including its sigil and braces.',
    template: {
      before: 'Log    ',
      after: '',
    },
    canonicalAnswer: '%{HOME}',
    acceptedAnswers: ['%{HOME}'],
    explanation:
      'Environment variables use percent-curly syntax. They expose string values from the operating-system environment to Robot Framework data.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.text-current-directory',
    topicId: 'robot-framework',
    kind: 'text-blank',
    prompt: 'Complete this path with the directory containing the current test data file.',
    instruction: 'Type the built-in variable, including its sigil and braces.',
    template: {
      before: 'File Should Exist    ',
      after: '${/}data.json',
    },
    canonicalAnswer: '${CURDIR}',
    acceptedAnswers: ['${CURDIR}'],
    explanation:
      '${CURDIR} is a case-sensitive built-in variable containing the absolute path to the directory where the current test data file is located.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.text.test-documentation',
    topicId: 'robot-framework',
    kind: 'text-blank',
    prompt: 'Add documentation to this individual test case.',
    instruction: 'Include the square brackets.',
    template: {
      before: 'Valid login\n    ',
      after: '    Verifies the happy path',
    },
    canonicalAnswer: '[Documentation]',
    acceptedAnswers: ['[Documentation]'],
    explanation:
      '[Documentation] adds free-form documentation to an individual test case and includes it in generated logs and reports.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.text.output-directory',
    topicId: 'robot-framework',
    kind: 'text-blank',
    prompt: 'Complete the command so generated output files are written under results.',
    instruction: 'Type the missing command-line option.',
    template: {
      before: 'robot ',
      after: ' results tests/',
    },
    canonicalAnswer: '--outputdir',
    acceptedAnswers: ['--outputdir', '-d'],
    explanation:
      '--outputdir, or its short form -d, changes the directory where Robot Framework creates its output files.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.text.rerun-failed',
    topicId: 'robot-framework',
    kind: 'text-blank',
    prompt: 'Complete the command so it selects failures recorded in output.xml for re-execution.',
    instruction: 'Type the missing command-line option.',
    template: {
      before: 'robot ',
      after: ' output.xml tests/',
    },
    canonicalAnswer: '--rerunfailed',
    acceptedAnswers: ['--rerunfailed', '-R'],
    explanation:
      '--rerunfailed, or -R, selects failed tests from a previous output file so they can be executed again.',
    reference: robotGuideReference,
  },
] as const satisfies readonly TextBlankQuestion[]
