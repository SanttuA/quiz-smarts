import { describe, expect, it } from 'vitest'
import type { SequenceQuestion } from '../../types'
import seleniumTopic from '.'

describe('Selenium topic content', () => {
  it('contains ten valid questions of each supported kind', () => {
    expect(seleniumTopic.questions).toHaveLength(40)
    for (const kind of ['multiple-choice', 'text-blank', 'drag-blank', 'sequence'] as const) {
      expect(seleniumTopic.questions.filter((question) => question.kind === kind)).toHaveLength(10)
    }
  })

  it('has unique namespaced IDs and valid official answer references', () => {
    const ids = seleniumTopic.questions.map((question) => question.id)
    expect(new Set(ids).size).toBe(ids.length)

    for (const question of seleniumTopic.questions) {
      expect(question.id).toMatch(/^selenium\./)
      expect(question.topicId).toBe(seleniumTopic.id)
      expect(question.explanation.length).toBeGreaterThan(20)
      expect(question.reference.url).toMatch(/^https:\/\/www\.selenium\.dev\//)

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
    expect(seleniumTopic.questionCount).toBe(seleniumTopic.questions.length)
    expect(seleniumTopic.subsetQuestionCount).toBeGreaterThan(0)
    expect(seleniumTopic.subsetQuestionCount).toBeLessThan(seleniumTopic.questionCount)
    expect(seleniumTopic.cheatsheet).toHaveLength(6)
    expect(seleniumTopic.reference.url).toMatch(/^https:\/\/www\.selenium\.dev\//)
    expect(seleniumTopic.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
