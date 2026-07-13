import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'
import { ThemeProvider } from './features/theme/ThemeProvider'
import './styles/tokens.css'
import './styles/base.css'

const rootElement = document.querySelector('#root')

if (!rootElement) {
  throw new Error('Root element was not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
