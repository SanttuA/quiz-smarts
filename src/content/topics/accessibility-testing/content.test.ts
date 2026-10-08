import { describe, expect, it } from 'vitest'
import accessibilityTestingTopic from '.'

describe('Accessibility Testing topic content', () => {
  it('uses direct keyboard-trap and modal-dialog references', () => {
    const trapQuestion = accessibilityTestingTopic.questions.find(
      (question) => question.id === 'accessibility-testing.mcq.keyboard-trap',
    )
    const dialogQuestion = accessibilityTestingTopic.questions.find(
      (question) => question.id === 'accessibility-testing.sequence.dialog-focus',
    )

    expect(trapQuestion?.reference.url).toContain('/Understanding/no-keyboard-trap.html')
    expect(dialogQuestion?.reference.url).toContain('/patterns/dialog-modal/')
    expect(
      accessibilityTestingTopic.cheatsheet.every(
        (section) => section.references && section.references.length > 0,
      ),
    ).toBe(true)
  })
})
