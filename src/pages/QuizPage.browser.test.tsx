import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import robotFrameworkTopic from '../content/topics/robot-framework'
import { QuizPage } from './QuizPage'

describe('QuizPage', () => {
  it('starts a clean attempt when the route changes quiz mode', async () => {
    const props = {
      topic: robotFrameworkTopic,
      onExit: vi.fn(),
      onOpenCheatsheet: vi.fn(),
    }
    const screen = await render(<QuizPage {...props} mode="subset" />)

    await expect.element(screen.getByText('Question 1 / 20')).toBeInTheDocument()

    await screen.rerender(<QuizPage {...props} mode="all" />)

    await expect.element(screen.getByText('Question 1 / 40')).toBeInTheDocument()
  })
})
