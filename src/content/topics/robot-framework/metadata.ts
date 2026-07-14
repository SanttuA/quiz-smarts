import type { TopicMetadata } from '../../types'

export const robotFrameworkMetadata = {
  id: 'robot-framework',
  slug: 'robot-framework',
  title: 'Robot Framework',
  eyebrow: 'Automation · Keyword driven',
  summary: 'Build confidence with readable automation syntax and reusable keywords.',
  description:
    'Learn the structure, variables, settings, and control flow behind maintainable Robot Framework suites.',
  difficulty: 'Beginner → intermediate',
  estimatedMinutes: 32,
  questionCount: 40,
  subsetQuestionCount: 20,
  contentVersion: 3,
  lastReviewed: '2026-07-14',
} as const satisfies TopicMetadata
