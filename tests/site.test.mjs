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
  const reference = await readFile(new URL('assets/source/reference-only/yahoo-practice-banner.jpg', root));
  const fontNames = ['dm-sans-400.ttf', 'dm-sans-500.ttf', 'dm-sans-600.ttf', 'newsreader-400.ttf', 'newsreader-500.ttf'];
  const sources = await read('assets/SOURCES.md');
  assert.equal(portrait.subarray(1, 4).toString('ascii'), 'PNG');
  assert.equal(reference.subarray(0, 2).toString('hex'), 'ffd8');
  for (const fontName of fontNames) {
    const font = await readFile(new URL(`assets/fonts/${fontName}`, root));
    assert.ok(font.length > 10_000, `${fontName} should contain a complete font`);
  }
  assert.match(sources, /dr-edward-gerodias-scheduler\.png[\s\S]+Publish candidate/);
  assert.match(sources, /yahoo-practice-banner\.jpg[\s\S]+Reference only/);
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
