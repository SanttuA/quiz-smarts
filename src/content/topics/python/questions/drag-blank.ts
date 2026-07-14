import type { DragBlankQuestion } from '../../../types'
import {
  pythonClassesReference,
  pythonControlFlowReference,
  pythonDataStructuresReference,
  pythonErrorsReference,
  pythonInputOutputReference,
} from './shared'

export const dragBlankQuestions = [
  {
    id: 'python.drag.list-literal',
    topicId: 'python',
    kind: 'drag-blank',
    prompt: 'Choose the literal for a mutable ordered collection of names.',
    instruction: 'Select the syntax that creates a list.',
    template: { before: 'names = ', after: '' },
    options: [
      { id: 'list', label: '["Ada", "Lin"]', code: '["Ada", "Lin"]' },
      { id: 'tuple', label: '("Ada", "Lin")', code: '("Ada", "Lin")' },
      { id: 'set', label: '{"Ada", "Lin"}', code: '{"Ada", "Lin"}' },
    ],
    correctOptionId: 'list',
    explanation:
      'Square brackets create a list, which is an ordered mutable sequence whose items can be added, removed, or replaced.',
    reference: pythonDataStructuresReference,
  },
  {
    id: 'python.drag.dictionary-get',
    topicId: 'python',
    kind: 'drag-blank',
    prompt: 'Read role without changing user, falling back to "viewer" when the key is absent.',
    instruction: 'Choose the dictionary method that supports a default value.',
    template: { before: 'role = user', after: '("role", "viewer")' },
    options: [
      { id: 'get', label: '.get', code: '.get' },
      { id: 'keys', label: '.keys', code: '.keys' },
      { id: 'pop', label: '.pop', code: '.pop' },
      { id: 'values', label: '.values', code: '.values' },
    ],
    correctOptionId: 'get',
    explanation:
      'dict.get accepts a key and a fallback value, returning the fallback instead of raising KeyError for a missing key.',
    reference: pythonDataStructuresReference,
  },
  {
    id: 'python.drag.membership',
    topicId: 'python',
    kind: 'drag-blank',
    prompt: 'Test whether the tags collection contains "python".',
    instruction: 'Choose the membership operator.',
    template: { before: 'has_python = "python" ', after: ' tags' },
    options: [
      { id: 'in', label: 'in', code: 'in' },
      { id: 'is', label: 'is', code: 'is' },
      { id: 'and', label: 'and', code: 'and' },
      { id: 'from', label: 'from', code: 'from' },
    ],
    correctOptionId: 'in',
    explanation:
      'The in operator performs a membership test and returns whether the value occurs in the target collection.',
    reference: pythonDataStructuresReference,
  },
  {
    id: 'python.drag-if-statement',
    topicId: 'python',
    kind: 'drag-blank',
    prompt: 'Run the indented statement only when ready is truthy.',
    instruction: 'Choose the keyword that starts a conditional statement.',
    template: { before: '', after: ' ready:\n    start()' },
    options: [
      { id: 'if', label: 'if', code: 'if' },
      { id: 'for', label: 'for', code: 'for' },
      { id: 'while', label: 'while', code: 'while' },
      { id: 'with', label: 'with', code: 'with' },
    ],
    correctOptionId: 'if',
    explanation:
      'An if statement evaluates its condition and executes the indented suite only when that condition is truthy.',
    reference: pythonControlFlowReference,
  },
  {
    id: 'python.drag-continue-loop',
    topicId: 'python',
    kind: 'drag-blank',
    prompt: 'Skip None values and continue processing the remaining values.',
    instruction: 'Choose the loop-control statement.',
    template: {
      before: 'for value in values:\n    if value is None:\n        ',
      after: '\n    process(value)',
    },
    options: [
      { id: 'continue', label: 'continue', code: 'continue' },
      { id: 'break', label: 'break', code: 'break' },
      { id: 'return', label: 'return', code: 'return' },
      { id: 'pass', label: 'pass', code: 'pass' },
    ],
    correctOptionId: 'continue',
    explanation:
      'continue ends the current iteration immediately, so process is skipped for None and the loop advances to its next value.',
    reference: pythonControlFlowReference,
  },
  {
    id: 'python.drag-positional-arguments',
    topicId: 'python',
    kind: 'drag-blank',
    prompt: 'Collect any number of positional arguments in values.',
    instruction: 'Choose the parameter syntax for extra positional arguments.',
    template: { before: 'def collect(', after: '):\n    return list(values)' },
    options: [
      { id: 'args', label: '*values', code: '*values' },
      { id: 'kwargs', label: '**values', code: '**values' },
      { id: 'plain', label: 'values', code: 'values' },
      { id: 'list', label: '[values]', code: '[values]' },
    ],
    correctOptionId: 'args',
    explanation:
      'A parameter prefixed with one asterisk collects extra positional arguments into a tuple bound to that parameter name.',
    reference: pythonControlFlowReference,
  },
  {
    id: 'python.drag-comprehension-filter',
    topicId: 'python',
    kind: 'drag-blank',
    prompt: 'Keep only positive numbers in this list comprehension.',
    instruction: 'Choose the keyword that introduces the filter condition.',
    template: { before: 'positive = [number for number in numbers ', after: ' number > 0]' },
    options: [
      { id: 'if', label: 'if', code: 'if' },
      { id: 'while', label: 'while', code: 'while' },
      { id: 'and', label: 'and', code: 'and' },
      { id: 'when', label: 'when', code: 'when' },
    ],
    correctOptionId: 'if',
    explanation:
      'An if clause at the end of a list comprehension filters the iterable before the leading expression contributes values.',
    reference: pythonDataStructuresReference,
  },
  {
    id: 'python.drag-raise-error',
    topicId: 'python',
    kind: 'drag-blank',
    prompt: 'Signal that a negative amount is invalid.',
    instruction: 'Choose the statement that explicitly triggers an exception.',
    template: {
      before: 'if amount < 0:\n    ',
      after: ' ValueError("amount must be non-negative")',
    },
    options: [
      { id: 'raise', label: 'raise', code: 'raise' },
      { id: 'except', label: 'except', code: 'except' },
      { id: 'return', label: 'return', code: 'return' },
      { id: 'assert', label: 'assert', code: 'assert' },
    ],
    correctOptionId: 'raise',
    explanation:
      'raise explicitly triggers the supplied exception, allowing the function to reject an invalid value with a specific error.',
    reference: pythonErrorsReference,
  },
  {
    id: 'python.drag-context-manager',
    topicId: 'python',
    kind: 'drag-blank',
    prompt: 'Open the file through a context manager so it is reliably closed.',
    instruction: 'Choose the statement that manages entry and cleanup.',
    template: {
      before: '',
      after: ' open("notes.txt", encoding="utf-8") as file:\n    text = file.read()',
    },
    options: [
      { id: 'with', label: 'with', code: 'with' },
      { id: 'while', label: 'while', code: 'while' },
      { id: 'try', label: 'try', code: 'try' },
      { id: 'from', label: 'from', code: 'from' },
    ],
    correctOptionId: 'with',
    explanation:
      'The with statement uses the file as a context manager and closes it when control leaves the indented suite, including on errors.',
    reference: pythonInputOutputReference,
  },
  {
    id: 'python.drag-class-inheritance',
    topicId: 'python',
    kind: 'drag-blank',
    prompt: 'Declare Admin as a subclass of User.',
    instruction: 'Choose the base class placed in the class header.',
    template: { before: 'class Admin(', after: '):\n    pass' },
    options: [
      { id: 'user', label: 'User', code: 'User' },
      { id: 'self', label: 'self', code: 'self' },
      { id: 'init', label: '__init__', code: '__init__' },
      { id: 'quoted', label: '"User"', code: '"User"' },
    ],
    correctOptionId: 'user',
    explanation:
      'Listing User in parentheses after the new class name makes User a base class whose behavior Admin inherits.',
    reference: pythonClassesReference,
  },
] as const satisfies readonly DragBlankQuestion[]
