import { AnimatePresence } from 'motion/react'
import { useLocation, useOutlet } from 'react-router'
import { useSeo } from '@/lib/useSeo'
import { Footer } from './Footer'
import { Header } from './Header'
import { PageTransition } from './PageTransition'

export function Layout() {
  const location = useLocation()
  // The prerendered HTML carries the right tags for the landing page; this keeps
  // them correct once React Router starts swapping pages without a reload.
  useSeo(location.pathname)
  // useOutlet keeps hold of the page element, so the outgoing page can finish animating.
  const outlet = useOutlet()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-xs focus:bg-flux focus:px-5 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname} hash={location.hash}>
            {outlet}
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
