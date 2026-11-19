/* eslint-disable @typescript-eslint/no-require-imports -- Node's built-in test runner. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const root = path.resolve(__dirname, '..');
let language = 'en';
const dictionaries = {};
const languageSource = fs.readFileSync(path.join(root, 'lib/language.tsx'), 'utf8');
const languageModule = {exports: {}};
vm.runInNewContext(ts.transpileModule(languageSource + '\nexport const __translations = translations;', {compilerOptions: {module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX}}).outputText, {
  module: languageModule, exports: languageModule.exports, require: name => name === 'react' ? React : require(name),
});
Object.assign(dictionaries, languageModule.exports.__translations);
const languageMock = {useLanguage: () => ({language, setLanguage: () => {}, t: source => language === 'en' ? source : dictionaries[source]?.[language] ?? source})};
const htmlElement = tag => React.forwardRef(function TestElement({children, ...props}, ref) {
  const clean = {...props};
  for (const key of ['initial','animate','exit','transition','whileInView','viewport','variants','whileHover','whileTap','layout','padding','size','variant','width','icon','fill','priority','quality','unoptimized','contain']) delete clean[key];
  return React.createElement(tag, {...clean, ref}, children);
});
const motion = new Proxy({}, {get: (_, tag) => htmlElement(String(tag))});
const UI = new Proxy({}, {get: (_, name) => htmlElement(name === 'Button' ? 'button' : 'div')});
const icons = new Proxy({}, {get: () => htmlElement('svg')});
function loader(base) {
  const cache = new Map();
  const mocks = {'react': React, 'react/jsx-runtime': require('react/jsx-runtime'), 'next/image': htmlElement('img'), 'next/link': htmlElement('a'),
    'next/navigation': {usePathname: () => '/'}, 'framer-motion': {motion, AnimatePresence: React.Fragment, useReducedMotion: () => false}, 'lucide-react': icons};
  function load(file) {
    file = file.replaceAll('\\', '/');
    if (cache.has(file)) return cache.get(file).exports;
    const result = {exports: {}}; cache.set(file, result);
    const source = fs.readFileSync(path.join(base, file), 'utf8');
    const code = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true}}).outputText;
    const resolve = name => {
      if (name === '@/lib/language' || (name === './language' && file.startsWith('lib/'))) return languageMock;
      if (name === '@/components/ui') return UI;
      if (name in mocks) return mocks[name];
      if (name.startsWith('@/') || name.startsWith('.')) {
        const local = name.startsWith('@/') ? name.slice(2) : path.join(path.dirname(file), name);
        const candidate = ['.tsx','.ts','/index.tsx','/index.ts'].map(extension => local + extension).find(target => fs.existsSync(path.join(base, target)));
        if (!candidate) throw Error('Missing test import ' + name + ' from ' + file);
        return load(candidate);
      }
      return require(name);
    };
    new Function('require','module','exports',code)(resolve,result,result.exports);
    return result.exports;
  }
  return load;
}
const load = loader(root);
const {SiteContentContext} = load('lib/cms-context.tsx');
const core = load('lib/site-content.ts');
const {resolveCollection} = load('lib/cms.tsx');
const sections = {homePage:['Hero','FamilyStorySection','SignatureSelection','HomeVisitSection'],menuPage:['MenuDesserts'],storyPage:['OurStoryExperience'],galleryPage:['GalleryExperience'],visitPage:['VisitUs'],navbar:['Navbar'],footer:['Footer'],siteSettings:['WhatsAppButton']};
const normalize = html => html.replace(/<!--[\s\S]*?-->/g, '').replace(/©\s*\d{4}/g,'© YEAR').replace(/ rel="[^"]*"/g, '').replace(/\s+/g,' ').trim();
const digest = html => crypto.createHash('sha256').update(normalize(html)).digest('hex');
function motionSignature(source) {
  const ast=ts.createSourceFile('component.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX), values=[];
  function walk(node){
    if((ts.isJsxOpeningElement(node)||ts.isJsxSelfClosingElement(node))&&node.tagName.getText().startsWith('motion.')) values.push([node.tagName.getText(),...node.attributes.properties.filter(attribute=>attribute.name&&['initial','animate','exit','transition','whileInView','viewport','variants'].includes(attribute.name.getText())).map(attribute=>attribute.getText())]);
    ts.forEachChild(node,walk);
  }walk(ast);return crypto.createHash('sha256').update(JSON.stringify(values)).digest('hex');
}
function render(name, content = {}, useLoader = load) {
  const Component = useLoader('components/' + name + '.tsx')[name];
  return renderToStaticMarkup(React.createElement(SiteContentContext.Provider, {value: content}, React.createElement(Component)));
}
const fixtureFile = path.join(__dirname,'fixtures','cms-fallback-hashes.json');
if (process.env.CMS_CAPTURE_BASELINE === '1') {
  const original = loader(process.env.CMS_BASELINE_DIR);
  const hashes = {};
  for (const locale of ['en','es','ar']) {
    language = locale;
    for (const names of Object.values(sections)) for (const name of names) {
      hashes[locale + ':' + name] = digest(render(name, {}, original));
      hashes['animation:'+name]=motionSignature(fs.readFileSync(path.join(process.env.CMS_BASELINE_DIR,'components',name+'.tsx'),'utf8'));
    }
  }
  fs.mkdirSync(path.dirname(fixtureFile),{recursive:true}); fs.writeFileSync(fixtureFile,JSON.stringify(hashes,null,2)+'\n');
}
const expected = JSON.parse(fs.readFileSync(fixtureFile,'utf8'));
test('all existing animation durations, transitions and viewport settings are preserved',()=>{
  for(const names of Object.values(sections))for(const name of names)assert.equal(motionSignature(fs.readFileSync(path.join(root,'components',name+'.tsx'),'utf8')),expected['animation:'+name],name);
});
for (const [section,names] of Object.entries(sections)) {
  test(section + ': exact fallback markup and styling in English, Spanish and Arabic', () => {
    for (const locale of ['en','es','ar']) {language = locale; for (const name of names) assert.equal(digest(render(name)),expected[locale+':'+name],locale+' '+name);}
    language = 'en';
  });
}
test('all page text editors change the rendered section content', () => {
  language = 'en';
  const defaults = JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/cms-defaults.json'),'utf8'));
  for (const [section,names] of Object.entries(sections)) {
    if (section === 'siteSettings') continue;
    const content = {[section]: {textEntries: defaults[section].textEntries.map(row => ({...row,value:{en:'MANAGED_'+section,es:'ES_'+section,ar:'AR_'+section}}))}};
    assert.ok(names.some(name => render(name,content).includes('MANAGED_'+section)),section+' text not connected');
  }
});
test('menu categories/items support insertion, deletion, ordering and localized prices', () => {
  const records = [{_key:'a',id:'specials',label:{en:'Specials'},fallbackImage:'/media/menu/menu-cakes-chocolate.jpg',items:[{_key:'second',name:{en:'Second cake',es:'Segundo'},price:{en:'40 MAD',es:'40 MAD'}},{_key:'first',name:{en:'First cake'},price:{en:'25 MAD'}}]}];
  const html = render('MenuDesserts',{menuPage:{menuCategories:records}});
  assert.ok(html.includes('40 MAD')&&html.includes('25 MAD'));
  assert.ok(html.indexOf('Second cake')<html.indexOf('First cake'));
  assert.ok(!html.includes('Chocolate Mousse Cake'));
  assert.ok(!render('MenuDesserts',{menuPage:{menuCategories:[]}}).includes('Chocolate Mousse Cake'));
  const translated = resolveCollection('menuCategories',records,[],'es');
  assert.equal(translated[0].items[0].name,'Segundo');
  assert.equal(translated[0].items[1].name,'First cake');
});
test('gallery supports adding, deleting and reordering photos without restoring deleted ones', () => {
  const records = [{_key:'b',title:{en:'Photo B'},fallbackImage:'/media/gallery/b.jpg',categorySlug:'coffee'},{_key:'a',title:{en:'Photo A'},fallbackImage:'/media/gallery/a.jpg',categorySlug:'bakery'}];
  const html = render('GalleryExperience',{galleryPage:{galleryItems:records}});
  assert.ok(html.indexOf('Photo B')<html.indexOf('Photo A'));
  assert.ok(!html.includes('Signature Pour-Over Precision'));
  assert.ok(!render('GalleryExperience',{galleryPage:{galleryItems:[]}}).includes('Signature Pour-Over Precision'));
});
test('Navbar and Footer use ordered editable links and shared contact details', () => {
  const content = {navbar:{navigationLinks:[{name:{en:'Client link'},href:'/client'}]},footer:{exploreLinks:[{name:{en:'Client footer'},href:'/footer-client'}]},siteSettings:{email:'hello@example.com',phone:'+212600000000',phoneDisplay:'+212 600 00 00 00',instagramUrl:'https://www.instagram.com/client',whatsappUrl:'https://wa.me/212600000000'}};
  const nav = render('Navbar',content), footer=render('Footer',content), visit=render('VisitUs',content);
  assert.ok(nav.includes('Client link')&&nav.includes('href="/client"'));
  assert.ok(footer.includes('Client footer')&&footer.includes('mailto:hello@example.com'));
  assert.ok(visit.includes('+212 600 00 00 00')&&visit.includes('tel:+212600000000'));
  assert.ok(render('WhatsAppButton',content).includes('https://wa.me/212600000000'));
});
test('credentials, signature cards and home story photos use published collections', () => {
  const story = render('OurStoryExperience',{storyPage:{credentials:[{type:'diploma',number:'09',title:{en:'Client diploma'},fallbackImage:'/media/our-story/ice-diploma.jpeg'}]}});
  assert.ok(story.includes('Client diploma')&&!story.includes('Culinary Arts Diploma'));
  const cards = render('SignatureSelection',{homePage:{signatureCards:[{title:{en:'Client card'},fallbackImage:'/media/cakes/signature-bakery.jpg'}]}});
  assert.ok(cards.includes('Client card')&&!cards.includes('Freshly Baked'));
  const photos=render('FamilyStorySection',{homePage:{storyPhotos:[{id:'craft',caption:{en:'Client photo'},fallbackImage:'/media/our-story/family-baking.jpg'}]}});
  assert.ok(photos.includes('Client photo'));
});
test('published selector excludes drafts/releases and preserves existing Home Page ID', () => {
  const content=core.selectPublishedContent([{_type:'homePage',_id:'drafts.homePage'},{_type:'homePage',_id:'legacy-id'},{_type:'menuPage',_id:'versions.release.menuPage'},{_type:'menuPage',_id:'old-menu'},{_type:'menuPage',_id:'menuPage'}]);
  assert.equal(content.homePage._id,'legacy-id'); assert.equal(content.menuPage._id,'menuPage');
});
test('image replacements and translated alt text flow through existing image markup', () => {
  const content={visitPage:{media:[{source:'/media/cafe-coming-soon.jpg',src:'https://cdn.sanity.io/images/z12n5wz6/production/client.jpg',alt:{en:'Client cafe'}}]}};
  const html=render('VisitUs',content);
  assert.ok(html.includes('client.jpg')&&html.includes('alt="Client cafe"'));
});
test('unsafe URLs and non-Google map embeds retain safe fallback destinations', () => {
  for(const href of ['javascript:alert(1)','//evil.test','/\\evil.test','https://a:b@evil.test'])assert.equal(core.contentHref(href,'/safe'),'/safe');
  assert.equal(core.mapEmbedUrl({siteSettings:{mapEmbedUrl:'https://evil.test/maps'}},'original'),'original');
});
test('fallback identity survives reorder while new items use their English translation', () => {
  const originals=[{name:'First'},{name:'Second'}];
  const data=resolveCollection('navigationLinks',[{fallbackIndex:1,name:{en:'Second'}},{name:{en:'New'}}],originals,'ar');
  assert.equal(data[0].name,'Second'); assert.equal(data[1].name,'New');
});
