import { expect, type Page } from '@playwright/test'
import type { QuizQuestion, TopicDefinition } from '../src/content/types'
import { createSeededRandom } from '../src/features/quiz/model/random'
import { prepareAttempt } from '../src/features/quiz/model/shuffle'

/** Replays the shuffle the app performs when built with `VITE_E2E_SEED`. */
export function prepareSeededAttempt(topic: TopicDefinition, questionCount: number) {
  return prepareAttempt(topic.questions, createSeededRandom('quiz-smarts-e2e'), questionCount)
}

export async function answerCorrectly(page: Page, question: QuizQuestion) {
  await expect(page.getByRole('heading', { name: question.prompt })).toBeVisible()

  switch (question.kind) {
    case 'multiple-choice': {
      const answer = question.choices.find((choice) => choice.id === question.correctChoiceId)!
      await page.getByRole('radio', { name: answer.label, exact: true }).check()
      break
    }
    case 'text-blank':
      await page.getByRole('textbox', { name: 'Missing answer' }).fill(question.canonicalAnswer)
      break
    case 'drag-blank': {
      const answer = question.options.find((option) => option.id === question.correctOptionId)!
      await page.getByRole('radio', { name: answer.label, exact: true }).check()
      break
    }
    case 'sequence': {
      const sequenceList = page.getByRole('list', { name: 'Lines to order' })
      const getCurrentIds = async () => {
        const codes = await sequenceList.locator('code').allTextContents()
        return codes.map(
          (code) => question.items.find((item) => item.code === code)?.id ?? `unknown:${code}`,
        )
      }
      for (let targetIndex = 0; targetIndex < question.correctOrder.length; targetIndex += 1) {
        const targetId = question.correctOrder[targetIndex]!
        let currentIndex = (await getCurrentIds()).indexOf(targetId)
        while (currentIndex > targetIndex) {
          const item = question.items.find((candidate) => candidate.id === targetId)!
          await page.getByRole('button', { name: `Move ${item.code} up`, exact: true }).click()
          currentIndex -= 1
          await expect
            .poll(async () => (await getCurrentIds()).indexOf(targetId))
            .toBe(currentIndex)
        }
      }
      break
    }
  }

  await page.getByRole('button', { name: 'Check answer' }).click()
  await expect(page.getByText('That’s right.')).toBeVisible()
}
