import type { MultipleChoiceQuestion } from '../../../types'
import {
  cppExpressionsReference,
  cppFunctionsReference,
  cppInitializationReference,
  cppIostreamReference,
  cppMainFunctionReference,
  cppScopeReference,
  cppStatementsReference,
  cppVectorReference,
} from './shared'

export const multipleChoiceQuestions = [
  {
    id: 'cpp-basics.mcq.entry-point',
    topicId: 'cpp-basics',
    kind: 'multiple-choice',
    prompt: 'Which definition provides the usual entry point for a small hosted C++ program?',
    instruction: 'Choose the valid main function definition.',
    choices: [
      { id: 'int-main', label: 'int main() { return 0; }', code: 'int main() { return 0; }' },
      { id: 'start', label: 'void start() { }', code: 'void start() { }' },
      { id: 'main-keyword', label: 'main { return 0; }', code: 'main { return 0; }' },
      { id: 'run-main', label: 'run main() { }', code: 'run main() { }' },
    ],
    correctChoiceId: 'int-main',
    explanation:
      'A hosted C++ program starts in the global main function, whose declared return type is int.',
    reference: cppMainFunctionReference,
  },
  {
    id: 'cpp-basics.mcq.qualified-output',
    topicId: 'cpp-basics',
    kind: 'multiple-choice',
    prompt: 'Which expression writes "Ready" to the standard output stream?',
    instruction: 'Choose the expression that qualifies the standard-library stream.',
    choices: [
      { id: 'cout', label: 'std::cout << "Ready";', code: 'std::cout << "Ready";' },
      { id: 'cin', label: 'std::cin << "Ready";', code: 'std::cin << "Ready";' },
      { id: 'output', label: 'std::output("Ready");', code: 'std::output("Ready");' },
      { id: 'print-member', label: 'std.print("Ready");', code: 'std.print("Ready");' },
    ],
    correctChoiceId: 'cout',
    explanation:
      'std::cout is the standard character output stream, and the insertion operator sends values to it.',
    reference: cppIostreamReference,
  },
  {
    id: 'cpp-basics.mcq.const-object',
    topicId: 'cpp-basics',
    kind: 'multiple-choice',
    prompt: 'What does const guarantee for maxAttempts after this declaration?',
    instruction: 'Choose the restriction applied to the object.',
    choices: [
      { id: 'no-assign', label: 'It cannot be assigned a new value' },
      { id: 'compile-time', label: 'It is always evaluated entirely at compile time' },
      { id: 'global', label: 'It is visible from every source file' },
      { id: 'integer', label: 'It is automatically converted to int' },
    ],
    correctChoiceId: 'no-assign',
    explanation:
      'A const object must be initialized and cannot later be modified through assignment.',
    reference: cppInitializationReference,
  },
  {
    id: 'cpp-basics.mcq.integer-division',
    topicId: 'cpp-basics',
    kind: 'multiple-choice',
    prompt: 'What value initializes result in int result{7 / 2}?',
    instruction: 'Evaluate division using the operand types.',
    choices: [
      { id: 'three', label: '3', code: '3' },
      { id: 'three-half', label: '3.5', code: '3.5' },
      { id: 'four', label: '4', code: '4' },
      { id: 'error', label: 'The expression is a compile error' },
    ],
    correctChoiceId: 'three',
    explanation:
      'Both operands are integers, so integer division discards the fractional part and produces 3.',
    reference: cppExpressionsReference,
  },
  {
    id: 'cpp-basics.mcq.logical-and',
    topicId: 'cpp-basics',
    kind: 'multiple-choice',
    prompt: 'When is ready && attempts > 0 true?',
    instruction: 'Choose the condition required by logical AND.',
    choices: [
      { id: 'both', label: 'When ready is true and attempts is greater than zero' },
      { id: 'either', label: 'When either operand is true' },
      { id: 'ready-only', label: 'Whenever ready is true, regardless of attempts' },
      { id: 'attempts-only', label: 'Whenever attempts is nonzero, regardless of ready' },
    ],
    correctChoiceId: 'both',
    explanation:
      'The && operator produces true only when both its left and right operands evaluate to true.',
    reference: cppExpressionsReference,
  },
  {
    id: 'cpp-basics.mcq.switch-break',
    topicId: 'cpp-basics',
    kind: 'multiple-choice',
    prompt: 'What is the usual purpose of break at the end of a switch case?',
    instruction: 'Choose how break changes switch execution.',
    choices: [
      { id: 'exit-switch', label: 'It exits the switch instead of continuing into the next case' },
      { id: 'exit-program', label: 'It ends the entire program immediately' },
      { id: 'repeat-case', label: 'It repeats the matching case' },
      { id: 'skip-condition', label: 'It skips evaluation of the switch condition' },
    ],
    correctChoiceId: 'exit-switch',
    explanation:
      'A break statement exits the nearest switch, preventing ordinary fallthrough to following case labels.',
    reference: cppStatementsReference,
  },
  {
    id: 'cpp-basics.mcq.range-for',
    topicId: 'cpp-basics',
    kind: 'multiple-choice',
    prompt: 'What does for (int score : scores) do when scores is a vector of integers?',
    instruction: 'Choose the range-based loop behavior.',
    choices: [
      { id: 'each-value', label: 'Visits each stored score, copying its value into score' },
      { id: 'indexes', label: 'Visits only the valid index numbers' },
      { id: 'first', label: 'Visits only the first stored score' },
      { id: 'sorts', label: 'Sorts the scores before visiting them' },
    ],
    correctChoiceId: 'each-value',
    explanation:
      'A range-based for loop initializes its loop variable from each element in the range in turn.',
    reference: cppStatementsReference,
  },
  {
    id: 'cpp-basics.mcq.pass-by-value',
    topicId: 'cpp-basics',
    kind: 'multiple-choice',
    prompt:
      'What happens to the caller’s integer when a function assigns to an int value parameter?',
    instruction: 'Choose the effect of ordinary pass-by-value.',
    choices: [
      { id: 'unchanged', label: 'The caller’s integer remains unchanged' },
      { id: 'changed', label: 'The caller’s integer receives the assigned value' },
      { id: 'destroyed', label: 'The caller’s integer is destroyed' },
      { id: 'constant', label: 'The caller’s integer becomes const' },
    ],
    correctChoiceId: 'unchanged',
    explanation:
      'An ordinary value parameter is a separate local object initialized from the argument, so assigning to it does not update the caller.',
    reference: cppFunctionsReference,
  },
  {
    id: 'cpp-basics.mcq.block-scope',
    topicId: 'cpp-basics',
    kind: 'multiple-choice',
    prompt: 'Where can a variable declared inside an if block be named?',
    instruction: 'Choose the ordinary scope of the local declaration.',
    choices: [
      { id: 'inside-after', label: 'From its declaration to the end of that block' },
      { id: 'whole-function', label: 'Everywhere in the enclosing function' },
      { id: 'whole-file', label: 'Everywhere later in the source file' },
      { id: 'all-files', label: 'In every source file in the program' },
    ],
    correctChoiceId: 'inside-after',
    explanation:
      'A block variable’s name is visible after its declaration until the closing brace of that block.',
    reference: cppScopeReference,
  },
  {
    id: 'cpp-basics.mcq.vector-append',
    topicId: 'cpp-basics',
    kind: 'multiple-choice',
    prompt: 'Which call appends 95 to std::vector<int> scores?',
    instruction: 'Choose the vector operation that adds one trailing element.',
    choices: [
      { id: 'push-back', label: 'scores.push_back(95);', code: 'scores.push_back(95);' },
      { id: 'append', label: 'scores.append(95);', code: 'scores.append(95);' },
      { id: 'add', label: 'scores.add(95);', code: 'scores.add(95);' },
      { id: 'push', label: 'scores.push(95);', code: 'scores.push(95);' },
    ],
    correctChoiceId: 'push-back',
    explanation:
      'std::vector::push_back adds one new element after the vector’s current last element.',
    reference: cppVectorReference,
  },
] as const satisfies readonly MultipleChoiceQuestion[]
