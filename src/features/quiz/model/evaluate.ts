import type { QuizQuestion } from '../../../content/types'
import type { QuizResponse } from './responses'

export function normalizeTextAnswer(answer: string): string {
  return answer.trim().toLocaleLowerCase('en').replace(/\s+/gu, ' ')
}

export function evaluateResponse(question: QuizQuestion, response: QuizResponse): boolean {
  switch (question.kind) {
    case 'multiple-choice':
      return response.kind === question.kind && response.choiceId === question.correctChoiceId
    case 'text-blank':
      return (
        response.kind === question.kind &&
        question.acceptedAnswers.some(
          (acceptedAnswer) =>
            normalizeTextAnswer(acceptedAnswer) === normalizeTextAnswer(response.answer),
        )
      )
    case 'drag-blank':
      return response.kind === question.kind && response.optionId === question.correctOptionId
    case 'sequence': {
      if (response.kind !== question.kind) return false

      const validOrders = [question.correctOrder, ...(question.acceptedOrders ?? [])]
      return validOrders.some(
        (order) =>
          response.itemIds.length === order.length &&
          response.itemIds.every((itemId, index) => itemId === order[index]),
      )
    }
  }
}

export function formatCorrectAnswer(question: QuizQuestion): string {
  switch (question.kind) {
    case 'multiple-choice':
      return question.choices.find((choice) => choice.id === question.correctChoiceId)?.label ?? ''
    case 'text-blank':
      return question.canonicalAnswer
    case 'drag-blank':
      return question.options.find((option) => option.id === question.correctOptionId)?.label ?? ''
    case 'sequence':
      return question.correctOrder
        .map((itemId) => question.items.find((item) => item.id === itemId)?.code ?? '')
        .join('\n')
  }
}

export function formatResponse(question: QuizQuestion, response: QuizResponse): string {
  switch (response.kind) {
    case 'multiple-choice':
      return question.kind === response.kind
        ? (question.choices.find((choice) => choice.id === response.choiceId)?.label ?? '')
        : ''
    case 'text-blank':
      return response.answer
    case 'drag-blank':
      return question.kind === response.kind
        ? (question.options.find((option) => option.id === response.optionId)?.label ?? '')
        : ''
    case 'sequence':
      return question.kind === response.kind
        ? response.itemIds
            .map((itemId) => question.items.find((item) => item.id === itemId)?.code ?? '')
            .join('\n')
        : ''
  }
}
