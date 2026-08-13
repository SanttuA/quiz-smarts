import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { pythonQuestions } from '../../../content/topics/python/questions'
import { robotFrameworkQuestions } from '../../../content/topics/robot-framework/questions'
import type { QuizResponse } from '../model/responses'
import { DragBlankInput } from './DragBlankInput'
import { SequenceInput } from './SequenceInput'
import { TextBlankInput } from './TextBlankInput'

describe('question inputs', () => {
  it('captures a written blank answer', async () => {
    const onChange = vi.fn()
    const question = robotFrameworkQuestions.find(
      (candidate) => candidate.id === 'robot-framework.text.cli-command',
    )
    if (!question || question.kind !== 'text-blank') throw new Error('Missing text fixture')
    const textQuestion = question

    function TextBlankHarness() {
      const [value, setValue] = useState<QuizResponse>()

      return (
        <TextBlankInput
          question={textQuestion}
          onChange={(response) => {
            onChange(response)
            setValue(response)
          }}
          disabled={false}
          value={value}
        />
      )
    }

    const screen = await render(<TextBlankHarness />)
    const input = screen.getByRole('textbox')
    await input.fill('robot')

    expect(onChange).toHaveBeenLastCalledWith({ kind: 'text-blank', answer: 'robot' })
    await expect.element(input).toHaveValue('robot')
  })

  it('renders a multiline text blank as one continuous code flow', async () => {
    const question = pythonQuestions.find((candidate) => candidate.id === 'python.text-except')
    if (!question || question.kind !== 'text-blank') throw new Error('Missing text fixture')

    const screen = await render(
      <TextBlankInput question={question} onChange={vi.fn()} disabled={false} value={undefined} />,
    )

    const input = screen.getByRole('textbox', { name: 'Missing answer' })
    await expect.element(input).toBeInTheDocument()
    const codeFlow = input.element().closest('code')
    if (!codeFlow) throw new Error('Missing code flow')

    expect(Array.from(codeFlow.children, (child) => child.tagName)).toEqual([
      'SPAN',
      'INPUT',
      'SPAN',
    ])
    expect(codeFlow.children[0]).toHaveTextContent('try: count = int(raw)')
    expect(codeFlow.children[0]?.textContent).toBe('try:\n    count = int(raw)\n')
    expect(codeFlow.children[2]?.textContent).toBe(' ValueError:\n    count = 0')
  })

  it('renders a multiline drag blank as one continuous code flow', async () => {
    const question = pythonQuestions.find(
      (candidate) => candidate.id === 'python.drag-continue-loop',
    )
    if (!question || question.kind !== 'drag-blank') throw new Error('Missing drag fixture')

    const screen = await render(
      <DragBlankInput question={question} onChange={vi.fn()} disabled={false} value={undefined} />,
    )

    const blank = screen.getByRole('button', { name: 'Empty answer blank' })
    await expect.element(blank).toBeInTheDocument()
    const codeFlow = blank.element().closest('code')
    if (!codeFlow) throw new Error('Missing code flow')

    expect(Array.from(codeFlow.children, (child) => child.tagName)).toEqual([
      'SPAN',
      'BUTTON',
      'SPAN',
    ])
    expect(codeFlow.children[0]?.textContent).toBe(
      'for value in values:\n    if value is None:\n        ',
    )
    expect(codeFlow.children[2]?.textContent).toBe('\n    process(value)')
  })

  it('offers direct selection as a drag-to-blank alternative', async () => {
    const onChange = vi.fn()
    const question = robotFrameworkQuestions.find(
      (candidate) => candidate.id === 'robot-framework.drag.library-import',
    )
    if (!question || question.kind !== 'drag-blank') throw new Error('Missing drag fixture')

    const screen = await render(
      <DragBlankInput question={question} onChange={onChange} disabled={false} value={undefined} />,
    )
    await screen.getByRole('radio', { name: 'Library' }).click()

    expect(onChange).toHaveBeenCalledWith({ kind: 'drag-blank', optionId: 'library' })
  })

  it('offers move buttons as a sortable keyboard alternative', async () => {
    const onChange = vi.fn()
    const question = robotFrameworkQuestions.find(
      (candidate) => candidate.id === 'robot-framework.sequence.for-loop',
    )
    if (!question || question.kind !== 'sequence') throw new Error('Missing sequence fixture')

    const screen = await render(
      <SequenceInput
        question={question}
        value={{ kind: 'sequence', itemIds: ['end', 'body', 'for'] }}
        onChange={onChange}
        disabled={false}
      />,
    )
    await screen.getByRole('button', { name: /^Move FOR.* up$/ }).click()

    expect(onChange).toHaveBeenCalledWith({
      kind: 'sequence',
      itemIds: ['end', 'for', 'body'],
    })
    await expect.element(screen.getByText(/Moved FOR.*to position 2 of 3\./)).toBeInTheDocument()
  })
})
