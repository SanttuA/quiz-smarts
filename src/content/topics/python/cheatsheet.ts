import type { CheatSheetSection } from '../../types'

export const pythonCheatSheet = [
  {
    id: 'syntax-values',
    title: 'Syntax and values',
    summary: 'Indentation shapes blocks while expressions create and combine values.',
    items: [
      {
        term: 'Blocks and indentation',
        detail:
          'A colon starts an indented suite. Keep indentation consistent; four spaces are the conventional choice.',
        code: 'if ready:\n    print("Go")',
      },
      {
        term: 'Names and assignment',
        detail:
          'Assignment binds a name to an object. A name can later be rebound to another value.',
        code: 'count = 3\nlabel = "ready"',
      },
      {
        term: 'Core scalar values',
        detail:
          'Common built-in values include integers, floats, strings, booleans, and None for the absence of a value.',
      },
      {
        term: 'Division',
        detail:
          '/ performs true division, // performs floor division, and % returns the remainder.',
        code: '7 / 2   # 3.5\n7 // 2  # 3\n7 % 2   # 1',
      },
      {
        term: 'Formatted strings',
        detail: 'Prefix a string with f to evaluate expressions inside braces.',
        code: 'name = "Ada"\nmessage = f"Hello, {name}"',
      },
      {
        term: 'Truth testing',
        detail:
          'False, None, numeric zero, and empty collections are falsey; most other values are truthy.',
      },
    ],
  },
  {
    id: 'collections',
    title: 'Collections',
    summary: 'Choose a collection based on order, mutability, uniqueness, and lookup needs.',
    items: [
      {
        term: 'Lists',
        detail: 'Lists are mutable ordered sequences. append adds one item to the end.',
        code: 'names = ["Ada", "Lin"]\nnames.append("Sam")',
      },
      {
        term: 'Tuples',
        detail:
          'Tuples are immutable sequences. The comma creates a one-item tuple, not the parentheses alone.',
        code: 'point = (3, 5)\nsingle = (3,)',
      },
      {
        term: 'Dictionaries',
        detail: 'Dictionaries map unique hashable keys to values and preserve insertion order.',
        code: 'user = {"name": "Ada", "active": True}\nname = user["name"]',
      },
      {
        term: 'Sets',
        detail: 'Sets hold unique hashable values and support membership and set operations.',
        code: 'tags = {"python", "quiz"}\ntags.add("core")',
      },
      {
        term: 'Indexing and slicing',
        detail: 'Indexes select one item. A slice selects a range and excludes its stop index.',
        code: 'items[0]\nitems[1:4]',
      },
      {
        term: 'Safe dictionary lookup',
        detail: 'dict.get returns a default instead of raising KeyError when a key is absent.',
        code: 'role = user.get("role", "viewer")',
      },
    ],
  },
  {
    id: 'control-flow',
    title: 'Control flow',
    summary: 'Conditions and loops decide which statements execute and how often.',
    items: [
      {
        term: 'Conditions',
        detail: 'Use if, optional elif branches, and an optional else branch.',
        code: 'if score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelse:\n    grade = "C"',
      },
      {
        term: 'For loops',
        detail: 'A for loop visits each item from an iterable.',
        code: 'for name in names:\n    print(name)',
      },
      {
        term: 'Ranges',
        detail: 'range(start, stop, step) generates integers without including stop.',
        code: 'for index in range(0, 6, 2):\n    print(index)  # 0, 2, 4',
      },
      {
        term: 'While loops',
        detail: 'A while loop repeats while its condition remains truthy.',
        code: 'while attempts < 3:\n    attempts += 1',
      },
      {
        term: 'Loop control',
        detail: 'continue starts the next iteration; break exits the nearest loop.',
      },
      {
        term: 'Enumeration',
        detail: 'enumerate yields an index and value without manual counter bookkeeping.',
        code: 'for index, value in enumerate(values):\n    print(index, value)',
      },
    ],
  },
  {
    id: 'functions-comprehensions',
    title: 'Functions and comprehensions',
    summary: 'Package behavior behind clear interfaces and build collections declaratively.',
    items: [
      {
        term: 'Define and return',
        detail: 'def creates a function. return sends a value to the caller and ends the call.',
        code: 'def double(value):\n    return value * 2',
      },
      {
        term: 'Parameters',
        detail:
          'Arguments can be positional or named. Default values make selected parameters optional.',
        code: 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}"',
      },
      {
        term: 'Variable arguments',
        detail:
          '*args collects extra positional arguments; **kwargs collects extra keyword arguments.',
        code: 'def report(*values, **options):\n    ...',
      },
      {
        term: 'Scope',
        detail:
          'A function call has a local scope. Reading an outer name is allowed, while assignment normally creates a local name.',
      },
      {
        term: 'List comprehensions',
        detail: 'Build a list from an iterable with an expression and optional filter.',
        code: 'squares = [number**2 for number in numbers if number > 0]',
      },
      {
        term: 'Generator expressions',
        detail:
          'Parentheses create a lazy generator expression, useful when values can be consumed one at a time.',
        code: 'total = sum(number**2 for number in numbers)',
      },
    ],
  },
  {
    id: 'exceptions-resources',
    title: 'Exceptions and resources',
    summary: 'Handle expected failures precisely and release resources reliably.',
    items: [
      {
        term: 'Catch expected errors',
        detail: 'Put risky work in try and catch specific exception types with except.',
        code: 'try:\n    count = int(raw)\nexcept ValueError:\n    count = 0',
      },
      {
        term: 'Else and finally',
        detail:
          'else runs when try raises no exception. finally runs whether an exception occurs or not.',
      },
      {
        term: 'Raise errors',
        detail: 'Use raise to signal that a function cannot produce a valid result.',
        code: 'if amount < 0:\n    raise ValueError("amount must be non-negative")',
      },
      {
        term: 'Context managers',
        detail:
          'with enters and exits a managed context, releasing resources even when work fails.',
        code: 'with open("notes.txt", encoding="utf-8") as file:\n    text = file.read()',
      },
      {
        term: 'File modes',
        detail: 'Text files open for reading by default; use "w" to replace and "a" to append.',
      },
      {
        term: 'Exception messages',
        detail:
          'Catch an exception with as when its details are useful for logging or user-facing context.',
        code: 'except ValueError as error:\n    print(error)',
      },
    ],
  },
  {
    id: 'modules-classes',
    title: 'Modules and classes',
    summary: 'Organize reusable code in modules and model state with objects.',
    items: [
      {
        term: 'Import modules',
        detail:
          'import binds a module name; from imports selected names into the current namespace.',
        code: 'import math\nfrom pathlib import Path',
      },
      {
        term: 'Main guard',
        detail:
          'Code under the __main__ guard runs when the file is executed directly, not when it is imported.',
        code: 'if __name__ == "__main__":\n    main()',
      },
      {
        term: 'Define a class',
        detail: 'A class groups data and behavior. Calling the class creates an instance.',
        code: 'class Greeter:\n    pass',
      },
      {
        term: 'Initialize instances',
        detail:
          '__init__ initializes a new instance; self refers to that instance inside a method.',
        code: 'def __init__(self, name):\n    self.name = name',
      },
      {
        term: 'Instance methods',
        detail:
          'Calling an instance method supplies the instance as its first argument automatically.',
        code: 'greeter = Greeter("Ada")\ngreeter.greet()',
      },
      {
        term: 'Inheritance',
        detail: 'Put a base class in parentheses to create a subclass that inherits its behavior.',
        code: 'class Admin(User):\n    pass',
      },
    ],
  },
] as const satisfies readonly CheatSheetSection[]
