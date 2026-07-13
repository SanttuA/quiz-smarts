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
] as const satisfies readonly SequenceQuestion[]
