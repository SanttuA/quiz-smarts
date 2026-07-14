import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import robotFrameworkTopic from '../content/topics/robot-framework'
import { QuizPage } from './QuizPage'

describe('QuizPage', () => {
  it('starts a clean attempt when the route changes quiz mode', () => {
    const props = {
      topic: robotFrameworkTopic,
      onExit: vi.fn(),
      onOpenCheatsheet: vi.fn(),
    }
    const { rerender } = render(<QuizPage {...props} mode="subset" />)

    expect(screen.getByText('Question 1 / 20')).toBeInTheDocument()

    rerender(<QuizPage {...props} mode="all" />)

    expect(screen.getByText('Question 1 / 40')).toBeInTheDocument()
  })
})
