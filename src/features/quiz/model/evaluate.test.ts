import { describe, expect, it } from 'vitest'
import type { QuizQuestion } from '../../../content/types'
import { pythonQuestions } from '../../../content/topics/python/questions'
import { robotFrameworkQuestions } from '../../../content/topics/robot-framework/questions'
import { evaluateResponse, formatCorrectAnswer, normalizeTextAnswer } from './evaluate'

function questionById(id: string): QuizQuestion {
  const question = robotFrameworkQuestions.find((candidate) => candidate.id === id)
  if (!question) throw new Error(`Missing fixture: ${id}`)
  return question
}

describe('answer evaluation', () => {
  it('normalizes case and repeated whitespace without loose substring matching', () => {
    expect(normalizeTextAnswer('  PYTHON   -m ROBOT ')).toBe('python -m robot')

    const question = questionById('robot-framework.text.cli-command')
    expect(evaluateResponse(question, { kind: 'text-blank', answer: ' Python   -m Robot ' })).toBe(
      true,
    )
    expect(evaluateResponse(question, { kind: 'text-blank', answer: 'robot runner' })).toBe(false)
  })

  it('accepts spaces or underscores in the automatic test name variable', () => {
    const question = questionById('robot-framework.text.test-name-variable')

    expect(evaluateResponse(question, { kind: 'text-blank', answer: '${TEST_NAME}' })).toBe(true)
    expect(evaluateResponse(question, { kind: 'text-blank', answer: '${TEST NAME}' })).toBe(true)
    expect(evaluateResponse(question, { kind: 'text-blank', answer: '${SUITE_NAME}' })).toBe(false)
  })

  it('evaluates every question kind', () => {
    expect(
      evaluateResponse(questionById('robot-framework.mcq.token-separation'), {
        kind: 'multiple-choice',
        choiceId: 'two-spaces',
      }),
    ).toBe(true)
    expect(
      evaluateResponse(questionById('robot-framework.drag.library-import'), {
        kind: 'drag-blank',
        optionId: 'resource',
      }),
    ).toBe(false)
    expect(
      evaluateResponse(questionById('robot-framework.sequence.for-loop'), {
        kind: 'sequence',
        itemIds: ['for', 'body', 'end'],
      }),
    ).toBe(true)
  })

  it('formats the canonical sequence in the correct order', () => {
    expect(formatCorrectAnswer(questionById('robot-framework.sequence.for-loop'))).toBe(
      'FOR    ${item}    IN    @{ITEMS}\n    Log    ${item}\nEND',
    )
  })

  it('accepts every declared valid sequence order', () => {
    const question = pythonQuestions.find(
      (candidate) => candidate.id === 'python.sequence.running-total',
    )
    if (!question || question.kind !== 'sequence') throw new Error('Missing sequence fixture')

    expect(
      evaluateResponse(question, {
        kind: 'sequence',
        itemIds: ['numbers', 'total', 'for', 'add', 'print'],
      }),
    ).toBe(true)
    expect(
      evaluateResponse(question, {
        kind: 'sequence',
        itemIds: ['total', 'numbers', 'for', 'add', 'print'],
      }),
    ).toBe(true)
    expect(
      evaluateResponse(question, {
        kind: 'sequence',
        itemIds: ['total', 'numbers', 'add', 'for', 'print'],
      }),
    ).toBe(false)
  })
})
