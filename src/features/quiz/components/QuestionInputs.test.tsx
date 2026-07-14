import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { pythonQuestions } from '../../../content/topics/python/questions'
import { robotFrameworkQuestions } from '../../../content/topics/robot-framework/questions'
import { DragBlankInput } from './DragBlankInput'
import { SequenceInput } from './SequenceInput'
import { TextBlankInput } from './TextBlankInput'

describe('question inputs', () => {
  it('captures a written blank answer', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const question = robotFrameworkQuestions.find(
      (candidate) => candidate.id === 'robot-framework.text.cli-command',
    )
    if (!question || question.kind !== 'text-blank') throw new Error('Missing text fixture')

    render(
      <TextBlankInput question={question} onChange={onChange} disabled={false} value={undefined} />,
    )
    await user.type(screen.getByRole('textbox'), 'robot')

    expect(onChange).toHaveBeenLastCalledWith({ kind: 'text-blank', answer: 't' })
  })

  it('renders a multiline text blank as one continuous code flow', () => {
    const question = pythonQuestions.find((candidate) => candidate.id === 'python.text-except')
    if (!question || question.kind !== 'text-blank') throw new Error('Missing text fixture')

    render(
      <TextBlankInput question={question} onChange={vi.fn()} disabled={false} value={undefined} />,
    )

    const input = screen.getByRole('textbox', { name: 'Missing answer' })
    const codeFlow = input.closest('code')
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

  it('renders a multiline drag blank as one continuous code flow', () => {
    const question = pythonQuestions.find(
      (candidate) => candidate.id === 'python.drag-continue-loop',
    )
    if (!question || question.kind !== 'drag-blank') throw new Error('Missing drag fixture')

    render(
      <DragBlankInput question={question} onChange={vi.fn()} disabled={false} value={undefined} />,
    )

    const blank = screen.getByRole('button', { name: 'Empty answer blank' })
    const codeFlow = blank.closest('code')
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
    const user = userEvent.setup()
    const onChange = vi.fn()
    const question = robotFrameworkQuestions.find(
      (candidate) => candidate.id === 'robot-framework.drag.library-import',
    )
    if (!question || question.kind !== 'drag-blank') throw new Error('Missing drag fixture')

    render(
      <DragBlankInput question={question} onChange={onChange} disabled={false} value={undefined} />,
    )
    await user.click(screen.getByRole('radio', { name: 'Library' }))

    expect(onChange).toHaveBeenCalledWith({ kind: 'drag-blank', optionId: 'library' })
  })

  it('offers move buttons as a sortable keyboard alternative', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const question = robotFrameworkQuestions.find(
      (candidate) => candidate.id === 'robot-framework.sequence.for-loop',
    )
    if (!question || question.kind !== 'sequence') throw new Error('Missing sequence fixture')

    render(
      <SequenceInput
        question={question}
        value={{ kind: 'sequence', itemIds: ['end', 'body', 'for'] }}
        onChange={onChange}
        disabled={false}
      />,
    )
    await user.click(screen.getByRole('button', { name: /^Move FOR.* up$/ }))

    expect(onChange).toHaveBeenCalledWith({
      kind: 'sequence',
      itemIds: ['end', 'for', 'body'],
    })
  })
})
