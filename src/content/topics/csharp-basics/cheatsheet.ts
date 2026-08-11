import type { CheatSheetSection } from '../../types'
import {
  csharpBuiltInTypesReference,
  csharpClassesReference,
  csharpCollectionsReference,
  csharpConsoleReference,
  csharpIterationReference,
  csharpMethodsReference,
  csharpOperatorsReference,
  csharpPropertiesReference,
  csharpSelectionReference,
  csharpTopLevelReference,
  csharpTypesReference,
} from './questions/shared'

export const csharpBasicsCheatSheet = [
  {
    id: 'program-structure',
    title: 'Top-level programs and console I/O',
    summary: 'Top-level statements keep small programs concise, while Console handles text I/O.',
    items: [
      {
        term: 'Top-level statements',
        detail: 'A console program can place executable statements directly in Program.cs.',
        code: 'Console.WriteLine("Hello, world!");',
      },
      {
        term: 'Statements and blocks',
        detail: 'Statements usually end with a semicolon, and curly braces group statements.',
        code: 'if (ready) {\n    Console.WriteLine("Go");\n}',
      },
      {
        term: 'Write a line',
        detail: 'Console.WriteLine writes a value and then ends the output line.',
        code: 'Console.WriteLine("Ready");',
      },
      {
        term: 'Write without a newline',
        detail: 'Console.Write writes a value without automatically starting a new line.',
        code: 'Console.Write("Name: ");',
      },
      {
        term: 'Read a line',
        detail: 'Console.ReadLine reads the next line of text from standard input.',
        code: 'Console.ReadLine();',
      },
      {
        term: 'Using directives',
        detail:
          'A using directive lets code refer to names from a namespace without qualification.',
        code: 'using System.Collections.Generic;',
      },
    ],
    references: [csharpTopLevelReference, csharpConsoleReference],
  },
  {
    id: 'values-types',
    title: 'Values, types, and strings',
    summary: 'C# is strongly typed, supports inferred local types, and has rich string syntax.',
    items: [
      {
        term: 'Built-in types',
        detail: 'Common types include int, double, decimal, bool, char, and string.',
        code: "int count = 3;\ndouble ratio = 0.5;\nbool ready = true;\nchar grade = 'A';",
      },
      {
        term: 'Explicit declarations',
        detail: 'A declaration gives a variable a type, a name, and optionally an initial value.',
        code: 'string name = "Ada";',
      },
      {
        term: 'Type inference',
        detail: 'var asks the compiler to infer a local variable’s type from its initializer.',
        code: 'var score = 95; // inferred as int',
      },
      {
        term: 'Constants',
        detail: 'A const local must be initialized and cannot later be assigned a new value.',
        code: 'const int MaxAttempts = 3;',
      },
      {
        term: 'String interpolation',
        detail: 'Prefix a string with $ to insert expressions between curly braces.',
        code: 'string message = $"Hello, {name}!";',
      },
      {
        term: 'Characters and strings',
        detail: 'A char uses single quotes; a string uses double quotes and stores text.',
        code: 'char initial = \'A\';\nstring word = "Ada";',
      },
    ],
    references: [csharpTypesReference, csharpBuiltInTypesReference],
  },
  {
    id: 'expressions-operators',
    title: 'Expressions and operators',
    summary: 'Operators calculate values, compare results, and combine Boolean conditions.',
    items: [
      {
        term: 'Arithmetic',
        detail: '+, -, *, /, and % perform common arithmetic operations.',
        code: 'int quotient = 7 / 2;   // 3\nint remainder = 7 % 2;  // 1',
      },
      {
        term: 'Integer division',
        detail:
          'Dividing two integers produces an integer result and discards the fractional part.',
        code: 'double rounded = 7 / 2;    // 3.0\ndouble exact = 7.0 / 2;  // 3.5',
      },
      {
        term: 'Comparisons',
        detail: '==, !=, <, <=, >, and >= compare values and produce a bool.',
        code: 'bool passed = score >= 70;',
      },
      {
        term: 'Logical operators',
        detail: '&& means AND, || means OR, and ! negates a Boolean expression.',
        code: 'if (ready && attempts > 0) {\n    Start();\n}',
      },
      {
        term: 'Compound assignment',
        detail: 'Operators such as += update a variable using its current value.',
        code: 'score += bonus;',
      },
      {
        term: 'Explicit conversion',
        detail:
          'A cast makes an intended conversion visible and can enable floating-point division.',
        code: 'double average = (double)total / count;',
      },
    ],
    references: [csharpOperatorsReference],
  },
  {
    id: 'control-flow',
    title: 'Control flow',
    summary: 'Branches select work, and loops repeat work while their conditions allow it.',
    items: [
      {
        term: 'Conditions',
        detail: 'Use if, optional else if branches, and an optional else branch.',
        code: 'if (score >= 70) {\n    passed = true;\n} else {\n    passed = false;\n}',
      },
      {
        term: 'Switch statements',
        detail: 'switch selects a matching case, and break exits the switch section.',
        code: 'switch (command) {\n    case "quit":\n        running = false;\n        break;\n}',
      },
      {
        term: 'For loops',
        detail: 'A for loop groups initialization, a condition, and an update.',
        code: 'for (int i = 0; i < 3; i++) {\n    Console.WriteLine(i);\n}',
      },
      {
        term: 'Foreach loops',
        detail: 'foreach visits every element in an array or another enumerable collection.',
        code: 'foreach (int score in scores) {\n    Console.WriteLine(score);\n}',
      },
      {
        term: 'While loops',
        detail: 'A while loop repeats as long as its Boolean condition is true.',
        code: 'while (attempts > 0) {\n    attempts--;\n}',
      },
      {
        term: 'Loop control',
        detail: 'continue starts the next iteration; break exits the nearest loop.',
      },
    ],
    references: [csharpSelectionReference, csharpIterationReference],
  },
  {
    id: 'methods-scope',
    title: 'Methods and scope',
    summary: 'Methods name reusable behavior, and scopes determine where local names can be used.',
    items: [
      {
        term: 'Method declarations',
        detail: 'A method declares a return type, name, parameters, and body.',
        code: 'static int DoubleValue(int value) {\n    return value * 2;\n}',
      },
      {
        term: 'Method calls',
        detail: 'Call a method by its name and supply an argument for each required parameter.',
        code: 'int doubled = DoubleValue(4);',
      },
      {
        term: 'Parameters',
        detail:
          'Parameters are local variables initialized from the arguments supplied by the caller.',
        code: 'static int Add(int left, int right) { /* ... */ }',
      },
      {
        term: 'Return values',
        detail: 'return ends a non-void method call and supplies its result.',
        code: 'return left + right;',
      },
      {
        term: 'Void methods',
        detail: 'Use void when a method performs work without returning a value.',
        code: 'static void ShowReady() {\n    Console.WriteLine("Ready");\n}',
      },
      {
        term: 'Local scope',
        detail: 'A local name is available from its declaration through the end of its block.',
        code: 'if (ready) {\n    int attempts = 3;\n    Console.WriteLine(attempts);\n}',
      },
    ],
    references: [csharpMethodsReference],
  },
  {
    id: 'collections-objects',
    title: 'Collections, classes, and objects',
    summary: 'Arrays and lists group values, while classes define data and behavior for objects.',
    items: [
      {
        term: 'Arrays',
        detail: 'An array stores a fixed-size sequence of elements with one element type.',
        code: 'int[] scores = { 80, 90, 100 };',
      },
      {
        term: 'Lists',
        detail: 'List<T> stores a sequence that can grow or shrink while keeping one element type.',
        code: 'List<int> scores = new() { 80, 90 };',
      },
      {
        term: 'List members',
        detail: 'Add appends an item, Count reports the size, and indexing is zero-based.',
        code: 'scores.Add(100);\nint first = scores[0];\nint count = scores.Count;',
      },
      {
        term: 'Classes',
        detail: 'A class defines a reference type whose members describe its data and behavior.',
        code: 'public class Person {\n    public string Name { get; set; } = "";\n}',
      },
      {
        term: 'Create an object',
        detail: 'new creates an instance; a constructor can initialize its state.',
        code: 'Person person = new Person("Ada");',
      },
      {
        term: 'Auto-properties',
        detail: 'An auto-property exposes get and set accessors with compiler-provided storage.',
        code: 'public string Name { get; set; } = "";',
      },
    ],
    references: [csharpCollectionsReference, csharpClassesReference, csharpPropertiesReference],
  },
] as const satisfies readonly CheatSheetSection[]
