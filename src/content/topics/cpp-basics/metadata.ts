import type { TopicMetadata } from '../../types'

export const cppBasicsMetadata = {
  id: 'cpp-basics',
  slug: 'cpp-basics',
  title: 'Basic C++',
  eyebrow: 'Programming · Language fundamentals',
  summary: 'Practice modern C++ syntax and the core building blocks of small programs.',
  description:
    'Learn C++ program structure, values, expressions, control flow, functions, strings, and vectors.',
  difficulty: 'Beginner',
  estimatedMinutes: 32,
  questionCount: 40,
  subsetQuestionCount: 20,
  contentVersion: 1,
  lastReviewed: '2026-08-10',
} as const satisfies TopicMetadata
