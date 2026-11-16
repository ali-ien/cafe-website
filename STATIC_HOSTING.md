# Alarak browser CMS and hosting checks

## What was inspected

The current local configuration uses the normal Next.js server build (`npm run build` /
`npm start`). It did not set `output: "export"`, used Next's server image optimizer,
and the Hero depended on a dynamic `/api/hero` route. The contact form also uses a server
POST route. No deployment workflow, Hostinger upload script, or hosting-specific config was
found in the local repository. The remote GitHub connector and live domain could not be
read in this session, so Hostinger's actual build/output settings remain unverified.

The normal build/start commands are preserved. The Hero now reads the public published
Sanity dataset directly from the browser in both normal and static hosting modes.

## Sanity setup before pushing

In https://www.sanity.io/manage/project/z12n5wz6, confirm the `production` dataset is public.
Under API > CORS Origins allow these exact origins, with **Allow credentials OFF**:

- `https://alarak.ma`
- `https://www.alarak.ma` if visitors can use that hostname
- `http://localhost:3000` for development
- `http://localhost:4173` for the static smoke test

Run `npm run check:sanity` from this project. It must confirm anonymous access and the
relevant origin checks. No private token is used by the browser or this checker.
Do not change an existing private dataset's visibility without checking that its contents
are intended to be public; this browser integration requires a public dataset.

After the code is deployed once, publishing Hero changes requires no Git push, rebuild,
webhook, or Hostinger dashboard access. The page reads current published content on load,
every 60 seconds while visible, and when the tab regains focus. Empty fields use the original
translated content; legacy `title`/`description` values remain ignored. Draft edits require Publish.

## Existing server deployment

```powershell
npm ci
npm run test:hero
npm run check:sanity
npm run build
npm start
```

The existing `/api/contact` email flow is unchanged in this mode. Sanity does not depend
on any local API route. Existing Hostinger deployments that run `npm run build` can keep
their command: no forced switch to a different deployment output was made.

## Static hosting

```powershell
npm run build:static
npm run verify:static
python -m http.server 4173 --directory out
```

Open http://localhost:4173 and test the direct `/menu/`, `/gallery/`, `/our-story/`, and `/visit/`
URLs, the three languages, carousel, menu PDF, and a new published Hero edit.
The static deployable is the contents of `out`, including `_next` and media folders.
This target sets `output: "export"`, directory-style URLs, and unoptimized Next images,
so the exported pages need no Next.js server or image-optimization endpoint.
Sanity image URLs are resized through Sanity's own image service.

The static build cannot send contact messages through `/api/contact`. Its existing form
opens a draft in the visitor's email app and does not claim that delivery succeeded.
This change applies only to the explicit static build; layout/classes/translations are retained.

Do not change an unknown Hostinger pipeline to upload a different folder blindly. If it is
already a static pipeline, its build command must produce and upload `out`. That setting
cannot be confirmed here without the workflow or Hostinger configuration.

## Readiness and test limits

| Local check | Result |
| --- | --- |
| Hero/browser CMS regression tests | 16 passed |
| TypeScript and ESLint on changed code | Passed |
| Normal Next.js production build | Passed with temporary font substitutes |
| Static production build | Passed with temporary font substitutes |
| Exported artifact inspection | Six HTML pages and 32 browser JS chunks passed |
| Private-token check | No private Sanity variable or build-secret marker in browser chunks |
| Plain static HTTP server | Five public pages, a local image and the menu PDF returned HTTP 200 |
| API independence | Static pages served without a Hero API, contact API, or Next image optimizer |
| Anonymous live Sanity/CORS | Blocked by the environment's outbound network restrictions |

No package dependency changes were required for browser fetching; the existing locked Sanity
client/image URL packages are reused. The new build and verification commands are in package.json.

The implementation includes automated public-client, translation/fallback, image-mapping,
and no-rebuild content-refresh tests. `verify:static` checks the exported pages, fallback
content, image paths, browser query, and absence of private Sanity configuration/test secrets
in the browser chunks. It does not substitute for a live CORS/browser test.

The local static production build passed with temporary Google Font substitutes because
the environment blocks those existing HTTPS downloads. The substitutes are outside the
repository and are not included in the source changes. Run a normal online build before
production to verify the actual fonts. Anonymous live Sanity and CORS verification is blocked
by the same environment's network restrictions and must be completed with `npm run check:sanity`.

The changes are ready for review. An unconditional production push is not cleared until
the live Sanity checks and the existing hosting build/output path are confirmed. No commit,
push, hosting change, deployment, or Sanity content publication was performed.
