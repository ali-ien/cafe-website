/* eslint-disable @typescript-eslint/no-require-imports -- Node's built-in CommonJS test runner. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Test the TypeScript modules without adding another test runner dependency.
function load(relative, mocks = {}) {
  const filename = path.join(__dirname, '..', relative);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020},
  }).outputText;
  const result = {exports: {}};
  new Function('require', 'module', 'exports', code)(name => mocks[name] || require(name), result, result.exports);
  return result.exports;
}
const {resolveHero, safeHref} = load('lib/hero-content.ts');
const {mediaAssets} = load('lib/media.ts');
const defaults = mediaAssets.hero.slides;
const t = value => `translated:${value}`;

test('empty CMS keeps every original image and uses existing translations', () => {
  for (const language of ['en', 'es', 'ar']) {
    const hero = resolveHero(null, language, t, defaults);
    assert.equal(hero.firstLine, t('Where'));
    assert.equal(hero.slides.length, defaults.length);
    assert.equal(hero.slides[0].src, defaults[0].src);
    assert.equal(hero.secondaryButton.href, '#story');
  }
});
test('CMS title, description, image captions and button text switch languages', () => {
  const translations = {en: 'English', es: 'Espa\u00f1ol', ar: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629'};
  const document = {
    heroTitle: {firstLine: translations, highlight: translations, secondLine: translations},
    heroDescription: translations,
    heroSlides: [{_key: 'one', src: 'https://cdn.sanity.io/images/z12n5wz6/production/example.jpg', alt: translations, chapter: translations}],
    primaryButton: {label: translations, href: '/menu', newTab: false},
    secondaryButton: {label: translations, href: 'https://example.com/visit', newTab: true},
  };
  for (const language of ['en', 'es', 'ar']) {
    const hero = resolveHero(document, language, t, defaults);
    for (const key of ['firstLine', 'highlight', 'secondLine', 'description']) assert.equal(hero[key], translations[language]);
    assert.equal(hero.slides[0].alt, translations[language]);
    assert.equal(hero.slides[0].chapter, translations[language]);
    assert.equal(hero.primaryButton.label, translations[language]);
    assert.equal(hero.secondaryButton.href, 'https://example.com/visit');
    assert.equal(hero.secondaryButton.newTab, true);
  }
});
test('missing Spanish and Arabic CMS fields preserve translated fallbacks', () => {
  const document = {heroTitle: {firstLine: {en: 'Custom'}}, heroDescription: {en: 'Custom'}, description: 'Legacy'};
  for (const language of ['es', 'ar']) {
    const hero = resolveHero(document, language, t, defaults);
    assert.equal(hero.firstLine, t('Where'));
    assert.equal(hero.description, t('Artisan pastries, specialty coffee, and moments worth savoring.'));
  }
});
test('old published Alarak/coffee web-site values cannot override the original Hero', () => {
  const oldDocument = {title: 'Alarak', description: 'coffee web-site'};
  const hero = resolveHero(oldDocument, 'en', value => value, defaults);
  assert.equal(`${hero.firstLine} ${hero.highlight} ${hero.secondLine}`, 'Where Elegance Meets Flavor');
  assert.equal(hero.description, 'Artisan pastries, specialty coffee, and moments worth savoring.');
  assert.deepEqual(hero.slides, defaults);
  for (const language of ['es', 'ar']) {
    assert.deepEqual(resolveHero(oldDocument, language, t, defaults), resolveHero(null, language, t, defaults));
  }
});
test('future multilingual Hero edits still work alongside ignored legacy values', () => {
  const hero = resolveHero({title: 'Alarak', description: 'coffee web-site',
    heroTitle: {firstLine: {en: 'Fresh'}, highlight: {en: 'Coffee'}, secondLine: {en: 'Daily'}},
    heroDescription: {en: 'An intentional new description.'},
  }, 'en', value => value, defaults);
  assert.equal(`${hero.firstLine} ${hero.highlight} ${hero.secondLine}`, 'Fresh Coffee Daily');
  assert.equal(hero.description, 'An intentional new description.');
});
test('invalid images and empty arrays fall back to the original carousel', () => {
  for (const heroSlides of [[], [null], [{src: 'javascript:alert(1)'}]]) {
    assert.equal(resolveHero({heroSlides}, 'en', t, defaults).slides.length, defaults.length);
  }
});
test('destinations accept local paths, sections and HTTPS and reject invalid URLs', () => {
  for (const href of ['/menu', '/media/menu.pdf?download=1', '#story', 'https://example.com/visit']) assert.equal(safeHref(href, '#fallback'), href);
  for (const href of ['javascript:alert(1)', '//example.com', '/\\example.com', '/%5cexample.com', 'http://example.com', 'https://user:password@example.com', '/a\nb']) assert.equal(safeHref(href, '#fallback'), '#fallback');
});
test('carousel indices remain valid when the CMS returns fewer slides', () => {
  const hero = resolveHero({heroSlides: [{src: 'https://cdn.sanity.io/images/z12n5wz6/production/example.jpg'}]}, 'en', t, defaults);
  assert.ok(hero.slides[3 % hero.slides.length]);
});

function sanity(fetch = async () => null, captureConfig = () => {}) {
  return load('lib/sanity.ts', {
    '@sanity/client': {createClient: config => {captureConfig(config); return {fetch};}},
    '@sanity/image-url': require('@sanity/image-url'),
  });
}
test('public client cannot use a private token or browser credentials', () => {
  const previous = process.env.SANITY_API_READ_TOKEN;
  process.env.SANITY_API_READ_TOKEN = 'PRIVATE_TOKEN_TEST_VALUE';
  try {
    sanity(undefined, config => {
      assert.equal(Object.hasOwn(config, 'token'), false);
      assert.equal(config.withCredentials, false);
      assert.equal(config.perspective, 'published');
      assert.equal(config.useCdn, false);
    });
  } finally {
    if (previous === undefined) delete process.env.SANITY_API_READ_TOKEN;
    else process.env.SANITY_API_READ_TOKEN = previous;
  }
});
test('browser fetch uses the published query, bypasses cache, and supports cancellation', async () => {
  const signal = new AbortController().signal;
  let integration;
  integration = sanity(async (query, params, options) => {
    assert.equal(query, integration.homePageQuery);
    assert.deepEqual(params, {});
    assert.equal(options.signal, signal);
    assert.equal(options.cache, 'no-store');
    return null;
  });
  assert.equal(await integration.fetchHero(signal), null);
});
test('browser mapping excludes legacy copy and keeps multilingual editing fields', () => {
  const heroTitle = {firstLine: {en: 'New title'}};
  const heroDescription = {en: 'New description'};
  const hero = sanity().normalizeHero({title: 'Alarak', description: 'coffee web-site', heroTitle, heroDescription});
  assert.equal(Object.hasOwn(hero, 'title'), false);
  assert.equal(Object.hasOwn(hero, 'description'), false);
  assert.deepEqual(hero.heroTitle, heroTitle);
  assert.deepEqual(hero.heroDescription, heroDescription);
});
test('browser mapping generates a real Sanity image URL with crop/hotspot data', () => {
  const hero = sanity().normalizeHero({_id: 'homePage', heroSlides: [{
    _key: 'one', image: {asset: {_ref: 'image-0123456789abcdef0123456789abcdef01234567-1200x800-jpg'}, hotspot: {x: .8, y: .4, width: .2, height: .2}},
  }]});
  assert.match(hero.heroSlides[0].src, /^https:\/\/cdn.sanity.io\/images\/z12n5wz6\/production\//);
  assert.equal(hero.heroSlides[0].desktopPosition, '80% 40%');
  assert.equal(hero.heroSlides[0].mobilePosition, '80% 40%');
  assert.equal(hero.heroSlides[0].image, undefined);
});
test('browser mapping skips broken/null assets and supports legacy heroImage', () => {
  const integration = sanity();
  assert.equal(integration.normalizeHero({heroImage: {asset: {_ref: 'image-0123456789abcdef0123456789abcdef01234567-1200x800-jpg'}}}).heroSlides.length, 1);
  assert.equal(integration.normalizeHero({heroSlides: [null, {}, {image: {asset: {_ref: 'broken'}}}]}).heroSlides.length, 0);
});
test('network/CORS failures reject so the Hero can keep its last good content or fallback', async () => {
  await assert.rejects(sanity(async () => {throw Error('Network unavailable');}).fetchHero(), /Network unavailable/);
});
test('published changes are read without rebuilding the website', async () => {
  let published = {heroDescription: {en: 'Before publishing'}};
  const integration = sanity(async () => published);
  assert.equal((await integration.fetchHero()).heroDescription.en, 'Before publishing');
  published = {heroDescription: {en: 'After publishing'}};
  assert.equal((await integration.fetchHero()).heroDescription.en, 'After publishing');
});
test('Hero refreshes in the browser without a local Hero API dependency', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'components/Hero.tsx'), 'utf8');
  assert.equal(source.includes('/api/hero'), false);
  assert.ok(source.includes('fetchHero(request.signal)'));
});
