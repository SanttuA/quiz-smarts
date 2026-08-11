import type { TopicMetadata } from '../../types'

export const csharpBasicsMetadata = {
  id: 'csharp-basics',
  slug: 'csharp-basics',
  title: 'Basic C#',
  eyebrow: 'Programming · Language fundamentals',
  summary: 'Practice modern C# syntax and the core building blocks of small programs.',
  description:
    'Learn C# console programs, values, expressions, control flow, methods, collections, classes, and properties.',
  difficulty: 'Beginner',
  estimatedMinutes: 32,
  questionCount: 40,
  subsetQuestionCount: 20,
  contentVersion: 1,
  lastReviewed: '2026-08-11',
} as const satisfies TopicMetadata
