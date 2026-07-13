import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
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
