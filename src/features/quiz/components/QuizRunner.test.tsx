import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import robotFrameworkTopic from '../../../content/topics/robot-framework'
import { getBestScore } from '../../../lib/best-score'
import { QuizRunner } from './QuizRunner'

describe('QuizRunner', () => {
  it('requires an answer, locks feedback, completes, and stores the best score', async () => {
    const user = userEvent.setup()
    const question = robotFrameworkTopic.questions.find(
      (candidate) => candidate.id === 'robot-framework.mcq.token-separation',
    )!
    const topic = {
      ...robotFrameworkTopic,
      questionCount: 1,
      questions: [question],
    }

    render(<QuizRunner topic={topic} mode="all" onExit={vi.fn()} onOpenCheatsheet={vi.fn()} />)

    const checkButton = screen.getByRole('button', { name: 'Check answer' })
    expect(checkButton).toBeDisabled()
    expect(screen.queryByText(/cheatsheet/i)).not.toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'Two or more spaces, or one or more tabs' }))
    expect(checkButton).toBeEnabled()
    await user.click(checkButton)

    expect(screen.getByText('That’s right.')).toBeInTheDocument()
    expect(
      screen.getByRole('radio', { name: 'Two or more spaces, or one or more tabs' }),
    ).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'See results' }))
    const resultsTitle = await screen.findByRole('heading', { name: 'Strong signal.' })
    expect(resultsTitle).toBeInTheDocument()
    expect(resultsTitle).toHaveFocus()
    expect(screen.getByLabelText('Score 1 out of 1')).toBeInTheDocument()
    expect(screen.getByRole('listitem')).toHaveTextContent('Correct')

    await waitFor(() => expect(getBestScore(topic, 1)?.correct).toBe(1))

    await user.click(screen.getByRole('button', { name: 'Try another shuffle' }))
    expect(screen.getByText('Question 1 / 1')).toBeInTheDocument()
  })

  it('confirms before exiting an unfinished attempt', async () => {
    const user = userEvent.setup()
    const onExit = vi.fn()
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false)
    const question = robotFrameworkTopic.questions.find(
      (candidate) => candidate.id === 'robot-framework.mcq.token-separation',
    )!
    const topic = { ...robotFrameworkTopic, questionCount: 1, questions: [question] }

    render(<QuizRunner topic={topic} mode="all" onExit={onExit} onOpenCheatsheet={vi.fn()} />)
    await user.click(screen.getByRole('radio', { name: 'Exactly one space' }))
    await user.click(screen.getByRole('button', { name: 'Check answer' }))
    await user.click(screen.getByRole('button', { name: /Exit quiz/ }))

    expect(confirm).toHaveBeenCalledOnce()
    expect(onExit).not.toHaveBeenCalled()
  })

  it('accepts direct selection for a drag-to-blank question', async () => {
    const user = userEvent.setup()
    const question = robotFrameworkTopic.questions.find(
      (candidate) => candidate.id === 'robot-framework.drag.library-import',
    )!
    const topic = { ...robotFrameworkTopic, questionCount: 1, questions: [question] }

    render(<QuizRunner topic={topic} mode="all" onExit={vi.fn()} onOpenCheatsheet={vi.fn()} />)
    await user.click(screen.getByRole('radio', { name: 'Library' }))

    expect(screen.getByRole('button', { name: 'Check answer' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Blank contains Library' })).toBeInTheDocument()
  })

  it('uses the configured subset size', () => {
    render(
      <QuizRunner
        topic={robotFrameworkTopic}
        mode="subset"
        onExit={vi.fn()}
        onOpenCheatsheet={vi.fn()}
      />,
    )

    expect(screen.getByText('Question 1 / 20')).toBeInTheDocument()
  })
})
