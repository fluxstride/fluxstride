# Case studies

How case study pages work, what the nine starter templates contain, and how to turn one into a published case study.

- [Quick start](#quick-start)
- [How it fits together](#how-it-fits-together)
- [Services and templates](#services-and-templates)
- [The templates](#the-templates)
- [Anatomy of a case study file](#anatomy-of-a-case-study-file)
- [Section reference](#section-reference)
- [Step by step: from template to published page](#step-by-step-from-template-to-published-page)
- [Writing guidelines](#writing-guidelines)
- [Images](#images)
- [Drafts, publishing and the build guard](#drafts-publishing-and-the-build-guard)
- [Linking from the Work page](#linking-from-the-work-page)
- [Changing a template, adding a section type or a service](#changing-a-template-adding-a-section-type-or-a-service)
- [Troubleshooting](#troubleshooting)

---

## Quick start

```bash
pnpm new:case-study                                # list the nine templates
pnpm new:case-study website-rebuild atlas-freight  # copy the template to studies/atlas-freight.ts
pnpm dev                                           # open http://localhost:5173/work/atlas-freight
```

A yellow banner at the top of the page lists every placeholder still to fill, with its exact path in the file (for example `results.stats[0].value`). When it reaches zero, set `status: 'published'` and run `pnpm build`.

Browse every template, rendered as a page, at **http://localhost:5173/work/templates** (development only).

---

## How it fits together

A case study is **plain data**. You never edit a component to publish one.

```
src/content/services.ts   The six services, each with its own page. Case studies, Work filters and cards read their names from here.

src/content/case-studies/
├── schema.ts          Types for every field and section. Hover in your editor for docs.
├── placeholders.ts    Finds [bracketed] text and empty images.
├── index.ts           Registry: picks up studies/ and templates/ automatically.
├── templates/         Nine starter page structures. Don't publish these.
│   ├── product-design.ts
│   ├── brand-identity.ts
│   ├── website.ts
│   ├── e-commerce.ts
│   ├── website-rebuild.ts
│   ├── mobile-app.ts
│   ├── software-platform.ts
│   ├── technical-audit.ts
│   └── care-plan.ts
└── studies/           Real case studies. One file per project; the file name is the slug.

src/components/case-study/
├── CaseStudyView.tsx  The whole page: hero → results → story → sections → quote → credits → next → CTA
├── CaseHero.tsx, CaseStory.tsx, CaseClosing.tsx, DraftBanner.tsx
├── CaseSection.tsx    Numbers each section, renders its heading and picks the renderer for its `kind`
├── MediaView.tsx      Image or empty slot, in a browser, phone or plain frame
├── parts.tsx, tone.ts Shared pieces (stat rows, legends) and paper/ink/mist colours
└── sections/          The section renderers, grouped: Media, Card, Data, List, Brand

src/content/work.ts               Work and Home cards, built from the published studies
src/pages/CaseStudy.tsx           /work/<slug>
src/pages/CaseStudyTemplates.tsx  /work/templates and /work/templates/<template> (dev only)
scripts/new-case-study.mjs        pnpm new:case-study
scripts/prerender.mjs             Fails the build if a published study has placeholders; warns about samples
vite.config.ts                    Strips drafts and templates from production bundles
```

**Routing is automatic.** Every file in `studies/` becomes `/work/<slug>`. There's nothing to register in `App.tsx`, the sitemap or the SEO config: `src/lib/seo.ts` builds the title, description, canonical URL, Open Graph tags and breadcrumbs (Home → Work → client) from the file.

**Designs.** The Pencil file is `Documents/pencil designs/fluxstride.pen`, and PNG exports live in `brand-assets/08-website-mockups/`:

| In Pencil                                                             | Export                                        |
| --------------------------------------------------------------------- | --------------------------------------------- |
| _"Case Study Template — ‹Template›"_, desktop 1440 and _(Mobile)_ 390 | `case-study-templates/<template>-desktop.png` |
| _"Case Study — ‹Name›"_: the finished examples                        | `case-studies/<name>-desktop.png`             |
| _"Case Study Section — Content Clusters"_ and _"— Share of Voice"_    | `case-studies/section-library-*.png`          |

The yellow notes in the template frames are the comments in the template files. The **section library** frames hold designed sections that no template uses yet (`clusters` and `bars` with `style: 'compare'`); they're built and ready to drop into any study.

---

## Services and templates

Two separate ideas:

- **Services** are what we sell: the six in `src/content/services.ts`, in Design → Build → Run order.

  | Slug                      | Title                                 | Short title    |
  | ------------------------- | ------------------------------------- | -------------- |
  | `product-design`          | Product Design (UI/UX)                | Product design |
  | `graphic-design-branding` | Graphic Design & Branding             | Branding       |
  | `web-design-frontend`     | Website Design & Frontend Development | Web & frontend |
  | `mobile-development`      | Mobile Development                    | Mobile apps    |
  | `backend-development`     | Backend Development                   | Backend        |
  | `cloud-devops`            | Cloud & DevOps                        | Cloud & DevOps |

  Capabilities without a service of their own sit inside one: e-commerce and technical SEO under Web & frontend, maintenance and support plans under Cloud & DevOps.

- **Templates** are page structures: the story a kind of project tells best (a rebuild through its search results, an app through its screens). They aren't tied to a service.

A project usually spans several services, so every case study lists them in `services`, **lead service first**:

```ts
services: ['backend-development', 'web-design-frontend', 'product-design'], // Northwind
```

That one array drives the Work page filters (a study shows under each of its services), the services line on its card, and the default hero eyebrow. `discipline` is the project's own label, like "Website rebuild", used in the "Next project" block and on /work/templates.

---

## The templates

Every template shares the same frame: **hero → results band → challenge → approach → sections → client quote → credits → next project → CTA**. Only the middle changes.

| Template            | Usual services          | Sections, in order                                                                                                                                            | Finished example  |
| ------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `product-design`    | Product                 | Research `cards` (insights + quotes) + stats · User `flow` · Wireframe vs final `before-after` · Usability `bars` (ink) · Design system `gallery` (8) + stats | —                 |
| `brand-identity`    | Branding                | The mark `gallery` (2×2) · Colour `palette` · `typography` (ink) · Applications `gallery` (3)                                                                 | Aurora Architects |
| `website`           | Web & frontend, Product | Redesign `before-after` · Templates `gallery` (6) · Performance `scores` + Core Web Vitals (ink) · Editing `features`                                         | Kinetic Labs      |
| `e-commerce`        | Web & frontend, Product | Store `screenshot` + features · Conversion funnel `bars` · Revenue `chart` (ink, launch marker) · Checkout `features`                                         | Halden Coffee     |
| `website-rebuild`   | Web & frontend, Backend | Organic traffic `chart` · `rankings` · The rebuild `checklist` + vitals panel (ink)                                                                           | Atlas Freight     |
| `mobile-app`        | Mobile apps, Product    | App screens `gallery` (phone, 4) · User journey `steps` (journey) · Store `reviews` (ink) · `features`                                                        | Orbit Health      |
| `software-platform` | Backend, Web & frontend | Process `steps` (phases) · Product `screenshot` + features · Architecture `cards` (ink) + reliability stats                                                   | Northwind         |
| `technical-audit`   | Cloud & DevOps, Backend | Audit scorecard `table` (ratings, risk tags) · Options `cards` (recommended highlight, pros/cons) · `roadmap` (ink) · Deliverables `gallery`                  | —                 |
| `care-plan`         | Cloud & DevOps          | What's included `checklist` + SLA stats · Uptime `chart` (ink) · Monthly report `screenshot` (portrait) + sections · Support log `table`                      | —                 |

The finished examples went further than their templates, and show what's possible: Northwind uses `steps` cards and an `architecture` diagram, Kinetic Labs a `design-system` band, Orbit Health a numbered `flow` and a phone `gallery` panel, Aurora `screenshot` deliverables.

Templates are a starting point, not a contract. Change `services` to what the project really used, delete sections that don't fit, reorder them, or borrow a section from another template: every section kind works in any case study. A website project with a strong search result can take the `chart` and `rankings` from `website-rebuild`.

---

## Anatomy of a case study file

```ts
import { defineCaseStudy } from '../schema'

export default defineCaseStudy({
  slug: 'northwind', //                     /work/northwind; must match the file name
  status: 'draft', //                       'draft' | 'published'
  sample: true, //                          only on invented mockup content; see the build guard
  services: ['backend-development', 'web-design-frontend'], // lead service first
  discipline: 'Software platform', //       optional; defaults to the lead service's title
  client: 'Northwind',
  industry: 'Fintech',
  year: 2026, //                            templates use 0 so a forgotten year is caught

  seo: {
    title: 'Northwind: a customer portal for 12,000 finance teams', //       ~50–60 characters
    description: 'Northwind tripled self-serve adoption after we rebuilt …', // ~140–160 characters
  },

  hero: {
    title: ['A portal customers', 'actually use.'], // [plain, serif italic]
    intro: '…',
    tags: ['Fintech', 'Backend & web', '2026'], //  optional eyebrow; defaults to industry, services, year
    facts: [['Client', 'Northwind'] /* six label/value pairs */],
    media: { image: 'case-studies/northwind-hero', alt: '…', brief: 'Hero image · 2880×1520' },
    frame: 'plain',
  },

  cover: { image: '…', alt: '…', brief: '…' }, // optional; the card photo when the hero is a screenshot

  results: {
    timeframe: 'First 12 months',
    summary: '…',
    stats: [/* exactly four */],
  },

  challenge: { title: '…', paragraphs: ['…'], points: ['…'] },
  approach: { title: '…', paragraphs: ['…'] },

  sections: [/* see the section reference; numbered from 03 automatically */],

  quote: { text: '…', name: '…', role: '…', initials: 'JM' }, // optional
  credits: { services: ['…'], team: ['Name — Role'], tools: ['…'], toolsLabel: 'Stack' },
  next: 'halden-coffee', //                  optional; defaults to the next published study
})
```

`defineCaseStudy` does nothing at runtime. It gives you type-checking and autocomplete, so a typo in a `kind` or a missing field shows up in your editor and in `pnpm typecheck`.

`credits.services` is different from `services`: it lists the deliverables in words ("Technical audit", "Backend & page generation"). `toolsLabel` renames the tools column; "Stack" suits engineering projects.

### Common building blocks

| Type         | Shape                                                | Notes                                                                                                                                                                                                  |
| ------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `SplitTitle` | `['Plain part', 'serif italic part.']`               | Every heading. Keep the italic part to one short phrase.                                                                                                                                               |
| `Media`      | `{ image, alt, brief, aspect?, url?, mobileImage? }` | `image: null` shows a grey slot with `brief`. `aspect` only matters while it's null. `url` is the address in a browser frame. `mobileImage` is a phone crop, for artwork only (see [Images](#images)). |
| `MediaFrame` | `'browser' \| 'phone' \| 'plain'`                    | See [Images](#images).                                                                                                                                                                                 |
| `Stat`       | `{ value, label, detail? }`                          | `detail` is the baseline or timeframe: "Was 11", "May 2025 → Apr 2026".                                                                                                                                |
| `Feature`    | `{ icon, title, body }`                              | `icon` is a Lucide component: `import { Zap } from 'lucide-react'`.                                                                                                                                    |

Every section also accepts:

| Field   | Required | What it does                                                                                                                                              |
| ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kind`  | yes      | Which layout to use (below).                                                                                                                              |
| `label` | yes      | Mono eyebrow after the number: `label: 'Process'` → "03 — Process".                                                                                       |
| `title` | yes      | `SplitTitle`.                                                                                                                                             |
| `intro` | no       | Short paragraph beside the heading. One or two sentences.                                                                                                 |
| `tone`  | no       | `'ink'` for a dark full-bleed band, `'mist'` for a pale blue-grey band padded like ink. Default `'paper'`. Never put two ink sections next to each other. |
| `stats` | no       | A row of `Stat`s closing the section (e.g. reliability figures under an architecture diagram).                                                            |

---

## Section reference

Each kind notes the design it was built from, so you can compare with Pencil.

### `screenshot`: one image, optional features or deliverables

```ts
{
  kind: 'screenshot',
  label: 'The product',
  title: ['What the product', 'makes easy.'],
  frame: 'browser',
  media: { image: 'case-studies/northwind-dashboard', alt: 'Invoice dashboard with …', brief: 'Product screenshot · desktop 2560×1200', url: 'app.northwind.example/overview' },
  features: [{ icon: Zap, title: 'Instant reconciliation', body: '…' }], // optional, usually three
  featureStyle: 'plain', //                                                'ruled' (default) | 'plain' | 'cards'
  deliverables: [['Stationery', '12 items']], //                           optional, instead of features
}
```

Landscape media runs full width with features in three columns underneath. **Portrait media** (ratio below 1, like an A4 report page) sits in a narrower column with the features stacked beside it. `deliverables` are label/count pairs under a hairline, four across and two on phones (Aurora's applications).

### `gallery`: a grid of images

```ts
{
  kind: 'gallery',
  frame: 'plain', // 'phone' for app screens, 'browser' for page screenshots
  columns: 3, //     2 | 3 | 4 on desktop; phones show two
  items: [{ media: { … }, caption: 'Homepage', meta: '01' }],
  panel: true, //    optional: phone screens spread on a tinted panel with centred captions (Orbit Health)
  outline: true, //  optional: hairline-edged thumbnails at their own proportions (Kinetic Labs)
}
```

`plain` galleries crop to 4:3 so rows line up, unless `outline` is set. Browser and phone galleries keep each image's proportions. Used for: page templates, app screens, logo panels, brand applications, design system components, document covers.

### `before-after`: the same thing, then and now

```ts
{
  kind: 'before-after',
  frame: 'browser',
  before: { label: 'Before · 2023', media: { … }, metrics: [{ value: '4.8s', label: 'Load time' }] },
  after:  { label: 'After · 2025',  media: { … }, metrics: [{ value: '1.1s', label: 'Load time' }] },
}
```

Use the same page, crop and device on both sides. `metrics` can be `[]` (the product design template uses it for wireframe vs final UI).

### `steps`: phases or a journey

```ts
{
  kind: 'steps',
  variant: 'phases', // 'phases' | 'cards' | 'journey'
  steps: [{ title: 'Discovery', meta: '3 weeks', body: '…', points: ['…'], highlight: true }],
}
```

- `phases`: ruled columns with "Phase 01 · 4 weeks".
- `cards`: white phase cards listing ticked `points`; `highlight` draws one card's rule in Flux blue (Northwind).
- `journey`: numbered dots joined by a line; `meta` is a completion rate.

Four steps fit one desktop row.

### `features`: three icon features

```ts
{ kind: 'features', style: 'cards', tint: { background: '#EFE4D4', icon: '#6B3F24' }, features: [{ icon: CreditCard, title: '…', body: '…' }] }
```

`style` is `ruled` (default), `plain` (no rule) or `cards` (white cards with the icon in a tinted square; `tint` uses the client's colours, as in Halden Coffee).

### `architecture`: a system diagram

```ts
{
  kind: 'architecture',
  tone: 'ink',
  layers: [{ name: 'Clients', nodes: [{ title: 'Customer portal', meta: 'React · Next.js' }] }], // usually three
  stack: { label: 'Stack', items: ['TypeScript', 'PostgreSQL'] },
}
```

Columns of boxes joined by arrows, then the stack as chips (Northwind).

### `cards`: flexible cards

```ts
{
  kind: 'cards',
  columns: 3, // 2 | 3
  cards: [
    {
      eyebrow: 'Option B · Integrate',
      title: 'Integrate the ledger',
      highlight: 'Recommended', //            outlines the card and adds a badge
      body: '…',
      quote: '…', //                           serif quote, e.g. from a research participant
      facts: [['Cost', '£120k'], ['Time', '4 months']],
      pros: ['…'],
      cons: ['…'],
      chips: ['React', 'Node.js'], //           e.g. the tech in an architecture layer
    },
  ],
}
```

Every field except `title` is optional, so one kind covers research insights, build/buy/integrate options, architecture layers and service tiers.

### `reviews`: store rating and reviews

```ts
{ kind: 'reviews', rating: '4.8', ratingLabel: '12,400 ratings · App Store & Google Play', reviews: [{ quote: '…', author: 'jess_m · App Store · Mar 2026' }] }
```

Real store reviews only.

### `scores`: Lighthouse rings and vitals

```ts
{
  kind: 'scores',
  scores: [{ value: '98', label: 'Performance' }],
  vitals: [{ key: 'LCP', name: 'Largest Contentful Paint', before: '4.2s', after: '1.1s', status: 'Good' }], // optional
}
```

`key` is the short code in Flux blue; `status` is a verdict tag shown on desktop.

### `bars`: before/after horizontal bars

```ts
{
  kind: 'bars',
  style: 'funnel', // 'funnel' (default) | 'compare'
  legend: ['Before', 'After'],
  rows: [{ label: 'Added to basket', before: { value: 34, display: '8.1%' }, after: { value: 46, display: '11.2%' } }],
  source: 'Source: GA4 · 90 days before vs 90 days after launch',
}
```

`value` sets the **bar length**, from 0 to 100; bars are drawn relative to the largest value in the section, so you can use the real percentages. `display` is the number shown next to it.

- `funnel`: a legend, then thick paired bars beside each stage (Halden Coffee's conversion).
- `compare`: thin paired bars labelled "2025 · 6%", no legend. The `highlight: true` row is the client in Flux blue, the rest grey. Designed as share of voice: see the section library frame _"Case Study Section — Share of Voice"_.

### `chart`: columns over time

```ts
{
  kind: 'chart',
  kpi: { value: '71,900', label: 'Organic sessions / month', detail: '+291%' },
  legend: ['Old site', 'New site'], // optional
  points: [{ label: 'May', value: 18.3, display: '18,300 sessions', callout: '18.3K' }],
  changeAt: 4, //                     index of the first "after" point
  markerLabel: 'Relaunch', //         label above that column
  source: 'Source: Google Search Console',
}
```

Values are relative: the tallest column fills the chart, so you can paste raw numbers. `display` is what screen readers hear for each column (the chart has a hidden data list). Points before `changeAt` are drawn muted. `callout` puts a figure over a column on desktop, usually the latest one. Phones show only each label's first letter.

**Stacked** (Halden Coffee): give points a `stack` value that sits on top of `value`, and name it with `stackLabel: 'Subscriptions'`. The chart drops the KPI and card, and the legend moves underneath.

### `table`: scorecards, logs

```ts
{
  kind: 'table',
  columns: [
    { key: 'area', label: 'Area', width: 'fill', emphasis: 'strong' },
    { key: 'risk', label: 'Risk', width: 'sm' },
  ],
  rows: [
    { area: 'Hosting', risk: { tag: 'High risk', tone: 'risk' } },
    { area: '…', risk: { rating: 4 } }, // four of five dots
  ],
  source: 'Source: …',
}
```

A cell is a string, a tag `{ tag, tone?: 'flux' | 'risk' }`, or a rating `{ rating: 0–5 }`. Column `width` is `sm`, `md` (default) or `fill`, and `emphasis` is `strong` or `muted`. On phones each row becomes a card with label/value lines. For keyword positions, use `rankings`.

### `rankings`: keyword positions

```ts
{
  kind: 'rankings',
  rows: [{ keyword: 'freight forwarding uk', volume: '12,100', before: '38', after: '#3', change: '+35 places' }],
  source: 'Source: Ahrefs rank tracker · UK · Apr 2025 vs Apr 2026',
}
```

A table on desktop with the new position in a pill; one card per keyword on phones. A `change` starting with a minus turns the arrow down (Atlas Freight).

### `checklist`: ticked items

```ts
{
  kind: 'checklist',
  columns: 1, // 1 | 2
  items: [{ title: 'Server-rendered every page', body: '…', tag: 'High' }],
  panel: { //   optional, one column only
    label: 'Core Web Vitals · Mobile · 75th percentile',
    metrics: [{ name: 'Largest Contentful Paint', value: '1.6s', before: '4.8s', status: 'Good', score: 86 }],
    stats: [['100', 'Lighthouse SEO'], ['2,140', 'Clean URLs indexed']],
  },
}
```

`panel` puts measured results beside the list: each metric with "was 4.8s" and a bar filled to `score` (0–100), then two figures (Atlas Freight).

### `roadmap`: Now / Next / Later

```ts
{ kind: 'roadmap', horizons: [{ name: 'Now', when: '0–3 months', items: [{ title: 'Retire legacy CRM', meta: 'Ops · −£40k/yr' }] }] }
```

The first horizon is highlighted.

### `flow`: a task before and after

```ts
{ kind: 'flow', style: 'numbered', before: { label: 'Before', steps: ['…'], meta: '4 min 10 s · 58% abandoned' }, after: { label: 'After', steps: ['…'] } }
```

`boxes` (default) draws named boxes joined by arrows in a card. `numbered` draws numbered boxes only, one row per path, so the drop in steps is what you see (Orbit Health); name every step anyway, since screen readers read them out.

### `clusters`: topic clusters

```ts
{ kind: 'clusters', clusters: [{ pillar: 'Freight forwarding', rank: '#1', visits: '8,200', articles: [{ title: '…', rank: '#3', visits: '1,100' }] }] }
```

A pillar page with its supporting articles, three across (stacked on phones). Design: the section library frame _"Case Study Section — Content Clusters"_.

### `palette`: brand colours

```ts
{ kind: 'palette', colours: [{ name: 'Sage', hex: '#B8C4A8', rgb: '184 196 168', cmyk: '6 0 14 23', text: '#1F3A2E' }] }
```

Tall swatches in a row, stacked on phones. Text on each swatch is ink or white, whichever reads better, unless `text` sets a brand colour (Aurora sets Sage in Forest; check the contrast). Pale swatches get a hairline border. While `hex` is still a placeholder, swatches show a grey ramp.

### `typography`: type specimens

```ts
{
  kind: 'typography',
  colour: '#E8DCC8', // optional: specimen colour, e.g. the brand's sand on ink
  specimens: [{ role: 'Display', typeface: 'GT Sectra', sample: 'Built to outlast.', style: 'serif', weights: ['Regular', 'Medium'] }],
}
```

`style` chooses which site font renders the sample (`serif` or `sans`). `weights` are listed under the sample; without them, the alphabet is. The page can't load the client's own fonts, so for exact specimens use a `gallery` image instead.

### `design-system`: a product's design system on one band

```ts
{
  kind: 'design-system',
  tone: 'mist',
  colours: [{ name: 'Volt', hex: '#5B5BF7' }], // five read best
  type: { sample: 'Aa', scale: [['Display', '64 / 1.0']], note: 'Satoshi & JetBrains Mono' },
  components: {
    items: [{ kind: 'button', label: 'Book a demo' }, { kind: 'button', label: 'Read docs', variant: 'outline' }, { kind: 'input', placeholder: 'you@company.com' }, { kind: 'badge', label: 'Beta' }, { kind: 'note', label: '+ 22 more blocks' }],
    colours: { primary: '#5B5BF7', soft: '#ECECFE', accent: '#3A3AD4' },
    description: 'Buttons, an email field and a badge in the Kinetic palette', // read out instead of the row
  },
}
```

A palette card and a type card side by side, then sample components drawn in the client's colours. Phones show only the buttons (Kinetic Labs).

---

## Step by step: from template to published page

1. **Pick the template** whose story fits the project best, not necessarily its main service. Not sure? Open http://localhost:5173/work/templates and compare.

2. **Create the file.**

   ```bash
   pnpm new:case-study website kinetic-labs
   ```

   The slug becomes the URL (`/work/kinetic-labs`), so keep it short, lowercase and hyphenated, usually the client name.

3. **Set `services`** to every service the project used, lead first, and `discipline` to a short label for the kind of work.

4. **Open the draft in the browser** with `pnpm dev` at `/work/<slug>`. Expand the yellow banner to see every placeholder and its path. Keep it open while you work; the page hot-reloads.

5. **Fill the facts first:** `client`, `industry`, `year`, `hero.facts` and `results.stats`. Numbers must come from the client or your analytics, with a baseline and timeframe. Get written approval for every figure and the quote.

6. **Write the story:** hero title and intro, then challenge and approach, then SEO title and description last, once you know the angle. See [Writing guidelines](#writing-guidelines).

7. **Shape the middle.** Fill each section's data, delete sections you can't back up with real material, and add any you need from the [Section reference](#section-reference). Keep ink sections apart.

8. **Add the images.** See [Images](#images). Replace each `image: null` with the image name. The slot's `brief` stays in the file as a note; it isn't shown once an image exists.

9. **Check it** at 1440 and 390 wide. With the dev server running:

   ```bash
   pnpm shots work/kinetic-labs     # writes .screenshots/work-kinetic-labs-desktop.png and -mobile.png
   ```

10. **Publish.** When the banner shows zero placeholders, set `status: 'published'`, then:

    ```bash
    pnpm check && pnpm build
    ```

    The build prerenders `/work/<slug>` and adds it to the sitemap. To show it on the Work page and Home, add a card (see [Linking from the Work page](#linking-from-the-work-page)). Commit with `feat(case-studies): kinetic labs case study`.

---

## Writing guidelines

These come from the notes in the Pencil templates.

- **Hero title:** the result in plain words, eight words or fewer, with one italic phrase. _"A portal customers / actually use."_ Not the client's name and not the service.
- **Hero intro:** who the client is, what held them back and what we delivered. Two or three sentences, 45 words max.
- **Results:** four measurable outcomes, each with a baseline or timeframe in `detail`. No vanity numbers. If you only have three strong numbers, the fourth can be a delivery fact ("9 weeks", "0 downtime at launch").
- **Challenge and approach:** 60–90 words each, written for a non-technical buyer. Quote the client where you can. Three bullets max.
- **Section intros:** one or two sentences. The heading makes the point and the intro gives context.
- **Quote:** one or two sentences about the outcome, not about how nice we were to work with. Approved in writing.
- **Credits:** services actually delivered, the core team (`'Name — Role'`) and up to six tools.
- **SEO:** a title of about 50–60 characters that leads with the client and the result; a description of about 140–160 characters that leads with the result.
- **Confidentiality:** agree with the client what can be named. Blur anything sensitive in screenshots. Audit and care plan work often needs an anonymised client ("A UK logistics group").
- **Placeholder convention:** anything in `[square brackets]` is unfinished. Don't use square brackets in real copy.

---

## Images

### Frames

| Frame     | Use for                         | Behaviour                                                                                                         |
| --------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `browser` | Website and web app screenshots | Browser chrome and shadow. **On phones it shows the same desktop screenshot scaled down**, never a mobile layout. |
| `phone`   | Native app screens (1170×2532)  | Device outline.                                                                                                   |
| `plain`   | Photography, artwork, documents | No frame. The hero uses a fixed crop; galleries crop to 4:3.                                                      |

`mobileImage` swaps in a different image on phones. Use it only for artwork drawn at both sizes (like Kinetic Labs' page thumbnails); product screenshots always stay the desktop image.

### Adding an image

1. Export at the size given in the slot's `brief`. Screenshots: 2560 wide at desktop size. App screens: 1170×2532. Hero and photography: 2880×1520.
2. Add it to `IMAGES` in `scripts/import-images.mjs`, named `case-studies/<slug>-<what>`:

   ```js
   'case-studies/kinetic-labs-home': { src: 'kinetic-home.png', widths: [640, 1280, 2560] },
   ```

   `src` is a file in the design's images folder (`Documents/pencil designs/images`, or set `DESIGN_IMAGES=<dir>`) or a URL. Full-width screenshots should use `[640, 1280, 2560]` so they stay sharp on retina screens; the default `[640, 1024, 1408]` suits smaller images.

3. Run `pnpm assets:images`. It writes AVIF and WebP files to `public/images/` and updates `src/content/images.generated.ts`.
4. Set `image: 'case-studies/kinetic-labs-home'`. The name autocompletes, and a typo is a type error.
5. Write a real `alt`: describe what the screen shows, not "screenshot".

Real images keep their own proportions, so screenshots are never cropped. `aspect` is ignored once `image` is set.

---

## Drafts, publishing and the build guard

|                                     | `status: 'draft'`              | `status: 'published'` |
| ----------------------------------- | ------------------------------ | --------------------- |
| `pnpm dev` at `/work/<slug>`        | ✔ with the placeholder banner  | ✔                     |
| Production build / prerendered page | ✘ no route                     | ✔                     |
| Sitemap, indexable                  | ✘                              | ✔                     |
| Included in production JavaScript   | ✘ stripped by `vite.config.ts` | ✔                     |
| Can have a Work card                | ✘                              | ✔                     |
| Placeholders allowed                | ✔                              | ✘ the build fails     |

**The build guard.** `scripts/prerender.mjs` runs `findPlaceholders` on every published study. If anything is left, the build stops and lists the file and the paths:

```
Error: Published case studies still contain placeholders. Finish them or set status: 'draft'.

  src/content/case-studies/studies/kinetic-labs.ts (3 left)
    results.stats[2].detail: [Timeframe]
    sections[1].items[4].media.image: image
    year: 0
```

A placeholder is any of the following:

- text containing `[…]`;
- a string that starts with `[` or ends with `]` (this catches split titles like `['[Headline,', 'phrase.]']`);
- an `image: null`;
- a `year` below 2000.

The `brief` field is ignored.

**Sample content.** The six current studies carry `sample: true`: their clients, figures and quotes were invented for the design mockups. They publish so the site can be reviewed, but every build prints a warning listing them. Replace each with a real, approved project (or set it back to `draft`) and remove the flag before launch.

---

## Linking from the Work page

The Work page and Home "Selected work" build their cards from the case studies in `src/content/work.ts`, so a card always matches its page: client, industry, year, services, photo and headline figure all come from the study. Only the order and the badge label are written there:

```ts
const cards: Card[] = [
  { slug: 'northwind', metric: { stat: 0, label: 'Qualified leads' } }, // results.stats[0] on the badge
  …
]
```

- The card photo is the study's `cover`, or its hero image when there's no cover. A card throws if neither is an image, so set `cover` when the hero is a screenshot slot.
- A card must point at a **published** study; a missing or draft slug throws.
- The Work filters use `services`, so a study shows under each of its services.
- Projects without a case study go in `moreProjects`, the index table under the grid.

---

## Changing a template, adding a section type or a service

**Improving a template:** edit `templates/<template>.ts` and check it at `/work/templates/<template>`. Existing studies aren't affected, because they're copies. Keep the design in sync: update the matching Pencil frame and re-export to `brand-assets/08-website-mockups/case-study-templates/`.

**A new template:** copy the closest one to `templates/<id>.ts` and set `slug: 'template-<id>'` (the registry throws otherwise), `discipline` and its usual `services`. It appears in `pnpm new:case-study` and at /work/templates automatically.

**A new section kind:**

1. Add the type to `schema.ts` and to the `CaseStudySection` union.
2. Write the component in the matching file in `src/components/case-study/sections/`. It receives `{ section, dark }`; use `tone(dark)` from `tone.ts` for colours so it works on paper, ink and mist.
3. Register it in the `renderers` map in `CaseSection.tsx`. The map is typed to cover every kind, so TypeScript reports a missing one.
4. Use it in a template or study and check it at 1440 and 390, on both tones. If no template uses it, add its design to the Pencil section library.

**A new service:**

1. Add the slug to `ServiceSlug` and an entry to `services` in `src/content/services.ts`, placed in its Design, Build or Run `group`, with every field its own page needs (see [services-and-careers.md](./services-and-careers.md)). The Home grid, Services page, the page at /services/<slug>, footer, Work filters and structured data all read this list.
2. Add a matching need to `needs` in `src/content/brief.ts`, so "Discuss this" pre-ticks it on the Contact form.
3. Add it to the Home marquee (`DisciplineMarquee.tsx`) and update the counts in copy ("Six services") on Home, Services, Studio and in `src/lib/seo.ts`.
4. Tag studies that used it. Templates don't change unless the service needs a new page structure.
5. Update the Pencil pages (Home, Services, Work chips, Contact chips, footers) and re-export the mockups and share images (`pnpm assets:brand`).

---

## Troubleshooting

| Symptom                                                       | Fix                                                                                                                                                          |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/work/<slug>` is a 404 in dev                                | The file must be in `studies/` with a default export, and `slug` must match the URL. Restart `pnpm dev` after creating a file if the glob didn't pick it up. |
| `… has slug "…"; the file name and slug must match`           | Rename the file or fix `slug`. The file name is the URL.                                                                                                     |
| `… has slug "…"; a template's slug must be "template-<id>"`   | A template's file name and slug disagree.                                                                                                                    |
| `Unknown service "…"`                                         | A slug in `services` isn't in `src/content/services.ts`. TypeScript normally catches this first.                                                             |
| `Work card "…" has no published case study`                   | Publish the study, or remove its entry from `cards` in `work.ts`.                                                                                            |
| `Case study "…" needs a cover image for its Work card`        | Set `cover`, or give the hero an image.                                                                                                                      |
| `Type '"case-studies/…"' is not assignable to type ImageName` | Run `pnpm assets:images` after adding the image to `scripts/import-images.mjs`.                                                                              |
| Build fails with a placeholder list                           | Fill the listed paths, or set `status: 'draft'` to ship without the page.                                                                                    |
| Page published but missing from production                    | Check `status: 'published'`. Drafts are removed from production builds.                                                                                      |
| Chart or bars look flat                                       | Both scale to their largest value, so near-identical values (like uptime) will look level; that's honest.                                                    |
