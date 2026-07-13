import type { SequenceQuestion } from '../../../types'
import { robotGuideReference } from './shared'

export const sequenceQuestions = [
  {
    id: 'robot-framework.sequence.basic-test',
    topicId: 'robot-framework',
    kind: 'sequence',
    prompt: 'Arrange this small test case from top to bottom.',
    instruction: 'Drag rows, or use the Move up and Move down buttons.',
    items: [
      { id: 'section', code: '*** Test Cases ***' },
      { id: 'name', code: 'Greeting is correct' },
      { id: 'assign', code: '    ${message}=    Set Variable    Hello' },
      { id: 'assert', code: '    Should Be Equal    ${message}    Hello' },
    ],
    correctOrder: ['section', 'name', 'assign', 'assert'],
    explanation:
      'The Test Cases header comes first, followed by an unindented test name and its indented keyword calls in execution order.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.sequence.for-loop',
    topicId: 'robot-framework',
    kind: 'sequence',
    prompt: 'Put the FOR loop lines in executable order.',
    instruction: 'Drag rows, or use the Move up and Move down buttons.',
    items: [
      { id: 'for', code: 'FOR    ${item}    IN    @{ITEMS}' },
      { id: 'body', code: '    Log    ${item}' },
      { id: 'end', code: 'END' },
    ],
    correctOrder: ['for', 'body', 'end'],
    explanation:
      'A native FOR block starts with FOR, contains an indented body, and closes with END.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.sequence.if-else',
    topicId: 'robot-framework',
    kind: 'sequence',
    prompt: 'Put the IF / ELSE block lines in executable order.',
    instruction: 'Drag rows, or use the Move up and Move down buttons.',
    items: [
      { id: 'if', code: 'IF    ${is_admin}' },
      { id: 'if-body', code: '    Log    Admin access' },
      { id: 'else', code: 'ELSE' },
      { id: 'else-body', code: '    Log    Standard access' },
      { id: 'end', code: 'END' },
    ],
    correctOrder: ['if', 'if-body', 'else', 'else-body', 'end'],
    explanation:
      'The IF body runs first when the condition is true. ELSE introduces the alternative body, and END closes the whole structure.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.sequence.try-except',
    topicId: 'robot-framework',
    kind: 'sequence',
    prompt: 'Put the TRY / EXCEPT block lines in executable order.',
    instruction: 'Drag rows, or use the Move up and Move down buttons.',
    items: [
      { id: 'try', code: 'TRY' },
      { id: 'try-body', code: '    Process response' },
      { id: 'except', code: 'EXCEPT    Invalid response' },
      { id: 'except-body', code: '    Log    Response was invalid' },
      { id: 'end', code: 'END' },
    ],
    correctOrder: ['try', 'try-body', 'except', 'except-body', 'end'],
    explanation:
      'TRY starts the protected body, EXCEPT introduces the matching error handler, and END closes the structure.',
    reference: robotGuideReference,
  },
  {
    id: 'robot-framework.sequence.test-lifecycle',
    topicId: 'robot-framework',
    kind: 'sequence',
    prompt: 'Arrange this test setup, body, and teardown in conventional source order.',
    instruction: 'Drag rows, or use the Move up and Move down buttons.',
    items: [
      { id: 'setup', code: '    [Setup]    Open application' },
      { id: 'body', code: '    Dashboard should be visible' },
      { id: 'teardown', code: '    [Teardown]    Close application' },
    ],
    correctOrder: ['setup', 'body', 'teardown'],
    explanation:
      'A test setup prepares the test before its body runs. The teardown performs cleanup afterward and runs even when the test fails.',
    reference: robotGuideReference,
  },
] as const satisfies readonly SequenceQuestion[]
