import type { TopicDefinition } from '../../types'
import { playwrightCheatSheet } from './cheatsheet'
import { playwrightMetadata } from './metadata'
import { playwrightQuestions } from './questions'
import { playwrightWritingTestsReference } from './questions/shared'

const playwrightTopic = {
  ...playwrightMetadata,
  cheatsheet: playwrightCheatSheet,
  questions: playwrightQuestions,
  reference: playwrightWritingTestsReference,
} as const satisfies TopicDefinition

export default playwrightTopic
