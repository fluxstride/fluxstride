# Services and careers

Both sets of pages are **plain data**: one file of content, one component that renders every page from it. You never edit a component to change a price, add a role or close a vacancy.

| Page                     | Content                   | Component                |
| ------------------------ | ------------------------- | ------------------------ |
| `/services`              | `src/content/services.ts` | `src/pages/Services.tsx` |
| `/services/<slug>`       | `src/content/services.ts` | `src/pages/Service.tsx`  |
| `/careers`               | `src/content/careers.ts`  | `src/pages/Careers.tsx`  |
| `/careers/<slug>`        | `src/content/careers.ts`  | `src/pages/Role.tsx`     |
| Studio "Careers" section | `src/content/careers.ts`  | `CareersSection.tsx`     |

Routes, the sitemap and the prerender list come from `src/lib/seo.ts`, which builds one entry per service and per role from the same two files. Add a service or a role and its page exists everywhere; there is nothing else to register.

Designs: `brand-assets/08-website-mockups/service-*.png` and `careers-*.png` (desktop 1440, mobile 390), from the Pencil frames of the same name.

---

## Service pages

### Editing one

Everything on `/services/web-design-frontend` is one entry in `services`:

| Field                                                              | Where it shows                                              |
| ------------------------------------------------------------------ | ----------------------------------------------------------- |
| `headline`                                                         | The h1, split where the design switches to the serif        |
| `description`                                                      | The intro, the Services page pitch and the meta description |
| `timeline`, `investment`, `team`, `handover`, `tools`, `pairsWith` | The six facts beside the intro                              |
| `included`                                                         | "What's included" (titles only on `/services`)              |
| `process`                                                          | "How it works": four phases, each with three things you get |
| `faqs`                                                             | "Good to know", and the page's FAQ structured data          |
| `group`                                                            | The eyebrow: Design, Build or Run                           |

`faqs` answers accept inline links: `'… a care plan from our [Cloud & DevOps](/services/cloud-devops) team.'`

"Selected work" needs no setting: it shows the first two case studies tagged with this service (`services` in the study file), and the section disappears when there are none.

### Adding a service

See [case-studies.md](./case-studies.md#changing-a-template-adding-a-section-type-or-a-service) for the full list. In short: add the slug to `ServiceSlug`, add the entry to `services` with every field above, add the matching need in `content/brief.ts`, and update the "six services" counts in the copy. The page, the sitemap entry, the footer link and the "Other services" lists follow automatically.

### Structured data

A service page publishes `BreadcrumbList`, `Service` (provided by the organisation declared on the home page) and `FAQPage` built from its own `faqs`, so the answers Google sees are the answers on the page.

---

## Careers

`src/content/careers.ts` holds four things:

```
careersPage   The /careers numbers, the "How we work" culture items and the hiring intro
benefits      The "What we offer" cards, on /careers and inside every role page
hiring        The four hiring steps and the note under them, same, in both places
roles         One entry per open role; each becomes /careers/<slug>
```

`sharedSections(role)` appends "What we offer" and "How we hire" to a role's own sections, so a benefit only ever has to be changed once.

Role sections use the legal pages' blocks (`paragraph`, `list`, `table`, `cards`, `note`, `actions`), documented in [legal-and-consent.md](./legal-and-consent.md). Text in them accepts inline links: `'See [our work](/work).'`

### Opening a role

1. Copy an entry in `roles`, change the `slug` (the URL), `title`, `heading`, `team`, `terms`, `summary` and the six `facts`.
2. Fill in the structured-data fields: `employment`, `location`, `salary`, `posted` and `closes`.
3. Write the sections: "The role", "What you'll do", "What you'll bring", "Nice to have".
4. Delete `sample: true` once the vacancy is real.

The role appears on `/careers`, in the Studio section, in "Other open roles" on every other role page and in the sitemap.

### Closing one

Delete the entry. Nothing else references it. If the URL was advertised, consider leaving a redirect at your host.

### `sample: true`

Sample roles are invented content from the design. They render normally but get **no JobPosting structured data**, advertising jobs that don't exist breaks Google's policy, and every build prints a warning listing them.

---

## Links between the pages

- The footer's "Careers" link and the Studio section's "View careers" both point at `/careers`.
- The Studio section keeps the same list of roles; each row links to the role's page.
- A role page's "All roles" breadcrumb returns to `/careers`; its breadcrumb parent in `seo.ts` is `/careers` too.
- The Home service cards, the footer service list and the Services page rows all link to `/services/<slug>`. The Services page keeps its anchor index at the top (`#<slug>`) for jumping within the page.

---

## Checking your work

```bash
pnpm dev
MSYS_NO_PATHCONV=1 pnpm shots /services/web-design-frontend /careers   # 1440 + 390
pnpm check && pnpm build
```

The build fails on nothing here, but it warns about sample roles and placeholder pricing. Compare the screenshots with the mockups in `brand-assets/08-website-mockups/` before shipping a layout change.
