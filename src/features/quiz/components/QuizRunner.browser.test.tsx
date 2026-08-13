import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import robotFrameworkTopic from '../../../content/topics/robot-framework'
import { getBestScore } from '../../../lib/best-score'
import { QuizRunner } from './QuizRunner'

describe('QuizRunner', () => {
  it('requires an answer, locks feedback, completes, and stores the best score', async () => {
    const question = robotFrameworkTopic.questions.find(
      (candidate) => candidate.id === 'robot-framework.mcq.token-separation',
    )!
    const topic = {
      ...robotFrameworkTopic,
      questionCount: 1,
      questions: [question],
    }

    const screen = await render(
      <QuizRunner topic={topic} mode="all" onExit={vi.fn()} onOpenCheatsheet={vi.fn()} />,
    )

    const checkButton = screen.getByRole('button', { name: 'Check answer' })
    await expect.element(checkButton).toBeDisabled()
    await expect.element(screen.getByText(/cheatsheet/i)).not.toBeInTheDocument()

    const correctAnswer = screen.getByRole('radio', {
      name: 'Two or more spaces, or one or more tabs',
    })
    await correctAnswer.click()
    await expect.element(checkButton).toBeEnabled()
    await checkButton.click()

    await expect.element(screen.getByText('That’s right.')).toBeInTheDocument()
    await expect.element(correctAnswer).toBeDisabled()

    await screen.getByRole('button', { name: 'See results' }).click()
    const resultsTitle = screen.getByRole('heading', { name: 'Strong signal.' })
    await expect.element(resultsTitle).toBeInTheDocument()
    await expect.element(resultsTitle).toHaveFocus()
    await expect
      .element(screen.getByRole('group', { name: 'Score 1 out of 1' }))
      .toBeInTheDocument()
    await expect.element(screen.getByRole('listitem')).toHaveTextContent('Correct')

    await expect.poll(() => getBestScore(topic, 1)?.correct).toBe(1)

    await screen.getByRole('button', { name: 'Try another shuffle' }).click()
    await expect.element(screen.getByText('Question 1 / 1')).toBeInTheDocument()
  })

  it('confirms before exiting an unfinished attempt', async () => {
    const onExit = vi.fn()
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false)
    const question = robotFrameworkTopic.questions.find(
      (candidate) => candidate.id === 'robot-framework.mcq.token-separation',
    )!
    const topic = { ...robotFrameworkTopic, questionCount: 1, questions: [question] }

    const screen = await render(
      <QuizRunner topic={topic} mode="all" onExit={onExit} onOpenCheatsheet={vi.fn()} />,
    )
    await screen.getByRole('radio', { name: 'Exactly one space' }).click()
    await screen.getByRole('button', { name: 'Check answer' }).click()
    await screen.getByRole('button', { name: /Exit quiz/ }).click()

    expect(confirm).toHaveBeenCalledOnce()
    expect(onExit).not.toHaveBeenCalled()
  })

  it('accepts direct selection for a drag-to-blank question', async () => {
    const question = robotFrameworkTopic.questions.find(
      (candidate) => candidate.id === 'robot-framework.drag.library-import',
    )!
    const topic = { ...robotFrameworkTopic, questionCount: 1, questions: [question] }

    const screen = await render(
      <QuizRunner topic={topic} mode="all" onExit={vi.fn()} onOpenCheatsheet={vi.fn()} />,
    )
    await screen.getByRole('radio', { name: 'Library' }).click()

    await expect.element(screen.getByRole('button', { name: 'Check answer' })).toBeEnabled()
    await expect
      .element(screen.getByRole('button', { name: 'Blank contains Library' }))
      .toBeInTheDocument()
  })

  it('uses the configured subset size', async () => {
    const screen = await render(
      <QuizRunner
        topic={robotFrameworkTopic}
        mode="subset"
        onExit={vi.fn()}
        onOpenCheatsheet={vi.fn()}
      />,
    )

    await expect.element(screen.getByText('Question 1 / 20')).toBeInTheDocument()
  })
})
