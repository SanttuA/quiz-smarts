import type { QuizQuestion } from '../../../types'
import { dragBlankQuestions } from './drag-blank'
import { multipleChoiceQuestions } from './multiple-choice'
import { sequenceQuestions } from './sequence'
import { textBlankQuestions } from './text-blank'

export const vitestQuestions = [
  ...multipleChoiceQuestions,
  ...textBlankQuestions,
  ...dragBlankQuestions,
  ...sequenceQuestions,
] as const satisfies readonly QuizQuestion[]
