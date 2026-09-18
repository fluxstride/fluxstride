import { roles, type Role } from '@/content/careers'
import { templates, templateTitle, visibleCaseStudies } from '@/content/case-studies'
import { BRAND, EMAIL_NEW_BUSINESS, LEGAL_NAME, socialLinks, X_HANDLE } from '@/content/site'
import { legalDocuments, type LegalSlug } from '@/content/legal'
import { faqs } from '@/content/process'
import { serviceHref, services, type Service } from '@/content/services'

/**
 * SEO: the single source of truth.
 *
 * Consumed in two places that therefore cannot drift:
 *   - scripts/prerender.mjs  writes these tags into each page's static <head> at build time
 *   - lib/useSeo.ts          keeps document.head in step during client-side navigation
 *
 * Adding a page? Add it to `pages` below or it will not be prerendered, will be
 * missing from the sitemap, and will 404 in production. See docs/rendering-and-seo.md.
 */

// ---------------------------------------------------------------------------
// TODO before launch: confirm the production domain.
//
// Every canonical URL, OpenGraph tag, JSON-LD id and sitemap entry is built
// from this constant. Do NOT submit the site to Google Search Console while
// SITE_URL_IS_PLACEHOLDER is true: a canonical pointing at the wrong host can
// deindex the real site. The build prints a warning until it is set to false.
// ---------------------------------------------------------------------------
export const SITE_URL = 'https://fluxstride.com'
export const SITE_URL_IS_PLACEHOLDER = true

export const LOCALE = 'en_GB'

export type OgImage = { path: string; width: number; height: number; alt: string }

const og = (name: string, alt: string): OgImage => ({
  path: `/og/${name}.jpg`,
  width: 1200,
  height: 630,
  alt,
})

export const DEFAULT_OG = og('og-default', 'Fluxstride: We build digital products that keep moving.')

export type PageSeo = {
  path: string
  /** Short title. Every page except the home page gets " · Fluxstride" appended. */
  title: string
  description: string
  /** Name used in the breadcrumb trail. Defaults to the title. */
  breadcrumb?: string
  /** Path of the page this one sits under in the breadcrumb trail, e.g. '/work' for a case study. */
  parent?: string
  image?: OgImage
  /** Left out of the sitemap and marked noindex. */
  noindex?: boolean
  /** Sitemap priority, 0..1. */
  priority?: number
}

const staticPages: PageSeo[] = [
  {
    path: '/',
    title: 'Fluxstride · Design & Engineering Studio',
    description:
      'Fluxstride is a design and engineering studio. We design products and brands, build the websites, apps and backends behind them, and run it all in the cloud.',
    image: DEFAULT_OG,
    priority: 1,
  },
  {
    path: '/work',
    title: 'Selected Work & Case Studies',
    breadcrumb: 'Work',
    description:
      'Platforms, apps, stores and identities, measured by what changed after launch. Case studies from fintech, retail, healthtech and SaaS clients.',
    image: og('og-work', 'Selected work: platforms, apps, stores and identities by Fluxstride.'),
    priority: 0.9,
  },
  {
    path: '/services',
    title: 'Services · Design, Web, Mobile, Backend & Cloud',
    breadcrumb: 'Services',
    description:
      'Product design, branding, website and frontend development, mobile apps, backend development, and cloud & DevOps, from one senior team.',
    image: og('og-services', 'What we do: six services, one team, at Fluxstride.'),
    priority: 0.9,
  },
  {
    path: '/process',
    title: 'Our Process · The Stride Method',
    breadcrumb: 'Process',
    description:
      'Four steps, fixed-scope sprints and a live project board you can see any time. How Fluxstride takes a project from discovery to launch and growth.',
    image: og('og-process', 'The Stride Method: how Fluxstride runs projects.'),
    priority: 0.8,
  },
  {
    path: '/studio',
    title: 'Studio · About Fluxstride',
    breadcrumb: 'Studio',
    description:
      'A senior design and engineering studio. Meet the people, the values and the open roles behind Fluxstride.',
    image: og('og-studio', 'The Fluxstride studio: people, values and careers.'),
    priority: 0.7,
  },
  {
    path: '/insights',
    title: 'Insights & Notes on Design and Engineering',
    breadcrumb: 'Insights',
    description:
      'Practical writing on design, engineering, SEO and growth from the Fluxstride team, plus The Stride, our monthly newsletter.',
    image: og('og-insights', 'Insights and notes from the Fluxstride team.'),
    priority: 0.7,
  },
  {
    path: '/contact',
    title: 'Start a Project · Contact',
    breadcrumb: 'Contact',
    description: `Tell us about your project and get a reply within 24 hours. Email ${EMAIL_NEW_BUSINESS} or send a brief with your scope, timeline and budget.`,
    image: og('og-contact', 'Start a project with Fluxstride.'),
    priority: 0.8,
  },
]

/** Privacy policy, terms and cookie policy: one page per document in content/legal. */
const legalSeo: Record<LegalSlug, Pick<PageSeo, 'title' | 'description'>> = {
  privacy: {
    title: 'Privacy Policy',
    description:
      'How Fluxstride collects, uses and protects personal information when you visit our website, work with us or apply to join the team.',
  },
  terms: {
    title: 'Terms of Service',
    description:
      'The agreement between you and Fluxstride Ltd for using this website and for the projects, retainers and consultancy we deliver.',
  },
  cookies: {
    title: 'Cookie Policy',
    description:
      'The cookies and similar technologies used on fluxstride.com, why we use them, and how to change your choices at any time.',
  },
}

const legalPages: PageSeo[] = legalDocuments.map((doc) => ({
  path: `/${doc.slug}`,
  breadcrumb: doc.name,
  priority: 0.3,
  ...legalSeo[doc.slug],
}))

/**
 * Case studies: one page per file in content/case-studies/studies. Production builds only
 * see published ones; drafts (and the starter templates) exist in development, marked noindex.
 */
const caseStudyPages: PageSeo[] = [
  ...visibleCaseStudies.map((study) => ({
    path: `/work/${study.slug}`,
    title: study.seo.title,
    description: study.seo.description,
    breadcrumb: study.client,
    parent: '/work',
    image: og('og-work', `${study.client} case study by Fluxstride.`),
    noindex: study.status !== 'published',
    priority: 0.8,
  })),
  ...(import.meta.env.DEV
    ? [
        { path: '/work/templates', title: 'Case study templates', noindex: true },
        ...Object.entries(templates).map(([id, template]) => ({
          path: `/work/templates/${id}`,
          title: `Template · ${templateTitle(template)}`,
          noindex: true,
        })),
      ].map((page) => ({ ...page, description: 'Development preview.', parent: '/work' }))
    : []),
]

/** One page per service in content/services. */
const servicePages: PageSeo[] = services.map((service) => ({
  path: serviceHref(service.slug),
  title: service.title,
  breadcrumb: service.shortTitle,
  parent: '/services',
  description: service.description,
  image: og(`og-service-${service.slug}`, `${service.title} at Fluxstride.`),
  priority: 0.8,
}))

/** The careers page, then one page per open role in content/careers. */
const careersPage: PageSeo = {
  path: '/careers',
  title: 'Careers · Join the Studio',
  breadcrumb: 'Careers',
  description: `Open roles at ${BRAND}, a senior design and engineering studio. Four-day focus weeks, remote-first, and a small team where your work ships.`,
  image: og('og-studio', 'Careers at Fluxstride: join the stride.'),
  priority: 0.7,
}

const rolePages: PageSeo[] = roles.map((role) => ({
  path: `/careers/${role.slug}`,
  title: `${role.title} · Careers`,
  breadcrumb: role.title,
  parent: '/careers',
  description: role.summary,
  image: og('og-studio', `${role.title}: join the Fluxstride team.`),
  priority: 0.6,
}))

/** The holding page served at every URL during maintenance (worker/maintenance.mjs). Never indexed. */
const maintenancePage: PageSeo = {
  path: '/maintenance',
  title: 'Back in a moment',
  description: "We're making a few improvements. The site will be back shortly.",
  noindex: true,
}

export const pages: PageSeo[] = [
  ...staticPages,
  ...servicePages,
  careersPage,
  ...legalPages,
  ...rolePages,
  ...caseStudyPages,
  maintenancePage,
]

export const notFoundSeo: PageSeo = {
  path: '/404',
  title: 'Page not found',
  description: 'That page does not exist. Explore our work, services and process instead.',
  noindex: true,
}

export type ResolvedSeo = {
  path: string
  fullTitle: string
  description: string
  canonical: string
  image: OgImage & { url: string }
  noindex: boolean
}

const origin = SITE_URL.replace(/\/+$/, '')

/** Joins a path onto SITE_URL, keeping exactly one slash between them. */
export function absolute(path: string) {
  return `${origin}/${path.replace(/^\/+/, '')}`
}

export function resolveSeo(page: PageSeo): ResolvedSeo {
  const image = page.image ?? DEFAULT_OG
  return {
    path: page.path,
    fullTitle: page.path === '/' ? page.title : `${page.title} · ${BRAND}`,
    description: page.description,
    // The home page canonical keeps its trailing slash; the rest have none.
    canonical: page.path === '/' ? `${origin}/` : absolute(page.path),
    image: { ...image, url: absolute(image.path) },
    noindex: page.noindex ?? false,
  }
}

function normalise(pathname: string) {
  return pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

/** Looks up a route. Anything unrecognised is treated as the 404 page. */
export function pageFor(pathname: string): PageSeo {
  return pages.find((candidate) => candidate.path === normalise(pathname)) ?? notFoundSeo
}

export function seoFor(pathname: string): ResolvedSeo {
  return resolveSeo(pageFor(pathname))
}

export const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
export const ROBOTS_NOINDEX = 'noindex, follow'

function esc(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/**
 * The complete <head> block for one page, as an HTML string.
 * The prerender script drops this between the seo markers in index.html.
 */
export function headTags(seo: ResolvedSeo): string {
  const tags = [
    `<title>${esc(seo.fullTitle)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<link rel="canonical" href="${esc(seo.canonical)}" />`,
    `<meta name="robots" content="${seo.noindex ? ROBOTS_NOINDEX : ROBOTS_INDEX}" />`,

    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(BRAND)}" />`,
    `<meta property="og:locale" content="${LOCALE}" />`,
    `<meta property="og:title" content="${esc(seo.fullTitle)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${esc(seo.canonical)}" />`,
    `<meta property="og:image" content="${esc(seo.image.url)}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="${seo.image.width}" />`,
    `<meta property="og:image:height" content="${seo.image.height}" />`,
    `<meta property="og:image:alt" content="${esc(seo.image.alt)}" />`,

    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${esc(X_HANDLE)}" />`,
    `<meta name="twitter:title" content="${esc(seo.fullTitle)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${esc(seo.image.url)}" />`,
    `<meta name="twitter:image:alt" content="${esc(seo.image.alt)}" />`,
  ]

  for (const block of structuredData(seo.path)) {
    // "<" is escaped so a stray "</script>" inside a string can never close the tag.
    tags.push(`<script type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`)
  }

  return tags.join('\n    ')
}

// ---------------------------------------------------------------------------
// Structured data (JSON-LD)
// ---------------------------------------------------------------------------

const ORG_ID = `${origin}/#organization`
const WEBSITE_ID = `${origin}/#website`

/**
 * The business, declared once on the home page and referenced by @id elsewhere.
 *
 * Deliberately omits aggregateRating and review: the testimonial and the
 * "4.9/5 on Clutch" stat are placeholder copy. Publishing invented ratings as
 * structured data is a Google policy violation (manual-action risk) and a false
 * claim. Add them only once real, attributable reviews exist.
 */
function organisation() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: BRAND,
    legalName: LEGAL_NAME,
    url: `${origin}/`,
    logo: absolute('/logo.png'),
    image: absolute(DEFAULT_OG.path),
    description: pages[0].description,
    email: EMAIL_NEW_BUSINESS,
    address: { '@type': 'PostalAddress', addressCountry: 'GB' },
    areaServed: 'Worldwide',
    sameAs: socialLinks.map((link) => link.href),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          url: absolute(serviceHref(service.slug)),
        },
      })),
    },
  }
}

function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${origin}/`,
    name: BRAND,
    inLanguage: 'en-GB',
    publisher: { '@id': ORG_ID },
  }
}

function breadcrumbs(page: PageSeo) {
  const parent = page.parent ? pages.find((candidate) => candidate.path === page.parent) : undefined
  const trail = [
    { name: 'Home', item: `${origin}/` },
    ...(parent ? [{ name: parent.breadcrumb ?? parent.title, item: absolute(parent.path) }] : []),
    { name: page.breadcrumb ?? page.title, item: absolute(page.path) },
  ]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({ '@type': 'ListItem', position: i + 1, ...crumb })),
  }
}

/** Strips the Markdown links content text allows: "[our work](/work)" → "our work". */
const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1')

/**
 * A page's FAQ (Process, or a service). Built from the same list the page renders, so the
 * answers always match what is visible.
 */
function faqPage(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: plain(faq.answer) },
    })),
  }
}

/** A service page's subject, offered by the organisation declared on the home page. */
function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.shortTitle,
    description: service.description,
    url: absolute(serviceHref(service.slug)),
    provider: { '@id': ORG_ID },
    areaServed: 'Worldwide',
  }
}

/**
 * A role as a Google JobPosting. The description is the role's own sections as HTML.
 * Sample roles get none: advertising jobs that don't exist breaks Google's policy.
 */
function jobPosting(role: Role) {
  const description = role.sections
    .map((section) => {
      const blocks = section.blocks.map((block) => {
        if (block.type === 'paragraph') return `<p>${esc(plain(block.text))}</p>`
        if (block.type === 'list')
          return `<ul>${block.items.map((item) => `<li>${esc(plain(item))}</li>`).join('')}</ul>`
        return ''
      })
      return `<h2>${esc(section.title)}</h2>${blocks.join('')}`
    })
    .join('')

  const location = role.location.remote
    ? {
        jobLocationType: 'TELECOMMUTE',
        applicantLocationRequirements: role.location.countries.map((name) => ({ '@type': 'Country', name })),
      }
    : {
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: role.location.locality,
            addressCountry: role.location.country,
          },
        },
      }

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: role.title,
    description: `<p>${esc(role.summary)}</p>${description}`,
    datePosted: role.posted,
    ...(role.closes ? { validThrough: `${role.closes}T23:59:59Z` } : {}),
    employmentType: role.employment,
    hiringOrganization: {
      '@type': 'Organization',
      name: BRAND,
      sameAs: `${origin}/`,
      logo: absolute('/logo.png'),
    },
    ...location,
    ...(role.salary
      ? {
          baseSalary: {
            '@type': 'MonetaryAmount',
            currency: role.salary.currency,
            value: {
              '@type': 'QuantitativeValue',
              minValue: role.salary.min,
              maxValue: role.salary.max,
              unitText: role.salary.per,
            },
          },
        }
      : {}),
    directApply: false,
  }
}

/** JSON-LD blocks for one route. */
export function structuredData(path: string): object[] {
  const page = pageFor(path)
  if (page.noindex) return []
  if (page.path === '/') return [organisation(), website()]
  if (page.path === '/process') return [breadcrumbs(page), faqPage(faqs)]
  const service = services.find((candidate) => serviceHref(candidate.slug) === page.path)
  if (service) return [breadcrumbs(page), serviceSchema(service), faqPage(service.faqs)]
  const role = roles.find((candidate) => `/careers/${candidate.slug}` === page.path)
  if (role && !role.sample) return [breadcrumbs(page), jobPosting(role)]
  return [breadcrumbs(page)]
}

// ---------------------------------------------------------------------------
// sitemap.xml and robots.txt
// ---------------------------------------------------------------------------

export function sitemapXml(lastmod: string): string {
  const entries = pages
    .filter((page) => !page.noindex)
    .map((page) =>
      [
        '  <url>',
        `    <loc>${esc(resolveSeo(page).canonical)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <priority>${(page.priority ?? 0.5).toFixed(1)}</priority>`,
        '  </url>',
      ].join('\n'),
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
}

export function robotsTxt(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap.xml')}\n`
}
