import { describe, expect, it } from 'vitest'
import { loadTopic, topicCatalog } from './registry'
import type { TopicCategory } from './types'

describe('topic registry', () => {
  it('assigns every topic to the expected searchable categories', () => {
    const categories = [
      'programming',
      'test-automation',
      'quality',
      'data',
    ] as const satisfies readonly TopicCategory[]
    const topicsByCategory = Object.fromEntries(
      categories.map((category) => [
        category,
        topicCatalog
          .filter((topic) => (topic.categories as readonly TopicCategory[]).includes(category))
          .map((topic) => topic.slug),
      ]),
    )

    expect(topicsByCategory).toEqual({
      programming: ['python', 'cpp-basics', 'csharp-basics', 'modern-dotnet', 'typescript'],
      'test-automation': [
        'robot-framework',
        'accessibility-testing',
        'vitest',
        'playwright',
        'selenium',
        'jmeter',
      ],
      quality: ['accessibility-testing', 'jmeter'],
      data: ['data-analysis'],
    })

    for (const topic of topicCatalog) {
      expect(topic.categories.length).toBeGreaterThan(0)
      expect(new Set(topic.categories).size).toBe(topic.categories.length)
    }
  })

  it('loads every catalog topic and keeps question IDs globally unique', async () => {
    const topics = await Promise.all(topicCatalog.map((metadata) => loadTopic(metadata.slug)))

    expect(topics.every(Boolean)).toBe(true)
    const questions = topics.flatMap((topic) => topic?.questions ?? [])
    const questionIds = questions.map((question) => question.id)

    expect(new Set(questionIds).size).toBe(questionIds.length)
    expect(new Set(topicCatalog.map((topic) => topic.slug)).size).toBe(topicCatalog.length)
  })

  it('keeps catalog metadata identical to the loaded topic definitions', async () => {
    for (const metadata of topicCatalog) {
      const topic = await loadTopic(metadata.slug)
      expect(topic).toMatchObject(metadata)
    }
  })

  it('returns nothing for unknown slugs', async () => {
    await expect(loadTopic('not-real')).resolves.toBeUndefined()
  })
})
