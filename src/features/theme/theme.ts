export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'quiz-smarts:theme:v1'
export const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)'

const themeColors: Record<Theme, string> = {
  light: '#f5f3ff',
  dark: '#11101a',
}

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

function getLocalStorage(): Storage | undefined {
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}

export function readStoredTheme(storage: Storage | undefined = getLocalStorage()) {
  try {
    const storedTheme = storage?.getItem(THEME_STORAGE_KEY)
    return isTheme(storedTheme) ? storedTheme : undefined
  } catch {
    return undefined
  }
}

export function writeStoredTheme(theme: Theme, storage: Storage | undefined = getLocalStorage()) {
  try {
    storage?.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // The in-memory theme still works when storage is blocked or unavailable.
  }
}

export function getSystemTheme(
  matchMedia: typeof window.matchMedia | undefined = window.matchMedia,
) {
  try {
    return matchMedia?.(DARK_SCHEME_QUERY).matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function resolveTheme(storedTheme: unknown, prefersDark: boolean): Theme {
  return isTheme(storedTheme) ? storedTheme : prefersDark ? 'dark' : 'light'
}

export function applyTheme(
  theme: Theme,
  root: HTMLElement = document.documentElement,
  themeColor: HTMLMetaElement | null = document.querySelector('meta[name="theme-color"]'),
) {
  root.dataset.theme = theme
  root.style.colorScheme = theme
  themeColor?.setAttribute('content', themeColors[theme])
}
