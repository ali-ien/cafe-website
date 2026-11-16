/* eslint-disable @typescript-eslint/no-require-imports -- Node artifact verification script. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..', 'out');
for (const page of ['index.html', '404.html', 'menu/index.html', 'gallery/index.html', 'our-story/index.html', 'visit/index.html']) {
  assert.ok(fs.existsSync(path.join(root, page)), `Missing exported page: ${page}`);
}
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(index.includes('Meets Flavor'));
assert.ok(index.includes('Artisan pastries, specialty coffee, and moments worth savoring.'));
assert.ok(!index.includes('/_next/image?'), 'Static images must not require Next.js image optimization');
function files(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? files(full) : [full];
  });
}
const chunks = files(path.join(root, '_next')).filter(file => file.endsWith('.js'));
let hasPublicSanity = false;
for (const file of chunks) {
  const source = fs.readFileSync(file, 'utf8');
  assert.ok(!source.includes('/api/hero'), `Obsolete Hero API in ${file}`);
  assert.ok(!source.includes('/api/contact'), `Server contact API in static browser chunk ${file}`);
  assert.ok(!source.includes('SANITY_API_READ_TOKEN'), `Private Sanity configuration in ${file}`);
  assert.ok(!source.includes('ALARAK_STATIC_SECRET_MUST_NOT_SHIP_2026'), `Build test secret leaked in ${file}`);
  if (source.includes('z12n5wz6') && source.includes('heroTitle')) hasPublicSanity = true;
}
assert.ok(hasPublicSanity, 'Public CMS query must be present in the browser bundle');
assert.ok(!fs.existsSync(path.join(root, 'api', 'hero')), 'Hero must not require a generated API file');
console.log(`PASS: all six exported pages, original fallback text, static images, browser CMS query and ${chunks.length} token-free JS chunks.`);
