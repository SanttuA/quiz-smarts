import { createHashHistory, createRouter, type RouterHistory } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createAppRouter(history: RouterHistory = createHashHistory()) {
  return createRouter({
    routeTree,
    history,
    defaultPreload: 'intent',
    scrollRestoration: true,
  })
}

export const router = createAppRouter()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
