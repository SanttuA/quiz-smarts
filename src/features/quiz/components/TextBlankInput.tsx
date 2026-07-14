import type { TextBlankQuestion } from '../../../content/types'
import type { QuizResponse } from '../model/responses'
import styles from './QuestionInputs.module.css'

interface TextBlankInputProps {
  question: TextBlankQuestion
  value?: QuizResponse
  onChange: (response: QuizResponse) => void
  disabled: boolean
}

export function TextBlankInput({ question, value, onChange, disabled }: TextBlankInputProps) {
  const answer = value?.kind === 'text-blank' ? value.answer : ''

  return (
    <div className={styles.textBlank}>
      <div className={styles.codeTemplate}>
        <code className={styles.codeFlow}>
          <span>{question.template.before}</span>
          <input
            value={answer}
            onChange={(event) => onChange({ kind: 'text-blank', answer: event.target.value })}
            disabled={disabled}
            aria-label="Missing answer"
            autoCapitalize="off"
            autoComplete="off"
            spellCheck={false}
            placeholder="type answer"
          />
          <span>{question.template.after}</span>
        </code>
      </div>
      <span className={styles.inputHint}>Case and repeated whitespace are normalized.</span>
    </div>
  )
}
