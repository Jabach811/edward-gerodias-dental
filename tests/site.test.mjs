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
