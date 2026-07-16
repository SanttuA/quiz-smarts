import type { TopicMetadata } from '../../types'

export const vitestMetadata = {
  id: 'vitest',
  slug: 'vitest',
  title: 'Vitest',
  eyebrow: 'Testing · React components',
  summary: 'Practice fast React component tests with Vitest and Testing Library.',
  description:
    'Learn Vitest structure, React rendering, semantic queries, user interactions, async assertions, mocks, configuration, and coverage.',
  difficulty: 'Beginner → intermediate',
  estimatedMinutes: 34,
  questionCount: 40,
  subsetQuestionCount: 20,
  contentVersion: 2,
  lastReviewed: '2026-07-16',
} as const satisfies TopicMetadata
