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
    'dm-sans-400.woff2', 'dm-sans-500.woff2', 'dm-sans-600.woff2', 'newsreader-400.woff2', 'newsreader-500.woff2',
    'plus-jakarta-sans-var.woff2'
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
  assert.match(sources, /Plus Jakarta Sans[\s\S]+SIL Open Font License/);
  assert.match(sources, /storefront\.webp/);
});

test('optimized original assets are present and page-sized', async () => {
  const names = [
    'storefront.webp',
    'storefront-900.webp',
    'doctor-portrait-768.webp'
  ];
  for (const name of names) {
    const image = await readFile(new URL(`assets/optimized/${name}`, root));
    assert.ok(image.length > 20_000, `${name} should be a real optimized image`);
    assert.equal(image.subarray(8, 12).toString('ascii'), 'WEBP');
  }
});

test('page exposes semantic sections and reliable conversion actions', async () => {
  const html = await read('index.html');
  for (const id of ['home', 'care', 'meet', 'visit']) {
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
  for (const token of ['--ink', '--navy', '--gold', '--gold-ink']) {
    assert.match(css, new RegExp(token));
  }
  assert.match(css, /@media\s*\(max-width:\s*900px\)/);
  assert.match(css, /@media\s*\(max-width:\s*640px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(css, /overflow-x:\s*hidden/);
});

test('progressive enhancements preserve fallbacks and accessible state', async () => {
  const html = await read('index.html');
  const js = await read('script.js');
  assert.match(js, /aria-pressed/);
  assert.match(html, /<h2 data-t="h">Book a visit<\/h2>/,
    'the booking card must read in English before the script runs');
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

  assert.match(html, new RegExp(`<strong[^>]*>${data.reviews.average}</strong>`), 'review average should match the ledger');
  assert.doesNotMatch(html, /captured\s+\w+\s+\d{1,2},\s+\d{4}/,
    'the page should not display a capture date that goes stale');
});

test('page references only approved asset categories and avoids overreaching claims', async () => {
  const html = await read('index.html');
  assert.doesNotMatch(html, /assets\/source\/reference-only/);
  assert.match(html, /All rights reserved\./);
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
  assert.match(html, /rel="preload" href="assets\/fonts\/plus-jakarta-sans-var\.woff2" as="font"/);
  assert.doesNotMatch(html, /fonts\.googleapis/, 'fonts are self-hosted');
  assert.match(html, /rel="icon" href="assets\/favicon\.svg"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /srcset="assets\/optimized\/doctor-portrait-480\.webp 480w/);
  assert.doesNotMatch(html, /dr-edward-gerodias-scheduler\.png"[^>]+loading="lazy"/,
    'the doctor portrait is primary content and should not be deferred with loading="lazy"');
  assert.match(css, /scroll-margin-top:\s*16px/);
  assert.match(css, /touch-action:\s*manipulation/);
  assert.match(css, /font-variant-numeric:\s*tabular-nums/);
});

test('link previews use a full-address 1200x630 share image', async () => {
  const html = await read('index.html');
  assert.match(html, /property="og:image" content="https:\/\/[^"]+\/assets\/share\.jpg"/);
  assert.match(html, /property="og:image:width" content="1200"/);
  assert.match(html, /property="og:image:height" content="630"/);
  const image = await readFile(new URL('assets/share.jpg', root));
  assert.equal(image.readUInt16BE(0), 0xffd8, 'share image should be a JPEG');
});
