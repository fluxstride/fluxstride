import { MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import './styles/index.css'

const container = document.getElementById('root')!

// Unknown paths are served the prerendered 404.html, so render NotFound for them too.
const path = window.location.pathname.replace(/\/$/, '') || '/'

const app = (
  <StrictMode>
    {/* reducedMotion="user" turns off movement for anyone who asks for it in their system settings. */}
    <MotionConfig reducedMotion="user">
      <App path={path} />
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
