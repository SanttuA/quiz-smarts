import type { TopicDefinition } from '../../types'
import { seleniumCheatSheet } from './cheatsheet'
import { seleniumMetadata } from './metadata'
import { seleniumQuestions } from './questions'
import { seleniumFirstScriptReference } from './questions/shared'

const seleniumTopic = {
  ...seleniumMetadata,
  cheatsheet: seleniumCheatSheet,
  questions: seleniumQuestions,
  reference: seleniumFirstScriptReference,
} as const satisfies TopicDefinition

export default seleniumTopic
