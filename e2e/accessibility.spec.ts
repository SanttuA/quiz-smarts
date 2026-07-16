import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import robotFrameworkTopic from '../src/content/topics/robot-framework'
import type { QuizQuestion } from '../src/content/types'
import { createSeededRandom } from '../src/features/quiz/model/random'
import { prepareAttempt } from '../src/features/quiz/model/shuffle'

const preparedQuestions = prepareAttempt(
  robotFrameworkTopic.questions,
  createSeededRandom('quiz-smarts-e2e'),
  robotFrameworkTopic.subsetQuestionCount,
)

async function expectNoAxeViolations(page: Page, state: string) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .exclude('[data-a11y-decorative="watermark"]')
    .analyze()

  const summary = violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    targets: violation.nodes.flatMap((node) => node.target),
  }))
  expect(summary, `${state} has axe violations`).toEqual([])
}

async function answerCorrectly(page: Page, question: QuizQuestion) {
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
      const currentIds = async () => {
        const codes = await sequenceList.locator('code').allTextContents()
        return codes.map(
          (code) => question.items.find((item) => item.code === code)?.id ?? `unknown:${code}`,
        )
      }

      for (let targetIndex = 0; targetIndex < question.correctOrder.length; targetIndex += 1) {
        const targetId = question.correctOrder[targetIndex]!
        let currentIndex = (await currentIds()).indexOf(targetId)
        while (currentIndex > targetIndex) {
          const item = question.items.find((candidate) => candidate.id === targetId)!
          await page.getByRole('button', { name: `Move ${item.code} up`, exact: true }).click()
          currentIndex -= 1
          await expect.poll(async () => (await currentIds()).indexOf(targetId)).toBe(currentIndex)
        }
      }
      break
    }
  }

  await page.getByRole('button', { name: 'Check answer' }).click()
  await expect(page.getByText('That’s right.')).toBeVisible()
}

test('supports skip links, route focus, route titles, and axe-clean content pages', async ({
  page,
}) => {
  await page.goto('/quiz-smarts/#/')
  await expect(page).toHaveTitle('Quiz Smarts')
  await expectNoAxeViolations(page, 'landing page')

  const initialUrl = page.url()
  await page.keyboard.press('Tab')
  const skipLink = page.getByRole('link', { name: 'Skip to content' })
  await expect(skipLink).toBeFocused()
  await skipLink.press('Enter')
  const landingTitle = page.getByRole('heading', { level: 1 })
  await expect(landingTitle).toBeFocused()
  await expect(landingTitle).toHaveCSS('outline-style', 'solid')
  expect(page.url()).toBe(initialUrl)

  await page.getByRole('link', { name: 'Open Accessibility Testing topic' }).click()
  const topicTitle = page.getByRole('heading', { level: 1, name: 'Accessibility Testing' })
  await expect(topicTitle).toBeFocused()
  await expect(page).toHaveTitle('Accessibility Testing | Quiz Smarts')
  await expectNoAxeViolations(page, 'topic page')

  await page.getByRole('link', { name: 'Quick quiz · 20' }).click()
  const questionTitle = page.getByRole('heading', { level: 1 })
  await expect(questionTitle).toBeFocused()
  await expect(page).toHaveTitle('Accessibility Testing quick quiz | Quiz Smarts')
})

test('announces quiz changes and keeps every question type and results axe-clean', async ({
  page,
}) => {
  await page.goto('/quiz-smarts/#/topics/robot-framework/quiz?mode=subset')
  const scannedKinds = new Set<QuizQuestion['kind']>()
  let scannedFeedback = false
  let testedSequenceAnnouncement = false

  for (const [index, question] of preparedQuestions.entries()) {
    const questionTitle = page.getByRole('heading', { level: 1, name: question.prompt })
    await expect(questionTitle).toBeVisible()
    await expect(questionTitle).toContainText(question.prompt)

    if (!scannedKinds.has(question.kind)) {
      await expectNoAxeViolations(page, `${question.kind} question`)
      scannedKinds.add(question.kind)
    }

    if (question.kind === 'sequence' && !testedSequenceAnnouncement) {
      const sequenceList = page.getByRole('list', { name: 'Lines to order' })
      const moveButton = sequenceList.locator('button[aria-label^="Move "]:not(:disabled)').first()
      await moveButton.press('Enter')
      await expect(page.getByRole('status').filter({ hasText: /^Moved / })).toContainText(
        /to position \d+ of \d+/,
      )
      testedSequenceAnnouncement = true
    }

    await answerCorrectly(page, question)
    if (!scannedFeedback) {
      await expectNoAxeViolations(page, 'answer feedback')
      scannedFeedback = true
    }

    const continueButton = page.getByRole('button', {
      name: index === preparedQuestions.length - 1 ? 'See results' : 'Next question',
    })
    await continueButton.click()

    if (index < preparedQuestions.length - 1) {
      await expect(
        page.getByRole('heading', { level: 1, name: preparedQuestions[index + 1]!.prompt }),
      ).toBeFocused()
    }
  }

  expect([...scannedKinds].sort()).toEqual(
    ['drag-blank', 'multiple-choice', 'sequence', 'text-blank'].sort(),
  )
  expect(testedSequenceAnnouncement).toBe(true)

  const resultsTitle = page.getByRole('heading', { level: 1, name: 'Strong signal.' })
  await expect(resultsTitle).toBeFocused()
  await expect(page).toHaveTitle('Quiz results: Robot Framework | Quiz Smarts')
  await expect(page.getByRole('listitem').first()).toContainText('Correct')
  await expectNoAxeViolations(page, 'quiz results')

  await page.getByRole('button', { name: 'Open cheatsheet' }).click()
  const cheatsheetTitle = page.getByRole('heading', {
    name: 'Robot Framework cheatsheet',
  })
  await expect(page).toHaveURL(/#\/topics\/robot-framework#cheatsheet$/)
  await expect(cheatsheetTitle).toBeFocused()
  await expect(cheatsheetTitle).toBeInViewport()
})

test('does not create horizontal overflow at 320 CSS pixels', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto('/quiz-smarts/#/')

  const overflow = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    offenders: Array.from(document.querySelectorAll<HTMLElement>('body *'))
      .filter((element) => {
        const rect = element.getBoundingClientRect()
        return rect.left < 0 || rect.right > document.documentElement.clientWidth
      })
      .map((element) => element.tagName.toLowerCase()),
  }))

  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth)
  expect(overflow.offenders).toEqual([])
})
