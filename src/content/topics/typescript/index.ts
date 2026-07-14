import type { TopicDefinition } from '../../types'
import { typescriptCheatSheet } from './cheatsheet'
import { typescriptMetadata } from './metadata'
import { typescriptQuestions } from './questions'
import { typescriptHandbookReference } from './questions/shared'

const typescriptTopic = {
  ...typescriptMetadata,
  cheatsheet: typescriptCheatSheet,
  questions: typescriptQuestions,
  reference: typescriptHandbookReference,
} as const satisfies TopicDefinition

export default typescriptTopic
