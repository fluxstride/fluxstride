import { MotionConfig } from 'motion/react'
import { StrictMode, type ReactNode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router'
import { App } from './App'
import './styles/index.css'

const container = document.getElementById('root')!

// During maintenance every URL serves the prerendered maintenance page (worker/maintenance.mjs).
// Hydrate that screen whatever the address says, or React would try to swap in the real route.
const maintenance = container.querySelector('[data-screen="maintenance"]') !== null
const Router = maintenance
  ? ({ children }: { children: ReactNode }) => (
      <MemoryRouter initialEntries={['/maintenance']}>{children}</MemoryRouter>
    )
  : BrowserRouter

const app = (
  <StrictMode>
    {/* reducedMotion="user" turns off movement for anyone who asks for it in their system settings. */}
    <MotionConfig reducedMotion="user">
      <Router>
        <App />
      </Router>
    </MotionConfig>
  </StrictMode>
)

// Production HTML is prerendered, so attach to the existing markup.
// `vite dev` serves an empty container, where there is nothing to hydrate.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
