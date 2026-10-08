import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import robotFrameworkTopic from '../../../content/topics/robot-framework'
import { getBestScore } from '../../../lib/best-score'
import { QuizRunner } from './QuizRunner'

function topicWith(...questionIds: string[]) {
  const questions = questionIds.map((id) => {
    const question = robotFrameworkTopic.questions.find((candidate) => candidate.id === id)
    if (!question) throw new Error(`Missing fixture: ${id}`)
    return question
  })
  return { ...robotFrameworkTopic, questionCount: questions.length, questions }
}

function renderRunner(topic: ReturnType<typeof topicWith>, onExit = vi.fn()) {
  return render(<QuizRunner topic={topic} mode="all" onExit={onExit} onOpenCheatsheet={vi.fn()} />)
}

describe('QuizRunner', () => {
  it('requires an answer, locks feedback, completes, and stores the best score', async () => {
    const topic = topicWith('robot-framework.mcq.token-separation')
    const screen = await renderRunner(topic)

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
    await expect.element(screen.getByRole('listitem')).toMatchTextContent('Correct')

    await expect.poll(() => getBestScore(topic, 1)?.correct).toBe(1)

    await screen.getByRole('button', { name: 'Try another shuffle' }).click()
    await expect.element(screen.getByText('Question 1 / 1')).toBeInTheDocument()
  })

  it('shows the correct answer after a wrong answer and in the review', async () => {
    const screen = await renderRunner(topicWith('robot-framework.mcq.token-separation'))

    await screen.getByRole('radio', { name: 'Exactly one space' }).click()
    await screen.getByRole('button', { name: 'Check answer' }).click()

    const feedback = screen.getByRole('status')
    await expect.element(feedback).toMatchTextContent('Not quite.')
    await expect
      .element(feedback)
      .toMatchTextContent('Correct answer: Two or more spaces, or one or more tabs')

    await screen.getByRole('button', { name: 'See results' }).click()
    const review = screen.getByRole('listitem')
    await expect.element(review).toMatchTextContent('Incorrect')
    await expect.element(review).toMatchTextContent('Your answerExactly one space')
    await expect
      .element(review)
      .toMatchTextContent('Correct answerTwo or more spaces, or one or more tabs')
  })

  it.each([
    { correctAnswers: 1, heading: 'Good momentum.' },
    { correctAnswers: 0, heading: 'A useful first pass.' },
  ])('titles a $correctAnswers/2 result "$heading"', async ({ correctAnswers, heading }) => {
    const screen = await renderRunner(
      topicWith('robot-framework.mcq.token-separation', 'robot-framework.mcq.resource-extension'),
    )
    for (let index = 0; index < 2; index += 1) {
      // Questions are shuffled, so detect which one is showing.
      const [correct, wrong] = screen.getByRole('radio', { name: '.resource' }).query()
        ? ['.resource', '.keyword']
        : ['Two or more spaces, or one or more tabs', 'Exactly one space']
      await screen.getByRole('radio', { name: index < correctAnswers ? correct : wrong }).click()
      await screen.getByRole('button', { name: 'Check answer' }).click()
      await screen
        .getByRole('button', { name: index === 1 ? 'See results' : 'Next question' })
        .click()
    }

    await expect.element(screen.getByRole('heading', { name: heading })).toHaveFocus()
  })

  it('exits immediately before any answer is submitted', async () => {
    const onExit = vi.fn()
    const confirm = vi.spyOn(window, 'confirm')
    const screen = await renderRunner(topicWith('robot-framework.mcq.token-separation'), onExit)

    await screen.getByRole('button', { name: /Exit quiz/ }).click()

    expect(confirm).not.toHaveBeenCalled()
    expect(onExit).toHaveBeenCalledOnce()
  })

  it.each([
    { confirmed: false, exits: 0 },
    { confirmed: true, exits: 1 },
  ])(
    'asks before exiting an unfinished attempt (confirmed: $confirmed)',
    async ({ confirmed, exits }) => {
      const onExit = vi.fn()
      const confirm = vi.spyOn(window, 'confirm').mockReturnValue(confirmed)
      const screen = await renderRunner(topicWith('robot-framework.mcq.token-separation'), onExit)

      await screen.getByRole('radio', { name: 'Exactly one space' }).click()
      await screen.getByRole('button', { name: 'Check answer' }).click()
      await screen.getByRole('button', { name: /Exit quiz/ }).click()

      expect(confirm).toHaveBeenCalledOnce()
      expect(onExit).toHaveBeenCalledTimes(exits)
    },
  )

  it('keeps Check answer disabled for a whitespace-only written answer', async () => {
    const screen = await renderRunner(topicWith('robot-framework.text.cli-command'))
    const checkButton = screen.getByRole('button', { name: 'Check answer' })

    await screen.getByRole('textbox', { name: 'Missing answer' }).fill('   ')
    await expect.element(checkButton).toBeDisabled()

    await screen.getByRole('textbox', { name: 'Missing answer' }).fill(' robot ')
    await expect.element(checkButton).toBeEnabled()
  })

  it('accepts direct selection for a drag-to-blank question and can clear it again', async () => {
    const screen = await renderRunner(topicWith('robot-framework.drag.library-import'))
    const checkButton = screen.getByRole('button', { name: 'Check answer' })

    await screen.getByRole('radio', { name: 'Library' }).click()
    await expect.element(checkButton).toBeEnabled()

    await screen.getByRole('button', { name: 'Blank contains Library' }).click()
    await expect.element(screen.getByRole('button', { name: 'Empty answer blank' })).toBeVisible()
    await expect.element(checkButton).toBeDisabled()
  })
})
