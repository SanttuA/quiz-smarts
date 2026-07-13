import { describe, expect, it } from 'vitest'
import robotFrameworkTopic from '.'

describe('Robot Framework topic content', () => {
  it('contains five valid questions of each supported kind', () => {
    expect(robotFrameworkTopic.questions).toHaveLength(20)
    for (const kind of ['multiple-choice', 'text-blank', 'drag-blank', 'sequence'] as const) {
      expect(
        robotFrameworkTopic.questions.filter((question) => question.kind === kind),
      ).toHaveLength(5)
    }
  })

  it('has globally unique IDs and valid answer references', () => {
    const ids = robotFrameworkTopic.questions.map((question) => question.id)
    expect(new Set(ids).size).toBe(ids.length)

    for (const question of robotFrameworkTopic.questions) {
      expect(question.topicId).toBe(robotFrameworkTopic.id)
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
        expect(new Set(question.correctOrder)).toEqual(
          new Set(question.items.map((item) => item.id)),
        )
      }
    }
  })

  it('keeps metadata and reference material in sync', () => {
    expect(robotFrameworkTopic.questionCount).toBe(robotFrameworkTopic.questions.length)
    expect(robotFrameworkTopic.cheatsheet).toHaveLength(6)
    expect(robotFrameworkTopic.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
