import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, type MouseEvent, type PropsWithChildren } from 'react'
import { ThemeToggle } from '../../features/theme/ThemeToggle'
import { BrandMark } from '../brand/BrandMark'
import styles from './AppShell.module.css'

export function AppShell({ children }: PropsWithChildren) {
  const isQuiz = useRouterState({
    select: (state) => state.location.pathname.endsWith('/quiz'),
  })
  const locationHref = useRouterState({ select: (state) => state.location.href })
  const locationHash = useRouterState({ select: (state) => state.location.hash })
  const routerStatus = useRouterState({ select: (state) => state.status })
  const mainRef = useRef<HTMLElement>(null)
  const previousLocationRef = useRef(locationHref)

  useEffect(() => {
    if (routerStatus !== 'idle' || previousLocationRef.current === locationHref) return
    previousLocationRef.current = locationHref

    const hashTarget = locationHash ? document.getElementById(locationHash.replace(/^#/, '')) : null
    const focusTarget =
      hashTarget?.querySelector<HTMLElement>('h1, h2, h3') ??
      mainRef.current?.querySelector<HTMLElement>('h1')

    focusTarget?.focus()
  }, [locationHash, locationHref, routerStatus])

  function handleSkipLink(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    mainRef.current?.focus()
    mainRef.current?.scrollIntoView?.()
  }

  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#main-content" onClick={handleSkipLink}>
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
          <div className={styles.headerControls}>
            {!isQuiz && <span className={styles.status}>learn · test · repeat</span>}
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main ref={mainRef} id="main-content" className={styles.main} tabIndex={-1}>
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
