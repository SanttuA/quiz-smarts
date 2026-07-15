import type { TopicDefinition } from '../../types'
import { vitestCheatSheet } from './cheatsheet'
import { vitestMetadata } from './metadata'
import { vitestQuestions } from './questions'
import { vitestGettingStartedReference } from './questions/shared'

const vitestTopic = {
  ...vitestMetadata,
  cheatsheet: vitestCheatSheet,
  questions: vitestQuestions,
  reference: vitestGettingStartedReference,
} as const satisfies TopicDefinition

export default vitestTopic
