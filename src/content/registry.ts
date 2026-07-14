import { accessibilityTestingMetadata } from './topics/accessibility-testing/metadata'
import { pythonMetadata } from './topics/python/metadata'
import { robotFrameworkMetadata } from './topics/robot-framework/metadata'
import type { TopicDefinition, TopicMetadata } from './types'

export const topicCatalog = [
  robotFrameworkMetadata,
  accessibilityTestingMetadata,
  pythonMetadata,
] as const satisfies readonly TopicMetadata[]

const topicLoaders: Record<string, () => Promise<{ default: TopicDefinition }>> = {
  'robot-framework': () => import('./topics/robot-framework'),
  'accessibility-testing': () => import('./topics/accessibility-testing'),
  python: () => import('./topics/python'),
}

export function getTopicMetadata(slug: string): TopicMetadata | undefined {
  return topicCatalog.find((topic) => topic.slug === slug)
}

export async function loadTopic(slug: string): Promise<TopicDefinition | undefined> {
  const loader = topicLoaders[slug]
  return loader ? (await loader()).default : undefined
}
