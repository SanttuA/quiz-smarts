import type { TopicMetadata } from '../../types'

export const pythonMetadata = {
  id: 'python',
  slug: 'python',
  title: 'Python',
  eyebrow: 'Programming · Core language',
  summary: 'Practice expressive Python syntax and the building blocks of maintainable programs.',
  description:
    'Learn Python 3 values, collections, control flow, functions, exceptions, modules, and classes.',
  difficulty: 'Beginner → intermediate',
  estimatedMinutes: 32,
  questionCount: 40,
  subsetQuestionCount: 20,
  contentVersion: 1,
  lastReviewed: '2026-07-14',
} as const satisfies TopicMetadata
