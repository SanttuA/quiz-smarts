import { describe, expect, it } from 'vitest'
import { robotFrameworkQuestions } from '../../../content/topics/robot-framework/questions'
import { createInitialResponse, hasResponse } from './responses'

describe('quiz responses', () => {
  it('treats empty or whitespace-only answers as unanswered', () => {
    expect(hasResponse(undefined)).toBe(false)
    expect(hasResponse({ kind: 'text-blank', answer: '   ' })).toBe(false)
    expect(hasResponse({ kind: 'multiple-choice', choiceId: '' })).toBe(false)
    expect(hasResponse({ kind: 'drag-blank', optionId: '' })).toBe(false)
    expect(hasResponse({ kind: 'sequence', itemIds: [] })).toBe(false)
  })

  it('treats a chosen or written answer as answered', () => {
    expect(hasResponse({ kind: 'text-blank', answer: ' robot ' })).toBe(true)
    expect(hasResponse({ kind: 'multiple-choice', choiceId: 'two-spaces' })).toBe(true)
    expect(hasResponse({ kind: 'drag-blank', optionId: 'library' })).toBe(true)
    expect(hasResponse({ kind: 'sequence', itemIds: ['for'] })).toBe(true)
  })

  it('starts sequences in their presented order and other kinds unanswered', () => {
    for (const question of robotFrameworkQuestions) {
      const initial = createInitialResponse(question)
      if (question.kind === 'sequence') {
        expect(initial).toEqual({
          kind: 'sequence',
          itemIds: question.items.map((item) => item.id),
        })
      } else {
        expect(initial).toBeUndefined()
      }
    }
  })
})
