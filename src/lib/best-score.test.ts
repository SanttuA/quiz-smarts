import { describe, expect, it } from 'vitest'
import { robotFrameworkMetadata } from '../content/topics/robot-framework/metadata'
import { BEST_SCORE_STORAGE_KEY, getBestScore, saveBestScore } from './best-score'

describe('best score storage', () => {
  it('keeps separate highest scores for each quiz length', () => {
    saveBestScore(robotFrameworkMetadata, 7, 20, localStorage, '2026-07-14T10:00:00.000Z')
    saveBestScore(robotFrameworkMetadata, 5, 20, localStorage, '2026-07-14T11:00:00.000Z')
    saveBestScore(robotFrameworkMetadata, 10, 20, localStorage, '2026-07-14T12:00:00.000Z')
    saveBestScore(robotFrameworkMetadata, 31, 40, localStorage, '2026-07-14T13:00:00.000Z')

    expect(getBestScore(robotFrameworkMetadata, 20, localStorage)).toMatchObject({
      correct: 10,
      total: 20,
      completedAt: '2026-07-14T12:00:00.000Z',
    })
    expect(getBestScore(robotFrameworkMetadata, 40, localStorage)).toMatchObject({
      correct: 31,
      total: 40,
      completedAt: '2026-07-14T13:00:00.000Z',
    })
  })

  it('ignores malformed and stale-version data', () => {
    localStorage.setItem(BEST_SCORE_STORAGE_KEY, '{broken')
    expect(getBestScore(robotFrameworkMetadata, 20, localStorage)).toBeUndefined()

    saveBestScore(robotFrameworkMetadata, 8, 20, localStorage)
    expect(
      getBestScore({ ...robotFrameworkMetadata, contentVersion: 4 }, 20, localStorage),
    ).toBeUndefined()
  })

  it('ignores the legacy single-score store', () => {
    localStorage.setItem(
      'quiz-smarts:best-scores:v1',
      JSON.stringify({ version: 1, scores: { 'robot-framework': { correct: 20 } } }),
    )

    expect(getBestScore(robotFrameworkMetadata, 20, localStorage)).toBeUndefined()
  })
})
