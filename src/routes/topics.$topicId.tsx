import { createFileRoute, notFound } from '@tanstack/react-router'
import { loadTopic } from '../content/registry'
import { TopicPage } from '../pages/TopicPage'

export const Route = createFileRoute('/topics/$topicId')({
  loader: async ({ params }) => {
    const topic = await loadTopic(params.topicId)
    if (!topic) throw notFound()
    return topic
  },
  component: TopicRoute,
})

function TopicRoute() {
  const topic = Route.useLoaderData()
  return <TopicPage topic={topic} />
}
