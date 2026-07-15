import { describe, expect, it } from 'vitest'
import type { SequenceQuestion } from '../../types'
import playwrightTopic from '.'

describe('Playwright topic content', () => {
  it('contains ten valid questions of each supported kind', () => {
    expect(playwrightTopic.questions).toHaveLength(40)
    for (const kind of ['multiple-choice', 'text-blank', 'drag-blank', 'sequence'] as const) {
      expect(playwrightTopic.questions.filter((question) => question.kind === kind)).toHaveLength(
        10,
      )
    }
  })

  it('has unique namespaced IDs and valid official answer references', () => {
    const ids = playwrightTopic.questions.map((question) => question.id)
    expect(new Set(ids).size).toBe(ids.length)

    for (const question of playwrightTopic.questions) {
      expect(question.id).toMatch(/^playwright\./)
      expect(question.topicId).toBe(playwrightTopic.id)
      expect(question.explanation.length).toBeGreaterThan(20)
      expect(question.reference.url).toMatch(/^https:\/\/playwright\.dev\//)

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
    expect(playwrightTopic.questionCount).toBe(playwrightTopic.questions.length)
    expect(playwrightTopic.subsetQuestionCount).toBeGreaterThan(0)
    expect(playwrightTopic.subsetQuestionCount).toBeLessThan(playwrightTopic.questionCount)
    expect(playwrightTopic.cheatsheet).toHaveLength(6)
    expect(playwrightTopic.reference.url).toMatch(/^https:\/\/playwright\.dev\//)
    expect(playwrightTopic.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
