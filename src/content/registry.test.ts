import { describe, expect, it } from 'vitest'
import { loadTopic, topicCatalog } from './registry'

describe('topic registry', () => {
  it('loads every catalog topic and keeps question IDs globally unique', async () => {
    const topics = await Promise.all(topicCatalog.map((metadata) => loadTopic(metadata.slug)))

    expect(topics.every(Boolean)).toBe(true)
    const questions = topics.flatMap((topic) => topic?.questions ?? [])
    const questionIds = questions.map((question) => question.id)

    expect(new Set(questionIds).size).toBe(questionIds.length)
  })

  it('keeps partial-order sequence rules and cheat-sheet references valid', async () => {
    const topics = await Promise.all(topicCatalog.map((metadata) => loadTopic(metadata.slug)))

    for (const topic of topics) {
      if (!topic) continue

      for (const section of topic.cheatsheet) {
        const references = section.references ?? []
        expect(new Set(references.map((reference) => reference.url)).size).toBe(references.length)
        for (const reference of references) {
          expect(reference.label.length).toBeGreaterThan(0)
          expect(reference.url).toMatch(/^https:\/\//)
        }
      }

      for (const question of topic.questions) {
        if (question.kind !== 'sequence') continue

        const itemIds = new Set(question.items.map((item) => item.id))
        const positions = new Map(question.correctOrder.map((itemId, index) => [itemId, index]))
        for (const [beforeItemId, afterItemId] of question.requiredOrderPairs ?? []) {
          expect(itemIds.has(beforeItemId)).toBe(true)
          expect(itemIds.has(afterItemId)).toBe(true)
          expect(beforeItemId).not.toBe(afterItemId)
          expect(positions.get(beforeItemId)).toBeLessThan(positions.get(afterItemId) ?? -1)
        }
      }
    }
  })
})
