# Case studies

How case study pages work, what the nine starter templates contain, and how to turn one into a published case study.

- [Quick start](#quick-start)
- [How it fits together](#how-it-fits-together)
- [The templates](#the-templates)
- [Anatomy of a case study file](#anatomy-of-a-case-study-file)
- [Section reference](#section-reference)
- [Step by step: from template to published page](#step-by-step-from-template-to-published-page)
- [Writing guidelines](#writing-guidelines)
- [Images](#images)
- [Drafts, publishing and the build guard](#drafts-publishing-and-the-build-guard)
- [Linking from the Work page](#linking-from-the-work-page)
- [Changing a template or adding a section type](#changing-a-template-or-adding-a-section-type)
- [Troubleshooting](#troubleshooting)

---

## Quick start

```bash
pnpm new:case-study                          # list the nine templates
pnpm new:case-study seo atlas-freight        # copy the SEO template to studies/atlas-freight.ts
pnpm dev                                     # open http://localhost:5173/work/atlas-freight
```

A yellow banner at the top of the page lists every placeholder still to fill, with its exact path in the file (for example `results.stats[0].value`). When it reaches zero, set `status: 'published'` and run `pnpm build`.

Browse every template, rendered as a page, at **http://localhost:5173/work/templates** (development only).

---

## How it fits together

A case study is **plain data**. You never edit a component to publish one.

```
src/content/case-studies/
├── schema.ts          Types for every field and section. Hover in your editor for docs.
├── placeholders.ts    Finds [bracketed] text and empty images.
├── index.ts           Registry: picks up studies/ and templates/ automatically.
├── templates/         Nine starter templates, one per service. Don't publish these.
│   ├── software-engineering.ts
│   ├── website-design-development.ts
│   ├── mobile-app-development.ts
│   ├── e-commerce.ts
│   ├── ui-ux-design.ts
│   ├── graphic-design.ts
│   ├── seo.ts
│   ├── tech-consultancy.ts
│   └── website-maintenance.ts
└── studies/           Real case studies. One file per project; the file name is the slug.

src/components/case-study/
├── CaseStudyView.tsx  The whole page: hero → results → story → sections → quote → credits → next → CTA
├── CaseHero.tsx, CaseStory.tsx, CaseClosing.tsx, DraftBanner.tsx
├── CaseSection.tsx    Numbers each section, renders its heading and picks the renderer for its `kind`
├── MediaView.tsx      Image or empty slot, in a browser, phone or plain frame
└── sections/          One component per section kind

src/pages/CaseStudy.tsx           /work/<slug>
src/pages/CaseStudyTemplates.tsx  /work/templates and /work/templates/<service> (dev only)
scripts/new-case-study.mjs        pnpm new:case-study
scripts/prerender.mjs             Fails the build if a published study has placeholders
vite.config.ts                    Strips drafts and templates from production bundles
```

**Routing is automatic.** Every file in `studies/` becomes `/work/<slug>`. There's nothing to register in `App.tsx`, the sitemap or the SEO config: `src/lib/seo.ts` builds the title, description, canonical URL, Open Graph tags and breadcrumbs (Home → Work → client) from the file.

**Designs.** Each template mirrors a frame in the Pencil file (`Documents/pencil designs/fluxstride.pen`) named _"Case Study Template — ‹Service›"_, desktop 1440 and mobile 390. The yellow notes in those frames are the comments in the template files. PNG exports are in `brand-assets/08-website-mockups/case-study-templates/`. The six finished example case studies (Northwind, Kinetic Labs, Orbit Health, Halden Coffee, Aurora Architects, Atlas Freight) are in `brand-assets/08-website-mockups/case-studies/`.

---

## The templates

Every template shares the same frame: **hero → results band → challenge → approach → service sections → client quote → credits → next project → CTA**. Only the middle changes.

| Template (`service`)         | Service sections, in order                                                                                                                                    | Finished example  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `software-engineering`       | Process `steps` (phases) · Product `screenshot` + features · Architecture `cards` (ink) + reliability stats                                                   | Northwind         |
| `website-design-development` | Redesign `before-after` · Templates `gallery` (6) · Performance `scores` + Core Web Vitals (ink) · Editing `features`                                         | Kinetic Labs      |
| `mobile-app-development`     | App screens `gallery` (phone, 4) · User journey `steps` (journey) · Store `reviews` (ink) · `features`                                                        | Orbit Health      |
| `e-commerce`                 | Store `screenshot` + features · Conversion funnel `bars` · Revenue `chart` (ink, launch marker) · Checkout `features`                                         | Halden Coffee     |
| `ui-ux-design`               | Research `cards` (insights + quotes) + stats · User `flow` · Wireframe vs final `before-after` · Usability `bars` (ink) · Design system `gallery` (8) + stats | —                 |
| `graphic-design`             | The mark `gallery` (2×2) · Colour `palette` · `typography` (ink) · Applications `gallery` (3)                                                                 | Aurora Architects |
| `seo`                        | Organic traffic `chart` · Rankings `table` · Technical SEO `checklist` + vitals (ink) · Content `clusters`                                                    | Atlas Freight     |
| `tech-consultancy`           | Audit scorecard `table` (ratings, risk tags) · Options `cards` (recommended highlight, pros/cons) · `roadmap` (ink) · Deliverables `gallery`                  | —                 |
| `website-maintenance`        | What's included `checklist` + SLA stats · Uptime `chart` (ink) · Monthly report `screenshot` (portrait) + sections · Support log `table`                      | —                 |

Templates are a starting point, not a contract. Delete sections that don't fit, reorder them, or borrow a section from another template: every section kind works in any case study. A website project with a strong SEO result can take the `chart` and `table` from the SEO template.

---

## Anatomy of a case study file

```ts
import { LayoutDashboard } from 'lucide-react'
import { defineCaseStudy } from '../schema'

export default defineCaseStudy({
  slug: 'northwind', //                     /work/northwind; must match the file name
  status: 'draft', //                       'draft' | 'published'
  service: 'software-engineering', //       one of the nine service slugs
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
    facts: [['Client', 'Northwind'] /* six label/value pairs */],
    media: { image: 'work/northwind', alt: '…', brief: 'Hero image · 2880×1520' },
    frame: 'plain',
  },

  results: {
    timeframe: 'First 12 months',
    summary: '…',
    stats: [/* exactly four */],
  },

  challenge: { title: '…', paragraphs: ['…'], points: ['…'] },
  approach: { title: '…', paragraphs: ['…'] },

  sections: [/* see the section reference; numbered from 03 automatically */],

  quote: { text: '…', name: '…', role: '…', initials: 'JM' }, // optional
  credits: { services: ['…'], team: ['Name — Role'], tools: ['…'] },
  next: 'halden-coffee', //                  optional; defaults to the next published study
})
```

`defineCaseStudy` does nothing at runtime. It gives you type-checking and autocomplete, so a typo in a `kind` or a missing field shows up in your editor and in `pnpm typecheck`.

### Common building blocks

| Type         | Shape                                  | Notes                                                                                |
| ------------ | -------------------------------------- | ------------------------------------------------------------------------------------ |
| `SplitTitle` | `['Plain part', 'serif italic part.']` | Every heading. Keep the italic part to one short phrase.                             |
| `Media`      | `{ image, alt, brief, aspect? }`       | `image: null` shows a grey slot with `brief`. `aspect` only matters while it's null. |
| `MediaFrame` | `'browser' \| 'phone' \| 'plain'`      | See [Images](#images).                                                               |
| `Stat`       | `{ value, label, detail? }`            | `detail` is the baseline or timeframe: "Was 11", "May 2025 → Apr 2026".              |
| `Feature`    | `{ icon, title, body }`                | `icon` is a Lucide component: `import { Zap } from 'lucide-react'`.                  |

Every section also accepts:

| Field   | Required | What it does                                                                                          |
| ------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `kind`  | yes      | Which layout to use (below).                                                                          |
| `label` | yes      | Mono eyebrow after the number: `label: 'Process'` → "03 — Process".                                   |
| `title` | yes      | `SplitTitle`.                                                                                         |
| `intro` | no       | Short paragraph beside the heading. One or two sentences.                                             |
| `tone`  | no       | `'ink'` for a dark full-bleed band. Default `'paper'`. Never put two ink sections next to each other. |
| `stats` | no       | A row of `Stat`s closing the section (e.g. reliability figures under an architecture diagram).        |

---

## Section reference

### `screenshot`: one image, optional features

```ts
{
  kind: 'screenshot',
  label: 'The product',
  title: ['What the product', 'makes easy.'],
  frame: 'browser',
  media: { image: 'work/northwind-dashboard', alt: 'Invoice dashboard with …', brief: 'Product screenshot · desktop 2560×1200' },
  features: [{ icon: Zap, title: 'Instant reconciliation', body: '…' }], // optional, usually three
}
```

Landscape media runs full width with features in three columns underneath. **Portrait media** (ratio below 1, like an A4 report page) sits in a narrower column with the features stacked beside it.

### `gallery`: a grid of images

```ts
{
  kind: 'gallery',
  frame: 'plain', // 'phone' for app screens, 'browser' for page screenshots
  columns: 3, //     2 | 3 | 4 on desktop; phones show two
  items: [{ media: { … }, caption: 'Homepage', meta: '01' }],
}
```

`plain` galleries crop to 4:3 so rows line up. Browser and phone galleries keep each image's proportions. Used for: page templates, app screens, logo panels, brand applications, design system components, document covers.

### `before-after`: the same thing, then and now

```ts
{
  kind: 'before-after',
  frame: 'browser',
  before: { label: 'Before · 2023', media: { … }, metrics: [{ value: '4.8s', label: 'Load time' }] },
  after:  { label: 'After · 2025',  media: { … }, metrics: [{ value: '1.1s', label: 'Load time' }] },
}
```

Use the same page, crop and device on both sides. `metrics` can be `[]` (the UI/UX template uses it for wireframe vs final UI).

### `steps`: phases or a journey

```ts
{
  kind: 'steps',
  variant: 'phases', // 'phases': ruled columns with "Phase 01 · 4 weeks"; 'journey': numbered dots joined by a line
  steps: [{ title: 'Discovery', meta: '3 weeks', body: '…' }],
}
```

Four steps fit one desktop row. `meta` is the duration for phases, or a completion rate for journeys.

### `features`: three icon features

```ts
{ kind: 'features', features: [{ icon: CreditCard, title: '…', body: '…' }] }
```

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
  vitals: [{ name: 'LCP', before: '4.2s', after: '1.1s' }], // optional
}
```

### `bars`: before/after horizontal bars

```ts
{
  kind: 'bars',
  legend: ['Before', 'After'],
  rows: [{ label: 'Added to basket', before: { value: 34, display: '8.1%' }, after: { value: 46, display: '11.2%' } }],
  source: 'Source: GA4 · 90 days before vs 90 days after launch',
}
```

`value` is the **bar length from 0 to 100**. `display` is the real number shown next to it. Scale the values yourself so the largest bar is 100. `highlight: true` colours a row's label, for example the client among competitors.

### `chart`: columns over time

```ts
{
  kind: 'chart',
  kpi: { value: '71,900', label: 'Organic sessions / month', detail: '+212%' },
  legend: ['Before', 'After'], // optional
  points: [{ label: 'May', value: 23000, display: '23,000 sessions' }],
  changeAt: 4, //                index of the first "after" point
  markerLabel: 'Start', //        label above that column
  source: 'Source: Google Search Console',
}
```

Values are relative: the tallest column fills the chart, so you can paste raw numbers. `display` is what screen readers hear for each column (the chart has a hidden data list). Points before `changeAt` are drawn muted.

### `table`: rankings, scorecards, logs

```ts
{
  kind: 'table',
  columns: [
    { key: 'keyword', label: 'Keyword', width: 'fill', emphasis: 'strong' },
    { key: 'after', label: 'After', width: 'sm' },
  ],
  rows: [
    { keyword: 'freight forwarding uk', after: { tag: '#2' } },
    { keyword: '…', after: { tag: 'High risk', tone: 'risk' } },
    { keyword: '…', after: { rating: 4 } }, // four of five dots
  ],
  source: 'Source: Ahrefs · UK · Apr 2026',
}
```

A cell is a string, a tag `{ tag, tone?: 'flux' | 'risk' }`, or a rating `{ rating: 0–5 }`. Column `width` is `sm`, `md` (default) or `fill`, and `emphasis` is `strong` or `muted`. On phones each row becomes a card with label/value lines.

### `checklist`: ticked items

```ts
{ kind: 'checklist', columns: 2, items: [{ title: 'Daily off-site backups', body: '…', tag: 'High impact' }] }
```

### `roadmap`: Now / Next / Later

```ts
{ kind: 'roadmap', horizons: [{ name: 'Now', when: '0–3 months', items: [{ title: 'Retire legacy CRM', meta: 'Ops · −£40k/yr' }] }] }
```

The first horizon is highlighted.

### `flow`: a task before and after

```ts
{ kind: 'flow', before: { label: 'Before · 5 steps', steps: ['…'] }, after: { label: 'After · 3 steps', steps: ['…'] } }
```

### `clusters`: SEO topic clusters

```ts
{ kind: 'clusters', clusters: [{ pillar: 'Freight forwarding', rank: '#1', visits: '8,200', articles: [{ title: '…', rank: '#3', visits: '1,100' }] }] }
```

### `palette`: brand colours

```ts
{ kind: 'palette', colours: [{ name: 'Harbour', hex: '#0E3B43', rgb: '14 59 67', cmyk: '79 12 0 74' }] }
```

Text colour on each swatch is picked from the hex for contrast. Pale swatches get a hairline border. While `hex` is still a placeholder, swatches show a grey ramp.

### `typography`: type specimens

```ts
{ kind: 'typography', specimens: [{ role: 'Display', typeface: 'GT Sectra', sample: 'Built to outlast.', style: 'serif' }] }
```

`style` chooses which site font renders the sample (`serif` or `sans`). The page can't load the client's own fonts, so for exact specimens use a `gallery` image instead.

---

## Step by step: from template to published page

1. **Pick the template** that matches the main service. Not sure? Open http://localhost:5173/work/templates and compare.

2. **Create the file.**

   ```bash
   pnpm new:case-study website-design-development kinetic-labs
   ```

   The slug becomes the URL (`/work/kinetic-labs`), so keep it short, lowercase and hyphenated, usually the client name. If a card for the project already exists in `src/content/work.ts`, use the **same slug** (see [Linking from the Work page](#linking-from-the-work-page)).

3. **Open the draft in the browser** with `pnpm dev` at `/work/<slug>`. Expand the yellow banner to see every placeholder and its path. Keep it open while you work; the page hot-reloads.

4. **Fill the facts first:** `client`, `industry`, `year`, `hero.facts` and `results.stats`. Numbers must come from the client or your analytics, with a baseline and timeframe. Get written approval for every figure and the quote.

5. **Write the story:** hero title and intro, then challenge and approach, then SEO title and description last, once you know the angle. See [Writing guidelines](#writing-guidelines).

6. **Shape the middle.** Fill each section's data, delete sections you can't back up with real material, and add any you need from the [Section reference](#section-reference). Keep ink sections apart.

7. **Add the images.** See [Images](#images). Replace each `image: null` with the image name. The slot's `brief` stays in the file as a note; it isn't shown once an image exists.

8. **Check it** at 1440 and 390 wide. With the dev server running:

   ```bash
   pnpm shots work/kinetic-labs     # writes .screenshots/work-kinetic-labs-desktop.png and -mobile.png
   ```

9. **Publish.** When the banner shows zero placeholders, set `status: 'published'`, then:

   ```bash
   pnpm check && pnpm build
   ```

   The build prerenders `/work/<slug>` and adds it to the sitemap. Commit with `feat(work): kinetic labs case study`.

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
- **Confidentiality:** agree with the client what can be named. Blur anything sensitive in screenshots. Consultancy and maintenance work often needs an anonymised client ("A UK logistics group").
- **Placeholder convention:** anything in `[square brackets]` is unfinished. Don't use square brackets in real copy.

---

## Images

### Frames

| Frame     | Use for                         | Behaviour                                                                                                         |
| --------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `browser` | Website and web app screenshots | Browser chrome and shadow. **On phones it shows the same desktop screenshot scaled down**, never a mobile layout. |
| `phone`   | Native app screens (1170×2532)  | Device outline.                                                                                                   |
| `plain`   | Photography, artwork, documents | No frame. The hero uses a fixed crop; galleries crop to 4:3.                                                      |

### Adding an image

1. Export at the size given in the slot's `brief`. Screenshots: 2560 wide at desktop size. App screens: 1170×2532. Hero and photography: 2880×1520.
2. Add it to `IMAGES` in `scripts/import-images.mjs`, named `work/<slug>-<what>`:

   ```js
   'work/kinetic-labs-home': { src: 'kinetic-home.png', widths: [640, 1280, 2560] },
   ```

   `src` is a file in the design's images folder (`Documents/pencil designs/images`, or set `DESIGN_IMAGES=<dir>`) or a URL. Full-width screenshots should use `[640, 1280, 2560]` so they stay sharp on retina screens; the default `[640, 1024, 1408]` suits smaller images.

3. Run `pnpm assets:images`. It writes AVIF and WebP files to `public/images/` and updates `src/content/images.generated.ts`.
4. Set `image: 'work/kinetic-labs-home'`. The name autocompletes, and a typo is a type error.
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
| Links from Work cards               | dev only                       | ✔                     |
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

---

## Linking from the Work page

The Work page and the Home "Selected work" section read their cards from `src/content/work.ts`, which is separate from the case study pages. That keeps the grid working before any full case study exists.

- A card whose `slug` matches a visible case study links to `/work/<slug>`.
- Without one, cards on the Work page are not links, and Home "Selected work" cards point to the project's anchor on `/work` (`/work#<slug>`). Both switch to the full page once the study is published.
- For a new project, add a card to `caseStudies` in `work.ts` (client, services, disciplines, headline metric and a cover image) with the same slug as the study file.

---

## Changing a template or adding a section type

**Improving a template:** edit `templates/<service>.ts` and check it at `/work/templates/<service>`. Existing studies aren't affected, because they're copies. Keep the design in sync: update the matching Pencil frame and re-export to `brand-assets/08-website-mockups/case-study-templates/`.

**A new section kind:**

1. Add the type to `schema.ts` and to the `CaseStudySection` union.
2. Write the component in `src/components/case-study/sections/`. It receives `{ section, dark }`; use `tone(dark)` from `tone.ts` for colours so it works on both paper and ink.
3. Register it in the `renderers` map in `CaseSection.tsx`. The map is typed to cover every kind, so TypeScript reports a missing one.
4. Use it in a template and check it at 1440 and 390, on both tones.

**A new service:** add it to `src/content/services.ts`, add the slug to `ServiceSlug`, then create `templates/<slug>.ts` with `service: '<slug>'`. The file name must equal the service, or the registry throws.

---

## Troubleshooting

| Symptom                                                    | Fix                                                                                                                                                                |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/work/<slug>` is a 404 in dev                             | The file must be in `studies/` with a default export, and `slug` must match the URL. Restart `pnpm dev` after creating a file if the glob didn't pick it up.       |
| `… has slug "…"; the file name and slug must match`        | Rename the file or fix `slug`. The file name is the URL.                                                                                                           |
| `… declares service "…"; rename the file or fix the field` | A template's file name and `service` field disagree.                                                                                                               |
| `Type '"work/…"' is not assignable to type ImageName`      | Run `pnpm assets:images` after adding the image to `scripts/import-images.mjs`.                                                                                    |
| Build fails with a placeholder list                        | Fill the listed paths, or set `status: 'draft'` to ship without the page.                                                                                          |
| Page published but missing from production                 | Check `status: 'published'`. Drafts are removed from production builds.                                                                                            |
| Chart or bars look flat                                    | `bars` values are 0–100 bar lengths, so rescale them. `chart` scales to its tallest point, and near-identical values (like uptime) will look level; that's honest. |
