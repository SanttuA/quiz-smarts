import type { TextBlankQuestion } from '../../../types'
import {
  pythonControlFlowReference,
  pythonDataStructuresReference,
  pythonErrorsReference,
  pythonIntroductionReference,
  pythonModulesReference,
} from './shared'

export const textBlankQuestions = [
  {
    id: 'python.text.floor-division',
    topicId: 'python',
    kind: 'text-blank',
    prompt: 'Complete the expression that floor-divides 7 by 2.',
    instruction: 'Type the missing Python operator.',
    template: { before: 'result = 7 ', after: ' 2' },
    canonicalAnswer: '//',
    acceptedAnswers: ['//'],
    explanation:
      'The // operator performs floor division, producing the greatest integer less than or equal to the exact quotient.',
    reference: pythonIntroductionReference,
  },
  {
    id: 'python.text-length',
    topicId: 'python',
    kind: 'text-blank',
    prompt: 'Complete the expression that counts the items in names.',
    instruction: 'Type the missing built-in function name.',
    template: { before: 'count = ', after: '(names)' },
    canonicalAnswer: 'len',
    acceptedAnswers: ['len'],
    explanation:
      'The built-in len function returns the number of items in a sequence or collection such as a list.',
    reference: pythonDataStructuresReference,
  },
  {
    id: 'python.text-slice',
    topicId: 'python',
    kind: 'text-blank',
    prompt: 'Complete the slice that selects indexes 1, 2, and 3.',
    instruction: 'Type the missing slice bounds.',
    template: { before: 'selected = items[', after: ']' },
    canonicalAnswer: '1:4',
    acceptedAnswers: ['1:4', '1 : 4'],
    explanation:
      'A slice includes its start index and excludes its stop index, so 1:4 selects indexes 1 through 3.',
    reference: pythonIntroductionReference,
  },
  {
    id: 'python.text-list-append',
    topicId: 'python',
    kind: 'text-blank',
    prompt: 'Complete the method call that adds "Ada" to the end of names.',
    instruction: 'Type the missing list method name.',
    template: { before: 'names.', after: '("Ada")' },
    canonicalAnswer: 'append',
    acceptedAnswers: ['append'],
    explanation:
      'list.append adds one item to the end of an existing list and mutates that list in place.',
    reference: pythonDataStructuresReference,
  },
  {
    id: 'python.text-elif',
    topicId: 'python',
    kind: 'text-blank',
    prompt: 'Complete the second conditional branch.',
    instruction: 'Type the missing Python keyword.',
    template: {
      before: 'if score >= 90:\n    grade = "A"\n',
      after: ' score >= 80:\n    grade = "B"',
    },
    canonicalAnswer: 'elif',
    acceptedAnswers: ['elif'],
    explanation:
      'elif introduces another condition that Python checks only when the preceding if or elif conditions were false.',
    reference: pythonControlFlowReference,
  },
  {
    id: 'python.text-range',
    topicId: 'python',
    kind: 'text-blank',
    prompt: 'Complete the loop that visits the integers 0, 1, and 2.',
    instruction: 'Type the missing built-in function name.',
    template: { before: 'for index in ', after: '(3):\n    print(index)' },
    canonicalAnswer: 'range',
    acceptedAnswers: ['range'],
    explanation:
      'range(3) produces integers starting at zero and stopping before three, giving the loop 0, 1, and 2.',
    reference: pythonControlFlowReference,
  },
  {
    id: 'python.text-function-definition',
    topicId: 'python',
    kind: 'text-blank',
    prompt: 'Complete the function definition.',
    instruction: 'Type the missing Python keyword.',
    template: { before: '', after: ' double(value):\n    return value * 2' },
    canonicalAnswer: 'def',
    acceptedAnswers: ['def'],
    explanation:
      'The def keyword starts a function definition, followed by its name, parameter list, colon, and indented body.',
    reference: pythonControlFlowReference,
  },
  {
    id: 'python.text-return-value',
    topicId: 'python',
    kind: 'text-blank',
    prompt: 'Complete the statement that sends the result back to the caller.',
    instruction: 'Type the missing Python keyword.',
    template: { before: 'def double(value):\n    ', after: ' value * 2' },
    canonicalAnswer: 'return',
    acceptedAnswers: ['return'],
    explanation:
      'return ends the current function call and supplies the following expression as the call’s result.',
    reference: pythonControlFlowReference,
  },
  {
    id: 'python.text-except',
    topicId: 'python',
    kind: 'text-blank',
    prompt: 'Complete the handler for invalid integer text.',
    instruction: 'Type the missing Python keyword.',
    template: {
      before: 'try:\n    count = int(raw)\n',
      after: ' ValueError:\n    count = 0',
    },
    canonicalAnswer: 'except',
    acceptedAnswers: ['except'],
    explanation:
      'An except clause catches a matching exception raised by the try suite; here it handles ValueError from int.',
    reference: pythonErrorsReference,
  },
  {
    id: 'python.text-module-name',
    topicId: 'python',
    kind: 'text-blank',
    prompt:
      'Complete the standard guard for code that should run only when this file is executed directly.',
    instruction: 'Type the missing module attribute name.',
    template: { before: 'if ', after: ' == "__main__":\n    main()' },
    canonicalAnswer: '__name__',
    acceptedAnswers: ['__name__'],
    explanation:
      'Python sets the module attribute __name__ to "__main__" when the module is run as the top-level program.',
    reference: pythonModulesReference,
  },
] as const satisfies readonly TextBlankQuestion[]
