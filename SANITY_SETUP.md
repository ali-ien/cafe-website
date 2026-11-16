# Alarak Hero editing

Project: `z12n5wz6`. Dataset: `production`. Node.js 22.12 or newer.

## Run the website

Open the project folder in VS Code, select **Terminal > New Terminal**, then run:

```powershell
npm ci
npm run test:hero
npm run check:sanity
npm run dev
```

Open http://localhost:3000. The Hero reads Sanity directly from the browser; no `/api/hero` server is needed.
The project and dataset have working defaults. To configure them explicitly, add the following to
`.env.local` in the project root, preserving any existing email configuration:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=z12n5wz6
NEXT_PUBLIC_SANITY_DATASET=production
```

This integration requires a public dataset. It never reads or bundles a Sanity token and never
sends browser credentials. Keep the dataset public; do not put a private token in client code.
Public project/dataset variables are fixed into the browser bundle during the build.
Changing the content needs no rebuild; changing those project settings does.
If changing the project/dataset, also update the allowed image pathname in `next.config.ts`.

## Edit in Studio

Open `studio-alarak` in another VS Code window. Run `npm ci`, then `npm run dev`.
Open http://localhost:3333, sign in if needed, and open **Home Page**.

- Set the three title parts: first line, gold italic highlight, and second line.
- Fill the Hero description and button labels in English, Spanish, and Arabic.
- Add/reorder Hero images. Each image supports translated descriptions/captions,
  a crop/hotspot, and optional desktop/mobile CSS focus positions.
- Set each button destination and whether it opens a new tab. Destinations accept
  local paths (`/menu`), sections (`#story`), and HTTPS URLs.
- Click **Publish**. Reload the website or wait up to 60 seconds while the tab is visible.
  Returning to the tab also refreshes content. Drafts are excluded; no Git push or rebuild is needed.

Empty translations use the website's existing text for that language. Empty image arrays use the
original four slides; legacy `heroImage` remains supported. A CMS outage preserves the original Hero.
Legacy `title`/`description` values are ignored, including older placeholder text such as
`Alarak` and `coffee web-site`. With empty multilingual fields, the website shows
"Where Elegance Meets Flavor" and "Artisan pastries, specialty coffee, and moments worth savoring."
in English and retains its existing Spanish/Arabic translations. Future text edits must use
`heroTitle` and `heroDescription`. The Studio's legacy fields remain read-only for reference.

The Studio uses one Home Page with document ID `homePage`. Until this singleton is published,
the website can read the most recently updated existing published `homePage` document.
Publishing a new singleton makes it take precedence; copy any older content you want to keep into it first.
No production documents were created, migrated, or published by this update.

## How the integration works

The animated Hero uses an anonymous `@sanity/client` directly in the browser after hydration,
with the published perspective, a fixed API date, a six-second timeout, no CDN query cache,
and credentials disabled. The original translated copy is rendered into the static HTML.
A network or CORS failure keeps the last successful CMS content, or the original fallback.
Allow `https://alarak.ma`, `https://www.alarak.ma`, `http://localhost:3000`, and the local
static test origin `http://localhost:4173` in Sanity's API > CORS Origins, with Allow credentials OFF.
The production dataset must be public. No Hostinger account access is required for these Sanity settings.
Images use `@sanity/image-url`, and Next Image permits only this project's production image path.
The carousel styles, gradients, breakpoints, transition durations, and language provider are retained.

## Verify

```powershell
npm run test:hero
npm run check:sanity
npx tsc --noEmit --incremental false
npx eslint components/Hero.tsx components/Footer.tsx lib/sanity.ts lib/hero-content.ts next.config.ts tests/hero.test.cjs scripts/check-sanity.cjs scripts/build-static.cjs scripts/verify-static.cjs
npm run build
npm run build:static
npm run verify:static
```

Google Fonts access is required by the existing layout during the normal production build.
The `check:sanity` command reports whether the actual dataset is reachable and how many published
Home Page documents exist, and checks public CORS headers for the live and local origins.
For a `401`/`403`, check public dataset visibility and CORS configuration. An empty Hero response means no
Home Page is published yet. For missing CMS images, confirm assets belong to `z12n5wz6/production`.

See `STATIC_HOSTING.md` for the separate static build target and deployment readiness limits.
