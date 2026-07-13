import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { describe, expect, it } from 'vitest'
import { createAppRouter } from './router'

function renderRoute(path: string) {
  const history = createMemoryHistory({ initialEntries: [path] })
  const router = createAppRouter(history)
  return render(<RouterProvider router={router} />)
}

describe('routed application', () => {
  it('moves from the landing topic card to the Robot Framework cheatsheet', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    expect(await screen.findByRole('heading', { name: 'Available topics' })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: /Open topic/ }))

    expect(
      await screen.findByRole('heading', { name: 'Robot Framework cheatsheet' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Robot Framework User Guide/ })).toBeInTheDocument()
  })

  it('renders the quiz as a focus route without the topic cheatsheet', async () => {
    renderRoute('/topics/robot-framework/quiz')

    expect(await screen.findByText(/Question 1 \/ 12/)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /cheatsheet/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /cheatsheet/i })).not.toBeInTheDocument()
    expect(screen.queryByText('Quick reference')).not.toBeInTheDocument()
  })

  it('shows a useful not-found screen for unknown topics', async () => {
    renderRoute('/topics/not-real')
    expect(
      await screen.findByRole('heading', { name: 'This path drew a blank.' }),
    ).toBeInTheDocument()
  })
})
