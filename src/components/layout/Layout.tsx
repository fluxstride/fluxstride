import { Outlet, useLocation } from 'react-router'
import { useSeo } from '@/lib/useSeo'

export function Layout() {
  const location = useLocation()
  // The prerendered HTML carries the right tags for the landing page; this keeps
  // them correct once React Router starts swapping pages without a reload.
  useSeo(location.pathname)

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Outlet />
    </main>
  )
}
