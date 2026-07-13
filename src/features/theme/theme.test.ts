import { describe, expect, it, vi } from 'vitest'
import {
  DARK_SCHEME_QUERY,
  THEME_STORAGE_KEY,
  applyTheme,
  getSystemTheme,
  readStoredTheme,
  resolveTheme,
  writeStoredTheme,
} from './theme'

describe('theme helpers', () => {
  it('uses a valid stored theme before the system preference', () => {
    expect(resolveTheme('light', true)).toBe('light')
    expect(resolveTheme('dark', false)).toBe('dark')
    expect(resolveTheme('unknown', true)).toBe('dark')
    expect(resolveTheme(undefined, false)).toBe('light')
  })

  it('reads and writes only valid persisted themes', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    expect(readStoredTheme(localStorage)).toBe('dark')

    localStorage.setItem(THEME_STORAGE_KEY, 'system')
    expect(readStoredTheme(localStorage)).toBeUndefined()

    writeStoredTheme('light', localStorage)
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
  })

  it('falls back safely when browser preferences or storage are unavailable', () => {
    const unavailableStorage = {
      getItem: vi.fn(() => {
        throw new Error('blocked')
      }),
      setItem: vi.fn(() => {
        throw new Error('blocked')
      }),
    } as unknown as Storage
    const unavailableMatchMedia = vi.fn(() => {
      throw new Error('blocked')
    }) as typeof window.matchMedia

    expect(readStoredTheme(unavailableStorage)).toBeUndefined()
    expect(() => writeStoredTheme('dark', unavailableStorage)).not.toThrow()
    expect(getSystemTheme(unavailableMatchMedia)).toBe('light')
  })

  it('reads the dark system preference', () => {
    const matchMedia = vi.fn((query: string) => ({
      matches: query === DARK_SCHEME_QUERY,
    })) as unknown as typeof window.matchMedia

    expect(getSystemTheme(matchMedia)).toBe('dark')
  })

  it('applies the root theme and matching browser chrome color', () => {
    const root = document.createElement('html')
    const themeColor = document.createElement('meta')

    applyTheme('dark', root, themeColor)

    expect(root).toHaveAttribute('data-theme', 'dark')
    expect(root.style.colorScheme).toBe('dark')
    expect(themeColor).toHaveAttribute('content', '#11101a')

    applyTheme('light', root, themeColor)
    expect(themeColor).toHaveAttribute('content', '#f5f3ff')
  })
})
