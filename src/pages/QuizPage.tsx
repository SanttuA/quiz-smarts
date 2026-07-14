import type { QuizMode, TopicDefinition } from '../content/types'
import { QuizRunner } from '../features/quiz/components/QuizRunner'

interface QuizPageProps {
  topic: TopicDefinition
  mode: QuizMode
  onExit: () => void
  onOpenCheatsheet: () => void
}

export function QuizPage(props: QuizPageProps) {
  return <QuizRunner key={`${props.topic.id}:${props.mode}`} {...props} />
}
