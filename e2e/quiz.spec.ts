import { expect, test, type Page } from '@playwright/test'
import robotFrameworkTopic from '../src/content/topics/robot-framework'
import type { QuizQuestion } from '../src/content/types'
import { createSeededRandom } from '../src/features/quiz/model/random'
import { prepareAttempt } from '../src/features/quiz/model/shuffle'

const preparedQuestions = prepareAttempt(
  robotFrameworkTopic.questions,
  createSeededRandom('quiz-smarts-e2e'),
)

async function answerCorrectly(page: Page, question: QuizQuestion) {
  await expect(page.getByRole('heading', { name: question.prompt })).toBeVisible()

  switch (question.kind) {
    case 'multiple-choice': {
      const answer = question.choices.find((choice) => choice.id === question.correctChoiceId)!
      await page.getByRole('radio', { name: answer.label }).check()
      break
    }
    case 'text-blank':
      await page
        .getByRole('textbox', { name: 'Missing Robot Framework syntax' })
        .fill(question.canonicalAnswer)
      break
    case 'drag-blank': {
      const answer = question.options.find((option) => option.id === question.correctOptionId)!
      await page.getByRole('radio', { name: answer.label, exact: true }).check()
      break
    }
    case 'sequence': {
      const sequenceList = page.getByLabel('Lines to order')
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
          const moveButton = page.getByRole('button', { name: `Move ${item.code} up`, exact: true })
          await moveButton.click()
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

test('completes a seeded shuffled quiz and persists only the best score', async ({ page }) => {
  await page.goto('/quiz-smarts/#/topics/robot-framework/quiz')
  await expect(page.getByText('Question 1 / 12')).toBeVisible()
  await expect(page.getByRole('link', { name: /cheatsheet/i })).toHaveCount(0)

  for (const [index, question] of preparedQuestions.entries()) {
    await answerCorrectly(page, question)
    await page
      .getByRole('button', {
        name: index === preparedQuestions.length - 1 ? 'See results' : 'Next question',
      })
      .click()
  }

  await expect(page.getByRole('heading', { name: 'Strong signal.' })).toBeVisible()
  await expect(page.getByLabel('Score 12 out of 12')).toBeVisible()
  await expect(page.getByText('◆ Best score: 12/12')).toBeVisible()

  const storedScore = await page.evaluate(() =>
    window.localStorage.getItem('quiz-smarts:best-scores:v1'),
  )
  expect(storedScore).toContain('"correct":12')

  await page.reload()
  await expect(page.getByText('Question 1 / 12')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Strong signal.' })).toHaveCount(0)
  expect(await page.evaluate(() => window.localStorage.getItem('quiz-smarts:best-scores:v1'))).toBe(
    storedScore,
  )
})

test('serves landing and topic routes from the GitHub Pages base path', async ({ page }) => {
  await page.goto('/quiz-smarts/#/')
  await expect(page.getByRole('heading', { name: 'Available topics' })).toBeVisible()

  await page.getByRole('link', { name: /Open topic/ }).click()
  await expect(page).toHaveURL(/#\/topics\/robot-framework$/)
  await expect(page.getByRole('heading', { name: 'Robot Framework cheatsheet' })).toBeVisible()
})

test('reorders a sequence with the keyboard without submitting it', async ({ page }) => {
  await page.goto('/quiz-smarts/#/topics/robot-framework/quiz')

  for (const question of preparedQuestions.slice(0, 2)) {
    await answerCorrectly(page, question)
    await page.getByRole('button', { name: 'Next question' }).click()
  }

  const sequenceQuestion = preparedQuestions[2]!
  expect(sequenceQuestion.kind).toBe('sequence')
  await expect(page.getByRole('heading', { name: sequenceQuestion.prompt })).toBeVisible()

  const sequenceList = page.getByLabel('Lines to order')
  const originalOrder = await sequenceList.locator('code').allTextContents()
  const enabledMoveButton = sequenceList
    .locator('button[aria-label^="Move "]:not(:disabled)')
    .first()

  await enabledMoveButton.focus()
  await enabledMoveButton.press('Enter')

  await expect
    .poll(async () => (await sequenceList.locator('code').allTextContents()).join('\n'))
    .not.toBe(originalOrder.join('\n'))
  await expect(page.getByRole('button', { name: 'Check answer' })).toBeVisible()
  await expect(page.getByText('That’s right.')).toHaveCount(0)
  await expect(page.getByText('Not quite.')).toHaveCount(0)
})
