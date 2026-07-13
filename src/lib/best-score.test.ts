import { describe, expect, it } from 'vitest'
import { robotFrameworkMetadata } from '../content/topics/robot-framework/metadata'
import { BEST_SCORE_STORAGE_KEY, getBestScore, saveBestScore } from './best-score'

describe('best score storage', () => {
  it('keeps the highest completed score', () => {
    saveBestScore(robotFrameworkMetadata, 7, localStorage, '2026-07-13T10:00:00.000Z')
    saveBestScore(robotFrameworkMetadata, 5, localStorage, '2026-07-13T11:00:00.000Z')
    saveBestScore(robotFrameworkMetadata, 10, localStorage, '2026-07-13T12:00:00.000Z')

    expect(getBestScore(robotFrameworkMetadata, localStorage)).toMatchObject({
      correct: 10,
      total: 12,
      completedAt: '2026-07-13T12:00:00.000Z',
    })
  })

  it('ignores malformed and stale-version data', () => {
    localStorage.setItem(BEST_SCORE_STORAGE_KEY, '{broken')
    expect(getBestScore(robotFrameworkMetadata, localStorage)).toBeUndefined()

    saveBestScore(robotFrameworkMetadata, 8, localStorage)
    expect(
      getBestScore({ ...robotFrameworkMetadata, contentVersion: 2 }, localStorage),
    ).toBeUndefined()
  })
})
