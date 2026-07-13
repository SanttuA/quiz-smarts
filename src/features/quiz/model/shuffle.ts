import type { QuizQuestion, SequenceItem } from '../../../content/types'
import type { RandomSource } from './random'

export function fisherYates<T>(items: readonly T[], random: RandomSource = Math.random): T[] {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const candidate = Math.floor(random() * (index + 1))
    const swapIndex = Math.max(0, Math.min(index, candidate))
    const current = shuffled[index]
    const replacement = shuffled[swapIndex]
    if (current === undefined || replacement === undefined) continue
    shuffled[index] = replacement
    shuffled[swapIndex] = current
  }

  return shuffled
}

function isCorrectSequence(
  items: readonly SequenceItem[],
  correctOrder: readonly string[],
): boolean {
  return items.every((item, index) => item.id === correctOrder[index])
}

function shuffleSequence(
  items: readonly SequenceItem[],
  correctOrder: readonly string[],
  random: RandomSource,
): SequenceItem[] {
  const shuffled = fisherYates(items, random)
  if (shuffled.length > 1 && isCorrectSequence(shuffled, correctOrder)) {
    const first = shuffled.shift()
    if (first) shuffled.push(first)
  }
  return shuffled
}

export function prepareQuestion(question: QuizQuestion, random: RandomSource): QuizQuestion {
  switch (question.kind) {
    case 'multiple-choice':
      return { ...question, choices: fisherYates(question.choices, random) }
    case 'text-blank':
      return { ...question }
    case 'drag-blank':
      return { ...question, options: fisherYates(question.options, random) }
    case 'sequence':
      return {
        ...question,
        items: shuffleSequence(question.items, question.correctOrder, random),
      }
  }
}

export function prepareAttempt(
  questions: readonly QuizQuestion[],
  random: RandomSource = Math.random,
): QuizQuestion[] {
  return fisherYates(questions, random).map((question) => prepareQuestion(question, random))
}
