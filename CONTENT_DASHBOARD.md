# Alarak content dashboard

Project `z12n5wz6`, public dataset `production`. English, Spanish and Arabic.

## Current status

The website code has been updated in `C:\Users\pc\Desktop\new-project`.
The complete Studio source was built and tested in a separate local copy. This session's
filesystem policy does not allow writing to `C:\Users\pc\Desktop\studio-alarak`, so the original
Studio still needs the supplied update applied. Nothing was pushed, deployed, deleted or published.

| Editor | Content available | Local validation | Still required |
| --- | --- | --- | --- |
| Home Page | Hero, buttons/slides, story copy/photos, signature cards, visit teaser | Passed | Apply Studio update; browser Publish test |
| Menu | Headings, images, categories, products, descriptions, prices, coffee varieties, PDF link | Passed, including add/remove/reorder | Browser/mobile review with client content |
| Our Story | Copy, images, diploma/certificate entries | Passed | Browser/mobile review |
| Gallery | Headings, filters, photos, captions, lightbox copy | Passed, including add/remove/reorder/empty | Browser filter/lightbox interaction review |
| Visit Us | Copy, images, directions and shared contacts/map | Passed | Browser map/contact-link review |
| Navbar | Logo, translated labels, ordered destinations | Passed | Mobile drawer and navigation review |
| Footer | Copy, ordered links, socials, message-form labels | Passed | Real email delivery test |
| Site Settings & Contact | Phone, email, address, hours, Instagram, WhatsApp, directions, map, menu PDF, logo | Passed | Confirm live CORS and contact details |

Automated fallback rendering checks compare original markup/classes/styles in all three languages.
Animation settings are also compared with the original source. These checks do not replace a real
browser visual review at desktop/mobile widths.

## Apply the Studio update using VS Code

1. Extract `Alarak_Full_CMS_Studio_Update.zip` to a normal folder.
2. Open that extracted folder in VS Code, then **Terminal > New Terminal** (PowerShell).
3. Review `Apply-StudioUpdate.ps1` and `studio-files`. Run:

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File .\Apply-StudioUpdate.ps1
   ```

   The script targets `C:\Users\pc\Desktop\studio-alarak`, validates original/source hashes,
   and creates a timestamped backup before copying. Unexpected changes stop the entire operation
   before any file is copied. It does not install packages, change CMS documents, push or deploy.
   If it stops, compare the reported file in VS Code and merge it manually rather than forcing it.
4. Open the original `studio-alarak` folder in VS Code. With its existing dependencies installed:

   ```powershell
   npx tsc --noEmit
   node scripts/verify-full-content.cjs
   npm run build
   npm run dev
   ```

   Use `npm ci` first only if dependencies are missing. No new dependencies or lockfile changes
   are required for this dashboard. Node 22.12+ is required by the website dependencies.
5. Open `http://localhost:3333`. The sidebar now contains eight clearly named sections.

## First editing session

**Home Page:** the editor resolves the existing published document
`4ab74fac-c6b5-4443-9e7f-2e83e9c0146e` in the current dataset. It does not assume that the
navigation key `homePage` is the document ID or create a replacement blank draft. The resolver
also supports a future published canonical singleton without changing the website query rules.

For this existing document, use **Load existing website content** from the document actions
menu once. It fills only absent top-level fields into a draft, using the original website copy,
translations, images and lists. Existing fields and intentional empty arrays are preserved.
It never publishes automatically. Review the draft before clicking **Publish**.

Other new editors preload the current website defaults when their first document is created.
If a document already exists, the same action can fill its missing fields. No migration or
bulk dataset mutation runs when the Studio starts.

Use **Text & translations** for the existing text placements; expand English, Spanish and Arabic.
Use **Images** to replace fixed images and set translated descriptions. **Buttons & link
destinations** edits the existing destinations. Those placement lists are fixed so an editor
does not accidentally create entries with no visible destination on the website.

Use the dedicated **Hero title**, **Hero description**, buttons and slides fields for the Hero.
Old read-only `title`/`description` values such as `Alarak` and `coffee web-site` remain ignored.
The original English fallback remains “Where Elegance Meets Flavor” and
“Artisan pastries, specialty coffee, and moments worth savoring.”

## Products, photos and shared details

- **Menu:** expand a category, then its Products list. Add/remove entries or drag them to reorder.
  Prices are translated strings, for example `35 MAD`. New categories get their reference automatically;
  add their image and English title before publishing. Products may have an optional description/image.
- **Gallery:** add an image and English title, choose its filter category, then set translated captions
  and craft story. Drag photos to reorder. Removal takes effect after Publish.
- **Home / Our Story:** dedicated lists edit signature cards, home story photos and credentials.
  Existing shared desktop/mobile images follow their original image reference when replaced.
- **Navbar / Footer:** edit and reorder their dedicated navigation lists. Use local paths, anchors,
  HTTPS, phone or email destinations as appropriate.
- **Site Settings & Contact:** edit shared phone/email/address/hours, logo, social destinations,
  WhatsApp, directions, Google Maps embed and menu PDF. A replacement PDF upload takes priority over
  the alternative PDF URL. Phone display text and dialable international number are separate fields.

For ordered collections, an absent field uses the original list. A deliberately empty list means
show no entries; deleted items are not reinserted. Empty individual text/translation fields retain
original wording. New items without Spanish/Arabic use their own English text. Hero empty slides
keep the existing four-slide fallback, preserving the earlier integration behavior.

## Website behavior and hosting

All content reads use anonymous public Sanity queries with the published perspective, no token,
no browser credentials and no query CDN cache. Drafts are excluded. Content refreshes on page load,
focus/visibility changes and every 60 seconds while visible. An outage keeps the last good content
or the original fallback. Publishing content requires no website rebuild after this code is deployed once.

The existing normal `npm run build` / `npm start` deployment remains supported. Static hosting
uses the explicit `npm run build:static` target and uploads `out`. No automatic switch of build mode
was made. The repository does not establish Hostinger's actual dashboard build/output settings.

Confirm anonymous dataset access and CORS for `https://alarak.ma`, `https://www.alarak.ma`,
`http://localhost:3000` and local static testing at `http://localhost:4173`, with credentials OFF.
The latest live recheck in this session failed with environment connection/TLS errors; no new
section documents were published as part of testing.

Browser title/description fields update after hydration. Search metadata in exported HTML retains
the original static values until a rebuild. Site structure, animations and breakpoints remain code-managed.

## Contact form

On normal Next.js hosting, `/api/contact` continues sending through the existing Resend server
integration. It reads the published Site Settings email as recipient and falls back to
`bakeryservice@alarak.com` when settings are missing, invalid or unavailable. The visitor cannot
choose a recipient. Existing server-only `RESEND_API_KEY` and `RESEND_FROM_EMAIL` remain necessary.
No API key is read by or bundled into the browser CMS client.

On static hosting, the existing static form behavior opens a draft in the visitor's email app;
it cannot send via a Next.js API route and does not claim successful delivery. A working email
app is needed. Reliable server delivery would require a separately hosted email service integration.
Local contact tests use a mocked transport; no real email has been sent in this task.

## Checks and release handoff

From `new-project`:

```powershell
npm run test:cms
npx tsc --noEmit
npm run build
npm run build:static
npm run verify:static
npm run check:sanity
```

The website suite has 37 passing tests. The Studio suite has 24 passing checks and compiles the
actual registered schemas. Both production targets and a plain static HTTP smoke test are part
of the local checks. See `STATIC_HOSTING.md` for the latest results and limitations.

Before handing the dashboard to the client: apply the Studio files, start it locally, review
EN/ES/AR at desktop/mobile widths, confirm CORS, test draft vs Publish using an approved content
edit, and send one real contact-form message to confirm delivery. A one-time website update and
Studio deployment still need to be performed manually by an authorized person. Nothing here
pushes, deploys, publishes content or changes hosting settings automatically.
