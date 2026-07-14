import type { TopicMetadata } from '../../types'

export const typescriptMetadata = {
  id: 'typescript',
  slug: 'typescript',
  title: 'TypeScript',
  eyebrow: 'Programming · Static typing',
  summary: 'Practice TypeScript’s type system and safer patterns for everyday JavaScript.',
  description:
    'Learn inference, unions, narrowing, object types, functions, generics, modules, and strict compiler checks.',
  difficulty: 'Beginner → intermediate',
  estimatedMinutes: 34,
  questionCount: 40,
  subsetQuestionCount: 20,
  contentVersion: 1,
  lastReviewed: '2026-07-14',
} as const satisfies TopicMetadata
