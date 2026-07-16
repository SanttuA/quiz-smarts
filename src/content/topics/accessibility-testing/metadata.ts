import type { TopicMetadata } from '../../types'

export const accessibilityTestingMetadata = {
  id: 'accessibility-testing',
  slug: 'accessibility-testing',
  title: 'Accessibility Testing',
  eyebrow: 'Accessibility · Quality assurance',
  summary: 'Find barriers with automated tools, manual checks, and assistive technology.',
  description:
    'Practice a layered accessibility workflow using Lighthouse, axe, WAVE, keyboard checks, and human evaluation.',
  difficulty: 'Beginner → intermediate',
  estimatedMinutes: 34,
  questionCount: 40,
  subsetQuestionCount: 20,
  contentVersion: 2,
  lastReviewed: '2026-07-16',
} as const satisfies TopicMetadata
