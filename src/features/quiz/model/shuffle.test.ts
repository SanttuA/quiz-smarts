import { describe, expect, it } from 'vitest'
import { robotFrameworkQuestions } from '../../../content/topics/robot-framework/questions'
import { createSeededRandom } from './random'
import { fisherYates, prepareAttempt, prepareQuestion } from './shuffle'

describe('shuffle preparation', () => {
  it('is deterministic with an injected seeded source and does not mutate input', () => {
    const values = [1, 2, 3, 4, 5]
    const first = fisherYates(values, createSeededRandom('same-seed'))
    const second = fisherYates(values, createSeededRandom('same-seed'))

    expect(first).toEqual(second)
    expect(first).not.toEqual(values)
    expect(values).toEqual([1, 2, 3, 4, 5])
  })

  it('prepares cloned questions and shuffled option banks', () => {
    const originalIds = robotFrameworkQuestions.map((question) => question.id)
    const prepared = prepareAttempt(robotFrameworkQuestions, createSeededRandom('attempt'))

    expect(prepared).not.toBe(robotFrameworkQuestions)
    expect(prepared.map((question) => question.id).sort()).toEqual([...originalIds].sort())
    expect(robotFrameworkQuestions.map((question) => question.id)).toEqual(originalIds)
  })

  it('rotates a sequence if the random result leaves it already solved', () => {
    const sequence = robotFrameworkQuestions.find(
      (question) => question.id === 'robot-framework.sequence.for-loop',
    )
    if (!sequence || sequence.kind !== 'sequence') throw new Error('Missing sequence fixture')

    const prepared = prepareQuestion(sequence, () => 0.999999)
    if (prepared.kind !== 'sequence') throw new Error('Question kind changed')

    expect(prepared.items.map((item) => item.id)).not.toEqual(sequence.correctOrder)
    expect(sequence.items.map((item) => item.id)).toEqual(sequence.correctOrder)
  })
})
