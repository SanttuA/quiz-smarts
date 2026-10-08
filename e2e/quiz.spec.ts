import { expect, test, type Locator, type Page } from '@playwright/test'
import pythonTopic from '../src/content/topics/python'
import robotFrameworkTopic from '../src/content/topics/robot-framework'
import type { QuizQuestion } from '../src/content/types'
import { answerCorrectly, prepareSeededAttempt } from './helpers'

const preparedSubsetQuestions = prepareSeededAttempt(
  robotFrameworkTopic,
  robotFrameworkTopic.subsetQuestionCount,
)

const preparedPythonQuestions = prepareSeededAttempt(pythonTopic, pythonTopic.questions.length)

async function answerIncorrectly(page: Page, question: QuizQuestion) {
  await expect(page.getByRole('heading', { name: question.prompt })).toBeVisible()

  switch (question.kind) {
    case 'multiple-choice': {
      const answer = question.choices.find((choice) => choice.id !== question.correctChoiceId)!
      await page.getByRole('radio', { name: answer.label, exact: true }).check()
      break
    }
    case 'text-blank':
      await page.getByRole('textbox', { name: 'Missing answer' }).fill('deliberately incorrect')
      break
    case 'drag-blank': {
      const answer = question.options.find((option) => option.id !== question.correctOptionId)!
      await page.getByRole('radio', { name: answer.label, exact: true }).check()
      break
    }
    case 'sequence':
      // Prepared sequence questions always start in an incorrect order.
      break
  }

  await page.getByRole('button', { name: 'Check answer' }).click()
  await expect(page.getByText('Not quite.')).toBeVisible()
}

async function pointerDrag(page: Page, source: Locator, target: Locator) {
  await source.scrollIntoViewIfNeeded()
  const sourceBox = await source.boundingBox()
  const targetBox = await target.boundingBox()
  if (!sourceBox || !targetBox) throw new Error('Drag source or target is not visible')

  const sourceCenter = {
    x: sourceBox.x + sourceBox.width / 2,
    y: sourceBox.y + sourceBox.height / 2,
  }
  const targetCenter = {
    x: targetBox.x + targetBox.width / 2,
    y: targetBox.y + targetBox.height / 2,
  }

  await page.mouse.move(sourceCenter.x, sourceCenter.y)
  await page.mouse.down()
  await page.mouse.move(sourceCenter.x + 10, sourceCenter.y, { steps: 5 })
  await page.mouse.move(targetCenter.x, targetCenter.y, { steps: 20 })
  await page.mouse.up()
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

  for (const [index, question] of preparedSubsetQuestions.entries()) {
    if (index === 0) {
      await answerIncorrectly(page, question)
    } else {
      await answerCorrectly(page, question)
    }
    await page
      .getByRole('button', {
        name: index === preparedSubsetQuestions.length - 1 ? 'See results' : 'Next question',
      })
      .click()
  }

  await expect(page.getByRole('heading', { name: 'Strong signal.' })).toBeVisible()
  await expect(page.getByLabel('Score 19 out of 20')).toBeVisible()
  await expect(page.getByText('◆ Best quick score: 20/20')).toBeVisible()
  await expect(page.getByRole('listitem').filter({ hasText: 'Incorrect' })).toHaveCount(1)
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

test('places a blank answer with pointer dragging', async ({ page }) => {
  await page.goto('/quiz-smarts/#/topics/robot-framework/quiz?mode=subset')
  const dragQuestionIndex = preparedSubsetQuestions.findIndex(
    (question) => question.kind === 'drag-blank',
  )
  expect(dragQuestionIndex).toBeGreaterThanOrEqual(0)

  for (const question of preparedSubsetQuestions.slice(0, dragQuestionIndex)) {
    await answerCorrectly(page, question)
    await page.getByRole('button', { name: 'Next question' }).click()
  }

  const question = preparedSubsetQuestions[dragQuestionIndex]!
  expect(question.kind).toBe('drag-blank')
  if (question.kind !== 'drag-blank') throw new Error('Missing drag-blank question')
  await expect(page.getByRole('heading', { name: question.prompt })).toBeVisible()

  const answer = question.options.find((option) => option.id === question.correctOptionId)!
  const dragOption = page.getByRole('button', {
    name: `Drag ${answer.label} to the blank`,
    exact: true,
  })
  const blank = page.getByRole('button', { name: 'Empty answer blank' })

  await pointerDrag(page, dragOption, blank)
  await expect(
    page.getByRole('button', { name: `Blank contains ${answer.label}`, exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('radio', { name: answer.label, exact: true })).toBeChecked()
  await expect(page.getByRole('button', { name: 'Check answer' })).toBeEnabled()
})

test('reorders a sequence with pointer dragging', async ({ page }) => {
  await page.goto('/quiz-smarts/#/topics/robot-framework/quiz?mode=subset')
  const sequenceIndex = preparedSubsetQuestions.findIndex(
    (question) => question.kind === 'sequence',
  )
  expect(sequenceIndex).toBeGreaterThanOrEqual(0)

  for (const question of preparedSubsetQuestions.slice(0, sequenceIndex)) {
    await answerCorrectly(page, question)
    await page.getByRole('button', { name: 'Next question' }).click()
  }

  const question = preparedSubsetQuestions[sequenceIndex]!
  expect(question.kind).toBe('sequence')
  await expect(page.getByRole('heading', { name: question.prompt })).toBeVisible()
  const sequenceList = page.getByRole('list', { name: 'Lines to order' })
  const originalOrder = await sequenceList.locator('code').allTextContents()
  const rows = sequenceList.getByRole('listitem')

  await pointerDrag(page, rows.first().getByRole('button', { name: /^Drag / }), rows.last())
  await expect
    .poll(async () => (await sequenceList.locator('code').allTextContents()).join('\n'))
    .not.toBe(originalOrder.join('\n'))
  await expect(page.getByRole('button', { name: 'Check answer' })).toBeVisible()
  await expect(page.getByText('That’s right.')).toHaveCount(0)
  await expect(page.getByText('Not quite.')).toHaveCount(0)
})
