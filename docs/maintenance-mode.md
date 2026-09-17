# Maintenance mode

A holding page for planned downtime: every URL shows "Back in a moment" while the site is being worked on.

## Turn it on and off

```bash
pnpm cf:maintenance   # build, then deploy with the maintenance worker in front of the site
pnpm cf:deploy        # build, then deploy the normal site (maintenance off)
```

Preview it locally before deploying:

```bash
pnpm build
pnpm exec wrangler dev --config wrangler.maintenance.jsonc
```

Without Cloudflare, the page itself is at **/maintenance** (in `pnpm dev` too). It's marked noindex and left out of the sitemap.

## How it works

| File                         | Role                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| `src/pages/Maintenance.tsx`  | The page. Change `STATUS` for longer work, e.g. "Back at 14:00 UTC".                                   |
| `wrangler.maintenance.jsonc` | Same Cloudflare worker as `wrangler.jsonc`, plus a script that runs before the static files.           |
| `worker/maintenance.mjs`     | Answers page requests with the prerendered `/maintenance` HTML, a **503** and `Retry-After: 3600`.     |
| `src/main.tsx`               | Sees `data-screen="maintenance"` in the HTML and hydrates that screen, whatever URL the visitor is on. |

- **Why 503.** A 503 with `Retry-After` tells search engines the outage is temporary, so pages keep their rankings. Serving the holding page with a 200 would risk it being indexed in place of real pages. Keep downtime short: after a day or two of 503s, Google starts dropping pages.
- **What still loads.** Scripts, styles and fonts (`/assets/`), images, share images, legal PDFs and root files such as the favicon, `robots.txt` and `sitemap.xml` pass straight through.
- **No cookie banner.** `App.tsx` doesn't mount cookie consent on the maintenance screen, since nothing there needs consent.

## Design

`page-maintenance-light` in the Pencil file (1440×900; dark variant `page-maintenance-dark`). It shares its layout with the 404 page through `src/components/layout/StandaloneScreen.tsx`, so a change to one changes both.
