import { robotFrameworkMetadata } from './topics/robot-framework/metadata'
import type { TopicDefinition, TopicMetadata } from './types'

export const topicCatalog = [robotFrameworkMetadata] as const satisfies readonly TopicMetadata[]

const topicLoaders: Record<string, () => Promise<{ default: TopicDefinition }>> = {
  'robot-framework': () => import('./topics/robot-framework'),
}

export function getTopicMetadata(slug: string): TopicMetadata | undefined {
  return topicCatalog.find((topic) => topic.slug === slug)
}

export async function loadTopic(slug: string): Promise<TopicDefinition | undefined> {
  const loader = topicLoaders[slug]
  return loader ? (await loader()).default : undefined
}
