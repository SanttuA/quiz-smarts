import type { TopicDefinition } from '../../types'
import { csharpBasicsCheatSheet } from './cheatsheet'
import { csharpBasicsMetadata } from './metadata'
import { csharpBasicsQuestions } from './questions'
import { csharpLanguageReference } from './questions/shared'

const csharpBasicsTopic = {
  ...csharpBasicsMetadata,
  cheatsheet: csharpBasicsCheatSheet,
  questions: csharpBasicsQuestions,
  reference: csharpLanguageReference,
} as const satisfies TopicDefinition

export default csharpBasicsTopic
