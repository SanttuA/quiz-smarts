import type { SequenceQuestion } from '../../../types'
import {
  pythonClassesReference,
  pythonControlFlowReference,
  pythonDataStructuresReference,
  pythonErrorsReference,
  pythonInputOutputReference,
  pythonModulesReference,
} from './shared'

export const sequenceQuestions = [
  {
    id: 'python.sequence.conditional-chain',
    topicId: 'python',
    kind: 'sequence',
    prompt: 'Arrange the complete grade-selection program from top to bottom.',
    instruction: 'Put the assignment, conditional branches, and output in executable order.',
    items: [
      { id: 'score', code: 'score = 85' },
      { id: 'if', code: 'if score >= 90:' },
      { id: 'grade-a', code: '    grade = "A"' },
      { id: 'elif', code: 'elif score >= 80:' },
      { id: 'grade-b', code: '    grade = "B"' },
      { id: 'else', code: 'else:' },
      { id: 'grade-c', code: '    grade = "C"' },
      { id: 'print', code: 'print(grade)' },
    ],
    correctOrder: ['score', 'if', 'grade-a', 'elif', 'grade-b', 'else', 'grade-c', 'print'],
    explanation:
      'The input is defined first, each branch immediately follows its header, and grade is printed after the conditional has assigned it.',
    reference: pythonControlFlowReference,
  },
  {
    id: 'python.sequence.running-total',
    topicId: 'python',
    kind: 'sequence',
    prompt: 'Arrange the program that calculates and prints a running total.',
    instruction: 'Define the data and accumulator before the loop, then print the finished total.',
    items: [
      { id: 'numbers', code: 'numbers = [2, 4, 6]' },
      { id: 'total', code: 'total = 0' },
      { id: 'for', code: 'for number in numbers:' },
      { id: 'add', code: '    total += number' },
      { id: 'print', code: 'print(total)' },
    ],
    correctOrder: ['numbers', 'total', 'for', 'add', 'print'],
    acceptedOrders: [['total', 'numbers', 'for', 'add', 'print']],
    explanation:
      'The iterable and accumulator may be defined in either order before the loop. The update belongs inside the loop, and output follows accumulation.',
    reference: pythonControlFlowReference,
  },
  {
    id: 'python.sequence.function-call',
    topicId: 'python',
    kind: 'sequence',
    prompt: 'Arrange the function definition and the code that uses its result.',
    instruction: 'Complete the function before calling it, then display the returned value.',
    items: [
      { id: 'def', code: 'def greet(name):' },
      { id: 'message', code: '    message = f"Hello, {name}"' },
      { id: 'return', code: '    return message' },
      { id: 'call', code: 'result = greet("Ada")' },
      { id: 'print', code: 'print(result)' },
    ],
    correctOrder: ['def', 'message', 'return', 'call', 'print'],
    explanation:
      'The function body builds and returns the message; only after the definition can the caller store and print its result.',
    reference: pythonControlFlowReference,
  },
  {
    id: 'python.sequence.comprehension',
    topicId: 'python',
    kind: 'sequence',
    prompt: 'Arrange the program that builds and displays squares of positive numbers.',
    instruction: 'Define the source, derive the filtered list, and then display it.',
    items: [
      { id: 'numbers', code: 'numbers = [-2, 1, 3]' },
      { id: 'squares', code: 'squares = [number**2 for number in numbers if number > 0]' },
      { id: 'print', code: 'print(squares)' },
    ],
    correctOrder: ['numbers', 'squares', 'print'],
    explanation:
      'The source list must exist before the comprehension derives squares, and the resulting list is printed only after assignment.',
    reference: pythonDataStructuresReference,
  },
  {
    id: 'python.sequence.exception-handler',
    topicId: 'python',
    kind: 'sequence',
    prompt: 'Arrange the program that parses text and falls back to zero.',
    instruction:
      'Define the input, put risky work in try, follow it with its handler, and print the result.',
    items: [
      { id: 'raw', code: 'raw = "42"' },
      { id: 'try', code: 'try:' },
      { id: 'parse', code: '    count = int(raw)' },
      { id: 'except', code: 'except ValueError:' },
      { id: 'fallback', code: '    count = 0' },
      { id: 'print', code: 'print(count)' },
    ],
    correctOrder: ['raw', 'try', 'parse', 'except', 'fallback', 'print'],
    explanation:
      'The input precedes the try statement, the except clause directly follows its try suite, and both paths assign count before output.',
    reference: pythonErrorsReference,
  },
  {
    id: 'python.sequence.write-file',
    topicId: 'python',
    kind: 'sequence',
    prompt: 'Arrange the program that writes a file and then reports success.',
    instruction:
      'Define the path, manage the open file, write inside the context, and report afterward.',
    items: [
      { id: 'path', code: 'path = "notes.txt"' },
      { id: 'with', code: 'with open(path, "w", encoding="utf-8") as file:' },
      { id: 'write', code: '    file.write("Remember Python")' },
      { id: 'print', code: 'print("saved")' },
    ],
    correctOrder: ['path', 'with', 'write', 'print'],
    explanation:
      'The path is defined before opening, writing occurs while the context is active, and success is reported after the file is closed.',
    reference: pythonInputOutputReference,
  },
  {
    id: 'python.sequence.class-instance',
    topicId: 'python',
    kind: 'sequence',
    prompt: 'Arrange the class, its initializer, and the code that reads an instance attribute.',
    instruction: 'Define initialization before constructing and using the instance.',
    items: [
      { id: 'class', code: 'class User:' },
      { id: 'init', code: '    def __init__(self, name):' },
      { id: 'attribute', code: '        self.name = name' },
      { id: 'instance', code: 'user = User("Ada")' },
      { id: 'print', code: 'print(user.name)' },
    ],
    correctOrder: ['class', 'init', 'attribute', 'instance', 'print'],
    explanation:
      'The initializer belongs inside the class and assigns the attribute before an instance can be constructed and its name displayed.',
    reference: pythonClassesReference,
  },
  {
    id: 'python.sequence.module-calculation',
    topicId: 'python',
    kind: 'sequence',
    prompt: 'Arrange this module-based circle-area calculation.',
    instruction:
      'Import math and define the radius before the calculation, then display the final result.',
    items: [
      { id: 'import', code: 'import math' },
      { id: 'radius', code: 'radius = 3' },
      { id: 'area', code: 'area = math.pi * radius**2' },
      { id: 'print', code: 'print(area)' },
    ],
    correctOrder: ['import', 'radius', 'area', 'print'],
    acceptedOrders: [['radius', 'import', 'area', 'print']],
    explanation:
      'The module and radius may be prepared in either order before the expression uses them, and area must exist before it is printed.',
    reference: pythonModulesReference,
  },
  {
    id: 'python.sequence.main-guard',
    topicId: 'python',
    kind: 'sequence',
    prompt: 'Arrange a main function and the guard that calls it only during direct execution.',
    instruction: 'Define the function first, then place its call inside the standard module guard.',
    items: [
      { id: 'def', code: 'def main():' },
      { id: 'body', code: '    print("Ready")' },
      { id: 'guard', code: 'if __name__ == "__main__":' },
      { id: 'call', code: '    main()' },
    ],
    correctOrder: ['def', 'body', 'guard', 'call'],
    explanation:
      'main must be defined before the guard calls it, and the indented call executes only when __name__ is "__main__".',
    reference: pythonModulesReference,
  },
  {
    id: 'python.sequence.validation-function',
    topicId: 'python',
    kind: 'sequence',
    prompt:
      'Arrange the function that rejects non-positive values and otherwise returns its input.',
    instruction: 'Place validation before the successful return, then call the completed function.',
    items: [
      { id: 'def', code: 'def require_positive(value):' },
      { id: 'if', code: '    if value <= 0:' },
      { id: 'raise', code: '        raise ValueError("value must be positive")' },
      { id: 'return', code: '    return value' },
      { id: 'call', code: 'print(require_positive(3))' },
    ],
    correctOrder: ['def', 'if', 'raise', 'return', 'call'],
    explanation:
      'The guard raises before the success path can return, and the function is fully defined before the example call executes.',
    reference: pythonErrorsReference,
  },
] as const satisfies readonly SequenceQuestion[]
