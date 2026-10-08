import { describe, expect, it } from 'vitest'
import { robotFrameworkMetadata } from '../../../content/topics/robot-framework/metadata'
import { estimateQuizMinutes } from './duration'

describe('quiz duration estimate', () => {
  it('scales the full-bank estimate to the selected question count', () => {
    expect(estimateQuizMinutes(robotFrameworkMetadata, 40)).toBe(32)
    expect(estimateQuizMinutes(robotFrameworkMetadata, 20)).toBe(16)
  })

  it('never rounds a non-empty quiz down to zero minutes', () => {
    expect(estimateQuizMinutes({ estimatedMinutes: 10, questionCount: 40 }, 1)).toBe(1)
  })

  it('returns zero for empty quizzes or empty banks', () => {
    expect(estimateQuizMinutes(robotFrameworkMetadata, 0)).toBe(0)
    expect(estimateQuizMinutes({ estimatedMinutes: 10, questionCount: 0 }, 5)).toBe(0)
  })
})
