import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
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
  it('moves from the landing topic card to the Robot Framework cheatsheet', async () => {
    const screen = await renderRoute('/')

    await expect
      .element(screen.getByRole('heading', { name: 'Available topics' }))
      .toBeInTheDocument()
    await expect.element(screen.getByText('12 topics')).toBeInTheDocument()
    await expect
      .element(screen.getByRole('heading', { name: 'Accessibility Testing' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('heading', { name: 'Basic Data Analysis' }))
      .toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Python' })).toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Basic C++' })).toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Basic C#' })).toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Modern .NET' })).toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'TypeScript' })).toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Vitest' })).toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Playwright' })).toBeInTheDocument()
    await expect.element(screen.getByRole('heading', { name: 'Selenium' })).toBeInTheDocument()
    await expect
      .element(screen.getByRole('heading', { name: 'Load Testing with JMeter' }))
      .toBeInTheDocument()
    await screen.getByRole('link', { name: 'Open Robot Framework topic' }).click()

    await expect
      .element(screen.getByRole('heading', { name: 'Robot Framework cheatsheet' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: /Robot Framework User Guide/ }))
      .toBeInTheDocument()
    await expect.element(screen.getByRole('link', { name: 'Quick quiz · 20' })).toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: 'All questions · 40' }))
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

  it('loads the Accessibility Testing topic and its quiz', async () => {
    const screen = await renderRoute('/topics/accessibility-testing')

    await expect
      .element(screen.getByRole('heading', { name: 'Accessibility Testing cheatsheet' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: /W3C WAI: Evaluating Web Accessibility/ }).nth(1))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: /W3C WAI-ARIA APG: Modal Dialog Pattern/ }))
      .toBeInTheDocument()

    await screen.getByRole('link', { name: 'Quick quiz · 20' }).click()
    await expect.element(screen.getByText('Question 1 / 20')).toBeInTheDocument()
  })

  it('loads the Basic Data Analysis topic and its quiz', async () => {
    const screen = await renderRoute('/topics/data-analysis')

    await expect
      .element(screen.getByRole('heading', { name: 'Basic Data Analysis cheatsheet' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: /NIST\/SEMATECH: Exploratory Data Analysis/ }))
      .toBeInTheDocument()

    await screen.getByRole('link', { name: 'Quick quiz · 20' }).click()
    await expect.element(screen.getByText('Question 1 / 20')).toBeInTheDocument()
  })

  it('loads the Python topic and its quiz', async () => {
    const screen = await renderRoute('/topics/python')

    await expect
      .element(screen.getByRole('heading', { name: 'Python cheatsheet' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: /The Python Tutorial/ }))
      .toBeInTheDocument()

    await screen.getByRole('link', { name: 'Quick quiz · 20' }).click()
    await expect.element(screen.getByText('Question 1 / 20')).toBeInTheDocument()
  })

  it('loads the Basic C++ topic and its quiz', async () => {
    const screen = await renderRoute('/topics/cpp-basics')

    await expect
      .element(screen.getByRole('heading', { name: 'Basic C++ cheatsheet' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: /cppreference: C\+\+ language/ }))
      .toBeInTheDocument()

    await screen.getByRole('link', { name: 'Quick quiz · 20' }).click()
    await expect.element(screen.getByText('Question 1 / 20')).toBeInTheDocument()
  })

  it('loads the Basic C# topic and its quiz', async () => {
    const screen = await renderRoute('/topics/csharp-basics')

    await expect
      .element(screen.getByRole('heading', { name: 'Basic C# cheatsheet' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: /Microsoft Learn: A tour of C#/ }))
      .toBeInTheDocument()

    await screen.getByRole('link', { name: 'Quick quiz · 20' }).click()
    await expect.element(screen.getByText('Question 1 / 20')).toBeInTheDocument()
  })

  it('loads the TypeScript topic and its quiz', async () => {
    const screen = await renderRoute('/topics/typescript')

    await expect
      .element(screen.getByRole('heading', { name: 'TypeScript cheatsheet' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: /The TypeScript Handbook/ }))
      .toBeInTheDocument()

    await screen.getByRole('link', { name: 'Quick quiz · 20' }).click()
    await expect.element(screen.getByText('Question 1 / 20')).toBeInTheDocument()
  })

  it('loads the Playwright topic and its quiz', async () => {
    const screen = await renderRoute('/topics/playwright')

    await expect
      .element(screen.getByRole('heading', { name: 'Playwright cheatsheet' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: /Playwright: Writing tests/ }))
      .toBeInTheDocument()

    await screen.getByRole('link', { name: 'Quick quiz · 20' }).click()
    await expect.element(screen.getByText('Question 1 / 20')).toBeInTheDocument()
  })

  it('loads the Vitest topic and its quiz', async () => {
    const screen = await renderRoute('/topics/vitest')

    await expect
      .element(screen.getByRole('heading', { name: 'Vitest cheatsheet' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: /Vitest: Getting Started/ }).nth(1))
      .toBeInTheDocument()

    await screen.getByRole('link', { name: 'Quick quiz · 20' }).click()
    await expect.element(screen.getByText('Question 1 / 20')).toBeInTheDocument()
  })

  it('loads the Selenium topic and its quiz', async () => {
    const screen = await renderRoute('/topics/selenium')

    await expect
      .element(screen.getByRole('heading', { name: 'Selenium cheatsheet' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: /Selenium: Write your first script/ }))
      .toBeInTheDocument()

    await screen.getByRole('link', { name: 'Quick quiz · 20' }).click()
    await expect.element(screen.getByText('Question 1 / 20')).toBeInTheDocument()
  })

  it('loads the JMeter topic and its quiz', async () => {
    const screen = await renderRoute('/topics/jmeter')

    await expect
      .element(screen.getByRole('heading', { name: 'Load Testing with JMeter cheatsheet' }))
      .toBeInTheDocument()
    await expect
      .element(screen.getByRole('link', { name: /Apache JMeter: Getting Started/ }))
      .toBeInTheDocument()

    await screen.getByRole('link', { name: 'Quick quiz · 20' }).click()
    await expect.element(screen.getByText('Question 1 / 20')).toBeInTheDocument()
  })

  it('shows a useful not-found screen for unknown topics', async () => {
    const screen = await renderRoute('/topics/not-real')

    await expect
      .element(screen.getByRole('heading', { name: 'This path drew a blank.' }))
      .toBeInTheDocument()
  })

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
