import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Nav } from '@/components/Nav'
import { NotFound } from '@/components/NotFound'
import { Services } from '@/components/Services'
import { Stack } from '@/components/Stack'
import { Work } from '@/components/Work'

/** One page. Any other path (only reachable as the prerendered 404.html) gets NotFound. */
export function App({ path }: { path: string }) {
  if (path !== '/') return <NotFound />

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <About />
        <Services />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
