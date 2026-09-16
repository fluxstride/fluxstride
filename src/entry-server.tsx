import { MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'

/** Renders one route to an HTML string. Called by scripts/prerender.mjs. */
export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </MotionConfig>
    </StrictMode>,
  )

  return { html }
}

// Re-exported so the prerender script has a single module to import.
export {
  headTags,
  notFoundSeo,
  pages,
  resolveSeo,
  robotsTxt,
  SITE_URL,
  SITE_URL_IS_PLACEHOLDER,
  sitemapXml,
} from './lib/seo'
