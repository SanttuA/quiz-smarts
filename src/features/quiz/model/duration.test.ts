import { describe, expect, it } from 'vitest'
import { robotFrameworkMetadata } from '../../../content/topics/robot-framework/metadata'
import { estimateQuizMinutes } from './duration'

describe('quiz duration estimate', () => {
  it('scales the full-bank estimate to the selected question count', () => {
    expect(estimateQuizMinutes(robotFrameworkMetadata, 40)).toBe(32)
    expect(estimateQuizMinutes(robotFrameworkMetadata, 20)).toBe(16)
  })
})
