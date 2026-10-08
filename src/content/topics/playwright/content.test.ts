import { describe, expect, it } from 'vitest'
import playwrightTopic from '.'

describe('Playwright topic content', () => {
  it('does not claim project array order controls execution order', () => {
    const projectQuestion = playwrightTopic.questions.find(
      (question) => question.id === 'playwright.sequence-browser-projects',
    )
    expect(projectQuestion?.prompt).toContain('lists Chromium before Firefox')
    expect(projectQuestion?.explanation).toContain('does not guarantee project execution order')

    const loginQuestion = playwrightTopic.questions.find(
      (question) => question.id === 'playwright.sequence.login-flow',
    )
    expect(loginQuestion?.kind).toBe('sequence')
    if (loginQuestion?.kind === 'sequence') {
      expect(loginQuestion.acceptedOrders).toContainEqual([
        'goto',
        'password',
        'email',
        'submit',
        'url',
      ])
    }
  })
})
