import { accessibilityTestingMetadata } from './topics/accessibility-testing/metadata'
import { cppBasicsMetadata } from './topics/cpp-basics/metadata'
import { csharpBasicsMetadata } from './topics/csharp-basics/metadata'
import { dataAnalysisMetadata } from './topics/data-analysis/metadata'
import { jmeterMetadata } from './topics/jmeter/metadata'
import { modernDotnetMetadata } from './topics/modern-dotnet/metadata'
import { playwrightMetadata } from './topics/playwright/metadata'
import { pythonMetadata } from './topics/python/metadata'
import { robotFrameworkMetadata } from './topics/robot-framework/metadata'
import { seleniumMetadata } from './topics/selenium/metadata'
import { typescriptMetadata } from './topics/typescript/metadata'
import { vitestMetadata } from './topics/vitest/metadata'
import type { TopicDefinition, TopicMetadata } from './types'

export const topicCatalog = [
  robotFrameworkMetadata,
  accessibilityTestingMetadata,
  dataAnalysisMetadata,
  pythonMetadata,
  cppBasicsMetadata,
  csharpBasicsMetadata,
  modernDotnetMetadata,
  typescriptMetadata,
  vitestMetadata,
  playwrightMetadata,
  seleniumMetadata,
  jmeterMetadata,
] as const satisfies readonly TopicMetadata[]

const topicLoaders: Record<string, () => Promise<{ default: TopicDefinition }>> = {
  'robot-framework': () => import('./topics/robot-framework'),
  'accessibility-testing': () => import('./topics/accessibility-testing'),
  'data-analysis': () => import('./topics/data-analysis'),
  python: () => import('./topics/python'),
  'cpp-basics': () => import('./topics/cpp-basics'),
  'csharp-basics': () => import('./topics/csharp-basics'),
  'modern-dotnet': () => import('./topics/modern-dotnet'),
  typescript: () => import('./topics/typescript'),
  vitest: () => import('./topics/vitest'),
  playwright: () => import('./topics/playwright'),
  selenium: () => import('./topics/selenium'),
  jmeter: () => import('./topics/jmeter'),
}

export async function loadTopic(slug: string): Promise<TopicDefinition | undefined> {
  const loader = topicLoaders[slug]
  return loader ? (await loader()).default : undefined
}
