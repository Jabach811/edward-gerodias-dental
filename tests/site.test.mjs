import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('practice data contains verified core contact details', async () => {
  const data = JSON.parse(await read('data/practice.json'));
  assert.equal(data.identity.name, 'Edward S. Gerodias, D.M.D.');
  assert.equal(data.contact.phoneDisplay, '(209) 526-4244');
  assert.equal(data.contact.phoneHref, 'tel:+12095264244');
  assert.equal(data.contact.address.street, '220 Standiford Ave Ste B');
  assert.equal(data.contact.address.city, 'Modesto');
  assert.equal(data.contact.address.state, 'CA');
  assert.equal(data.contact.address.zip, '95350');
  assert.match(data.appointments.url, /^https:\/\//);
  assert.equal(data.reviews.captureDate, '2026-07-13');
  assert.equal(data.reviews.average, 4.98);
  assert.equal(data.reviews.count, 448);
});

test('source assets exist and provenance records their usage status', async () => {
  const portrait = await readFile(new URL('assets/source/publish-candidate/dr-edward-gerodias-scheduler.png', root));
  const fontNames = [
    'dm-sans-400.ttf', 'dm-sans-500.ttf', 'dm-sans-600.ttf', 'newsreader-400.ttf', 'newsreader-500.ttf',
    'dm-sans-400.woff2', 'dm-sans-500.woff2', 'dm-sans-600.woff2', 'newsreader-400.woff2', 'newsreader-500.woff2'
  ];
  const sources = await read('assets/SOURCES.md');
  assert.equal(portrait.subarray(1, 4).toString('ascii'), 'PNG');
  for (const fontName of fontNames) {
    const font = await readFile(new URL(`assets/fonts/${fontName}`, root));
    assert.ok(font.length > 10_000, `${fontName} should contain a complete font`);
  }
  assert.match(sources, /dr-edward-gerodias-scheduler\.png[\s\S]+Publish candidate/);
  assert.match(sources, /yahoo-practice-banner\.jpg[\s\S]+excluded from this public repository/);
  assert.match(sources, /DM Sans[\s\S]+SIL Open Font License/);
  assert.match(sources, /Newsreader[\s\S]+SIL Open Font License/);
});

test('optimized original assets are present and page-sized', async () => {
  const names = [
    'hero-welcome.webp',
    'care-chair-detail.webp',
    'instruments-still-life.webp',
    'waiting-room-cadence.webp',
    'smile-light-texture.webp'
  ];
  for (const name of names) {
    const image = await readFile(new URL(`assets/optimized/${name}`, root));
    assert.ok(image.length > 20_000, `${name} should be a real optimized image`);
    assert.equal(image.subarray(8, 12).toString('ascii'), 'WEBP');
  }
});

test('page exposes semantic sections and reliable conversion actions', async () => {
  const html = await read('index.html');
  for (const id of ['home', 'care', 'doctor', 'comfort', 'voices', 'questions', 'visit']) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(html, /href="tel:\+12095264244"/);
  assert.match(html, /schedule\.solutionreach\.com\/scheduling\/subscriber\/48415\/scheduler-basic/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /skip-link/);
  assert.doesNotMatch(html, /<form\b/i);
});

test('styles include approved tokens, responsive rules, focus, and reduced motion', async () => {
  const css = await read('styles.css');
  for (const token of ['--ivory', '--navy', '--porcelain', '--brass', '--coral']) {
    assert.match(css, new RegExp(token));
  }
  assert.match(css, /@media\s*\(max-width:\s*900px\)/);
  assert.match(css, /@media\s*\(max-width:\s*640px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(css, /overflow-x:\s*hidden/);
});

test('progressive enhancements preserve fallbacks and accessible state', async () => {
  const js = await read('script.js');
  assert.match(js, /aria-expanded/);
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /document\.documentElement\.classList\.add\(['"]js['"]\)/);
  assert.doesNotMatch(js, /innerHTML/, 'script should not re-render page content at runtime');
});

test('page content stays in sync with the practice data ledger', async () => {
  const html = await read('index.html');
  const data = JSON.parse(await read('data/practice.json'));

  for (const service of data.services) {
    assert.match(html, new RegExp(`<h3>${service.name}</h3>`), `service "${service.name}" should appear on the page`);
  }

  assert.ok(html.includes(`href="${data.contact.phoneHref}"`), 'phone link should match the ledger');
  assert.ok(html.includes(data.contact.phoneDisplay), 'display phone number should match the ledger');
  assert.ok(html.includes(data.contact.address.street), 'street address should match the ledger');
  assert.ok(html.includes(`${data.contact.address.city}, ${data.contact.address.state} ${data.contact.address.zip}`));
  assert.ok(html.includes(data.appointments.url), 'scheduler URL should match the ledger');

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const [year, month, day] = data.reviews.captureDate.split('-').map(Number);
  const longDate = `${months[month - 1]} ${day}, ${year}`;
  assert.ok(html.includes(`<strong>${data.reviews.average}</strong>`), 'review average should match the ledger');
  assert.ok(html.includes(`from ${data.reviews.count} scheduler reviews, captured ${longDate}`),
    'review count and capture date should match the ledger');
});

test('page references only approved asset categories and carries demo disclosure', async () => {
  const html = await read('index.html');
  assert.doesNotMatch(html, /assets\/source\/reference-only/);
  assert.match(html, /Concept imagery; not the actual office\./);
  assert.match(html, /Practice details and image permissions require owner review before publication\./);
  assert.doesNotMatch(html, /best dentist|pain[- ]free|guarantee|board[- ]certified/i);
});

test('all local HTML and CSS asset references resolve', async () => {
  const html = await read('index.html');
  const css = await read('styles.css');
  const htmlPaths = [...html.matchAll(/(?:src|href)="(?!https?:|tel:|#)([^"?]+)"/g)].map((match) => match[1]);
  const cssPaths = [...css.matchAll(/url\(['"]?(?!data:|https?:)([^)'"?]+)['"]?\)/g)].map((match) => match[1]);
  const paths = [...new Set([...htmlPaths, ...cssPaths])];
  for (const path of paths) {
    await readFile(new URL(path, root));
  }
  assert.doesNotMatch(css, /https?:\/\//);
});

test('project documentation preserves privacy and owner-review gates', async () => {
  const readme = await read('README.md');
  assert.match(readme, /Owner confirmation before publication/);
  assert.match(readme, /contains no custom patient form/);
  assert.match(readme, /assets\/source\/reference-only/);
  assert.match(readme, /python -m http\.server 4173/);
});

test('interface includes reviewed navigation, font, image, and touch guardrails', async () => {
  const html = await read('index.html');
  const css = await read('styles.css');
  assert.match(html, /rel="preload" href="assets\/fonts\/newsreader-400\.woff2" as="font"/);
  assert.match(html, /rel="icon" href="assets\/favicon\.svg"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /srcset="assets\/optimized\/hero-welcome-640\.webp 640w/);
  assert.match(html, /dr-edward-gerodias-scheduler\.png"[^>]+loading="lazy"/);
  assert.match(css, /scroll-margin-top:\s*90px/);
  assert.match(css, /touch-action:\s*manipulation/);
  assert.match(css, /font-variant-numeric:\s*tabular-nums/);
});

test('decorative review imagery stays inside the page canvas', async () => {
  const css = await read('styles.css');
  assert.match(css, /\.hero-art::before\s*\{[^}]*right:\s*0;/s);
  assert.match(css, /\.voices-section::after\s*\{[^}]*right:\s*0;/s);
});
