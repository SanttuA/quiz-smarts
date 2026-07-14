import type { CheatSheetSection } from '../../types'

export const typescriptCheatSheet = [
  {
    id: 'inference-annotations',
    title: 'Inference and annotations',
    summary: 'Let inference do routine work and add annotations where they clarify a contract.',
    items: [
      {
        term: 'Type inference',
        detail:
          'TypeScript often derives a useful type from an initializer, so local variables rarely need explicit annotations.',
        code: 'const names = ["Ada", "Lin"]  // string[]',
      },
      {
        term: 'Type annotations',
        detail: 'Write a type after a colon when a declaration needs an explicit contract.',
        code: 'let score: number = 0',
      },
      {
        term: 'Primitive types',
        detail:
          'Use the lowercase types string, number, and boolean. Their uppercase counterparts describe boxed objects.',
        code: 'const ready: boolean = true',
      },
      {
        term: 'Arrays and tuples',
        detail: 'T[] describes an array of T. A tuple fixes the type and position of each element.',
        code: 'const tags: string[] = ["ts"]\nconst point: [number, number] = [3, 5]',
      },
      {
        term: 'unknown over any',
        detail:
          'unknown accepts any value but requires narrowing before use. any bypasses type checking and can hide mistakes.',
        code: 'let payload: unknown = JSON.parse(raw)',
      },
      {
        term: 'Type assertions',
        detail:
          'An assertion tells the checker which type you know a value has; it does not validate or convert the value at runtime.',
        code: 'const input = element as HTMLInputElement',
      },
    ],
  },
  {
    id: 'unions-narrowing',
    title: 'Unions and narrowing',
    summary:
      'Model alternatives explicitly, then prove which alternative is present before using it.',
    items: [
      {
        term: 'Union types',
        detail: 'A vertical bar combines alternatives into one type.',
        code: 'function format(value: string | number) {\n  // ...\n}',
      },
      {
        term: 'Literal types',
        detail: 'String and number literals can form a precise set of allowed values.',
        code: 'type Status = "idle" | "loading" | "done"',
      },
      {
        term: 'typeof guards',
        detail: 'A runtime typeof check narrows primitive unions inside the matching branch.',
        code: 'if (typeof value === "string") {\n  value.toUpperCase()\n}',
      },
      {
        term: 'Property guards',
        detail: 'The in operator narrows a union when its members have different properties.',
        code: 'if ("message" in result) {\n  console.log(result.message)\n}',
      },
      {
        term: 'Discriminated unions',
        detail:
          'Give each member a shared property with a different literal value, then switch on that property.',
        code: 'type Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; size: number }',
      },
      {
        term: 'Strict null checks',
        detail:
          'With strict null checking, test for null or undefined before using a possibly absent value.',
        code: 'if (name !== undefined) {\n  console.log(name.toUpperCase())\n}',
      },
    ],
  },
  {
    id: 'objects-interfaces',
    title: 'Object types and interfaces',
    summary: 'Describe the properties an object must provide without coupling code to a class.',
    items: [
      {
        term: 'Object type aliases',
        detail: 'A type alias can name an object shape or any other type expression.',
        code: 'type User = {\n  id: number\n  name: string\n}',
      },
      {
        term: 'Interfaces',
        detail: 'An interface names an object contract and can be extended by another interface.',
        code: 'interface Admin extends User {\n  permissions: string[]\n}',
      },
      {
        term: 'Optional properties',
        detail: 'A question mark marks a property that may be absent.',
        code: 'interface Profile {\n  bio?: string\n}',
      },
      {
        term: 'Readonly properties',
        detail: 'readonly prevents assignment through that property after the object is created.',
        code: 'interface User {\n  readonly id: number\n}',
      },
      {
        term: 'Structural typing',
        detail:
          'Compatibility depends on required members, so a value may have additional properties and still satisfy a contract.',
      },
      {
        term: 'Intersections',
        detail: 'An intersection combines the requirements of multiple types.',
        code: 'type AuditedUser = User & { updatedAt: Date }',
      },
    ],
  },
  {
    id: 'functions-generics',
    title: 'Functions and generics',
    summary: 'State callable contracts and preserve relationships between input and output types.',
    items: [
      {
        term: 'Parameters and returns',
        detail:
          'Annotate parameters after their names and the return type after the parameter list.',
        code: 'function double(value: number): number {\n  return value * 2\n}',
      },
      {
        term: 'Optional parameters',
        detail: 'A question mark makes a parameter optional; required parameters must come first.',
        code: 'function greet(name: string, title?: string) {\n  // ...\n}',
      },
      {
        term: 'Function types',
        detail: 'An arrow in a type expression describes a callable value.',
        code: 'type Formatter = (value: number) => string',
      },
      {
        term: 'Generic functions',
        detail:
          'A type parameter captures a type so the return type can stay connected to the input.',
        code: 'function first<T>(items: T[]): T | undefined {\n  return items[0]\n}',
      },
      {
        term: 'Generic constraints',
        detail: 'extends limits a type parameter to values with required capabilities.',
        code: 'function lengthOf<T extends { length: number }>(value: T) {\n  return value.length\n}',
      },
      {
        term: 'Key-safe access',
        detail: 'K extends keyof T restricts a key to properties that exist on T.',
        code: 'function get<T, K extends keyof T>(object: T, key: K) {\n  return object[key]\n}',
      },
    ],
  },
  {
    id: 'operators-utilities',
    title: 'Type operators and utilities',
    summary: 'Derive new types from existing declarations instead of repeating their structure.',
    items: [
      {
        term: 'keyof',
        detail: 'keyof produces a union of the known property keys of an object type.',
        code: 'type UserKey = keyof User  // "id" | "name"',
      },
      {
        term: 'typeof in type positions',
        detail: 'typeof captures the static type of a value when used in a type expression.',
        code: 'const defaults = { retries: 3 }\ntype Options = typeof defaults',
      },
      {
        term: 'Indexed access',
        detail: 'T[K] looks up the property type selected by K.',
        code: 'type UserId = User["id"]',
      },
      {
        term: 'Partial',
        detail: 'Partial<T> creates a type where every property from T is optional.',
        code: 'function update(changes: Partial<User>) {\n  // ...\n}',
      },
      {
        term: 'Pick and Omit',
        detail: 'Pick selects named properties; Omit keeps everything except the named properties.',
        code: 'type UserPreview = Pick<User, "id" | "name">',
      },
      {
        term: 'Record',
        detail: 'Record<K, V> describes an object whose keys are K and values are V.',
        code: 'type Scores = Record<string, number>',
      },
    ],
  },
  {
    id: 'modules-configuration',
    title: 'Modules and strict configuration',
    summary:
      'Share typed contracts across files and let strict checking expose unsafe assumptions.',
    items: [
      {
        term: 'Exports and imports',
        detail:
          'export makes a declaration available to other modules; import brings it into scope.',
        code: 'export function add(a: number, b: number) {\n  return a + b\n}',
      },
      {
        term: 'Type-only imports',
        detail: 'import type makes it explicit that an import is used only during type checking.',
        code: 'import type { User } from "./user.js"',
      },
      {
        term: 'Type erasure',
        detail:
          'Most TypeScript type syntax is removed during compilation, so annotations do not perform runtime validation.',
      },
      {
        term: 'tsconfig.json',
        detail:
          'A tsconfig file marks a TypeScript project and configures its files and compiler options.',
        code: '{\n  "compilerOptions": {\n    "strict": true\n  }\n}',
      },
      {
        term: 'strict mode',
        detail: 'The strict option enables a family of checks that provide stronger type safety.',
      },
      {
        term: 'noImplicitAny',
        detail:
          'Under strict checking, parameters that cannot be inferred need types instead of silently becoming any.',
        code: 'function greet(name: string) {\n  return `Hello, ${name}`\n}',
      },
    ],
  },
] as const satisfies readonly CheatSheetSection[]
