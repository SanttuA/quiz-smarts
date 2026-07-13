import type { QuizQuestion } from '../../../content/types'
import { evaluateResponse } from './evaluate'
import type { QuizResponse } from './responses'

export type QuizPhase = 'answering' | 'feedback' | 'complete'

export interface AnswerRecord {
  questionId: string
  response: QuizResponse
  isCorrect: boolean
}

export interface QuizState {
  phase: QuizPhase
  questions: QuizQuestion[]
  currentIndex: number
  answers: AnswerRecord[]
}

export type QuizAction =
  | { type: 'submit'; response: QuizResponse }
  | { type: 'continue' }
  | { type: 'restart'; questions: QuizQuestion[] }

export function createQuizState(questions: QuizQuestion[]): QuizState {
  return {
    phase: 'answering',
    questions,
    currentIndex: 0,
    answers: [],
  }
}

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'submit': {
      if (state.phase !== 'answering') return state
      const question = state.questions[state.currentIndex]
      if (!question) return state

      return {
        ...state,
        phase: 'feedback',
        answers: [
          ...state.answers,
          {
            questionId: question.id,
            response: action.response,
            isCorrect: evaluateResponse(question, action.response),
          },
        ],
      }
    }
    case 'continue': {
      if (state.phase !== 'feedback') return state
      const isLastQuestion = state.currentIndex >= state.questions.length - 1
      return isLastQuestion
        ? { ...state, phase: 'complete' }
        : { ...state, phase: 'answering', currentIndex: state.currentIndex + 1 }
    }
    case 'restart':
      return createQuizState(action.questions)
  }
}

export function getScore(state: QuizState): number {
  return state.answers.filter((answer) => answer.isCorrect).length
}
