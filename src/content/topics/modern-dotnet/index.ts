import type { TopicDefinition } from '../../types'
import { modernDotnetCheatSheet } from './cheatsheet'
import { modernDotnetMetadata } from './metadata'
import { modernDotnetQuestions } from './questions'
import { dotnetIntroductionReference } from './questions/shared'

const modernDotnetTopic = {
  ...modernDotnetMetadata,
  cheatsheet: modernDotnetCheatSheet,
  questions: modernDotnetQuestions,
  reference: dotnetIntroductionReference,
} as const satisfies TopicDefinition

export default modernDotnetTopic
