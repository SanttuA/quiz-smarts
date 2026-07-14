import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { robotFrameworkMetadata } from '../../content/topics/robot-framework/metadata'
import { saveBestScore } from '../../lib/best-score'
import { BestScoreBadge } from './BestScoreBadge'

describe('BestScoreBadge', () => {
  it('shows available quick and full best scores independently', () => {
    saveBestScore(robotFrameworkMetadata, 16, 20)
    saveBestScore(robotFrameworkMetadata, 36, 40)

    render(<BestScoreBadge topic={robotFrameworkMetadata} />)

    expect(
      screen.getByLabelText('Best scores: Quick 16 out of 20, 80%; Full 36 out of 40, 90%'),
    ).toHaveTextContent('Quick 16/20 · Full 36/40')
  })

  it('uses a concise empty state before either mode is completed', () => {
    render(<BestScoreBadge topic={robotFrameworkMetadata} />)

    expect(screen.getByText('No attempts yet')).toBeInTheDocument()
  })
})
