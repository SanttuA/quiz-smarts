import type { TopicMetadata } from '../../content/types'
import { getBestScore } from '../../lib/best-score'
import styles from './BestScoreBadge.module.css'

interface BestScoreBadgeProps {
  topic: TopicMetadata
  compact?: boolean
}

export function BestScoreBadge({ topic, compact = false }: BestScoreBadgeProps) {
  const score = getBestScore(topic)

  if (!score) {
    return <span className={styles.empty}>No attempts yet</span>
  }

  const percent = Math.round((score.correct / score.total) * 100)
  return (
    <span className={compact ? styles.compact : styles.badge} aria-label={`Best score ${percent}%`}>
      <span aria-hidden="true">◆</span> Best {score.correct}/{score.total} · {percent}%
    </span>
  )
}
