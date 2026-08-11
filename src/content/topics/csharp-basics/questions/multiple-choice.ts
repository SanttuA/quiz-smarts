import type { MultipleChoiceQuestion } from '../../../types'
import {
  csharpBuiltInTypesReference,
  csharpConsoleReference,
  csharpIterationReference,
  csharpMethodsReference,
  csharpOperatorsReference,
  csharpPropertiesReference,
  csharpSelectionReference,
  csharpTopLevelReference,
  csharpTypesReference,
} from './shared'

export const multipleChoiceQuestions = [
  {
    id: 'csharp-basics.mcq.top-level-program',
    topicId: 'csharp-basics',
    kind: 'multiple-choice',
    prompt: 'Which line is a complete modern C# console program using top-level statements?',
    instruction: 'Choose the valid statement that writes a greeting.',
    choices: [
      {
        id: 'write-line',
        label: 'Console.WriteLine("Hello!");',
        code: 'Console.WriteLine("Hello!");',
      },
      { id: 'print', label: 'print("Hello!")', code: 'print("Hello!")' },
      { id: 'cout', label: 'std::cout << "Hello!";', code: 'std::cout << "Hello!";' },
      { id: 'echo', label: 'echo "Hello!";', code: 'echo "Hello!";' },
    ],
    correctChoiceId: 'write-line',
    explanation:
      'Top-level statements let a C# console program execute Console.WriteLine without an explicit Main method.',
    reference: csharpTopLevelReference,
  },
  {
    id: 'csharp-basics.mcq.console-read-line',
    topicId: 'csharp-basics',
    kind: 'multiple-choice',
    prompt: 'Which method reads a complete line from standard input?',
    instruction: 'Choose the Console method intended for line-oriented input.',
    choices: [
      { id: 'read-line', label: 'Console.ReadLine()', code: 'Console.ReadLine()' },
      { id: 'write-line', label: 'Console.WriteLine()', code: 'Console.WriteLine()' },
      { id: 'read-key', label: 'Console.ReadKey()', code: 'Console.ReadKey()' },
      { id: 'input', label: 'Console.Input()', code: 'Console.Input()' },
    ],
    correctChoiceId: 'read-line',
    explanation:
      'Console.ReadLine reads characters from standard input until the end of the current line.',
    reference: csharpConsoleReference,
  },
  {
    id: 'csharp-basics.mcq.var-type',
    topicId: 'csharp-basics',
    kind: 'multiple-choice',
    prompt: 'What type does the compiler infer for var count = 10?',
    instruction: 'Choose the compile-time type determined from the initializer.',
    choices: [
      { id: 'int', label: 'int', code: 'int' },
      { id: 'dynamic', label: 'dynamic', code: 'dynamic' },
      { id: 'double', label: 'double', code: 'double' },
      { id: 'object-only', label: 'object only', code: 'object' },
    ],
    correctChoiceId: 'int',
    explanation:
      'The integer literal 10 has type int, so var makes count a strongly typed int at compile time.',
    reference: csharpTypesReference,
  },
  {
    id: 'csharp-basics.mcq.const-local',
    topicId: 'csharp-basics',
    kind: 'multiple-choice',
    prompt: 'What does const guarantee for MaxAttempts after its declaration?',
    instruction: 'Choose the restriction applied to the local constant.',
    choices: [
      { id: 'no-assign', label: 'It cannot be assigned a new value' },
      { id: 'global', label: 'It is visible throughout every project' },
      { id: 'dynamic', label: 'Its type can change at runtime' },
      { id: 'nullable', label: 'It automatically accepts null' },
    ],
    correctChoiceId: 'no-assign',
    explanation:
      'A const local is initialized in its declaration and cannot receive a different value afterward.',
    reference: csharpBuiltInTypesReference,
  },
  {
    id: 'csharp-basics.mcq.integer-division',
    topicId: 'csharp-basics',
    kind: 'multiple-choice',
    prompt: 'What value initializes result in int result = 7 / 2?',
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
    reference: csharpOperatorsReference,
  },
  {
    id: 'csharp-basics.mcq.logical-and',
    topicId: 'csharp-basics',
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
      'The conditional AND operator produces true only when both of its operands evaluate to true.',
    reference: csharpOperatorsReference,
  },
  {
    id: 'csharp-basics.mcq.switch-break',
    topicId: 'csharp-basics',
    kind: 'multiple-choice',
    prompt: 'What does break do at the end of a C# switch case?',
    instruction: 'Choose how break changes control flow.',
    choices: [
      { id: 'exit-switch', label: 'It exits the switch statement' },
      { id: 'exit-program', label: 'It terminates the entire program' },
      { id: 'repeat-case', label: 'It repeats the matching case' },
      { id: 'next-loop', label: 'It starts the next loop iteration' },
    ],
    correctChoiceId: 'exit-switch',
    explanation:
      'A break statement ends the current switch section and transfers control beyond the switch.',
    reference: csharpSelectionReference,
  },
  {
    id: 'csharp-basics.mcq.foreach-values',
    topicId: 'csharp-basics',
    kind: 'multiple-choice',
    prompt: 'What does foreach (int score in scores) do?',
    instruction: 'Choose the behavior of the foreach loop.',
    choices: [
      { id: 'each', label: 'Visits each score in the collection in turn' },
      { id: 'indexes', label: 'Visits only the numeric indexes' },
      { id: 'sorts', label: 'Sorts the collection before visiting it' },
      { id: 'first', label: 'Visits only the first score' },
    ],
    correctChoiceId: 'each',
    explanation:
      'foreach obtains each element from the collection and assigns it to the iteration variable in turn.',
    reference: csharpIterationReference,
  },
  {
    id: 'csharp-basics.mcq.method-return-type',
    topicId: 'csharp-basics',
    kind: 'multiple-choice',
    prompt: 'Which return type fits a method that returns left + right for two int parameters?',
    instruction: 'Choose the type that matches the returned expression.',
    choices: [
      { id: 'int', label: 'int', code: 'int' },
      { id: 'void', label: 'void', code: 'void' },
      { id: 'bool', label: 'bool', code: 'bool' },
      { id: 'string', label: 'string', code: 'string' },
    ],
    correctChoiceId: 'int',
    explanation:
      'Adding two int values produces an int, so an int return type matches the returned result.',
    reference: csharpMethodsReference,
  },
  {
    id: 'csharp-basics.mcq.auto-property',
    topicId: 'csharp-basics',
    kind: 'multiple-choice',
    prompt: 'Which declaration defines a public read-write string auto-property named Name?',
    instruction: 'Choose the declaration with get and set accessors.',
    choices: [
      {
        id: 'property',
        label: 'public string Name { get; set; } = "";',
        code: 'public string Name { get; set; } = "";',
      },
      { id: 'method', label: 'public string Name();', code: 'public string Name();' },
      { id: 'local', label: 'string Name = "";', code: 'string Name = "";' },
      { id: 'invalid', label: 'public Name: string;', code: 'public Name: string;' },
    ],
    correctChoiceId: 'property',
    explanation:
      'The get and set accessors define a read-write property, with storage supplied by the compiler.',
    reference: csharpPropertiesReference,
  },
] as const satisfies readonly MultipleChoiceQuestion[]
