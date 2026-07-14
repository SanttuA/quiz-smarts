import type { MultipleChoiceQuestion } from '../../../types'
import {
  typescriptBasicsReference,
  typescriptEverydayTypesReference,
  typescriptGenericsReference,
  typescriptKeyofReference,
  typescriptNarrowingReference,
  typescriptObjectTypesReference,
  typescriptStrictReference,
  typescriptUtilityTypesReference,
} from './shared'

export const multipleChoiceQuestions = [
  {
    id: 'typescript.mcq.array-inference',
    topicId: 'typescript',
    kind: 'multiple-choice',
    prompt: 'What type does TypeScript infer for const names = ["Ada", "Lin"]?',
    instruction: 'Choose the inferred array type.',
    choices: [
      { id: 'string-array', label: 'string[]', code: 'string[]' },
      { id: 'string', label: 'string', code: 'string' },
      { id: 'tuple', label: '[string, string]', code: '[string, string]' },
      { id: 'unknown-array', label: 'unknown[]', code: 'unknown[]' },
    ],
    correctChoiceId: 'string-array',
    explanation:
      'Both initial elements are strings, so TypeScript infers a mutable array whose elements have the type string.',
    reference: typescriptEverydayTypesReference,
  },
  {
    id: 'typescript.mcq.unknown-safety',
    topicId: 'typescript',
    kind: 'multiple-choice',
    prompt: 'Why is unknown usually safer than any for a value whose type is not yet known?',
    instruction: 'Choose the behavior that preserves type checking.',
    choices: [
      { id: 'narrow-first', label: 'unknown must be narrowed before most operations are allowed' },
      { id: 'runtime-check', label: 'unknown automatically validates the value at runtime' },
      { id: 'string-only', label: 'unknown permits only string values' },
      { id: 'immutable', label: 'unknown makes the value immutable' },
    ],
    correctChoiceId: 'narrow-first',
    explanation:
      'Any value can be assigned to unknown, but code must establish a more specific type before reading properties or calling methods on it.',
    reference: typescriptBasicsReference,
  },
  {
    id: 'typescript.mcq.typeof-narrowing',
    topicId: 'typescript',
    kind: 'multiple-choice',
    prompt: 'Inside if (typeof value === "string"), how is value narrowed from string | number?',
    instruction: 'Choose the type available in the guarded branch.',
    choices: [
      { id: 'string', label: 'string', code: 'string' },
      { id: 'number', label: 'number', code: 'number' },
      { id: 'union', label: 'string | number', code: 'string | number' },
      { id: 'never', label: 'never', code: 'never' },
    ],
    correctChoiceId: 'string',
    explanation:
      'The runtime typeof test proves that value is a string along that control-flow branch, so string operations become available.',
    reference: typescriptNarrowingReference,
  },
  {
    id: 'typescript.mcq.discriminated-union',
    topicId: 'typescript',
    kind: 'multiple-choice',
    prompt: 'Which property is best for discriminating circle and square members of a Shape union?',
    instruction: 'Choose the shared property with distinct literal values.',
    choices: [
      { id: 'kind', label: 'kind: "circle" or kind: "square"' },
      { id: 'size', label: 'size: number on both members' },
      { id: 'metadata', label: 'metadata: unknown on both members' },
      { id: 'optional-name', label: 'name?: string on both members' },
    ],
    correctChoiceId: 'kind',
    explanation:
      'A common kind property with a different literal type on each member lets a check or switch narrow the union reliably.',
    reference: typescriptNarrowingReference,
  },
  {
    id: 'typescript.mcq.optional-property',
    topicId: 'typescript',
    kind: 'multiple-choice',
    prompt:
      'With strict null checks, what must code consider when reading profile.bio from bio?: string?',
    instruction: 'Choose the complete property type at the read site.',
    choices: [
      { id: 'maybe-string', label: 'The value can be string or undefined' },
      { id: 'string', label: 'The value is always string' },
      { id: 'null', label: 'The value is always null' },
      { id: 'never', label: 'The property cannot be read' },
    ],
    correctChoiceId: 'maybe-string',
    explanation:
      'An optional property may be absent, so reading it produces string | undefined and requires a check before string-only operations.',
    reference: typescriptObjectTypesReference,
  },
  {
    id: 'typescript.mcq.structural-typing',
    topicId: 'typescript',
    kind: 'multiple-choice',
    prompt:
      'Why can an object with id, name, and email be passed where { id: number; name: string } is required?',
    instruction: 'Choose the TypeScript compatibility rule.',
    choices: [
      { id: 'structure', label: 'It contains all required members with compatible types' },
      { id: 'same-class', label: 'It was created by the exact same class' },
      { id: 'extra-removed', label: 'TypeScript removes the email property at runtime' },
      { id: 'objects-any', label: 'All object values are treated as any' },
    ],
    correctChoiceId: 'structure',
    explanation:
      'TypeScript uses structural compatibility: a value satisfies an object contract when it provides the required members with compatible types.',
    reference: typescriptObjectTypesReference,
  },
  {
    id: 'typescript.mcq.generic-identity',
    topicId: 'typescript',
    kind: 'multiple-choice',
    prompt:
      'What return type is inferred for identity("ready") when identity is function identity<T>(value: T): T?',
    instruction: 'Choose the type preserved by the generic function.',
    choices: [
      { id: 'ready', label: 'The string literal type "ready"', code: '"ready"' },
      { id: 'unknown', label: 'unknown', code: 'unknown' },
      { id: 'any', label: 'any', code: 'any' },
      { id: 'void', label: 'void', code: 'void' },
    ],
    correctChoiceId: 'ready',
    explanation:
      'The type parameter captures the argument’s type and reuses it as the return type, preserving the literal type for this call.',
    reference: typescriptGenericsReference,
  },
  {
    id: 'typescript.mcq.keyof-user',
    topicId: 'typescript',
    kind: 'multiple-choice',
    prompt: 'For type User = { id: number; name: string }, what does keyof User produce?',
    instruction: 'Choose the union of known property keys.',
    choices: [
      { id: 'keys', label: '"id" | "name"', code: '"id" | "name"' },
      { id: 'values', label: 'number | string', code: 'number | string' },
      { id: 'object', label: 'object', code: 'object' },
      { id: 'string', label: 'string', code: 'string' },
    ],
    correctChoiceId: 'keys',
    explanation:
      'The keyof operator returns a union made from the property names of the object type, not from its property value types.',
    reference: typescriptKeyofReference,
  },
  {
    id: 'typescript.mcq.partial-user',
    topicId: 'typescript',
    kind: 'multiple-choice',
    prompt: 'What does Partial<User> do when User has required id and name properties?',
    instruction: 'Choose the transformed object contract.',
    choices: [
      { id: 'optional', label: 'Makes both id and name optional' },
      { id: 'readonly', label: 'Makes both id and name readonly' },
      { id: 'nullable', label: 'Changes both properties to null' },
      { id: 'removed', label: 'Removes both properties' },
    ],
    correctChoiceId: 'optional',
    explanation:
      'Partial maps over every property of User and marks it optional, which is useful for update objects that contain only changed fields.',
    reference: typescriptUtilityTypesReference,
  },
  {
    id: 'typescript.mcq.strict-option',
    topicId: 'typescript',
    kind: 'multiple-choice',
    prompt: 'What is the purpose of setting "strict": true in tsconfig.json?',
    instruction: 'Choose the compiler behavior enabled by this option.',
    choices: [
      { id: 'checks', label: 'Enable a family of stronger type-checking rules' },
      { id: 'format', label: 'Automatically format every source file' },
      { id: 'runtime', label: 'Add runtime validation for every annotation' },
      { id: 'bundle', label: 'Bundle all modules into one JavaScript file' },
    ],
    correctChoiceId: 'checks',
    explanation:
      'The strict flag enables a collection of type-checking options that catch unsafe assumptions, including implicit any and nullable-value mistakes.',
    reference: typescriptStrictReference,
  },
] as const satisfies readonly MultipleChoiceQuestion[]
