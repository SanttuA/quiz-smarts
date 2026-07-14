import type { MultipleChoiceQuestion } from '../../../types'
import {
  pythonClassesReference,
  pythonControlFlowReference,
  pythonDataStructuresReference,
  pythonErrorsReference,
  pythonModulesReference,
} from './shared'

export const multipleChoiceQuestions = [
  {
    id: 'python.mcq.block-structure',
    topicId: 'python',
    kind: 'multiple-choice',
    prompt: 'What defines the statements belonging to this if block?',
    instruction: 'Choose the Python syntax rule that forms the block.',
    choices: [
      { id: 'braces', label: 'Curly braces around the statements' },
      { id: 'indentation', label: 'Consistent indentation after the colon' },
      { id: 'end', label: 'An end keyword after the statements' },
      { id: 'parentheses', label: 'Parentheses around the statements' },
    ],
    correctChoiceId: 'indentation',
    explanation:
      'Python groups a compound statement’s suite by indentation. The colon introduces the suite, and its statements share a consistent indentation level.',
    reference: pythonControlFlowReference,
  },
  {
    id: 'python.mcq.single-item-tuple',
    topicId: 'python',
    kind: 'multiple-choice',
    prompt: 'Which expression creates a tuple containing only the string "python"?',
    instruction: 'Choose the expression with one tuple element.',
    choices: [
      { id: 'parenthesized', label: '("python")', code: '("python")' },
      { id: 'comma', label: '("python",)', code: '("python",)' },
      { id: 'list', label: '["python"]', code: '["python"]' },
      { id: 'set', label: '{"python"}', code: '{"python"}' },
    ],
    correctChoiceId: 'comma',
    explanation:
      'The trailing comma creates a one-item tuple. Parentheses without the comma only group the string expression.',
    reference: pythonDataStructuresReference,
  },
  {
    id: 'python.mcq.dictionary-membership',
    topicId: 'python',
    kind: 'multiple-choice',
    prompt: 'What does "name" in user test when user is a dictionary?',
    instruction: 'Choose what dictionary membership examines.',
    choices: [
      { id: 'keys', label: 'Whether "name" is a key' },
      { id: 'values', label: 'Whether "name" is a value' },
      { id: 'pairs', label: 'Whether "name" is a key-value pair' },
      { id: 'position', label: 'Whether "name" is a valid numeric position' },
    ],
    correctChoiceId: 'keys',
    explanation:
      'Membership testing a dictionary directly examines its keys. Use user.values() when membership among values is intended.',
    reference: pythonDataStructuresReference,
  },
  {
    id: 'python.mcq.range-stop',
    topicId: 'python',
    kind: 'multiple-choice',
    prompt: 'Which values are produced by range(1, 6, 2)?',
    instruction: 'Choose the complete sequence of generated integers.',
    choices: [
      { id: 'one-three-five', label: '1, 3, 5', code: '1, 3, 5' },
      { id: 'one-three-five-six', label: '1, 3, 5, 6', code: '1, 3, 5, 6' },
      { id: 'one-two-three-four-five', label: '1, 2, 3, 4, 5', code: '1, 2, 3, 4, 5' },
      { id: 'two-four-six', label: '2, 4, 6', code: '2, 4, 6' },
    ],
    correctChoiceId: 'one-three-five',
    explanation:
      'range starts at 1, advances by 2, and excludes the stop value 6, so it produces 1, 3, and 5.',
    reference: pythonControlFlowReference,
  },
  {
    id: 'python.mcq.list-comprehension',
    topicId: 'python',
    kind: 'multiple-choice',
    prompt: 'What does [number * 2 for number in [1, 2, 3] if number > 1] produce?',
    instruction: 'Evaluate the filter and expression.',
    choices: [
      { id: 'two-four-six', label: '[2, 4, 6]', code: '[2, 4, 6]' },
      { id: 'four-six', label: '[4, 6]', code: '[4, 6]' },
      { id: 'two-three', label: '[2, 3]', code: '[2, 3]' },
      { id: 'one-four-nine', label: '[1, 4, 9]', code: '[1, 4, 9]' },
    ],
    correctChoiceId: 'four-six',
    explanation:
      'The filter keeps 2 and 3, then the leading expression doubles each retained number to build [4, 6].',
    reference: pythonDataStructuresReference,
  },
  {
    id: 'python.mcq.keyword-arguments',
    topicId: 'python',
    kind: 'multiple-choice',
    prompt: 'What is the benefit of calling greet(greeting="Hi", name="Ada") with keywords?',
    instruction: 'Choose the property of keyword arguments shown here.',
    choices: [
      { id: 'order', label: 'The arguments are matched by parameter name instead of position' },
      { id: 'global', label: 'The arguments become global variables' },
      { id: 'strings', label: 'The arguments are automatically converted to strings' },
      { id: 'optional', label: 'The function call may omit every required parameter' },
    ],
    correctChoiceId: 'order',
    explanation:
      'Keyword arguments explicitly associate values with parameter names, making their meaning clear and allowing a different order from the parameter list.',
    reference: pythonControlFlowReference,
  },
  {
    id: 'python.mcq.continue-effect',
    topicId: 'python',
    kind: 'multiple-choice',
    prompt: 'What does continue do inside a Python loop?',
    instruction: 'Choose how loop execution changes.',
    choices: [
      { id: 'next', label: 'Skips the rest of this iteration and starts the next one' },
      { id: 'exit', label: 'Exits the nearest loop completely' },
      { id: 'return', label: 'Returns a value from the enclosing function' },
      { id: 'restart', label: 'Restarts the loop from its first item' },
    ],
    correctChoiceId: 'next',
    explanation:
      'continue skips the remaining statements in the current iteration and proceeds with the next iteration of the nearest loop.',
    reference: pythonControlFlowReference,
  },
  {
    id: 'python.mcq.try-else',
    topicId: 'python',
    kind: 'multiple-choice',
    prompt: 'When does an else clause attached to try execute?',
    instruction: 'Choose the condition that enters the else suite.',
    choices: [
      { id: 'success', label: 'When the try suite finishes without raising an exception' },
      { id: 'handled', label: 'Only after an except clause handles an exception' },
      { id: 'always', label: 'Always, immediately before finally' },
      { id: 'return', label: 'Only when the try suite executes a return statement' },
    ],
    correctChoiceId: 'success',
    explanation:
      'The else suite runs only when the try suite completes without an exception. It keeps success-path work separate from protected operations.',
    reference: pythonErrorsReference,
  },
  {
    id: 'python.mcq.module-access',
    topicId: 'python',
    kind: 'multiple-choice',
    prompt: 'After import math, how do you call the square-root function?',
    instruction: 'Choose the expression using the imported module namespace.',
    choices: [
      { id: 'qualified', label: 'math.sqrt(9)', code: 'math.sqrt(9)' },
      { id: 'direct', label: 'sqrt(9)', code: 'sqrt(9)' },
      { id: 'imported', label: 'import.sqrt(9)', code: 'import.sqrt(9)' },
      { id: 'string', label: 'math["sqrt"](9)', code: 'math["sqrt"](9)' },
    ],
    correctChoiceId: 'qualified',
    explanation:
      'A plain import binds the module name math. Its functions are accessed as attributes, so sqrt is called as math.sqrt(9).',
    reference: pythonModulesReference,
  },
  {
    id: 'python.mcq.init-purpose',
    topicId: 'python',
    kind: 'multiple-choice',
    prompt: 'What is the usual role of __init__ in a Python class?',
    instruction: 'Choose what this special method does for an instance.',
    choices: [
      { id: 'initialize', label: 'Initializes instance state after an instance is created' },
      { id: 'import', label: 'Imports the class into another module' },
      { id: 'destroy', label: 'Destroys the instance when it leaves scope' },
      { id: 'inherit', label: 'Selects the class from which inheritance begins' },
    ],
    correctChoiceId: 'initialize',
    explanation:
      'Python calls __init__ on a newly created instance so the class can establish attributes and other initial state.',
    reference: pythonClassesReference,
  },
] as const satisfies readonly MultipleChoiceQuestion[]
