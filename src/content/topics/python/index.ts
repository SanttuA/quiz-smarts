import type { TopicDefinition } from '../../types'
import { pythonCheatSheet } from './cheatsheet'
import { pythonMetadata } from './metadata'
import { pythonQuestions } from './questions'
import { pythonTutorialReference } from './questions/shared'

const pythonTopic = {
  ...pythonMetadata,
  cheatsheet: pythonCheatSheet,
  questions: pythonQuestions,
  reference: pythonTutorialReference,
} as const satisfies TopicDefinition

export default pythonTopic
