import type { TopicMetadata } from '../../types'

export const jmeterMetadata = {
  id: 'jmeter',
  slug: 'jmeter',
  title: 'Load Testing with JMeter',
  eyebrow: 'Performance · Load testing',
  summary:
    'Practice realistic HTTP load tests with deliberate workloads, dynamic data, and evidence-based analysis.',
  description:
    'Learn load-testing foundations with Apache JMeter: HTTP test plans, workload modeling, correlation, CLI execution, and result analysis.',
  difficulty: 'Beginner → intermediate',
  estimatedMinutes: 34,
  questionCount: 40,
  subsetQuestionCount: 20,
  contentVersion: 2,
  lastReviewed: '2026-07-16',
} as const satisfies TopicMetadata
