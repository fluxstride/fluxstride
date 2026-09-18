// Maintenance mode for Cloudflare.
//
//   pnpm cf:maintenance   build, then deploy with this worker in front of the site
//   pnpm cf:deploy        build, then deploy the normal static site (maintenance off)
//
// Every page request gets the prerendered /maintenance page with a 503 and Retry-After,
// which tells search engines the outage is temporary so rankings are kept. Assets the
// page needs (scripts, styles, fonts, icons) are served as usual.
//
// Config: wrangler.maintenance.jsonc. The page itself: src/pages/Maintenance.tsx.

/** Paths passed straight through to the static assets. */
const ASSET = /^\/(assets|images|og|legal)\/|^\/[^/]+\.(png|ico|svg|webmanifest|xml|txt)$/

/** Seconds a crawler should wait before trying again. */
const RETRY_AFTER = '3600'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (ASSET.test(url.pathname)) return env.ASSETS.fetch(request)

    const page = await env.ASSETS.fetch(new URL('/maintenance', url))
    return new Response(request.method === 'HEAD' ? null : page.body, {
      status: 503,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Retry-After': RETRY_AFTER,
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex',
      },
    })
  },
}
