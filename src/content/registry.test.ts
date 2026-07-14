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
})
