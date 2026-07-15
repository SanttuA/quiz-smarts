import type { TopicMetadata } from '../../types'

export const playwrightMetadata = {
  id: 'playwright',
  slug: 'playwright',
  title: 'Playwright',
  eyebrow: 'Automation · Browser testing',
  summary: 'Practice reliable browser tests with resilient locators and web-first assertions.',
  description:
    'Learn Playwright Test structure, locators, actions, assertions, fixtures, projects, and debugging workflows.',
  difficulty: 'Beginner → intermediate',
  estimatedMinutes: 34,
  questionCount: 40,
  subsetQuestionCount: 20,
  contentVersion: 1,
  lastReviewed: '2026-07-15',
} as const satisfies TopicMetadata
