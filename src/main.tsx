import { MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { App } from './App'
import './styles/index.css'

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    {/* reducedMotion="user" turns off movement for anyone who asks for it in their system settings. */}
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <App />
      </BrowserRouter>
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
