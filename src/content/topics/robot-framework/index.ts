import type { TopicDefinition } from '../../types'
import { robotFrameworkCheatSheet } from './cheatsheet'
import { robotFrameworkMetadata } from './metadata'
import { robotFrameworkQuestions } from './questions'
import { robotGuideReference } from './questions/shared'

const robotFrameworkTopic = {
  ...robotFrameworkMetadata,
  cheatsheet: robotFrameworkCheatSheet,
  questions: robotFrameworkQuestions,
  reference: robotGuideReference,
} as const satisfies TopicDefinition

export default robotFrameworkTopic
