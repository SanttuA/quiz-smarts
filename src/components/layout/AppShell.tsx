import { Link, useRouterState } from '@tanstack/react-router'
import type { PropsWithChildren } from 'react'
import { BrandMark } from '../brand/BrandMark'
import styles from './AppShell.module.css'

export function AppShell({ children }: PropsWithChildren) {
  const isQuiz = useRouterState({
    select: (state) => state.location.pathname.endsWith('/quiz'),
  })

  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className={isQuiz ? styles.quizHeader : styles.header}>
        <div className={styles.headerInner}>
          {isQuiz ? (
            <BrandMark />
          ) : (
            <Link to="/" className={styles.brandLink} aria-label="Quiz Smarts home">
              <BrandMark />
            </Link>
          )}
          {!isQuiz && <span className={styles.status}>learn · test · repeat</span>}
        </div>
      </header>
      <main id="main-content" className={styles.main}>
        {children}
      </main>
      {!isQuiz && (
        <footer className={styles.footer}>
          <span>Built for curious technical minds.</span>
          <span className={styles.prompt} aria-hidden="true">
            ready&gt; _
          </span>
        </footer>
      )}
    </div>
  )
}
