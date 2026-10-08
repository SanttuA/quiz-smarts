import { describe, expect, it } from 'vitest'
import { pythonMetadata } from '../content/topics/python/metadata'
import { robotFrameworkMetadata } from '../content/topics/robot-framework/metadata'
import { BEST_SCORE_STORAGE_KEY, getBestScore, saveBestScore } from './best-score'

function createMemoryStorage(): Storage {
  const values = new Map<string, string>()
  return {
    get length() {
      return values.size
    },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value),
  }
}

describe('best score storage', () => {
  it('keeps separate highest scores for each quiz length', () => {
    const storage = createMemoryStorage()
    saveBestScore(robotFrameworkMetadata, 7, 20, storage, '2026-07-14T10:00:00.000Z')
    saveBestScore(robotFrameworkMetadata, 5, 20, storage, '2026-07-14T11:00:00.000Z')
    saveBestScore(robotFrameworkMetadata, 10, 20, storage, '2026-07-14T12:00:00.000Z')
    saveBestScore(robotFrameworkMetadata, 31, 40, storage, '2026-07-14T13:00:00.000Z')

    expect(getBestScore(robotFrameworkMetadata, 20, storage)).toMatchObject({
      correct: 10,
      total: 20,
      completedAt: '2026-07-14T12:00:00.000Z',
    })
    expect(getBestScore(robotFrameworkMetadata, 40, storage)).toMatchObject({
      correct: 31,
      total: 40,
      completedAt: '2026-07-14T13:00:00.000Z',
    })
  })

  it('keeps each topic’s scores independent', () => {
    const storage = createMemoryStorage()
    saveBestScore(robotFrameworkMetadata, 18, 20, storage)
    saveBestScore(pythonMetadata, 4, 20, storage)

    expect(getBestScore(robotFrameworkMetadata, 20, storage)?.correct).toBe(18)
    expect(getBestScore(pythonMetadata, 20, storage)?.correct).toBe(4)
  })

  it('replaces a higher score from older content with a newer lower score', () => {
    const storage = createMemoryStorage()
    saveBestScore(robotFrameworkMetadata, 20, 20, storage)
    const revisedTopic = {
      ...robotFrameworkMetadata,
      contentVersion: robotFrameworkMetadata.contentVersion + 1,
    }

    expect(saveBestScore(revisedTopic, 12, 20, storage).correct).toBe(12)
    expect(getBestScore(revisedTopic, 20, storage)?.correct).toBe(12)
  })

  it('ignores malformed and stale-version data', () => {
    const storage = createMemoryStorage()
    storage.setItem(BEST_SCORE_STORAGE_KEY, '{broken')
    expect(getBestScore(robotFrameworkMetadata, 20, storage)).toBeUndefined()

    saveBestScore(robotFrameworkMetadata, 8, 20, storage)
    expect(
      getBestScore(
        { ...robotFrameworkMetadata, contentVersion: robotFrameworkMetadata.contentVersion + 1 },
        20,
        storage,
      ),
    ).toBeUndefined()
  })

  it('drops invalid entries while keeping valid ones from the same store', () => {
    const storage = createMemoryStorage()
    storage.setItem(
      BEST_SCORE_STORAGE_KEY,
      JSON.stringify({
        version: 2,
        scores: {
          'robot-framework': {
            '20': { topicId: 'robot-framework', correct: '20' },
            '40': {
              topicId: 'robot-framework',
              contentVersion: robotFrameworkMetadata.contentVersion,
              correct: 30,
              total: 40,
              completedAt: '2026-07-14T13:00:00.000Z',
            },
          },
          python: 'not an object',
        },
      }),
    )

    expect(getBestScore(robotFrameworkMetadata, 20, storage)).toBeUndefined()
    expect(getBestScore(robotFrameworkMetadata, 40, storage)?.correct).toBe(30)
    expect(getBestScore(pythonMetadata, 20, storage)).toBeUndefined()
  })

  it('ignores the legacy single-score store', () => {
    const storage = createMemoryStorage()
    storage.setItem(
      'quiz-smarts:best-scores:v1',
      JSON.stringify({ version: 1, scores: { 'robot-framework': { correct: 20 } } }),
    )

    expect(getBestScore(robotFrameworkMetadata, 20, storage)).toBeUndefined()
  })

  it('still returns the score when storage is blocked or full', () => {
    const blockedStorage = {
      ...createMemoryStorage(),
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('quota exceeded')
      },
    }

    expect(saveBestScore(robotFrameworkMetadata, 9, 20, blockedStorage)).toMatchObject({
      correct: 9,
      total: 20,
    })
    expect(getBestScore(robotFrameworkMetadata, 20, blockedStorage)).toBeUndefined()
  })

  it('works without any storage', () => {
    expect(saveBestScore(robotFrameworkMetadata, 9, 20, undefined).correct).toBe(9)
    expect(getBestScore(robotFrameworkMetadata, 20, undefined)).toBeUndefined()
  })
})
