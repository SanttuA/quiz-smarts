import { useEffect, useReducer, useState } from 'react'
import type { QuizMode, TopicDefinition } from '../../../content/types'
import { getBestScore, saveBestScore, type BestScore } from '../../../lib/best-score'
import { formatCorrectAnswer, formatResponse } from '../model/evaluate'
import { getAttemptRandom } from '../model/random'
import { createInitialResponse, hasResponse, type QuizResponse } from '../model/responses'
import { createQuizState, getScore, quizReducer } from '../model/session'
import { prepareAttempt } from '../model/shuffle'
import { QuestionRenderer } from './QuestionRenderer'
import styles from './QuizRunner.module.css'

interface QuizRunnerProps {
  topic: TopicDefinition
  mode: QuizMode
  onExit: () => void
  onOpenCheatsheet: () => void
}

const questionKindLabels = {
  'multiple-choice': 'Multiple choice',
  'text-blank': 'Write the syntax',
  'drag-blank': 'Complete the blank',
  sequence: 'Order the logic',
} as const

export function QuizRunner({ topic, mode, onExit, onOpenCheatsheet }: QuizRunnerProps) {
  const [random] = useState(() => getAttemptRandom())
  const attemptQuestionCount =
    mode === 'subset' ? topic.subsetQuestionCount : topic.questions.length
  const [state, dispatch] = useReducer(quizReducer, topic.questions, (questions) =>
    createQuizState(prepareAttempt(questions, random, attemptQuestionCount)),
  )
  const [draft, setDraft] = useState<{ questionId: string; response: QuizResponse }>()
  const [bestScore, setBestScore] = useState<BestScore | undefined>(() =>
    getBestScore(topic, attemptQuestionCount),
  )
  const score = getScore(state)
  const currentQuestion = state.questions[state.currentIndex]
  const pendingResponse =
    draft && draft.questionId === currentQuestion?.id
      ? draft.response
      : currentQuestion
        ? createInitialResponse(currentQuestion)
        : undefined
  const currentAnswer = state.phase === 'feedback' ? state.answers.at(-1) : undefined
  const progress =
    state.phase === 'complete'
      ? 100
      : Math.round(
          ((state.currentIndex + (state.phase === 'feedback' ? 1 : 0)) / state.questions.length) *
            100,
        )

  useEffect(() => {
    if (state.phase === 'complete') {
      setBestScore(saveBestScore(topic, score, state.questions.length))
    }
  }, [score, state.phase, state.questions.length, topic])

  if (!currentQuestion && state.phase !== 'complete') {
    return <p role="alert">This topic does not contain any questions yet.</p>
  }

  function handleSubmit() {
    if (hasResponse(pendingResponse)) {
      dispatch({ type: 'submit', response: pendingResponse })
    }
  }

  function handleContinue() {
    dispatch({ type: 'continue' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleRestart() {
    const questions = prepareAttempt(topic.questions, random, attemptQuestionCount)
    dispatch({ type: 'restart', questions })
    setDraft(undefined)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleExit() {
    const needsConfirmation = state.answers.length > 0 && state.phase !== 'complete'
    if (
      !needsConfirmation ||
      window.confirm('Exit this quiz? Your unfinished attempt will not be saved.')
    ) {
      onExit()
    }
  }

  if (state.phase === 'complete') {
    const percent = Math.round((score / state.questions.length) * 100)
    return (
      <section className={styles.results} aria-labelledby="results-title">
        <span className={styles.resultKicker}>attempt complete</span>
        <div
          className={styles.scoreOrb}
          aria-label={`Score ${score} out of ${state.questions.length}`}
        >
          <strong>{percent}%</strong>
          <span>
            {score}/{state.questions.length} correct
          </span>
        </div>
        <h1 id="results-title">
          {percent >= 80
            ? 'Strong signal.'
            : percent >= 50
              ? 'Good momentum.'
              : 'A useful first pass.'}
        </h1>
        <p className={styles.resultLead}>
          {percent >= 80
            ? 'The fundamentals are sticking. Review the details below or reshuffle for another run.'
            : 'Review the answers while they are fresh, then use the cheatsheet to close the gaps.'}
        </p>
        {bestScore && (
          <p className={styles.bestResult}>
            ◆ Best {mode === 'subset' ? 'quick' : 'full'} score: {bestScore.correct}/
            {bestScore.total}
          </p>
        )}
        <div className={styles.resultActions}>
          <button type="button" className={styles.primaryButton} onClick={handleRestart}>
            Try another shuffle
          </button>
          <button type="button" className={styles.secondaryButton} onClick={onOpenCheatsheet}>
            Open cheatsheet
          </button>
          <button type="button" className={styles.textButton} onClick={onExit}>
            Back to topic
          </button>
        </div>

        <div className={styles.review}>
          <div className={styles.reviewHeading}>
            <span>Answer review</span>
            <strong>
              {score} correct · {state.questions.length - score} to revisit
            </strong>
          </div>
          <ol>
            {state.answers.map((answer, index) => {
              const question = state.questions.find(
                (candidate) => candidate.id === answer.questionId,
              )
              if (!question) return null
              return (
                <li
                  key={answer.questionId}
                  className={answer.isCorrect ? styles.reviewCorrect : styles.reviewIncorrect}
                >
                  <div className={styles.reviewStatus}>
                    <span aria-hidden="true">{answer.isCorrect ? '✓' : '×'}</span>
                    <small>Question {index + 1}</small>
                  </div>
                  <div>
                    <h2>{question.prompt}</h2>
                    <div className={styles.answerComparison}>
                      <p>
                        <span>Your answer</span>
                        <code>{formatResponse(question, answer.response)}</code>
                      </p>
                      {!answer.isCorrect && (
                        <p>
                          <span>Correct answer</span>
                          <code>{formatCorrectAnswer(question)}</code>
                        </p>
                      )}
                    </div>
                    <p className={styles.reviewExplanation}>{question.explanation}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.runner} aria-labelledby="question-title">
      <div className={styles.quizToolbar}>
        <button type="button" className={styles.exitButton} onClick={handleExit}>
          <span aria-hidden="true">←</span> Exit quiz
        </button>
        <div className={styles.progressCopy}>
          <span>
            Question {state.currentIndex + 1} / {state.questions.length}
          </span>
          <strong>{progress}%</strong>
        </div>
      </div>
      <div className={styles.progressTrack} aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <form className={styles.questionCard} onSubmit={(event) => event.preventDefault()}>
        <div className={styles.questionMeta}>
          <span>{questionKindLabels[currentQuestion!.kind]}</span>
          <code>{String(state.currentIndex + 1).padStart(2, '0')}</code>
        </div>
        <h1 id="question-title">{currentQuestion!.prompt}</h1>
        <p className={styles.instruction}>{currentQuestion!.instruction}</p>

        <div className={styles.inputArea}>
          <QuestionRenderer
            key={currentQuestion!.id}
            question={currentQuestion!}
            value={pendingResponse}
            onChange={(response) => setDraft({ questionId: currentQuestion!.id, response })}
            disabled={state.phase === 'feedback'}
          />
        </div>

        {currentAnswer && (
          <div
            className={currentAnswer.isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}
            role="status"
          >
            <span className={styles.feedbackIcon} aria-hidden="true">
              {currentAnswer.isCorrect ? '✓' : '×'}
            </span>
            <div>
              <strong>{currentAnswer.isCorrect ? 'That’s right.' : 'Not quite.'}</strong>
              <p>{currentQuestion!.explanation}</p>
              {!currentAnswer.isCorrect && (
                <p className={styles.correctAnswer}>
                  Correct answer: <code>{formatCorrectAnswer(currentQuestion!)}</code>
                </p>
              )}
            </div>
          </div>
        )}

        <div className={styles.questionActions}>
          {state.phase === 'answering' ? (
            <button
              type="button"
              className={styles.primaryButton}
              disabled={!hasResponse(pendingResponse)}
              onClick={handleSubmit}
            >
              Check answer
            </button>
          ) : (
            <button type="button" className={styles.primaryButton} onClick={handleContinue}>
              {state.currentIndex === state.questions.length - 1 ? 'See results' : 'Next question'}
              <span aria-hidden="true"> →</span>
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
