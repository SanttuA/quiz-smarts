import type { TopicDefinition } from '../../types'
import { accessibilityTestingCheatSheet } from './cheatsheet'
import { accessibilityTestingMetadata } from './metadata'
import { accessibilityTestingQuestions } from './questions'
import { accessibilityEvaluationReference } from './questions/shared'

const accessibilityTestingTopic = {
  ...accessibilityTestingMetadata,
  cheatsheet: accessibilityTestingCheatSheet,
  questions: accessibilityTestingQuestions,
  reference: accessibilityEvaluationReference,
} as const satisfies TopicDefinition

export default accessibilityTestingTopic
