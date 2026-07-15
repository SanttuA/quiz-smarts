import type { TopicDefinition } from '../../types'
import { jmeterCheatSheet } from './cheatsheet'
import { jmeterMetadata } from './metadata'
import { jmeterQuestions } from './questions'
import { jmeterGettingStartedReference } from './questions/shared'

const jmeterTopic = {
  ...jmeterMetadata,
  cheatsheet: jmeterCheatSheet,
  questions: jmeterQuestions,
  reference: jmeterGettingStartedReference,
} as const satisfies TopicDefinition

export default jmeterTopic
