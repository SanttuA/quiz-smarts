import type { TopicMetadata } from '../content/types'

export const BEST_SCORE_STORAGE_KEY = 'quiz-smarts:best-scores:v1'

export interface BestScore {
  topicId: string
  contentVersion: number
  correct: number
  total: number
  completedAt: string
}

interface BestScoreStore {
  version: 1
  scores: Record<string, BestScore>
}

const emptyStore = (): BestScoreStore => ({ version: 1, scores: {} })

function isBestScore(value: unknown): value is BestScore {
  if (!value || typeof value !== 'object') return false
  const score = value as Partial<BestScore>
  return (
    typeof score.topicId === 'string' &&
    typeof score.contentVersion === 'number' &&
    typeof score.correct === 'number' &&
    typeof score.total === 'number' &&
    typeof score.completedAt === 'string'
  )
}

function readStore(storage: Storage): BestScoreStore {
  try {
    const rawValue = storage.getItem(BEST_SCORE_STORAGE_KEY)
    if (!rawValue) return emptyStore()
    const value = JSON.parse(rawValue) as Partial<BestScoreStore>
    if (value.version !== 1 || !value.scores || typeof value.scores !== 'object') {
      return emptyStore()
    }

    const scores = Object.fromEntries(
      Object.entries(value.scores).filter((entry): entry is [string, BestScore] =>
        isBestScore(entry[1]),
      ),
    )
    return { version: 1, scores }
  } catch {
    return emptyStore()
  }
}

export function getBestScore(topic: TopicMetadata, storage: Storage = window.localStorage) {
  const score = readStore(storage).scores[topic.id]
  return score?.contentVersion === topic.contentVersion ? score : undefined
}

export function saveBestScore(
  topic: TopicMetadata,
  correct: number,
  storage: Storage = window.localStorage,
  completedAt = new Date().toISOString(),
): BestScore {
  const store = readStore(storage)
  const previous = store.scores[topic.id]
  const candidate: BestScore = {
    topicId: topic.id,
    contentVersion: topic.contentVersion,
    correct,
    total: topic.questionCount,
    completedAt,
  }

  if (
    previous?.contentVersion === topic.contentVersion &&
    previous.total === topic.questionCount &&
    previous.correct >= correct
  ) {
    return previous
  }

  store.scores[topic.id] = candidate
  storage.setItem(BEST_SCORE_STORAGE_KEY, JSON.stringify(store))
  return candidate
}
