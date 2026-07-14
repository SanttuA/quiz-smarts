import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from './features/theme/ThemeProvider'
import { THEME_STORAGE_KEY } from './features/theme/theme'
import { createAppRouter } from './router'

function renderRoute(path: string) {
  const history = createMemoryHistory({ initialEntries: [path] })
  const router = createAppRouter(history)
  return render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  )
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
    expect(screen.getByRole('link', { name: 'Quick quiz · 20' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'All questions · 40' })).toBeInTheDocument()
  })

  it('defaults direct quiz routes to all questions', async () => {
    renderRoute('/topics/robot-framework/quiz')

    expect(await screen.findByText(/Question 1 \/ 40/)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /cheatsheet/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /cheatsheet/i })).not.toBeInTheDocument()
    expect(screen.queryByText('Quick reference')).not.toBeInTheDocument()
  })

  it('launches the configured subset from the landing page', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    await user.click(await screen.findByRole('link', { name: 'Quick quiz · 20' }))

    expect(await screen.findByText('Question 1 / 20')).toBeInTheDocument()
  })

  it('shows a useful not-found screen for unknown topics', async () => {
    renderRoute('/topics/not-real')
    expect(
      await screen.findByRole('heading', { name: 'This path drew a blank.' }),
    ).toBeInTheDocument()
  })

  it('exposes a persistent theme toggle in the shared header', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    await user.click(await screen.findByRole('button', { name: 'Switch to dark mode' }))

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toHaveTextContent('Light')
  })
})
