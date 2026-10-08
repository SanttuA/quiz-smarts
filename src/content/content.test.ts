import { describe, expect, it } from 'vitest'
import { evaluateResponse } from '../features/quiz/model/evaluate'
import { createSeededRandom } from '../features/quiz/model/random'
import { isValidSequenceOrder } from '../features/quiz/model/sequence-order'
import { prepareQuestion } from '../features/quiz/model/shuffle'
import { loadTopic, topicCatalog } from './registry'
import type { TopicDefinition } from './types'

const topics = await Promise.all(
  topicCatalog.map(async (metadata) => {
    const topic = await loadTopic(metadata.slug)
    if (!topic) throw new Error(`Missing topic: ${metadata.slug}`)
    return topic
  }),
)

// Topics whose links must point at their official documentation site.
const officialReferencePatterns: Partial<Record<string, RegExp>> = {
  jmeter: /^https:\/\/jmeter\.apache\.org\//,
  playwright: /^https:\/\/playwright\.dev\//,
  selenium: /^https:\/\/www\.selenium\.dev\//,
  vitest: /^https:\/\/(vitest\.dev|testing-library\.com)\//,
}

function expectUnique(values: readonly string[]) {
  expect(new Set(values).size).toBe(values.length)
}

describe.each(topics.map((topic) => [topic.title, topic] as const))(
  '%s topic content',
  (_title, topic: TopicDefinition) => {
    const referencePattern = officialReferencePatterns[topic.slug] ?? /^https:\/\//

    it('contains ten questions of each supported kind', () => {
      expect(topic.questions).toHaveLength(40)
      for (const kind of ['multiple-choice', 'text-blank', 'drag-blank', 'sequence'] as const) {
        expect(topic.questions.filter((question) => question.kind === kind)).toHaveLength(10)
      }
    })

    it('keeps metadata in sync with the question bank', () => {
      expect(topic.questionCount).toBe(topic.questions.length)
      expect(topic.subsetQuestionCount).toBeGreaterThan(0)
      expect(topic.subsetQuestionCount).toBeLessThan(topic.questionCount)
      expect(topic.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(topic.reference.url).toMatch(referencePattern)
    })

    it('namespaces question IDs and links each question to a reference', () => {
      expectUnique(topic.questions.map((question) => question.id))

      for (const question of topic.questions) {
        expect(question.id.startsWith(`${topic.slug}.`)).toBe(true)
        expect(question.topicId).toBe(topic.id)
        expect(question.explanation.length).toBeGreaterThan(20)
        expect(question.reference.url).toMatch(referencePattern)
      }
    })

    it('gives every question a reachable, unambiguous correct answer', () => {
      for (const question of topic.questions) {
        switch (question.kind) {
          case 'multiple-choice':
            expectUnique(question.choices.map((choice) => choice.id))
            expectUnique(question.choices.map((choice) => choice.label))
            expect(question.choices.map((choice) => choice.id)).toContain(question.correctChoiceId)
            break
          case 'drag-blank':
            expectUnique(question.options.map((option) => option.id))
            expectUnique(question.options.map((option) => option.label))
            expect(question.options.map((option) => option.id)).toContain(question.correctOptionId)
            break
          case 'text-blank':
            expect(question.acceptedAnswers).toContain(question.canonicalAnswer)
            expect(
              evaluateResponse(question, { kind: 'text-blank', answer: question.canonicalAnswer }),
            ).toBe(true)
            break
          case 'sequence': {
            const itemIds = new Set(question.items.map((item) => item.id))
            const validOrders = [question.correctOrder, ...(question.acceptedOrders ?? [])]

            expectUnique(question.items.map((item) => item.id))
            expectUnique(validOrders.map((order) => JSON.stringify(order)))
            for (const order of validOrders) {
              expect(order).toHaveLength(question.items.length)
              expect(new Set(order)).toEqual(itemIds)
              expect(isValidSequenceOrder(order, question)).toBe(true)
            }

            const positions = new Map(question.correctOrder.map((itemId, index) => [itemId, index]))
            for (const [beforeItemId, afterItemId] of question.requiredOrderPairs ?? []) {
              expect(itemIds.has(beforeItemId)).toBe(true)
              expect(itemIds.has(afterItemId)).toBe(true)
              expect(beforeItemId).not.toBe(afterItemId)
              expect(positions.get(beforeItemId)).toBeLessThan(positions.get(afterItemId) ?? -1)
            }
            break
          }
        }
      }
    })

    it('never starts a sequence question already solved', () => {
      for (const question of topic.questions) {
        if (question.kind !== 'sequence') continue

        for (const seed of ['a', 'b', 'c', 'd', 'e']) {
          const prepared = prepareQuestion(question, createSeededRandom(seed))
          if (prepared.kind !== 'sequence') throw new Error('Question kind changed')
          expect(
            isValidSequenceOrder(
              prepared.items.map((item) => item.id),
              question,
            ),
          ).toBe(false)
        }
      }
    })

    it('has six cheatsheet sections with valid references', () => {
      expect(topic.cheatsheet).toHaveLength(6)
      expectUnique(topic.cheatsheet.map((section) => section.id))

      for (const section of topic.cheatsheet) {
        const references = section.references ?? []
        expectUnique(references.map((reference) => reference.url))
        for (const reference of references) {
          expect(reference.label.length).toBeGreaterThan(0)
          expect(reference.url).toMatch(/^https:\/\//)
        }
      }
    })
  },
)
