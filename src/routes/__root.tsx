import { Outlet, createRootRoute } from '@tanstack/react-router'
import { AppShell } from '../components/layout/AppShell'
import { NotFoundPage } from '../pages/NotFoundPage'

export const Route = createRootRoute({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
  notFoundComponent: NotFoundPage,
})
