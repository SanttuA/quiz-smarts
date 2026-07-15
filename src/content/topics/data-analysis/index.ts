import type { TopicDefinition } from '../../types'
import { dataAnalysisCheatSheet } from './cheatsheet'
import { dataAnalysisMetadata } from './metadata'
import { dataAnalysisQuestions } from './questions'
import { exploratoryDataAnalysisReference } from './questions/shared'

const dataAnalysisTopic = {
  ...dataAnalysisMetadata,
  cheatsheet: dataAnalysisCheatSheet,
  questions: dataAnalysisQuestions,
  reference: exploratoryDataAnalysisReference,
} as const satisfies TopicDefinition

export default dataAnalysisTopic
