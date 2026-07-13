import type { QuizQuestion } from '../../../content/types'

export type QuizResponse =
  | { kind: 'multiple-choice'; choiceId: string }
  | { kind: 'text-blank'; answer: string }
  | { kind: 'drag-blank'; optionId: string }
  | { kind: 'sequence'; itemIds: string[] }

export function createInitialResponse(question: QuizQuestion): QuizResponse | undefined {
  if (question.kind === 'sequence') {
    return { kind: 'sequence', itemIds: question.items.map((item) => item.id) }
  }

  return undefined
}

export function hasResponse(response: QuizResponse | undefined): response is QuizResponse {
  if (!response) return false
  if (response.kind === 'text-blank') return response.answer.trim().length > 0
  if (response.kind === 'sequence') return response.itemIds.length > 0
  return true
}
