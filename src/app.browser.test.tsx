import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { topicCatalog } from './content/registry'
import { ThemeProvider } from './features/theme/ThemeProvider'
import { THEME_STORAGE_KEY } from './features/theme/theme'
import { createAppRouter } from './router'

function renderRoute(path: string) {
  const history = createMemoryHistory({ initialEntries: [path] })
  const router = createAppRouter(history)
  return render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  )
}

describe('routed application', () => {
  it('lists every catalog topic and opens a topic from its card', async () => {
    const screen = await renderRoute('/')

    await expect
      .element(screen.getByRole('heading', { name: 'Available topics' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByText(`${topicCatalog.length} topics`, { exact: true }))
      .toBeInTheDocument()
    for (const topic of topicCatalog) {
      await expect
        .element(screen.getByRole('heading', { name: topic.title, exact: true }))
        .toBeInTheDocument()
    }

    await screen.getByRole('link', { name: 'Open Robot Framework topic' }).click()
    await expect
      .element(screen.getByRole('heading', { name: 'Robot Framework cheatsheet' }))
      .toBeInTheDocument()
  })

  it('filters topics by category and searchable topic copy', async () => {
    const screen = await renderRoute('/')

    const search = screen.getByRole('searchbox', { name: 'Search topics' })
    const allFilter = screen.getByRole('button', { name: 'All' })
    const programmingFilter = screen.getByRole('button', { name: 'Programming' })
    const automationFilter = screen.getByRole('button', { name: 'Test automation' })

    await expect.element(allFilter).toHaveAttribute('aria-pressed', 'true')
    await programmingFilter.click()

    await expect.element(programmingFilter).toHaveFocus()
    await expect.element(programmingFilter).toHaveAttribute('aria-pressed', 'true')
    await expect.element(screen.getByRole('status')).toHaveTextContent('5 of 12 topics')
    await expect.element(screen.getByRole('heading', { name: 'Python' })).toBeInTheDocument()
    await expect
      .element(screen.getByRole('heading', { name: 'Robot Framework' }))
      .not.toBeInTheDocument()

    await allFilter.click()
    await search.fill('cross-platform')

    await expect.element(search).toHaveFocus()
    await expect.element(screen.getByRole('status')).toHaveTextContent('1 of 12 topics')
    await expect.element(screen.getByRole('heading', { name: 'Modern .NET' })).toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Python' })).not.toBeInTheDocument()

    await screen.getByRole('button', { name: 'Clear topic search' }).click()
    await expect.element(search).toHaveFocus()
    await automationFilter.click()
    await search.fill('browser')

    await expect.element(screen.getByRole('status')).toHaveTextContent('2 of 12 topics')
    await expect.element(screen.getByRole('heading', { name: 'Playwright' })).toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Selenium' })).toBeInTheDocument()
    await expect
      .element(screen.getByRole('heading', { name: 'Accessibility Testing' }))
      .not.toBeInTheDocument()
  })

  it('clears search and category filters from the empty state', async () => {
    const screen = await renderRoute('/')

    const search = screen.getByRole('searchbox', { name: 'Search topics' })
    await screen.getByRole('button', { name: 'Data' }).click()
    await search.fill('browser automation')

    await expect.element(screen.getByRole('status')).toHaveTextContent('0 of 12 topics')
    await expect
      .element(screen.getByRole('heading', { name: 'No topics found' }))
      .toBeInTheDocument()

    await screen.getByRole('button', { name: 'Clear search and filters' }).click()

    await expect.element(search).toHaveFocus()
    await expect.element(search).toHaveValue('')
    await expect
      .element(screen.getByRole('button', { name: 'All' }))
      .toHaveAttribute('aria-pressed', 'true')
    await expect.element(screen.getByRole('status')).toHaveTextContent('12 topics')
    await expect
      .element(screen.getByRole('heading', { name: 'Basic Data Analysis' }))
      .toBeInTheDocument()
  })

  it('defaults direct quiz routes to all questions', async () => {
    const screen = await renderRoute('/topics/robot-framework/quiz')

    await expect.element(screen.getByText(/Question 1 \/ 40/)).toBeInTheDocument()
    await expect
      .element(screen.getByRole('heading', { name: /cheatsheet/i }))
      .not.toBeInTheDocument()
    await expect.element(screen.getByRole('link', { name: /cheatsheet/i })).not.toBeInTheDocument()
    await expect.element(screen.getByText('Quick reference')).not.toBeInTheDocument()
  })

  it('launches the configured subset from the landing page', async () => {
    const screen = await renderRoute('/')

    await screen
      .getByRole('link', {
        name: 'Start Robot Framework quick quiz, 20 questions',
      })
      .click()

    await expect.element(screen.getByText('Question 1 / 20')).toBeInTheDocument()
  })

  it.each(topicCatalog.map((topic) => [topic.title, topic] as const))(
    'loads the %s topic page and starts its quick quiz',
    async (_title, topic) => {
      const screen = await renderRoute(`/topics/${topic.slug}`)

      await expect
        .element(screen.getByRole('heading', { name: `${topic.title} cheatsheet` }))
        .toBeInTheDocument()
      await expect
        .element(screen.getByRole('link', { name: `All questions · ${topic.questionCount}` }))
        .toBeInTheDocument()

      await screen.getByRole('link', { name: `Quick quiz · ${topic.subsetQuestionCount}` }).click()
      await expect
        .element(screen.getByText(`Question 1 / ${topic.subsetQuestionCount}`))
        .toBeInTheDocument()
    },
  )

  it.each(['/topics/not-real', '/topics/not-real/quiz', '/not-a-route'])(
    'shows a useful not-found screen for %s',
    async (path) => {
      const screen = await renderRoute(path)

      await expect
        .element(screen.getByRole('heading', { name: 'This path drew a blank.' }))
        .toBeInTheDocument()
    },
  )

  it('exposes a persistent theme toggle in the shared header', async () => {
    const screen = await renderRoute('/')

    await screen.getByRole('button', { name: 'Switch to dark mode' }).click()

    await expect.element(document.documentElement).toHaveAttribute('data-theme', 'dark')
    await expect.poll(() => window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    await expect
      .element(screen.getByRole('button', { name: 'Switch to light mode' }))
      .toHaveTextContent('Light')
  })
})
