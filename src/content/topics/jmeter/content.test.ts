import { describe, expect, it } from 'vitest'
import jmeterTopic from '.'

describe('JMeter topic content', () => {
  it('accepts documented long CLI options and explains transaction timing', () => {
    const aliases = new Map([
      ['jmeter.text-cli-mode', '--nongui'],
      ['jmeter.text-test-plan-option', '--testfile'],
      ['jmeter.text-results-option', '--logfile'],
      ['jmeter.text-dashboard-option', '--reportatendofloadtests'],
    ])

    for (const [questionId, alias] of aliases) {
      const question = jmeterTopic.questions.find((candidate) => candidate.id === questionId)
      expect(question?.kind).toBe('text-blank')
      if (question?.kind === 'text-blank') expect(question.acceptedAnswers).toContain(alias)
    }

    const transactionQuestion = jmeterTopic.questions.find(
      (question) => question.id === 'jmeter.drag-transaction-controller',
    )
    expect(transactionQuestion?.explanation).toContain(
      'excludes timer and pre/post-processor duration',
    )
  })
})
