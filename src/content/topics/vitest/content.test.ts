import { describe, expect, it } from 'vitest'
import vitestTopic from '.'

describe('Vitest topic content', () => {
  it('keeps the introductory sum test self-contained', () => {
    const question = vitestTopic.questions.find(
      (candidate) => candidate.id === 'vitest.sequence-first-unit-test',
    )
    expect(question?.kind).toBe('sequence')
    if (question?.kind === 'sequence') {
      expect(question.items.map((item) => item.code)).toContain("import { sum } from './sum'")
    }
    expect(
      vitestTopic.cheatsheet.every(
        (section) => section.references && section.references.length > 0,
      ),
    ).toBe(true)
  })
})
