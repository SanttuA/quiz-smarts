import { accessibilityTestingMetadata } from './topics/accessibility-testing/metadata'
import { jmeterMetadata } from './topics/jmeter/metadata'
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
  pythonMetadata,
  typescriptMetadata,
  vitestMetadata,
  playwrightMetadata,
  seleniumMetadata,
  jmeterMetadata,
] as const satisfies readonly TopicMetadata[]

const topicLoaders: Record<string, () => Promise<{ default: TopicDefinition }>> = {
  'robot-framework': () => import('./topics/robot-framework'),
  'accessibility-testing': () => import('./topics/accessibility-testing'),
  python: () => import('./topics/python'),
  typescript: () => import('./topics/typescript'),
  vitest: () => import('./topics/vitest'),
  playwright: () => import('./topics/playwright'),
  selenium: () => import('./topics/selenium'),
  jmeter: () => import('./topics/jmeter'),
}

export function getTopicMetadata(slug: string): TopicMetadata | undefined {
  return topicCatalog.find((topic) => topic.slug === slug)
}

export async function loadTopic(slug: string): Promise<TopicDefinition | undefined> {
  const loader = topicLoaders[slug]
  return loader ? (await loader()).default : undefined
}
