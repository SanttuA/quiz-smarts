import type { TopicMetadata } from '../../content/types'
import { getBestScore } from '../../lib/best-score'
import styles from './BestScoreBadge.module.css'

interface BestScoreBadgeProps {
  topic: TopicMetadata
  compact?: boolean
}

export function BestScoreBadge({ topic, compact = false }: BestScoreBadgeProps) {
  const scores = [
    { label: 'Quick', score: getBestScore(topic, topic.subsetQuestionCount) },
    { label: 'Full', score: getBestScore(topic, topic.questionCount) },
  ].filter((entry): entry is { label: string; score: NonNullable<typeof entry.score> } =>
    Boolean(entry.score),
  )

  if (scores.length === 0) {
    return <span className={styles.empty}>No attempts yet</span>
  }

  const label = scores
    .map(({ label: modeLabel, score }) => {
      const percent = Math.round((score.correct / score.total) * 100)
      return `${modeLabel} ${score.correct} out of ${score.total}, ${percent}%`
    })
    .join('; ')

  return (
    <span className={compact ? styles.compact : styles.badge} aria-label={`Best scores: ${label}`}>
      <span aria-hidden="true">◆</span>
      {scores.map(({ label: modeLabel, score }, index) => (
        <span key={modeLabel}>
          {index > 0 && <span aria-hidden="true"> · </span>}
          {modeLabel} {score.correct}/{score.total}
        </span>
      ))}
    </span>
  )
}
