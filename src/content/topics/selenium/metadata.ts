import type { TopicMetadata } from '../../types'

export const seleniumMetadata = {
  id: 'selenium',
  slug: 'selenium',
  title: 'Selenium',
  eyebrow: 'Automation · WebDriver',
  summary:
    'Practice dependable browser automation with WebDriver, explicit waits, and maintainable page objects.',
  description:
    'Learn Selenium 4 with Python and pytest: sessions, locators, waits, interactions, browser state, and troubleshooting.',
  difficulty: 'Beginner → intermediate',
  estimatedMinutes: 34,
  questionCount: 40,
  subsetQuestionCount: 20,
  contentVersion: 1,
  lastReviewed: '2026-07-15',
} as const satisfies TopicMetadata
