import type { CheatSheetSection } from '../../types'
import {
  cppExpressionsReference,
  cppFundamentalTypesReference,
  cppFunctionsReference,
  cppInitializationReference,
  cppIostreamReference,
  cppMainFunctionReference,
  cppScopeReference,
  cppStatementsReference,
  cppStringReference,
  cppVectorReference,
} from './questions/shared'

export const cppBasicsCheatSheet = [
  {
    id: 'program-structure',
    title: 'Program structure and I/O',
    summary: 'Headers provide declarations, main starts the program, and streams handle text I/O.',
    items: [
      {
        term: 'Include headers',
        detail: 'An include directive makes library declarations available to the source file.',
        code: '#include <iostream>\n#include <string>',
      },
      {
        term: 'Program entry point',
        detail: 'A hosted C++ program begins execution in the global main function.',
        code: 'int main() {\n    return 0;\n}',
      },
      {
        term: 'Statements and blocks',
        detail: 'Most statements end with a semicolon. Curly braces group statements into a block.',
        code: '{\n    int count{3};\n    count += 1;\n}',
      },
      {
        term: 'Namespaces',
        detail:
          'The standard library uses namespace std. Qualify names explicitly to show where they come from.',
        code: 'std::cout << "Hello";',
      },
      {
        term: 'Console output',
        detail: 'Insert values into std::cout with <<. A newline character starts a new line.',
        code: 'std::cout << "Score: " << score << \'\\n\';',
      },
      {
        term: 'Console input',
        detail: 'Extract whitespace-delimited input from std::cin with >>.',
        code: 'int age{};\nstd::cin >> age;',
      },
    ],
    references: [cppMainFunctionReference, cppIostreamReference],
  },
  {
    id: 'values-types',
    title: 'Values, types, and initialization',
    summary: 'Every object has a type; initialize it deliberately and make stable values const.',
    items: [
      {
        term: 'Fundamental types',
        detail:
          'Common built-in types include int, double, bool, and char for integers, floating-point values, truth values, and characters.',
        code: "int count{3};\ndouble ratio{0.5};\nbool ready{true};\nchar grade{'A'};",
      },
      {
        term: 'Brace initialization',
        detail:
          'Braces initialize an object and reject many narrowing conversions that could lose information.',
        code: 'int attempts{3};',
      },
      {
        term: 'Value initialization',
        detail: 'Empty braces value-initialize scalar objects, producing zero or false.',
        code: 'int total{};     // 0\nbool active{};  // false',
      },
      {
        term: 'Constants',
        detail: 'A const object must be initialized and cannot be assigned a new value afterward.',
        code: 'const int maxAttempts{3};',
      },
      {
        term: 'Type inference',
        detail: 'auto asks the compiler to infer a variable type from its initializer.',
        code: 'auto name = std::string{"Ada"};',
      },
      {
        term: 'Assignment',
        detail:
          'Initialization gives an object its first value; assignment replaces its current value.',
        code: 'int score{10};\nscore = 12;',
      },
    ],
    references: [cppFundamentalTypesReference, cppInitializationReference],
  },
  {
    id: 'expressions-operators',
    title: 'Expressions and operators',
    summary: 'Operators combine values, compare results, and update program state.',
    items: [
      {
        term: 'Arithmetic',
        detail: '+, -, *, /, and % perform common arithmetic operations.',
        code: 'int quotient{7 / 2};   // 3\nint remainder{7 % 2};  // 1',
      },
      {
        term: 'Integer division',
        detail: 'Dividing two integers produces an integer result, discarding the fractional part.',
        code: 'double first{7 / 2};    // 3.0\ndouble exact{7.0 / 2};  // 3.5',
      },
      {
        term: 'Comparisons',
        detail: '==, !=, <, <=, >, and >= compare values and produce bool results.',
        code: 'bool passed{score >= 70};',
      },
      {
        term: 'Logical operators',
        detail: '&& means logical AND, || means logical OR, and ! negates a bool expression.',
        code: 'if (ready && attempts > 0) {\n    start();\n}',
      },
      {
        term: 'Compound assignment',
        detail: 'Operators such as += update an object using its current value.',
        code: 'score += bonus;',
      },
      {
        term: 'Explicit conversion',
        detail: 'static_cast<T> makes an intended conversion visible in the source.',
        code: 'double average{static_cast<double>(total) / count};',
      },
    ],
    references: [cppExpressionsReference],
  },
  {
    id: 'control-flow',
    title: 'Control flow',
    summary: 'Branches select work while loops repeat it under clear conditions.',
    items: [
      {
        term: 'Conditions',
        detail: 'Use if, optional else if branches, and an optional else branch.',
        code: "if (score >= 90) {\n    grade = 'A';\n} else {\n    grade = 'B';\n}",
      },
      {
        term: 'Switch statements',
        detail:
          'switch selects a matching case. break usually prevents execution from continuing into the next case.',
        code: "switch (command) {\ncase 'q':\n    running = false;\n    break;\ndefault:\n    break;\n}",
      },
      {
        term: 'For loops',
        detail: 'A classic for loop groups initialization, a condition, and an update.',
        code: 'for (int i{0}; i < 3; ++i) {\n    std::cout << i;\n}',
      },
      {
        term: 'Range-based loops',
        detail: 'A range-based for loop visits each element in a range such as a vector.',
        code: 'for (int value : values) {\n    std::cout << value;\n}',
      },
      {
        term: 'While loops',
        detail: 'A while loop repeats as long as its condition evaluates to true.',
        code: 'while (attempts > 0) {\n    --attempts;\n}',
      },
      {
        term: 'Loop control',
        detail: 'continue starts the next iteration; break exits the nearest loop.',
      },
    ],
    references: [cppStatementsReference],
  },
  {
    id: 'functions-scope',
    title: 'Functions and scope',
    summary: 'Functions name reusable behavior, and scopes control where names can be used.',
    items: [
      {
        term: 'Function definitions',
        detail: 'A definition states the return type, name, parameters, and function body.',
        code: 'int doubleValue(int value) {\n    return value * 2;\n}',
      },
      {
        term: 'Function declarations',
        detail: 'A declaration introduces a function before its definition is encountered.',
        code: 'int doubleValue(int value);',
      },
      {
        term: 'Pass by value',
        detail:
          'An ordinary parameter receives its own value. Assigning to it does not change the caller’s object.',
        code: 'void reset(int value) {\n    value = 0;\n}',
      },
      {
        term: 'Return values',
        detail: 'return ends a non-void function call and supplies its result.',
        code: 'return left + right;',
      },
      {
        term: 'Block scope',
        detail: 'A local name is available from its declaration to the end of its enclosing block.',
        code: 'if (ready) {\n    int attempts{3};\n    // attempts is visible here\n}',
      },
      {
        term: 'void functions',
        detail: 'Use void when a function does not return a value.',
        code: 'void printReady() {\n    std::cout << "Ready\\n";\n}',
      },
    ],
    references: [cppFunctionsReference, cppScopeReference],
  },
  {
    id: 'strings-vectors',
    title: 'Strings and vectors',
    summary: 'Standard-library types provide practical text and resizable sequences.',
    items: [
      {
        term: 'Strings',
        detail:
          'std::string owns a sequence of characters and supports assignment and concatenation.',
        code: 'std::string name{"Ada"};\nstd::string greeting{"Hello, " + name};',
      },
      {
        term: 'String size',
        detail: 'size returns the number of characters currently stored in a string.',
        code: 'auto length = name.size();',
      },
      {
        term: 'Vectors',
        detail: 'std::vector<T> owns a resizable sequence whose elements all have type T.',
        code: 'std::vector<int> scores{80, 90, 100};',
      },
      {
        term: 'Append an element',
        detail: 'push_back adds one element to the end of a vector.',
        code: 'scores.push_back(95);',
      },
      {
        term: 'Indexing',
        detail: 'operator[] accesses an element by its zero-based index and does not check bounds.',
        code: 'int first{scores[0]};',
      },
      {
        term: 'Iterate over values',
        detail: 'Use a range-based for loop to read every element without manual indexing.',
        code: "for (int score : scores) {\n    std::cout << score << '\\n';\n}",
      },
    ],
    references: [cppStringReference, cppVectorReference],
  },
] as const satisfies readonly CheatSheetSection[]
