import { describe, expect, it } from 'vitest'
import { robotFrameworkQuestions } from '../../../content/topics/robot-framework/questions'
import { createQuizState, getScore, quizReducer } from './session'

describe('quiz reducer', () => {
  const question = robotFrameworkQuestions.find(
    (candidate) => candidate.id === 'robot-framework.mcq.token-separation',
  )!

  it('moves from answering to locked feedback and completion', () => {
    const initial = createQuizState([question])
    const feedback = quizReducer(initial, {
      type: 'submit',
      response: { kind: 'multiple-choice', choiceId: 'two-spaces' },
    })

    expect(feedback.phase).toBe('feedback')
    expect(getScore(feedback)).toBe(1)
    expect(
      quizReducer(feedback, {
        type: 'submit',
        response: { kind: 'multiple-choice', choiceId: 'comma' },
      }),
    ).toBe(feedback)

    expect(quizReducer(feedback, { type: 'continue' }).phase).toBe('complete')
  })

  it('restarts with clean answers', () => {
    const answered = quizReducer(createQuizState([question]), {
      type: 'submit',
      response: { kind: 'multiple-choice', choiceId: 'comma' },
    })
    const restarted = quizReducer(answered, { type: 'restart', questions: [question] })

    expect(restarted).toEqual(createQuizState([question]))
  })
})
