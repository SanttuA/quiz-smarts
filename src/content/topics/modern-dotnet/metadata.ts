import type { TopicMetadata } from '../../types'

export const modernDotnetMetadata = {
  id: 'modern-dotnet',
  slug: 'modern-dotnet',
  title: 'Modern .NET',
  eyebrow: 'Development · Application platform',
  categories: ['programming'],
  summary: 'Practice the tools and runtime concepts behind modern cross-platform .NET apps.',
  description:
    'Learn the .NET 10 SDK, CLI, project system, NuGet, managed runtime, app hosting, testing, and deployment.',
  difficulty: 'Beginner → intermediate',
  estimatedMinutes: 34,
  questionCount: 40,
  subsetQuestionCount: 20,
  contentVersion: 1,
  lastReviewed: '2026-08-11',
} as const satisfies TopicMetadata
