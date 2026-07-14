import { describe, expect, it } from 'vitest'
import type { SequenceQuestion } from '../../types'
import accessibilityTestingTopic from '.'

describe('Accessibility Testing topic content', () => {
  it('contains ten valid questions of each supported kind', () => {
    expect(accessibilityTestingTopic.questions).toHaveLength(40)
    for (const kind of ['multiple-choice', 'text-blank', 'drag-blank', 'sequence'] as const) {
      expect(
        accessibilityTestingTopic.questions.filter((question) => question.kind === kind),
      ).toHaveLength(10)
    }
  })

  it('has unique IDs and valid answer references', () => {
    const ids = accessibilityTestingTopic.questions.map((question) => question.id)
    expect(new Set(ids).size).toBe(ids.length)

    for (const question of accessibilityTestingTopic.questions) {
      expect(question.topicId).toBe(accessibilityTestingTopic.id)
      expect(question.explanation.length).toBeGreaterThan(20)
      expect(question.reference.url).toMatch(/^https:\/\//)

      if (question.kind === 'multiple-choice') {
        expect(question.choices.some((choice) => choice.id === question.correctChoiceId)).toBe(true)
      }
      if (question.kind === 'drag-blank') {
        expect(question.options.some((option) => option.id === question.correctOptionId)).toBe(true)
      }
      if (question.kind === 'text-blank') {
        expect(question.acceptedAnswers).toContain(question.canonicalAnswer)
      }
      if (question.kind === 'sequence') {
        const itemIds = new Set(question.items.map((item) => item.id))
        const { acceptedOrders = [] } = question as SequenceQuestion
        const validOrders = [question.correctOrder, ...acceptedOrders]

        for (const order of validOrders) {
          expect(order).toHaveLength(question.items.length)
          expect(new Set(order)).toEqual(itemIds)
          expect(new Set(order).size).toBe(order.length)
        }
        expect(new Set(validOrders.map((order) => JSON.stringify(order))).size).toBe(
          validOrders.length,
        )
      }
    }
  })

  it('keeps metadata and reference material in sync', () => {
    expect(accessibilityTestingTopic.questionCount).toBe(accessibilityTestingTopic.questions.length)
    expect(accessibilityTestingTopic.subsetQuestionCount).toBeGreaterThan(0)
    expect(accessibilityTestingTopic.subsetQuestionCount).toBeLessThan(
      accessibilityTestingTopic.questionCount,
    )
    expect(accessibilityTestingTopic.cheatsheet).toHaveLength(6)
    expect(accessibilityTestingTopic.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
