import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import type { QuizMode } from '../../content/types'
import styles from './ButtonLink.module.css'

interface ButtonLinkProps {
  to: '/' | '/topics/$topicId' | '/topics/$topicId/quiz'
  params?: { topicId: string }
  search?: { mode: QuizMode }
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  ariaLabel?: string
}

export function ButtonLink({
  variant = 'primary',
  className,
  to,
  params,
  search,
  children,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')
  return (
    <Link className={classes} to={to} params={params} search={search} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}
