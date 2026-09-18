import { PERSON, PROJECTS, SOCIALS, STUDIO } from '@/content/site'

/**
 * Head tags for the page and the 404, written into the static HTML by scripts/prerender.mjs.
 * The site is a single page, so there is no client-side head management.
 */
export const SITE_URL = 'https://sam.fluxstride.com'

const TITLE = `${PERSON.name} · ${PERSON.role}`
const DESCRIPTION =
  'Samuel Adekoya designs and engineers digital products (product design, branding, websites, mobile apps, backends, cloud and AI) for startups and enterprises. Founder of Fluxstride.'
const OG_IMAGE = { path: '/og.jpg', width: 1200, height: 630, alt: `${PERSON.name}: ${PERSON.role}` }

export type PageSeo = { path: string; title: string; description: string; noindex?: boolean }

export const pages: PageSeo[] = [{ path: '/', title: TITLE, description: DESCRIPTION }]
export const notFoundSeo: PageSeo = {
  path: '/404',
  title: `Page not found · ${PERSON.name}`,
  description: 'That page does not exist.',
  noindex: true,
}

const escape = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

/** Structured data: Samuel as a Person, with the studio and his public work. */
function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSON.name,
    jobTitle: PERSON.role,
    url: SITE_URL,
    email: `mailto:${PERSON.email}`,
    image: `${SITE_URL}/images/portrait-148.webp`,
    address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
    worksFor: { '@type': 'Organization', name: STUDIO.name, url: STUDIO.url },
    sameAs: SOCIALS.map((social) => social.href),
    knowsAbout: [
      'Product design',
      'Branding',
      'Web development',
      'Mobile development',
      'Backend development',
      'Cloud',
      'AI integration',
    ],
    subjectOf: PROJECTS.map((project) => ({ '@type': 'CreativeWork', name: project.name, url: project.url })),
  }
}

export function headTags(page: PageSeo) {
  const url = `${SITE_URL}${page.path === '/' ? '' : page.path}`
  const tags = [
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}" />`,
    page.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="${escape(PERSON.name)}" />`,
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${SITE_URL}${OG_IMAGE.path}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${escape(OG_IMAGE.alt)}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@fluxstride_boss" />`,
  ]
  if (!page.noindex) {
    // `<` escaped so a string in the data can never close the script tag.
    const json = JSON.stringify(personJsonLd()).replaceAll('<', '\u003c')
    tags.push(`<script type="application/ld+json">${json}</script>`)
  }
  return tags.join('\n    ')
}

export const sitemapXml = (lastmod: string) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><lastmod>${lastmod}</lastmod><priority>1.0</priority></url>
</urlset>
`

export const robotsTxt = () => `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
