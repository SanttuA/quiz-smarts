import { describe, expect, it } from 'vitest'
import type { QuizQuestion } from '../../../content/types'
import { robotFrameworkQuestions } from '../../../content/topics/robot-framework/questions'
import { createQuizState, getScore, quizReducer } from './session'

function questionById(id: string): QuizQuestion {
  const question = robotFrameworkQuestions.find((candidate) => candidate.id === id)
  if (!question) throw new Error(`Missing fixture: ${id}`)
  return question
}

describe('quiz reducer', () => {
  const question = questionById('robot-framework.mcq.token-separation')

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

  it('advances through every question and scores only correct answers', () => {
    const questions = [
      question,
      questionById('robot-framework.drag.library-import'),
      questionById('robot-framework.text.cli-command'),
    ]
    let state = createQuizState(questions)

    state = quizReducer(state, {
      type: 'submit',
      response: { kind: 'multiple-choice', choiceId: 'two-spaces' },
    })
    state = quizReducer(state, { type: 'continue' })
    expect(state).toMatchObject({ phase: 'answering', currentIndex: 1 })

    state = quizReducer(state, {
      type: 'submit',
      response: { kind: 'drag-blank', optionId: 'resource' },
    })
    state = quizReducer(state, { type: 'continue' })
    state = quizReducer(state, {
      type: 'submit',
      response: { kind: 'text-blank', answer: 'Python -m Robot' },
    })
    state = quizReducer(state, { type: 'continue' })

    expect(state.phase).toBe('complete')
    expect(state.answers.map((answer) => [answer.questionId, answer.isCorrect])).toEqual([
      ['robot-framework.mcq.token-separation', true],
      ['robot-framework.drag.library-import', false],
      ['robot-framework.text.cli-command', true],
    ])
    expect(getScore(state)).toBe(2)
  })

  it('ignores actions that do not belong to the current phase', () => {
    const initial = createQuizState([question])
    expect(quizReducer(initial, { type: 'continue' })).toBe(initial)

    const complete = quizReducer(
      quizReducer(initial, {
        type: 'submit',
        response: { kind: 'multiple-choice', choiceId: 'comma' },
      }),
      { type: 'continue' },
    )
    expect(
      quizReducer(complete, {
        type: 'submit',
        response: { kind: 'multiple-choice', choiceId: 'two-spaces' },
      }),
    ).toBe(complete)
    expect(quizReducer(complete, { type: 'continue' })).toBe(complete)

    const empty = createQuizState([])
    expect(
      quizReducer(empty, {
        type: 'submit',
        response: { kind: 'multiple-choice', choiceId: 'two-spaces' },
      }),
    ).toBe(empty)
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
