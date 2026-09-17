import type { ComponentType } from 'react'
import { SectionHeader } from '@/components/ui/Section'
import { Accent } from '@/components/ui/Typography'
import type { CaseStudySection } from '@/content/case-studies/schema'
import { cn } from '@/lib/cn'
import { StatRow } from './parts'
import { Cards, Reviews } from './sections/CardSections'
import { Palette, Typography } from './sections/BrandSections'
import { Bars, Chart, Clusters, Scores, Table } from './sections/DataSections'
import { Checklist, Features, Flow, Roadmap, Steps } from './sections/ListSections'
import { BeforeAfter, Gallery, Screenshot } from './sections/MediaSections'

type Renderers = {
  [K in CaseStudySection['kind']]: ComponentType<{
    section: Extract<CaseStudySection, { kind: K }>
    dark: boolean
  }>
}

/**
 * One renderer per section kind. Adding a kind to the schema without adding it
 * here is a type error, so the two can't drift apart.
 */
const renderers: Renderers = {
  screenshot: Screenshot,
  gallery: Gallery,
  'before-after': BeforeAfter,
  steps: Steps,
  features: Features,
  cards: Cards,
  reviews: Reviews,
  scores: Scores,
  bars: Bars,
  chart: Chart,
  table: Table,
  checklist: Checklist,
  roadmap: Roadmap,
  flow: Flow,
  clusters: Clusters,
  palette: Palette,
  typography: Typography,
}

type CaseSectionProps = {
  section: CaseStudySection
  /** Position on the page; the story takes 01 and 02, so sections start at 3. */
  number: number
}

/*
 * Design: the numbered modules in the middle of every case study.
 *   Heading   "03 — Process" in Flux blue, 64px title (34px mobile) with the serif phrase
 *             on its own line, intro pinned bottom-right
 *   Spacing   160px above (88px mobile); ink bands are full-bleed with 120px padding (64px)
 */
export function CaseSection({ section, number }: CaseSectionProps) {
  const dark = section.tone === 'ink'
  const titleId = `case-section-${number}`
  const Body = renderers[section.kind] as ComponentType<{ section: CaseStudySection; dark: boolean }>

  return (
    <section
      aria-labelledby={titleId}
      className={cn(dark ? 'mt-22 bg-ink py-16 text-paper lg:mt-40 lg:py-30' : 'pt-22 text-ink lg:pt-40')}
    >
      <div className="container-page flex flex-col gap-7 lg:gap-12">
        <SectionHeader
          eyebrow={`${String(number).padStart(2, '0')} — ${section.label}`}
          eyebrowClassName={dark ? 'text-flux-light' : 'text-flux'}
          title={
            <>
              {section.title[0]}
              <br />
              <Accent>{section.title[1]}</Accent>
            </>
          }
          titleId={titleId}
          intro={section.intro}
          introClassName="lg:w-105"
          onDark={dark}
        />
        <Body section={section} dark={dark} />
        {section.stats?.length ? <StatRow stats={section.stats} dark={dark} /> : null}
      </div>
    </section>
  )
}
