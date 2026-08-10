import type { TopicDefinition } from '../../types'
import { cppBasicsCheatSheet } from './cheatsheet'
import { cppBasicsMetadata } from './metadata'
import { cppBasicsQuestions } from './questions'
import { cppLanguageReference } from './questions/shared'

const cppBasicsTopic = {
  ...cppBasicsMetadata,
  cheatsheet: cppBasicsCheatSheet,
  questions: cppBasicsQuestions,
  reference: cppLanguageReference,
} as const satisfies TopicDefinition

export default cppBasicsTopic
