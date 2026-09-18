import type { ComponentType } from 'react'
import { SectionHeader } from '@/components/ui/Section'
import { Accent } from '@/components/ui/Typography'
import type { CaseStudySection } from '@/content/case-studies/schema'
import { cn } from '@fluxstride/design-system/lib/cn'
import { StatRow } from './parts'
import { Cards, Reviews } from './sections/CardSections'
import { DesignSystem, Palette, Typography } from './sections/BrandSections'
import { Bars, Chart, Clusters, Rankings, Scores, Table } from './sections/DataSections'
import { Architecture, Checklist, Features, Flow, Roadmap, Steps } from './sections/ListSections'
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
  rankings: Rankings,
  roadmap: Roadmap,
  flow: Flow,
  clusters: Clusters,
  palette: Palette,
  typography: Typography,
  architecture: Architecture,
  'design-system': DesignSystem,
}

/** Space between the heading and the content: 32px / 56px unless the design says otherwise. */
function contentGap(section: CaseStudySection) {
  if (section.kind === 'features' && section.style !== 'cards') return 'gap-8 lg:gap-12'
  if ((section.kind === 'bars' && section.style !== 'compare') || section.kind === 'flow')
    return 'gap-7 lg:gap-12'
  return 'gap-8 lg:gap-14'
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
 *   Spacing   160px above (88px mobile); ink and mist bands are full-bleed with 120px padding (64px)
 */
export function CaseSection({ section, number }: CaseSectionProps) {
  const dark = section.tone === 'ink'
  const titleId = `case-section-${number}`
  const Body = renderers[section.kind] as ComponentType<{ section: CaseStudySection; dark: boolean }>

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        section.tone === 'ink' || section.tone === 'mist'
          ? 'mt-22 py-16 lg:mt-40 lg:py-30'
          : 'pt-22 lg:pt-40',
        dark ? 'bg-ink text-paper' : 'text-ink',
        section.tone === 'mist' && 'bg-paper-2',
      )}
    >
      <div className={cn('container-page flex flex-col', contentGap(section))}>
        <SectionHeader
          eyebrow={`${String(number).padStart(2, '0')} — ${section.label}`}
          title={
            <>
              {section.title[0]}
              <br />
              <Accent>{section.title[1]}</Accent>
            </>
          }
          titleId={titleId}
          intro={section.intro}
          className="gap-4 lg:gap-20"
          titleGroupClassName="gap-4 lg:gap-5"
          eyebrowClassName={cn('max-lg:text-label-sm', dark ? 'text-flux-light' : 'text-flux')}
          titleClassName="text-heading-case lg:leading-[1.02]"
          introClassName="text-base/[1.6] lg:w-105 lg:text-lg/[1.6]"
          onDark={dark}
        />
        <Body section={section} dark={dark} />
        {section.stats?.length ? <StatRow stats={section.stats} dark={dark} /> : null}
      </div>
    </section>
  )
}
