import type { TopicMetadata } from '../content/types'

export const BEST_SCORE_STORAGE_KEY = 'quiz-smarts:best-scores:v2'

export interface BestScore {
  topicId: string
  contentVersion: number
  correct: number
  total: number
  completedAt: string
}

interface BestScoreStore {
  version: 2
  scores: Record<string, Record<string, BestScore>>
}

const emptyStore = (): BestScoreStore => ({ version: 2, scores: {} })

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
    if (value.version !== 2 || !value.scores || typeof value.scores !== 'object') {
      return emptyStore()
    }

    const scores = Object.fromEntries(
      Object.entries(value.scores).flatMap(([topicId, topicScores]) => {
        if (!topicScores || typeof topicScores !== 'object') return []
        const validScores = Object.fromEntries(
          Object.entries(topicScores).filter((entry): entry is [string, BestScore] =>
            isBestScore(entry[1]),
          ),
        )
        return [[topicId, validScores]]
      }),
    )
    return { version: 2, scores }
  } catch {
    return emptyStore()
  }
}

export function getBestScore(
  topic: TopicMetadata,
  total: number,
  storage: Storage = window.localStorage,
): BestScore | undefined {
  const score = readStore(storage).scores[topic.id]?.[String(total)]
  return score?.topicId === topic.id &&
    score.contentVersion === topic.contentVersion &&
    score.total === total
    ? score
    : undefined
}

export function saveBestScore(
  topic: TopicMetadata,
  correct: number,
  total: number,
  storage: Storage = window.localStorage,
  completedAt = new Date().toISOString(),
): BestScore {
  const store = readStore(storage)
  const previous = store.scores[topic.id]?.[String(total)]
  const candidate: BestScore = {
    topicId: topic.id,
    contentVersion: topic.contentVersion,
    correct,
    total,
    completedAt,
  }

  if (
    previous?.contentVersion === topic.contentVersion &&
    previous.total === total &&
    previous.correct >= correct
  ) {
    return previous
  }

  store.scores[topic.id] = {
    ...store.scores[topic.id],
    [String(total)]: candidate,
  }
  storage.setItem(BEST_SCORE_STORAGE_KEY, JSON.stringify(store))
  return candidate
}
