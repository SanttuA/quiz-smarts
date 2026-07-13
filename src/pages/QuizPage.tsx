import type { TopicDefinition } from '../content/types'
import { QuizRunner } from '../features/quiz/components/QuizRunner'

interface QuizPageProps {
  topic: TopicDefinition
  onExit: () => void
  onOpenCheatsheet: () => void
}

export function QuizPage(props: QuizPageProps) {
  return <QuizRunner {...props} />
}
