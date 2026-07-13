import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from './ThemeProvider'
import { ThemeToggle } from './ThemeToggle'
import { DARK_SCHEME_QUERY, THEME_STORAGE_KEY } from './theme'

function mockColorScheme(initiallyDark: boolean) {
  let matches = initiallyDark
  const listeners = new Set<(event: MediaQueryListEvent) => void>()
  const mediaQuery = {
    get matches() {
      return matches
    },
    media: DARK_SCHEME_QUERY,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.add(listener)
    }),
    removeEventListener: vi.fn((_type: string, listener: (event: MediaQueryListEvent) => void) => {
      listeners.delete(listener)
    }),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList

  vi.spyOn(window, 'matchMedia').mockReturnValue(mediaQuery)

  return {
    change(nextMatches: boolean) {
      matches = nextMatches
      const event = { matches, media: DARK_SCHEME_QUERY } as MediaQueryListEvent
      listeners.forEach((listener) => listener(event))
    },
  }
}

describe('ThemeProvider', () => {
  it('follows system changes until the user chooses a persistent override', async () => {
    const colorScheme = mockColorScheme(false)
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    )

    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toHaveTextContent('Dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')

    act(() => colorScheme.change(true))
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toHaveTextContent('Light')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')

    await user.click(screen.getByRole('button', { name: 'Switch to light mode' }))
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')

    act(() => colorScheme.change(false))
    act(() => colorScheme.change(true))
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
  })

  it('prefers a stored choice over the current system preference', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    mockColorScheme(false)

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    )

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument()
  })
})
