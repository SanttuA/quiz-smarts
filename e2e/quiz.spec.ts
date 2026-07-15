import { expect, test, type Page } from '@playwright/test'
import pythonTopic from '../src/content/topics/python'
import robotFrameworkTopic from '../src/content/topics/robot-framework'
import type { QuizQuestion } from '../src/content/types'
import { createSeededRandom } from '../src/features/quiz/model/random'
import { prepareAttempt } from '../src/features/quiz/model/shuffle'

const preparedSubsetQuestions = prepareAttempt(
  robotFrameworkTopic.questions,
  createSeededRandom('quiz-smarts-e2e'),
  robotFrameworkTopic.subsetQuestionCount,
)

const preparedPythonQuestions = prepareAttempt(
  pythonTopic.questions,
  createSeededRandom('quiz-smarts-e2e'),
  pythonTopic.questions.length,
)

async function answerCorrectly(page: Page, question: QuizQuestion) {
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
  await page.goto('/quiz-smarts/#/topics/robot-framework/quiz?mode=subset')
  await expect(page.getByText('Question 1 / 20')).toBeVisible()
  await expect(page.getByRole('link', { name: /cheatsheet/i })).toHaveCount(0)

  for (const [index, question] of preparedSubsetQuestions.entries()) {
    await answerCorrectly(page, question)
    await page
      .getByRole('button', {
        name: index === preparedSubsetQuestions.length - 1 ? 'See results' : 'Next question',
      })
      .click()
  }

  await expect(page.getByRole('heading', { name: 'Strong signal.' })).toBeVisible()
  await expect(page.getByLabel('Score 20 out of 20')).toBeVisible()
  await expect(page.getByText('◆ Best quick score: 20/20')).toBeVisible()

  const storedScore = await page.evaluate(() =>
    window.localStorage.getItem('quiz-smarts:best-scores:v2'),
  )
  expect(storedScore).toContain('"correct":20')

  await page.reload()
  await expect(page.getByText('Question 1 / 20')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Strong signal.' })).toHaveCount(0)
  expect(await page.evaluate(() => window.localStorage.getItem('quiz-smarts:best-scores:v2'))).toBe(
    storedScore,
  )

  await page.goto('/quiz-smarts/#/topics/robot-framework/quiz?mode=all')
  await expect(page.getByText('Question 1 / 40')).toBeVisible()
})

test('serves landing and topic routes from the GitHub Pages base path', async ({ page }) => {
  await page.goto('/quiz-smarts/#/')
  await expect(page.getByRole('heading', { name: 'Available topics' })).toBeVisible()

  await page.getByRole('link', { name: 'Open Robot Framework topic' }).click()
  await expect(page).toHaveURL(/#\/topics\/robot-framework$/)
  await expect(page.getByRole('heading', { name: 'Robot Framework cheatsheet' })).toBeVisible()
})

test('opens the Accessibility Testing topic and starts its quick quiz', async ({ page }) => {
  await page.goto('/quiz-smarts/#/')
  await expect(page.getByRole('heading', { name: 'Accessibility Testing' })).toBeVisible()

  await page.getByRole('link', { name: 'Open Accessibility Testing topic' }).click()
  await expect(page).toHaveURL(/#\/topics\/accessibility-testing$/)
  await expect(
    page.getByRole('heading', { name: 'Accessibility Testing cheatsheet' }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'Quick quiz · 20' }).click()
  await expect(page).toHaveURL(/#\/topics\/accessibility-testing\/quiz\?mode=subset$/)
  await expect(page.getByText('Question 1 / 20')).toBeVisible()
})

test('opens the Python topic and starts its quick quiz', async ({ page }) => {
  await page.goto('/quiz-smarts/#/')
  await expect(page.getByRole('heading', { name: 'Python' })).toBeVisible()

  await page.getByRole('link', { name: 'Open Python topic' }).click()
  await expect(page).toHaveURL(/#\/topics\/python$/)
  await expect(page.getByRole('heading', { name: 'Python cheatsheet' })).toBeVisible()

  await page.getByRole('link', { name: 'Quick quiz · 20' }).click()
  await expect(page).toHaveURL(/#\/topics\/python\/quiz\?mode=subset$/)
  await expect(page.getByText('Question 1 / 20')).toBeVisible()
})

test('opens the TypeScript topic and starts its quick quiz', async ({ page }) => {
  await page.goto('/quiz-smarts/#/')
  await expect(page.getByRole('heading', { name: 'TypeScript' })).toBeVisible()

  await page.getByRole('link', { name: 'Open TypeScript topic' }).click()
  await expect(page).toHaveURL(/#\/topics\/typescript$/)
  await expect(page.getByRole('heading', { name: 'TypeScript cheatsheet' })).toBeVisible()
  await expect(page.getByRole('link', { name: /The TypeScript Handbook/ })).toBeVisible()

  await page.getByRole('link', { name: 'Quick quiz · 20' }).click()
  await expect(page).toHaveURL(/#\/topics\/typescript\/quiz\?mode=subset$/)
  await expect(page.getByText('Question 1 / 20')).toBeVisible()
})

test('opens the Vitest topic and starts its quick quiz', async ({ page }) => {
  await page.goto('/quiz-smarts/#/')
  await expect(page.getByRole('heading', { name: 'Vitest' })).toBeVisible()

  await page.getByRole('link', { name: 'Open Vitest topic' }).click()
  await expect(page).toHaveURL(/#\/topics\/vitest$/)
  await expect(page.getByRole('heading', { name: 'Vitest cheatsheet' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Vitest: Getting Started/ })).toBeVisible()

  await page.getByRole('link', { name: 'Quick quiz · 20' }).click()
  await expect(page).toHaveURL(/#\/topics\/vitest\/quiz\?mode=subset$/)
  await expect(page.getByText('Question 1 / 20')).toBeVisible()
})

test('opens the Playwright topic and starts its quick quiz', async ({ page }) => {
  await page.goto('/quiz-smarts/#/')
  await expect(page.getByRole('heading', { name: 'Playwright' })).toBeVisible()

  await page.getByRole('link', { name: 'Open Playwright topic' }).click()
  await expect(page).toHaveURL(/#\/topics\/playwright$/)
  await expect(page.getByRole('heading', { name: 'Playwright cheatsheet' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Playwright: Writing tests/ })).toBeVisible()

  await page.getByRole('link', { name: 'Quick quiz · 20' }).click()
  await expect(page).toHaveURL(/#\/topics\/playwright\/quiz\?mode=subset$/)
  await expect(page.getByText('Question 1 / 20')).toBeVisible()
})

test('opens the JMeter topic and starts its quick quiz', async ({ page }) => {
  await page.goto('/quiz-smarts/#/')
  await expect(page.getByRole('heading', { name: 'Load Testing with JMeter' })).toBeVisible()

  await page.getByRole('link', { name: 'Open Load Testing with JMeter topic' }).click()
  await expect(page).toHaveURL(/#\/topics\/jmeter$/)
  await expect(
    page.getByRole('heading', { name: 'Load Testing with JMeter cheatsheet' }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: /Apache JMeter: Getting Started/ })).toBeVisible()

  await page.getByRole('link', { name: 'Quick quiz · 20' }).click()
  await expect(page).toHaveURL(/#\/topics\/jmeter\/quiz\?mode=subset$/)
  await expect(page.getByText('Question 1 / 20')).toBeVisible()
})

test('keeps multiline blank templates in source order', async ({ page }) => {
  await page.goto('/quiz-smarts/#/topics/python/quiz?mode=all')

  const questionIndex = preparedPythonQuestions.findIndex(
    (question) => question.id === 'python.text-except',
  )
  expect(questionIndex).toBeGreaterThanOrEqual(0)

  for (const question of preparedPythonQuestions.slice(0, questionIndex)) {
    await answerCorrectly(page, question)
    await page.getByRole('button', { name: 'Next question' }).click()
  }

  const question = preparedPythonQuestions[questionIndex]!
  await expect(page.getByRole('heading', { name: question.prompt })).toBeVisible()

  const input = page.getByRole('textbox', { name: 'Missing answer' })
  const codeFlow = input.locator('xpath=ancestor::code[1]')
  await expect(codeFlow).toHaveCSS('display', 'block')
  await expect(codeFlow).toHaveCSS('white-space', 'pre-wrap')

  const layout = await codeFlow.evaluate((element) => {
    const [before, control, after] = Array.from(element.children)
    if (!before || !control || !after || !element.parentElement) {
      throw new Error('Incomplete code flow')
    }

    const rectTops = (node: Element) => [
      ...new Set(Array.from(node.getClientRects(), (rect) => Math.round(rect.top))),
    ]
    const controlRect = control.getBoundingClientRect()
    const panelRect = element.parentElement.getBoundingClientRect()

    return {
      childTags: [before.tagName, control.tagName, after.tagName],
      beforeTops: rectTops(before),
      controlTop: controlRect.top,
      controlBottom: controlRect.bottom,
      controlLeft: controlRect.left,
      controlRight: controlRect.right,
      afterTops: rectTops(after),
      panelLeft: panelRect.left,
      panelRight: panelRect.right,
    }
  })

  expect(layout.childTags).toEqual(['SPAN', 'INPUT', 'SPAN'])
  expect(layout.beforeTops).toHaveLength(2)
  expect(layout.controlTop).toBeGreaterThan(layout.beforeTops.at(-1)!)
  expect(layout.afterTops[0]).toBeLessThan(layout.controlBottom)
  expect(layout.afterTops.at(-1)!).toBeGreaterThan(layout.afterTops[0]!)
  expect(layout.controlLeft).toBeGreaterThanOrEqual(layout.panelLeft)
  expect(layout.controlRight).toBeLessThanOrEqual(layout.panelRight)

  await input.focus()
  await expect(input).toBeFocused()
  await input.fill('except')
  await page.getByRole('button', { name: 'Check answer' }).click()
  await expect(page.getByText('That’s right.')).toBeVisible()
})

test('uses the OS theme until a persistent preference is selected', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/quiz-smarts/#/')

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  const lightModeButton = page.getByRole('button', { name: 'Switch to light mode' })
  await expect(lightModeButton).toContainText('Light')
  await lightModeButton.click()

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect
    .poll(() => page.evaluate(() => window.localStorage.getItem('quiz-smarts:theme:v1')))
    .toBe('light')

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toContainText('Dark')
})

test('reorders a sequence with the keyboard without submitting it', async ({ page }) => {
  await page.goto('/quiz-smarts/#/topics/robot-framework/quiz?mode=subset')

  const sequenceIndex = preparedSubsetQuestions.findIndex(
    (question) => question.kind === 'sequence',
  )
  expect(sequenceIndex).toBeGreaterThanOrEqual(0)

  for (const question of preparedSubsetQuestions.slice(0, sequenceIndex)) {
    await answerCorrectly(page, question)
    await page.getByRole('button', { name: 'Next question' }).click()
  }

  const sequenceQuestion = preparedSubsetQuestions[sequenceIndex]!
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
