import { MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './App'

/** Renders one path to an HTML string. Called by scripts/prerender.mjs. */
export function render(path: string) {
  return renderToString(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <App path={path} />
      </MotionConfig>
    </StrictMode>,
  )
}

// Re-exported so the prerender script has a single module to import.
export { TO_CONFIRM } from './content/site'
export { headTags, notFoundSeo, pages, robotsTxt, sitemapXml } from './lib/seo'
