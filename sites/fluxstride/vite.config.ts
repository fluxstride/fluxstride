import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'

/**
 * Keeps unpublished case study content out of production bundles. The site never links
 * drafts or starter templates outside `pnpm dev`, but without this their text (client
 * names, unapproved figures) would still ship inside the JavaScript.
 */
function stripUnpublishedCaseStudies(): Plugin {
  return {
    name: 'fluxstride:strip-unpublished-case-studies',
    apply: 'build',
    enforce: 'pre',
    transform(code, id) {
      const path = id.replaceAll('\\', '/')
      const isTemplate = path.includes('/src/content/case-studies/templates/')
      const isDraft =
        path.includes('/src/content/case-studies/studies/') && /status:\s*['"]draft['"]/.test(code)
      return isTemplate || isDraft ? { code: 'export default null', map: null } : undefined
    },
  }
}

export default defineConfig({
  plugins: [stripUnpublishedCaseStudies(), react(), tailwindcss()],
  resolve: {
    // `@/components/ui` instead of `../../components/ui`. Mirrored in tsconfig.app.json.
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
