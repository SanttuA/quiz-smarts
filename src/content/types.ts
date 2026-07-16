export type TopicId = string
export type QuizMode = 'subset' | 'all'

export interface QuestionReference {
  label: string
  url: string
}

export interface QuestionChoice {
  id: string
  label: string
  code?: string
}

export interface QuestionBase {
  id: string
  topicId: TopicId
  prompt: string
  instruction: string
  explanation: string
  reference: QuestionReference
}

export interface MultipleChoiceQuestion extends QuestionBase {
  kind: 'multiple-choice'
  choices: readonly QuestionChoice[]
  correctChoiceId: string
}

export interface TextBlankQuestion extends QuestionBase {
  kind: 'text-blank'
  template: {
    before: string
    after: string
  }
  canonicalAnswer: string
  acceptedAnswers: readonly string[]
}

export interface DragBlankQuestion extends QuestionBase {
  kind: 'drag-blank'
  template: {
    before: string
    after: string
  }
  options: readonly QuestionChoice[]
  correctOptionId: string
}

export interface SequenceItem {
  id: string
  code: string
}

export interface SequenceQuestion extends QuestionBase {
  kind: 'sequence'
  items: readonly SequenceItem[]
  correctOrder: readonly string[]
  acceptedOrders?: readonly (readonly string[])[]
  requiredOrderPairs?: readonly (readonly [beforeItemId: string, afterItemId: string])[]
}

export type QuizQuestion =
  MultipleChoiceQuestion | TextBlankQuestion | DragBlankQuestion | SequenceQuestion

export interface CheatSheetItem {
  term: string
  detail: string
  code?: string
}

export interface CheatSheetSection {
  id: string
  title: string
  summary: string
  items: readonly CheatSheetItem[]
  references?: readonly QuestionReference[]
}

export interface TopicMetadata {
  id: TopicId
  slug: string
  title: string
  eyebrow: string
  summary: string
  description: string
  difficulty: string
  estimatedMinutes: number
  questionCount: number
  subsetQuestionCount: number
  contentVersion: number
  lastReviewed: string
}

export interface TopicDefinition extends TopicMetadata {
  cheatsheet: readonly CheatSheetSection[]
  questions: readonly QuizQuestion[]
  reference: QuestionReference
}
