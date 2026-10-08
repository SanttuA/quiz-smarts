import { describe, expect, it } from 'vitest'
import { createSeededRandom } from './random'

function take(seed: string, count: number) {
  const random = createSeededRandom(seed)
  return Array.from({ length: count }, () => random())
}

describe('seeded random source', () => {
  it('repeats the same sequence for the same seed', () => {
    expect(take('quiz-smarts-e2e', 20)).toEqual(take('quiz-smarts-e2e', 20))
  })

  it('produces different sequences for different seeds', () => {
    expect(take('first', 20)).not.toEqual(take('second', 20))
  })

  it('stays within the half-open unit interval', () => {
    for (const value of take('range', 1000)) {
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThan(1)
    }
  })
})
