# Legal pages and cookie consent

How the privacy policy, terms of service and cookie policy pages work, how cookie consent is stored and enforced, and what must happen before launch.

- [Before launch](#before-launch)
- [Quick reference](#quick-reference)
- [How it fits together](#how-it-fits-together)
- [Editing a legal document](#editing-a-legal-document)
- [Block reference](#block-reference)
- [Adding a legal document](#adding-a-legal-document)
- [The downloadable PDFs](#the-downloadable-pdfs)
- [Cookie consent](#cookie-consent)
- [Adding a tracker or third-party script](#adding-a-tracker-or-third-party-script)
- [Design notes](#design-notes)
- [Troubleshooting](#troubleshooting)

---

## Before launch

The wording comes from the design and **has not been reviewed by a lawyer**. Several facts are placeholders. `pnpm build` prints a warning listing what's left until `LEGAL_TODO` in `src/content/legal/index.ts` is empty.

| What                                                                                                                                            | Where                                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Lawyer review of all three documents                                                                                                            | everything under `src/content/legal/`               |
| Company number, registered address, ICO reference (`00000000`, `00 Example Street`, `ZA000000`)                                                 | `privacy.ts`, section "Who we are"                  |
| Data Protection Lead ("Hannah Cole")                                                                                                            | `privacy.ts`, `contact.note`                        |
| Provider list: it says **Vercel and AWS** hosting, but this site deploys to **Cloudflare**. Confirm the CRM, accounting and analytics tools too | `privacy.ts`, section "Who we share it with"        |
| Retention periods                                                                                                                               | `privacy.ts`, section "How long we keep it"         |
| Commercial terms: 30% deposit, 14-day payment, 8% interest, 30-day warranty, liability cap, notice periods                                      | `terms.ts`                                          |
| Cookie names, providers and expiry times: check against what the live site really sets (browser dev tools → Application → Cookies)              | `cookies.ts` table **and** `src/content/consent.ts` |

When an item is done, delete its line from `LEGAL_TODO`. After changing any wording, bump the document's `updated` date and `version`, and [regenerate the PDFs](#the-downloadable-pdfs).

---

## Quick reference

```bash
pnpm dev                 # http://localhost:5173/privacy, /terms, /cookies
pnpm legal:pdfs          # rebuild public/legal/*.pdf (dev server must be running)
pnpm build               # warns while LEGAL_TODO is not empty
```

```ts
import { openCookieSettings, useConsent, onConsent } from '@/lib/consent'

openCookieSettings() // open the Cookie settings dialog from anywhere
const { status, choices } = useConsent() // status: 'pending' | 'undecided' | 'decided'
onConsent('analytics', () => loadSomething()) // run once the visitor allows a category
```

---

## How it fits together

```
src/content/legal/
├── schema.ts      Types for a document, its sections and blocks. Hover for docs.
├── privacy.ts     The privacy policy
├── terms.ts       The terms of service
├── cookies.ts     The cookie policy
└── index.ts       Registry (tab order), sectionId(), formatLegalDate(), LEGAL_TODO

src/content/consent.ts        Cookie categories: shared by the banner, the settings dialog and /cookies

src/components/legal/
├── LegalHeader.tsx   Page header and the Privacy / Terms / Cookies tabs (Download PDF, Print)
├── LegalToc.tsx      "On this page": sticky sidebar with scrollspy (desktop), disclosure (mobile)
├── LegalParts.tsx    Summary box, numbered section, contact card, related policies
├── LegalBlocks.tsx   Every block type (paragraph, table, cards…)
├── RichText.tsx      Inline [label](href) links in text
└── actions.ts        What the non-link buttons do (open settings, reject optional)

src/pages/Legal.tsx           The page layout, one component for all three documents

src/lib/consent.ts            Consent store: cookie, hooks, actions, callbacks
src/lib/trackers.ts           Third-party scripts gated on consent (env-driven)
src/components/consent/       CookieConsent (mounted in App.tsx), CookieBanner, CookieSettings, Toggle

scripts/legal-pdfs.mjs        Generates public/legal/fluxstride-<slug>.pdf
```

Routes are created from `legalDocuments` in `App.tsx`. The SEO title and description for each page live in `legalSeo` in `src/lib/seo.ts`. That means each page is prerendered, listed in the sitemap and gets breadcrumbs automatically.

Other places that link here:

- **Footer:** Privacy · Terms · Cookies · Cookie settings. On mobile, Cookie settings sits on the copyright row.
- **Brief form:** "See our privacy policy."
- **Cookie banner:** the "Cookie policy" link.

---

## Editing a legal document

A document is plain data. The page layout, section numbers, table of contents, anchors and mobile layout all follow from it.

```ts
export default defineLegalDocument({
  slug: 'privacy', // URL: /privacy. Must match a LegalSlug in schema.ts
  name: 'Privacy policy', // tab label and related-card title
  title: ['Privacy', 'policy.'], // the h1; the second part is set in the serif italic
  intro: '…', // header paragraph
  blurb: '…', // one line on the other pages' "Related policies" cards
  updated: '2026-09-16', // ISO dates, shown as "16 Sep 2026"
  effective: '2026-09-16',
  version: '3.2',
  summary: ['…', '…', '…', '…'], // "The short version": four one-liners work best
  contact: {
    // sidebar card (end of the page on mobile)
    label: 'Data protection',
    title: 'Questions about your data?',
    link: { label: 'privacy@fluxstride.com', href: 'mailto:privacy@fluxstride.com' },
    // or: link: { label: 'Open cookie settings →', action: 'open-cookie-settings' },
    note: 'We reply within 5 working days.',
  },
  sections: [
    {
      title: 'Who we are', // numbered 01, 02… by position
      // id: 'who-we-are',               // optional; defaults to the title in kebab case ("&" → "and")
      // tocLabel: 'Who we are',         // optional shorter label for the table of contents
      blocks: [{ type: 'paragraph', text: '…' }],
    },
  ],
})
```

**Anchors.** Each section gets an anchor such as `/privacy#who-we-are` or `/terms#fees-and-payment`. If other pages or emails link to a section, set `id` explicitly so that renaming the title doesn't break those links.

**Links in text.** Paragraphs, notes, list items, table cells and `contact.note` accept Markdown-style links: `[ico.org.uk](https://ico.org.uk)`, `[cookie settings](/cookies)`, `[privacy@fluxstride.com](mailto:privacy@fluxstride.com)`. Internal paths navigate client-side, `https://` links open in a new tab, and `mailto:` and `tel:` links work as usual. Nothing else is parsed: no bold, no italics.

**Emails.** The studio addresses are constants in `src/content/site.ts` (`EMAIL_PRIVACY`, `EMAIL_LEGAL`, `EMAIL_ACCOUNTS`), so they only need changing in one place.

---

## Block reference

| `type`              | Fields                                                                 | Renders as                                                                                                                                                                                                                      |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `paragraph`         | `text`                                                                 | 18/16px body copy                                                                                                                                                                                                               |
| `note`              | `icon` (a lucide icon), `text`                                         | tinted callout, e.g. `Info`, `FileCheck`                                                                                                                                                                                        |
| `list`              | `items: string[]`                                                      | blue-dot bullet list                                                                                                                                                                                                            |
| `table`             | `columns: { label, width? }[]`, `rows: string[][]`, `monoFirstColumn?` | a table on desktop; one labelled card per row on mobile. `width` is the desktop width in px; columns without one share the remaining space. The first column is bold. `monoFirstColumn` sets it in the mono font (cookie names) |
| `cards`             | `items: { icon, title, body }[]`                                       | icon cards, three across on desktop (the six data rights)                                                                                                                                                                       |
| `actions`           | `items: { label, icon, href }` or `{ label, icon, action }`            | buttons; the first is filled, the rest outlined. `action` is `'open-cookie-settings'` or `'reject-optional'`                                                                                                                    |
| `stats`             | `items: { value, label }[]`                                            | large figures between hairlines, four across (two on mobile)                                                                                                                                                                    |
| `split`             | `columns: [{ title, icon, highlight?, items }, {…}]`                   | two side-by-side lists; `highlight` gives a blue border ("You own" / "We keep")                                                                                                                                                 |
| `cookie-categories` | —                                                                      | the categories from `content/consent.ts`, with **live** switches that save the visitor's choice                                                                                                                                 |

To add a block type: add it to the `LegalBlock` union in `schema.ts`, then handle it in the `switch` in `LegalBlocks.tsx`. TypeScript flags the switch until you do.

---

## Adding a legal document

For example, an accessibility statement:

1. Add the slug to `LegalSlug` in `schema.ts`.
2. Create `src/content/legal/accessibility.ts` (copy an existing document).
3. Add it to `legalDocuments` in `index.ts`. Its position sets the tab order.
4. Add its title and description to `legalSeo` in `src/lib/seo.ts`. TypeScript requires this.
5. Optionally add it to `legalLinks` in `Footer.tsx`.
6. Run `pnpm legal:pdfs`.

The route, tab, related-policy cards, prerendered page and sitemap entry all come from the registry.

---

## The downloadable PDFs

"Download PDF" links to `public/legal/fluxstride-<slug>.pdf`. These are **committed files** generated from the page's print layout, not built on deploy. After any wording change:

```bash
pnpm dev            # in another terminal
pnpm legal:pdfs     # uses the Edge or Chrome installed on this machine
```

Then commit the PDFs together with the change. A stale PDF is a stale policy. To render from a production build instead, run `pnpm build && pnpm preview`, then `BASE_URL=http://localhost:4173 pnpm legal:pdfs`.

**Print layout** (also used by the Print button):

- Hidden: the site header, tabs, table of contents, related policies, footer and cookie UI (`print:hidden`).
- Scroll-reveal animations are forced visible (`packages/design-system/styles/motion.css`).
- Cards, notes, table rows and stats don't split across pages (`break-inside-avoid`).

---

## Cookie consent

### What the visitor sees

- **First visit:** a banner (bottom-right on desktop, a bottom sheet on mobile) with Accept all, Reject all and Customise. It doesn't block the page, because nothing optional runs until a choice is made.
- **Customise**, the footer's **Cookie settings** link, or any `openCookieSettings()` call opens the settings dialog. It is a native `<dialog>`: focus is trapped, Escape closes it, and the page behind is inert. Switches start from the saved choices, or all off on a first visit, since nothing is pre-ticked.
- **On /cookies**, the category switches save immediately.

### How it's stored

The choice is saved in the `fs_consent` cookie for 12 months, as JSON `{ v, c, t }`: version, choices per optional category, and a timestamp. Only the optional categories (`analytics`, `functional`, `marketing`) are stored; strictly necessary cookies are always on.

- **Bump `CONSENT_VERSION`** in `src/lib/consent.ts` when categories or their cookies change materially. Choices saved under an older version are ignored, so everyone is asked again.
- **Withdrawing consent** deletes that category's cookies, including the `_ga_*` wildcard, on this host and its parent domain. If one of that category's scripts had already run, the page reloads, because a loaded script can't be unloaded.
- **Prerendering:** the server and first client render use `status: 'pending'`, so neither prints consent UI. The banner appears once the page has read the cookie.

### Categories

`src/content/consent.ts` is the single source for category names, the one-line summaries (dialog), the longer descriptions and cookie names (cookie policy), and which cookies to delete on withdrawal. `displayCookies` shows extra names in the policy, such as "plausible (cookieless)", that are never deleted.

The "Cookies we set" **table** in `cookies.ts` is separate. It has provider, purpose and expiry columns, which the categories lack. Keep the two in step.

---

## Adding a tracker or third-party script

Never add a `<script>` tag for anything that sets cookies or tracks visitors. Register it in `src/lib/trackers.ts`:

```ts
{
  category: 'marketing',
  enabled: Boolean(env.VITE_LINKEDIN_PARTNER_ID),
  load: () => loadScript('https://snap.licdn.com/li.lms-analytics/insight.min.js'),
},
```

Then:

1. Add the env variable to `src/vite-env.d.ts`, and set it in `.env.local` or the hosting dashboard.
2. List its cookies under the right category in `src/content/consent.ts`.
3. Add rows to the "Cookies we set" table in `src/content/legal/cookies.ts`.
4. If it's a new processor, add it to "Who we share it with" in `privacy.ts`.
5. Bump `CONSENT_VERSION`, update the cookie policy's `updated` and `version`, and run `pnpm legal:pdfs`.

Already wired up and switched off until their variables are set:

- **Plausible** (`VITE_PLAUSIBLE_DOMAIN`)
- **Google Analytics 4** (`VITE_GA_MEASUREMENT_ID`, with IP anonymisation)

Both are in the `analytics` category.

For anything else that needs consent, such as an embedded video, call `onConsent('functional', () => …)`. It runs straight away if consent was already given, or later when it is.

---

## Design notes

Implemented from the Pencil file (`fluxstride.pen`). Values were read from the nodes, not screenshots.

| Frame            | Desktop | Mobile   |
| ---------------- | ------- | -------- |
| Privacy policy   | `tYdHG` | `esExC`  |
| Terms of service | `d6bsI` | `VonYV`  |
| Cookie policy    | `GXMjH` | `PQinp`  |
| Cookie banner    | `S2aiJ` | `J1lKQn` |
| Cookie settings  | `doBkv` | `v3uKj`  |

- **Borders.** Pencil draws strokes inside a frame; CSS borders add to the box. Bordered elements therefore take 1px off their padding: a 24px-padded card is `p-5.75`, and a table row with an 18px bottom pad is `pb-4.25`.
- **Type sizes.** Sizes that change between 390 and 1440 use the `doc-*` tokens in `tokens.css`, such as `text-doc-heading` (36→26px) and `text-doc-body` (18→16px).
- **Beyond the design.** The design shows static states only. These behaviours were added:
  - scrollspy and a sticky sidebar
  - an open state for the mobile "On this page" disclosure
  - live category switches
  - Cookie settings in the footer: the policy text promises it, and withdrawing consent must be as easy as giving it
  - print styles
  - link styling in body text
- **No CTA band.** As in the design, Related policies leads straight into the footer.

---

## Troubleshooting

| Problem                                                       | Cause / fix                                                                                                           |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Build prints "the legal pages are not ready to publish"       | `LEGAL_TODO` isn't empty. See [Before launch](#before-launch)                                                         |
| TypeScript error in `seo.ts` after adding a document          | Add its entry to `legalSeo`                                                                                           |
| A section link like `/terms#fees-and-payment` stopped working | The title changed, so the anchor changed. Set `id` on the section                                                     |
| Download PDF 404s                                             | Run `pnpm legal:pdfs` and commit `public/legal/`                                                                      |
| `pnpm legal:pdfs`: "Could not reach http://localhost:5173"    | Start `pnpm dev` first, or set `BASE_URL`                                                                             |
| The banner keeps coming back                                  | The cookie was saved under an older `CONSENT_VERSION` (intended), or the browser blocks cookies for `localhost`       |
| Switches on /cookies are all off after accepting              | They reflect the saved cookie. Check that `fs_consent` exists in dev tools; in a private window it's cleared on close |
| A tracker loads without consent                               | It was added outside `lib/trackers.ts`. Move it there                                                                 |
