import { useEffect } from 'react'

const defaultTitle = 'Quiz Smarts'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title

    return () => {
      document.title = defaultTitle
    }
  }, [title])
}
