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
