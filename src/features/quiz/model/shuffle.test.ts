import { describe, expect, it } from 'vitest'
import type { QuizQuestion, SequenceQuestion } from '../../../content/types'
import { accessibilityTestingQuestions } from '../../../content/topics/accessibility-testing/questions'
import { pythonQuestions } from '../../../content/topics/python/questions'
import { robotFrameworkQuestions } from '../../../content/topics/robot-framework/questions'
import { createSeededRandom } from './random'
import { isValidSequenceOrder } from './sequence-order'
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

    expect(prepared.map((question) => question.id).sort()).toEqual([...originalIds].sort())
    expect(prepared.map((question) => question.id)).not.toEqual(originalIds)
    expect(robotFrameworkQuestions.map((question) => question.id)).toEqual(originalIds)

    let reorderedOptionBanks = 0
    for (const preparedQuestion of prepared) {
      const original = robotFrameworkQuestions.find(
        (question) => question.id === preparedQuestion.id,
      )!
      expect(preparedQuestion).not.toBe(original)

      const optionIds = (question: QuizQuestion) =>
        question.kind === 'multiple-choice'
          ? question.choices.map((choice) => choice.id)
          : question.kind === 'drag-blank'
            ? question.options.map((option) => option.id)
            : []
      const preparedOptionIds = optionIds(preparedQuestion)
      const originalOptionIds = optionIds(original)
      expect([...preparedOptionIds].sort()).toEqual([...originalOptionIds].sort())
      if (preparedOptionIds.join() !== originalOptionIds.join()) reorderedOptionBanks += 1
    }
    expect(reorderedOptionBanks).toBeGreaterThan(0)
  })

  it('clamps the requested question count to the available bank', () => {
    const random = createSeededRandom('clamp')

    expect(prepareAttempt(robotFrameworkQuestions, random, 0)).toEqual([])
    expect(prepareAttempt(robotFrameworkQuestions, random, -3)).toEqual([])
    expect(prepareAttempt(robotFrameworkQuestions, random, 4.9)).toHaveLength(4)
    expect(prepareAttempt(robotFrameworkQuestions, random, 100)).toHaveLength(
      robotFrameworkQuestions.length,
    )
  })

  it('selects a deterministic subset balanced across question kinds', () => {
    const originalIds = robotFrameworkQuestions.map((question) => question.id)
    const first = prepareAttempt(robotFrameworkQuestions, createSeededRandom('subset'), 20)
    const second = prepareAttempt(robotFrameworkQuestions, createSeededRandom('subset'), 20)

    expect(first.map((question) => question.id)).toEqual(second.map((question) => question.id))
    expect(first).toHaveLength(20)
    for (const kind of ['multiple-choice', 'text-blank', 'drag-blank', 'sequence'] as const) {
      expect(first.filter((question) => question.kind === kind)).toHaveLength(5)
    }
    expect(robotFrameworkQuestions.map((question) => question.id)).toEqual(originalIds)
  })

  it('fills a subset when future topics have uneven question-kind counts', () => {
    const unevenQuestions = [
      ...robotFrameworkQuestions
        .filter((question) => question.kind === 'multiple-choice')
        .slice(0, 3),
      ...robotFrameworkQuestions.filter((question) => question.kind === 'text-blank').slice(0, 1),
      ...robotFrameworkQuestions.filter((question) => question.kind === 'drag-blank').slice(0, 1),
    ]
    const prepared = prepareAttempt(unevenQuestions, createSeededRandom('uneven'), 4)

    expect(prepared).toHaveLength(4)
    expect(prepared.filter((question) => question.kind === 'multiple-choice')).toHaveLength(2)
    expect(prepared.filter((question) => question.kind === 'text-blank')).toHaveLength(1)
    expect(prepared.filter((question) => question.kind === 'drag-blank')).toHaveLength(1)
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

  it('does not present an alternate accepted order as the shuffled starting state', () => {
    const sequence = pythonQuestions.find(
      (question) => question.id === 'python.sequence.running-total',
    )
    if (!sequence || sequence.kind !== 'sequence') throw new Error('Missing sequence fixture')

    const randomValues = [0.999999, 0.999999, 0.999999, 0]
    const prepared = prepareQuestion(sequence, () => randomValues.shift() ?? 0.999999)
    if (prepared.kind !== 'sequence') throw new Error('Question kind changed')

    const preparedOrder = prepared.items.map((item) => item.id)
    const validOrders = [sequence.correctOrder, ...(sequence.acceptedOrders ?? [])]
    expect(validOrders).not.toContainEqual(preparedOrder)
  })

  it('does not present a valid partial-order workflow as the shuffled starting state', () => {
    const sequence = accessibilityTestingQuestions.find(
      (question) => question.id === 'accessibility-testing.sequence.form-error',
    )
    if (!sequence || sequence.kind !== 'sequence') throw new Error('Missing sequence fixture')

    const prepared = prepareQuestion(sequence, () => 0.999999)
    if (prepared.kind !== 'sequence') throw new Error('Question kind changed')

    expect(
      isValidSequenceOrder(
        prepared.items.map((item) => item.id),
        sequence,
      ),
    ).toBe(false)
  })

  it('swaps items when every rotation of the shuffle is also accepted', () => {
    const sequence: SequenceQuestion = {
      ...robotFrameworkQuestions.find((question) => question.kind === 'sequence')!,
      kind: 'sequence',
      items: [
        { id: 'a', code: 'a' },
        { id: 'b', code: 'b' },
        { id: 'c', code: 'c' },
      ],
      correctOrder: ['a', 'b', 'c'],
      acceptedOrders: [
        ['b', 'c', 'a'],
        ['c', 'a', 'b'],
      ],
    }

    // Always picking the top index keeps the original, solved order.
    const prepared = prepareQuestion(sequence, () => 0.999999)
    if (prepared.kind !== 'sequence') throw new Error('Question kind changed')

    const preparedOrder = prepared.items.map((item) => item.id)
    expect(preparedOrder).toEqual(['b', 'a', 'c'])
    expect(isValidSequenceOrder(preparedOrder, sequence)).toBe(false)
  })
})
