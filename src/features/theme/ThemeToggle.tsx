import { useTheme } from './ThemeProvider'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const targetTheme = isDark ? 'light' : 'dark'
  const label = isDark ? 'Light' : 'Dark'

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${targetTheme} mode`}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span>{label}</span>
    </button>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.3 15.6A8.5 8.5 0 0 1 8.4 3.7 8.5 8.5 0 1 0 20.3 15.6Z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}
