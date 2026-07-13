import type { QuizQuestion } from '../../../content/types'
import type { QuizResponse } from '../model/responses'
import { DragBlankInput } from './DragBlankInput'
import { MultipleChoiceInput } from './MultipleChoiceInput'
import { SequenceInput } from './SequenceInput'
import { TextBlankInput } from './TextBlankInput'

interface QuestionRendererProps {
  question: QuizQuestion
  value?: QuizResponse
  onChange: (response: QuizResponse) => void
  disabled: boolean
}

export function QuestionRenderer(props: QuestionRendererProps) {
  switch (props.question.kind) {
    case 'multiple-choice':
      return <MultipleChoiceInput {...props} question={props.question} />
    case 'text-blank':
      return <TextBlankInput {...props} question={props.question} />
    case 'drag-blank':
      return <DragBlankInput {...props} question={props.question} />
    case 'sequence':
      return <SequenceInput {...props} question={props.question} />
  }
}
