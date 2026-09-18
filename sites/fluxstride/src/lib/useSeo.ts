import { useEffect } from 'react'
import { ROBOTS_INDEX, ROBOTS_NOINDEX, seoFor } from './seo'

/**
 * Keeps the head in step with client-side navigation.
 *
 * The prerendered HTML already carries the correct tags for the page a visitor
 * lands on, which is what crawlers and link unfurlers read. This only matters
 * once React Router takes over and swaps pages without a reload.
 */
export function useSeo(pathname: string) {
  useEffect(() => {
    const seo = seoFor(pathname)

    document.title = seo.fullTitle
    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'robots', seo.noindex ? ROBOTS_NOINDEX : ROBOTS_INDEX)
    upsertCanonical(seo.canonical)

    upsertMeta('property', 'og:title', seo.fullTitle)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:url', seo.canonical)
    upsertMeta('property', 'og:image', seo.image.url)
    upsertMeta('property', 'og:image:alt', seo.image.alt)
    upsertMeta('name', 'twitter:title', seo.fullTitle)
    upsertMeta('name', 'twitter:description', seo.description)
    upsertMeta('name', 'twitter:image', seo.image.url)
    upsertMeta('name', 'twitter:image:alt', seo.image.alt)
  }, [pathname])
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}
