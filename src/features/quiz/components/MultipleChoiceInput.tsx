import type { MultipleChoiceQuestion } from '../../../content/types'
import type { QuizResponse } from '../model/responses'
import styles from './QuestionInputs.module.css'

interface MultipleChoiceInputProps {
  question: MultipleChoiceQuestion
  value?: QuizResponse
  onChange: (response: QuizResponse) => void
  disabled: boolean
}

export function MultipleChoiceInput({
  question,
  value,
  onChange,
  disabled,
}: MultipleChoiceInputProps) {
  const selectedId = value?.kind === 'multiple-choice' ? value.choiceId : undefined

  return (
    <fieldset className={styles.fieldset} disabled={disabled}>
      <legend className="sr-only">{question.prompt}</legend>
      <div className={styles.choiceGrid}>
        {question.choices.map((choice, index) => (
          <label
            key={choice.id}
            className={`${styles.choice} ${selectedId === choice.id ? styles.selectedChoice : ''}`}
          >
            <input
              type="radio"
              name={question.id}
              value={choice.id}
              checked={selectedId === choice.id}
              onChange={() => onChange({ kind: 'multiple-choice', choiceId: choice.id })}
            />
            <span className={styles.choiceKey} aria-hidden="true">
              {String.fromCharCode(65 + index)}
            </span>
            <span>{choice.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
