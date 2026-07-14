import type { TopicMetadata } from '../../../content/types'

export function estimateQuizMinutes(
  topic: Pick<TopicMetadata, 'estimatedMinutes' | 'questionCount'>,
  questionCount: number,
): number {
  if (topic.questionCount <= 0 || questionCount <= 0) return 0
  return Math.max(1, Math.round((topic.estimatedMinutes * questionCount) / topic.questionCount))
}
