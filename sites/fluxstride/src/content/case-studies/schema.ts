import type { LucideIcon } from 'lucide-react'
import type { ServiceSlug } from '@/content/services'
import type { ImageName } from '@/content/images.generated'

/**
 * The shape of a case study page (/work/<slug>).
 *
 * Every case study is plain data: the page components read it and never need
 * editing for a new project. Start from a template instead of an empty file:
 *
 *   pnpm new:case-study <template> <slug>
 *
 * See docs/case-studies.md for the full workflow.
 *
 * Placeholders: anything written as [Like this], and any image left as null,
 * counts as unfinished. Drafts show them in a banner in development; a
 * published case study with placeholders fails the build.
 */

/** A heading with the one serif italic phrase: ['A portal customers', 'actually use.'] */
export type SplitTitle = readonly [plain: string, accent: string]

/** One of the six services on /services (content/services.ts). */
export type { ServiceSlug }

/**
 * An image from content/images.generated.ts. Leave `image` as null while you wait
 * for the real asset: the page shows a grey slot with the `brief` in it instead.
 */
export type Media = {
  image: ImageName | null
  /** Describe what the image shows. Required, even for screenshots. */
  alt: string
  /** What the image should be, e.g. "Product screenshot · desktop 2560×1200". Shown in the empty slot. */
  brief: string
  /**
   * Width / height, e.g. 16 / 9. Only needed while `image` is null; a real image
   * keeps its own proportions so screenshots are never cropped.
   */
  aspect?: number
  /** Browser frame only: the address shown in the chrome, e.g. "app.northwind.example/overview". */
  url?: string
  /**
   * Makes that address a real link, and adds a "Visit site" link to the hero when it is set
   * on the hero media. Only for pages that are live and public:
   * "https://www.dexussynergy.com/vehicles". Invented addresses stay unlinked.
   */
  href?: string
  /**
   * A different crop for phones, e.g. a page thumbnail redrawn for a narrower card.
   * Only for artwork made for both sizes; screenshots stay the desktop image.
   */
  mobileImage?: ImageName
}

/**
 * How media is framed.
 * browser: a desktop screenshot in a browser chrome. It stays a scaled-down desktop
 *          screenshot on phones; never swap in a mobile layout.
 * phone:   an app screen in a device outline.
 * plain:   photography and artwork, no frame.
 */
export type MediaFrame = 'browser' | 'phone' | 'plain'

/**
 * The artwork a Work card shows: the client's own colours and name around a live screenshot
 * of their site. Drawn in code (components/work/CaseCover) rather than exported flat, so the
 * whole composition reflows at every card size instead of being cropped, and so the wordmark
 * stays real text. The `case-cover-*` frames in fluxstride.pen are the design it follows;
 * `pnpm assets:covers` exports those frames as the flat picture used for sharing images.
 *
 * Colours come from the live site's own tokens, not from taste: read them off its stylesheet.
 */
export type BrandCover = {
  background: string
  /** The screen panel and its browser chrome, a shade either side of the background. */
  panel: string
  chrome: string
  /** The three chrome dots. */
  dot: string
  accent: string
  foreground: string
  muted: string
  /** The client's name, written the way they write it. */
  wordmark: string
  /** Which face it is set in. Defaults to the site's sans. */
  wordmarkFace?: 'sans' | 'serif'
  /** Mono line above the wordmark, e.g. "AUTOMOTIVE RETAIL". Drops out on narrow cards. */
  eyebrow: string
  /** One sentence under the rule. Drops out on all but wide cards. */
  line: string
  /** Mono line along the bottom. Only on the widest cards. */
  services: string
  /** The live site in the panel: a 1440×900 capture from `pnpm shots:projects`. */
  screen: { image: ImageName; alt: string }
}

export type Stat = {
  /** "+212%", "4.8★", "£2.4m" */
  value: string
  label: string
  /** Baseline or timeframe, e.g. "Was 11" or "May 2025 → Apr 2026" */
  detail?: string
}

export type Feature = { icon: LucideIcon; title: string; body: string }

/**
 * Section background. Alternate: two ink sections should never touch.
 * mist: a pale blue-grey band, padded like ink (Kinetic Labs' design system).
 */
export type SectionTone = 'paper' | 'ink' | 'mist'

type SectionBase = {
  /** Mono label after the section number, e.g. "Process" → "03: Process" */
  label: string
  title: SplitTitle
  /** Short paragraph beside the heading. */
  intro?: string
  tone?: SectionTone
  /** A row of figures closing the section. */
  stats?: Stat[]
}

/** One screenshot or image, optionally followed by three features or a row of deliverables. */
export type ScreenshotSection = SectionBase & {
  kind: 'screenshot'
  media: Media
  frame: MediaFrame
  features?: Feature[]
  featureStyle?: FeatureStyle
  /** Label and count under a hairline, four across (two on phones): ['Stationery', '12 items'] */
  deliverables?: [label: string, meta: string][]
}

/** A grid of images: page templates, app screens, components, deliverables, applications. */
export type GallerySection = SectionBase & {
  kind: 'gallery'
  frame: MediaFrame
  /** Columns on desktop. Phones always show two. */
  columns: 2 | 3 | 4
  items: { media: Media; caption?: string; meta?: string }[]
  /**
   * App screens on a tinted panel, spread evenly with a centred caption under each
   * (Orbit Health). On phones the panel and captions give way to a 2×2 grid.
   */
  panel?: boolean
  /**
   * Thumbnails with a hairline edge, at their own proportions (Kinetic Labs' templates)
   * instead of the 4:3 crop plain galleries get.
   */
  outline?: boolean
}

type Comparison = { label: string; media: Media; metrics: Stat[] }

/** The same page before and after, with metrics under each. */
export type BeforeAfterSection = SectionBase & {
  kind: 'before-after'
  frame: MediaFrame
  before: Comparison
  after: Comparison
}

export type Step = {
  title: string
  /** A sentence under the title. Phase cards usually list `points` instead. */
  body?: string
  /** "4 weeks", "Weeks 1–2" or "92% complete this step" */
  meta?: string
  /** Ticked deliverables. Shown by the `cards` variant. */
  points?: string[]
  /** `cards` variant: draw this card's rule in Flux blue, e.g. the longest phase. */
  highlight?: boolean
}

/**
 * Numbered steps.
 * phases:  project phases under a rule
 * cards:   project phases as white cards with a list of deliverables (Northwind)
 * journey: numbered circles joined by a line
 */
export type StepsSection = SectionBase & {
  kind: 'steps'
  variant: 'phases' | 'cards' | 'journey'
  steps: Step[]
}

/**
 * ruled: under a hairline, the default
 * plain: no rule, e.g. under a screenshot (Northwind)
 * cards: white cards with the icon in a tinted square (Halden). `tint` colours the square
 *        in the client's palette: { background: '#EFE4D4', icon: '#6B3F24' }
 */
export type FeatureStyle = 'ruled' | 'plain' | 'cards'

export type FeaturesSection = SectionBase & {
  kind: 'features'
  features: Feature[]
  style?: FeatureStyle
  tint?: { background: string; icon: string }
}

/** A system diagram: columns of layers, each a stack of boxes, then the tech stack as chips. */
export type ArchitectureSection = SectionBase & {
  kind: 'architecture'
  /** Usually three: e.g. Clients → Core → Integrations. Arrows join each to the next. */
  layers: { name: string; nodes: { title: string; meta: string }[] }[]
  stack?: { label: string; items: string[] }
}

export type Card = {
  eyebrow?: string
  title: string
  body?: string
  /** A quote set in the serif, e.g. what a research participant said. */
  quote?: string
  /** Label/value rows, e.g. [['Cost', '£120k'], ['Time', '4 months']] */
  facts?: [label: string, value: string][]
  pros?: string[]
  cons?: string[]
  /** Small chips, e.g. the tech in an architecture layer. */
  chips?: string[]
  /** Outline the card and show this badge, e.g. "Recommended". */
  highlight?: string
}

/** Cards: research insights, options, architecture layers, service levels. */
export type CardsSection = SectionBase & { kind: 'cards'; columns: 2 | 3; cards: Card[] }

/** App store rating with review cards. */
export type ReviewsSection = SectionBase & {
  kind: 'reviews'
  rating: string
  ratingLabel: string
  reviews: { quote: string; author: string }[]
}

/** Lighthouse-style score rings in cards, with optional before/after vitals under them. */
export type ScoresSection = SectionBase & {
  kind: 'scores'
  scores: { value: string; label: string }[]
  vitals?: {
    /** Short code in Flux blue, e.g. "LCP". */
    key?: string
    name: string
    before: string
    after: string
    /** A verdict tag, desktop only, e.g. "Good". */
    status?: string
  }[]
}

/**
 * Horizontal before/after bars: funnels, task success, share of voice. `value` is 0–100;
 * bars are drawn relative to the largest value in the section, which spans about three
 * quarters of the width so its figure fits beside it.
 */
export type BarsSection = SectionBase & {
  kind: 'bars'
  /**
   * funnel:  a legend, then thick paired bars beside each stage (Halden Coffee's conversion)
   * compare: thin paired bars labelled "2025 · 6%", no legend; the `highlight` row is the
   *          client in Flux blue, the rest grey (Atlas Freight's share of voice)
   */
  style?: 'funnel' | 'compare'
  /** Names for the two bars, e.g. ['Before', 'After'] or ['2025', '2026']. */
  legend: [before: string, after: string]
  rows: {
    label: string
    before: { value: number; display: string }
    after: { value: number; display: string }
    /** Draw this row in Flux blue, e.g. the client among competitors. */
    highlight?: boolean
  }[]
  source?: string
}

/**
 * A column chart over time: traffic, revenue, uptime. Values are relative; the tallest
 * column fills the chart.
 *
 * Stacked (Halden Coffee): give points a `stack` and name it with `stackLabel`. The chart
 * drops the KPI and card, and the legend moves underneath.
 */
export type ChartSection = SectionBase & {
  kind: 'chart'
  kpi?: Stat
  legend?: [before: string, after: string]
  /**
   * `display` is what screen readers hear for the point, e.g. "71,900 sessions".
   * `stack` sits on top of `value`, e.g. subscription revenue over one-off orders.
   */
  points: {
    /** Month or period. Phones show only its first letter. */
    label: string
    value: number
    stack?: number
    display?: string
    /** A figure over the column on desktop, e.g. "71.9K" on the latest month. */
    callout?: string
  }[]
  /** Legend label for the `stack` segment, e.g. "Subscriptions". */
  stackLabel?: string
  /** Index of the first "after" point, marked with `markerLabel` (e.g. "Launch"). */
  changeAt?: number
  markerLabel?: string
  source?: string
}

export type TableCell =
  | string
  | { tag: string; tone?: 'flux' | 'risk' }
  /** Filled dots out of five. */
  | { rating: number }

/** Rankings, audit scorecards, support logs. Rows stack into cards on phones. */
export type TableSection = SectionBase & {
  kind: 'table'
  columns: {
    key: string
    label: string
    /** fill takes the remaining width. Defaults to 'md'. */
    width?: 'sm' | 'md' | 'fill'
    emphasis?: 'strong' | 'muted'
  }[]
  rows: Record<string, TableCell>[]
  source?: string
}

/** Ticked items: technical fixes, what a care plan includes. */
export type ChecklistSection = SectionBase & {
  kind: 'checklist'
  columns: 1 | 2
  items: { title: string; body?: string; tag?: string }[]
  /**
   * A panel of measured results beside the list (Atlas Freight's Core Web Vitals): each
   * metric with its old value and a bar, then two figures underneath. One column only.
   */
  panel?: {
    label: string
    metrics: {
      name: string
      value: string
      /** The old value, shown as "was 4.8s". */
      before: string
      /** e.g. "Good", in green. */
      status?: string
      /** How full the bar is, 0–100. */
      score: number
    }[]
    stats?: [value: string, label: string][]
  }
}

/** Keyword rankings: a table on desktop, one card per keyword on phones (Atlas Freight). */
export type RankingsSection = SectionBase & {
  kind: 'rankings'
  rows: {
    keyword: string
    /** Monthly searches, e.g. "12,100". */
    volume: string
    /** Position before, e.g. "38" or ">100". */
    before: string
    /** Position now, e.g. "#3". */
    after: string
    /** e.g. "+35 places". A leading minus turns the arrow down. */
    change: string
  }[]
  source?: string
}

/** Now / Next / Later. */
export type RoadmapSection = SectionBase & {
  kind: 'roadmap'
  horizons: { name: string; when: string; items: { title: string; meta: string }[] }[]
}

/** A key task as steps, before and after. */
type FlowPath = {
  label: string
  /** Name every step: the boxes show them, or read them out when `style` is 'numbered'. */
  steps: string[]
  /** Right-aligned summary, e.g. "4 min 10 s · 58% abandoned". */
  meta?: string
}

/**
 * boxes:    named boxes joined by arrows, in a card
 * numbered: numbered boxes only, one row per path, so the drop in steps is what you see (Orbit Health)
 */
export type FlowSection = SectionBase & {
  kind: 'flow'
  style?: 'boxes' | 'numbered'
  before: FlowPath
  after: FlowPath
}

/** SEO topic clusters: a pillar page and its supporting articles. */
export type ClustersSection = SectionBase & {
  kind: 'clusters'
  clusters: {
    pillar: string
    rank: string
    visits: string
    articles: { title: string; rank: string; visits: string }[]
  }[]
}

/** Brand colours as tall swatches in a row (stacked on phones), with their values. */
export type PaletteSection = SectionBase & {
  kind: 'palette'
  colours: {
    name: string
    hex: string
    rgb: string
    cmyk: string
    /**
     * Text colour on the swatch, usually another brand colour (Aurora sets Sage in Forest).
     * Defaults to ink or white, whichever reads better.
     */
    text?: string
  }[]
}

/** Typefaces side by side (stacked on phones), each with a big "Aa" and a sample line. */
export type TypographySection = SectionBase & {
  kind: 'typography'
  specimens: {
    role: string
    typeface: string
    sample: string
    style: 'serif' | 'sans'
    /** Weights shown under the sample, e.g. ['Regular', 'Medium', 'Semibold']. Without them, the alphabet. */
    weights?: string[]
  }[]
  /** Colour of the specimens, e.g. the brand's sand on ink. Defaults to the section's text colour. */
  colour?: string
}

/** A sample component in the design system row, drawn in `components.colours`. */
export type SampleComponent =
  | { kind: 'button'; label: string; variant?: 'solid' | 'outline' }
  | { kind: 'input'; placeholder: string }
  | { kind: 'badge'; label: string }
  /** Mono text, e.g. "+ 22 more blocks". */
  | { kind: 'note'; label: string }

/**
 * A product's design system on one band (Kinetic Labs): a palette card and a type card
 * side by side, then a row of sample components. Phones show only the buttons.
 */
export type DesignSystemSection = SectionBase & {
  kind: 'design-system'
  /** Five swatches read best. Text on each swatch turns ink or white to stay readable. */
  colours: { name: string; hex: string }[]
  type: {
    /** The big specimen. Defaults to "Aa". */
    sample?: string
    /** Name and setting, e.g. ['Display', '64 / 1.0'] */
    scale: [name: string, value: string][]
    /** The typefaces, e.g. "Satoshi & JetBrains Mono". */
    note: string
  }
  components?: {
    items: SampleComponent[]
    /** The client's colours: buttons, badge background, badge text. */
    colours: { primary: string; soft: string; accent: string }
    /** Read out instead of the row, which is only a picture of the components. */
    description: string
  }
}

export type CaseStudySection =
  | ScreenshotSection
  | GallerySection
  | BeforeAfterSection
  | StepsSection
  | FeaturesSection
  | CardsSection
  | ReviewsSection
  | ScoresSection
  | BarsSection
  | ChartSection
  | TableSection
  | ChecklistSection
  | RankingsSection
  | RoadmapSection
  | FlowSection
  | ClustersSection
  | PaletteSection
  | TypographySection
  | ArchitectureSection
  | DesignSystemSection

export type StoryBlock = {
  /** The point in one line. */
  title: string
  paragraphs: string[]
  /** Up to three short bullets. */
  points?: string[]
}

export type CaseStudy = {
  /** URL: /work/<slug>. Lowercase, hyphenated. */
  slug: string
  /**
   * draft:     visible in development only, never prerendered or listed in the sitemap.
   * published: prerendered; the build fails if any placeholder is left.
   */
  status: 'draft' | 'published'
  /**
   * Set on case studies whose client, figures and quotes are invented (the design mockups).
   * They publish normally so the site can be reviewed, but every build lists them in a
   * warning until the flag is removed. Never launch with one.
   */
  sample?: true
  /**
   * The services the project used, lead service first: ['mobile-development', 'product-design'].
   * They drive the Work page filters, the card's services line and the default hero tags.
   * (Not to be confused with `credits.services`, the deliverables listed at the bottom.)
   */
  services: readonly [ServiceSlug, ...ServiceSlug[]]
  /**
   * How the work is labelled where other pages link to it, e.g. "Mobile app" in the
   * "Next project" block. Defaults to the lead service's title.
   */
  discipline?: string
  client: string
  /** Short, for breadcrumbs and links: "Fintech", "Food & drink". */
  industry: string
  year: number

  seo: {
    /** ~50–60 characters, e.g. "Northwind: a customer portal for 12,000 finance teams" */
    title: string
    /** ~140–160 characters, leading with the result. */
    description: string
  }

  hero: {
    title: SplitTitle
    intro: string
    /** Six label/value pairs. */
    facts: [label: string, value: string][]
    /**
     * The eyebrow after "(Case study)". Defaults to [industry, each service, year];
     * set it for shorter names or a year range: ['Logistics', 'Website rebuild', '2025–26'].
     */
    tags?: string[]
    media: Media
    frame: MediaFrame
  }

  /**
   * The photo other pages show for this case study, e.g. the "Next project" block.
   * Defaults to the hero image; set it when the hero is a screenshot.
   */
  cover?: Media

  /** Work card artwork drawn in code. Without one the card falls back to `cover`. */
  brandCover?: BrandCover

  results: {
    /** "First 12 months" */
    timeframe: string
    /** One sentence on the business impact. */
    summary: string
    stats: [Stat, Stat, Stat, Stat]
  }

  challenge: StoryBlock
  approach: StoryBlock

  /** The service-specific middle of the page. Numbered from 03. */
  sections: CaseStudySection[]

  quote?: { text: string; name: string; role: string; initials: string }

  credits: {
    services: string[]
    team: string[]
    tools: string[]
    /** Heading over `tools`. "Stack" suits software projects. Defaults to "Tools". */
    toolsLabel?: string
  }

  /** Slug of the case study linked at the bottom. Defaults to the next published one. */
  next?: string
}

/** Identity helper that type-checks a case study and keeps literal types. */
export const defineCaseStudy = (study: CaseStudy) => study
