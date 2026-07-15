import type { TopicMetadata } from '../../types'

export const dataAnalysisMetadata = {
  id: 'data-analysis',
  slug: 'data-analysis',
  title: 'Basic Data Analysis',
  eyebrow: 'Data · Analysis fundamentals',
  summary:
    'Build confidence turning raw observations into careful summaries, charts, and conclusions.',
  description:
    'Learn a practical analysis workflow: frame questions, check data quality, summarize distributions, choose charts, compare groups, and communicate uncertainty.',
  difficulty: 'Beginner',
  estimatedMinutes: 32,
  questionCount: 40,
  subsetQuestionCount: 20,
  contentVersion: 1,
  lastReviewed: '2026-07-15',
} as const satisfies TopicMetadata
