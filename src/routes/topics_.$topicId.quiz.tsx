import { createFileRoute, notFound } from '@tanstack/react-router'
import { loadTopic } from '../content/registry'
import type { QuizMode } from '../content/types'
import { QuizPage } from '../pages/QuizPage'

export const Route = createFileRoute('/topics_/$topicId/quiz')({
  validateSearch: (search: Record<string, unknown>): { mode: QuizMode } => ({
    mode: search.mode === 'subset' ? 'subset' : 'all',
  }),
  loader: async ({ params }) => {
    const topic = await loadTopic(params.topicId)
    if (!topic) throw notFound()
    return topic
  },
  component: QuizRoute,
})

function QuizRoute() {
  const topic = Route.useLoaderData()
  const { mode } = Route.useSearch()
  const navigate = Route.useNavigate()

  return (
    <QuizPage
      topic={topic}
      mode={mode}
      onExit={() => navigate({ to: '/topics/$topicId', params: { topicId: topic.slug } })}
      onOpenCheatsheet={() =>
        navigate({
          to: '/topics/$topicId',
          params: { topicId: topic.slug },
          hash: 'cheatsheet',
        })
      }
    />
  )
}
