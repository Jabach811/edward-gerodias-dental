# Edward Gerodias Dental Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, responsive, local-only pitch website for Edward S. Gerodias, D.M.D. with sourced real-practice material, original theme-matched imagery, centralized facts, and accessible conversion paths.

**Architecture:** A dependency-light static site keeps content in `data/practice.json`, presentation in `index.html` and `styles.css`, and progressive enhancements in `script.js`. Online material is divided into publish-candidate and reference-only folders with provenance, while generated originals are retained separately from optimized page assets.

**Tech Stack:** Semantic HTML5, modern CSS, vanilla JavaScript, Node.js 24 built-in test runner, PowerShell asset download, Python 3 with Pillow 9.5 for image optimization, built-in image generation.

## Global Constraints

- Keep the complete project local under `Uncle Ed`; do not publish or connect it to GitHub.
- Use warm ivory, midnight navy, soft porcelain, muted brass, and restrained warm coral.
- Present Dr. Gerodias as experienced, gentle, trustworthy, sweet, welcoming, humorous, family-oriented, and quietly artistic.
- Use music through cadence, linework, pacing, and language; do not decorate the page with literal piano keys.
- Do not fabricate Dr. Gerodias's likeness, employees, patients, credentials, awards, outcomes, or medical promises.
- Treat hours, insurance, languages, service availability, and live review totals as facts that require confirmation or capture dates.
- Store no patient or health information and create no custom appointment form.
- Keep phone, directions, and the external scheduler functional without JavaScript.
- Meet keyboard, focus, reduced-motion, semantic-heading, tap-target, contrast, and alternative-text requirements.
- Record every downloaded asset's source URL, capture date, apparent owner, and usage status.

## File Structure

- `Uncle Ed/index.html` — semantic page content, metadata, JSON-LD, and no-script-safe actions
- `Uncle Ed/styles.css` — tokens, layout, typography, responsive behavior, focus, and motion
- `Uncle Ed/script.js` — mobile navigation, reveal effects, FAQ, data hydration, and graceful fallbacks
- `Uncle Ed/data/practice.json` — centralized business facts with verification metadata
- `Uncle Ed/assets/source/publish-candidate/` — public practice-owned material pending owner approval
- `Uncle Ed/assets/source/reference-only/` — third-party imagery excluded from publishable output
- `Uncle Ed/assets/generated/` — original image-generation outputs
- `Uncle Ed/assets/optimized/` — page-ready WebP derivatives
- `Uncle Ed/assets/SOURCES.md` — provenance and usage ledger
- `Uncle Ed/scripts/download-source-assets.ps1` — reproducible public-asset downloader
- `Uncle Ed/scripts/optimize_assets.py` — deterministic WebP optimizer
- `Uncle Ed/tests/site.test.mjs` — structure, facts, accessibility hooks, assets, and interaction contract tests
- `Uncle Ed/package.json` — local test command only
- `Uncle Ed/README.md` — preview, verification, asset-rights, and launch checklist

---

### Task 1: Practice Data Contract and Test Harness

**Files:**
- Create: `Uncle Ed/package.json`
- Create: `Uncle Ed/data/practice.json`
- Create: `Uncle Ed/tests/site.test.mjs`

**Interfaces:**
- Consumes: Verified public practice API data and approved design specification
- Produces: `practice.json` keys `identity`, `contact`, `appointments`, `reviews`, `services`, `languages`, `story`, and `verification`; `npm`-free command `node --test tests/*.test.mjs`

- [ ] **Step 1: Write the failing data-contract test**

```js
// tests/site.test.mjs
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
```

- [ ] **Step 2: Run the test and confirm the missing-file failure**

Run: `node --test tests/site.test.mjs`

Expected: FAIL with `ENOENT` for `data/practice.json`.

- [ ] **Step 3: Create the package and complete practice data**

```json
// package.json
{
  "name": "edward-gerodias-dental-site",
  "private": true,
  "scripts": {
    "test": "node --test tests/*.test.mjs"
  }
}
```

```json
// data/practice.json
{
  "identity": {
    "name": "Edward S. Gerodias, D.M.D.",
    "shortName": "Dr. Edward Gerodias",
    "descriptor": "Family & General Dentistry in Modesto"
  },
  "contact": {
    "phoneDisplay": "(209) 526-4244",
    "phoneHref": "tel:+12095264244",
    "faxDisplay": "(209) 526-0112",
    "address": {
      "street": "220 Standiford Ave Ste B",
      "city": "Modesto",
      "state": "CA",
      "zip": "95350",
      "mapUrl": "https://www.google.com/maps/search/?api=1&query=220%20Standiford%20Ave%20Ste%20B%20Modesto%20CA%2095350"
    }
  },
  "appointments": {
    "url": "https://schedule.solutionreach.com/scheduling/subscriber/48415/scheduler-basic",
    "label": "Request an appointment"
  },
  "reviews": {
    "average": 4.98,
    "count": 448,
    "captureDate": "2026-07-13",
    "sourceUrl": "https://schedule.solutionreach.com/scheduling/subscriber/48415/scheduler-basic"
  },
  "services": [
    {"name": "New-patient exams", "confirmedBy": "public scheduler"},
    {"name": "Cleanings and preventive care", "confirmedBy": "public scheduler"},
    {"name": "Fillings", "confirmedBy": "public scheduler"},
    {"name": "Crowns", "confirmedBy": "public scheduler"},
    {"name": "Orthodontics", "confirmedBy": "public scheduler"}
  ],
  "languages": [
    {"name": "English", "confirmationRequired": true},
    {"name": "Spanish", "confirmationRequired": true},
    {"name": "Tagalog", "confirmationRequired": true}
  ],
  "story": {
    "education": "University of the East Ramon Magsaysay Memorial Medical Center",
    "community": "Public profiles describe volunteer dentistry through CDA Cares.",
    "music": "Public profiles describe longtime service as a church pianist and organist."
  },
  "verification": {
    "hours": "owner confirmation required",
    "insurance": "owner confirmation required",
    "languages": "owner confirmation required",
    "portraitUsage": "owner approval required before publication",
    "reviewQuotes": "direct quotation permission required before publication"
  }
}
```

- [ ] **Step 4: Run the data-contract test**

Run: `node --test tests/site.test.mjs`

Expected: PASS with `1` passing test.

- [ ] **Step 5: Commit the data contract**

```powershell
git add -- "Uncle Ed/package.json" "Uncle Ed/data/practice.json" "Uncle Ed/tests/site.test.mjs"
git commit -m "feat: add Uncle Ed practice data contract"
```

---

### Task 2: Source Asset Provenance and Reproducible Download

**Files:**
- Create: `Uncle Ed/scripts/download-source-assets.ps1`
- Create: `Uncle Ed/assets/SOURCES.md`
- Modify: `Uncle Ed/tests/site.test.mjs`
- Create by script: `Uncle Ed/assets/source/publish-candidate/dr-edward-gerodias-scheduler.png`
- Create by script: `Uncle Ed/assets/source/reference-only/yahoo-practice-banner.jpg`
- Create by script: `Uncle Ed/assets/fonts/dm-sans-400.ttf`
- Create by script: `Uncle Ed/assets/fonts/dm-sans-500.ttf`
- Create by script: `Uncle Ed/assets/fonts/dm-sans-600.ttf`
- Create by script: `Uncle Ed/assets/fonts/newsreader-400.ttf`
- Create by script: `Uncle Ed/assets/fonts/newsreader-500.ttf`
- Create by script: `Uncle Ed/assets/fonts/LICENSE-DM-SANS.txt`
- Create by script: `Uncle Ed/assets/fonts/LICENSE-NEWSREADER.txt`

**Interfaces:**
- Consumes: Exact public URLs and destination categories
- Produces: Two reproducibly downloaded source images, five locally hosted font files with SIL Open Font License text, and a human-readable rights ledger

- [ ] **Step 1: Add a failing source-asset test**

```js
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
```

- [ ] **Step 2: Run the test and confirm both downloads are missing**

Run: `node --test tests/site.test.mjs`

Expected: FAIL with `ENOENT` under `assets/source/`.

- [ ] **Step 3: Create the exact downloader**

```powershell
# scripts/download-source-assets.ps1
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$publish = Join-Path $root 'assets/source/publish-candidate'
$reference = Join-Path $root 'assets/source/reference-only'
$fonts = Join-Path $root 'assets/fonts'
New-Item -ItemType Directory -Force -Path $publish, $reference, $fonts | Out-Null

$assets = @(
  @{
    Url = 'https://smilereminder.com/subfiles/48415/providers/36689d3c-f663-4e47-a300-071753131474.png'
    Out = Join-Path $publish 'dr-edward-gerodias-scheduler.png'
  },
  @{
    Url = 'https://s.yimg.com/bj/4ec1/4ec12c7b6a7535083f854c9b8e2c2e59.jpg'
    Out = Join-Path $reference 'yahoo-practice-banner.jpg'
  },
  @{
    Url = 'https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTg.ttf'
    Out = Join-Path $fonts 'dm-sans-400.ttf'
  },
  @{
    Url = 'https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhTg.ttf'
    Out = Join-Path $fonts 'dm-sans-500.ttf'
  },
  @{
    Url = 'https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAfJthTg.ttf'
    Out = Join-Path $fonts 'dm-sans-600.ttf'
  },
  @{
    Url = 'https://fonts.gstatic.com/s/newsreader/v26/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438weI_ADA.ttf'
    Out = Join-Path $fonts 'newsreader-400.ttf'
  },
  @{
    Url = 'https://fonts.gstatic.com/s/newsreader/v26/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wSo_ADA.ttf'
    Out = Join-Path $fonts 'newsreader-500.ttf'
  },
  @{
    Url = 'https://raw.githubusercontent.com/google/fonts/main/ofl/dmsans/OFL.txt'
    Out = Join-Path $fonts 'LICENSE-DM-SANS.txt'
  },
  @{
    Url = 'https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/OFL.txt'
    Out = Join-Path $fonts 'LICENSE-NEWSREADER.txt'
  }
)

foreach ($asset in $assets) {
  Invoke-WebRequest -UseBasicParsing -Uri $asset.Url -OutFile $asset.Out
  if ((Get-Item -LiteralPath $asset.Out).Length -lt 1024) {
    throw "Downloaded asset is unexpectedly small: $($asset.Out)"
  }
}
```

- [ ] **Step 4: Record exact provenance and usage rules**

```markdown
# Asset Sources

Capture date: 2026-07-13

## Publish candidate

### dr-edward-gerodias-scheduler.png

- Source: https://smilereminder.com/subfiles/48415/providers/36689d3c-f663-4e47-a300-071753131474.png
- Context: Dr. Gerodias provider image served by his public Solutionreach scheduler
- Apparent owner: Edward S. Gerodias, D.M.D. practice account
- Status: Publish candidate; owner approval required before public launch

## Reference only

### yahoo-practice-banner.jpg

- Source: https://s.yimg.com/bj/4ec1/4ec12c7b6a7535083f854c9b8e2c2e59.jpg
- Context: Image associated with the Yahoo Local practice listing
- Apparent owner: Unclear from the listing
- Status: Reference only; excluded from the website until rights are confirmed

## Locally hosted fonts

### DM Sans

- Source: https://fonts.google.com/specimen/DM+Sans
- Files: `dm-sans-400.ttf`, `dm-sans-500.ttf`, `dm-sans-600.ttf`
- License: SIL Open Font License; full text in `assets/fonts/LICENSE-DM-SANS.txt`
- Status: Cleared for local embedding under the included license

### Newsreader

- Source: https://fonts.google.com/specimen/Newsreader
- Files: `newsreader-400.ttf`, `newsreader-500.ttf`
- License: SIL Open Font License; full text in `assets/fonts/LICENSE-NEWSREADER.txt`
- Status: Cleared for local embedding under the included license
```

- [ ] **Step 5: Download and verify the assets**

Run: `powershell -ExecutionPolicy Bypass -File scripts/download-source-assets.ps1`

Expected: Exit code `0`; the images exceed `1 KB`, fonts exceed `10 KB`, and both license files are present.

Run: `node --test tests/site.test.mjs`

Expected: PASS with `2` passing tests.

- [ ] **Step 6: Commit the sourced asset library**

```powershell
git add -- "Uncle Ed/scripts/download-source-assets.ps1" "Uncle Ed/assets/SOURCES.md" "Uncle Ed/assets/source" "Uncle Ed/assets/fonts" "Uncle Ed/tests/site.test.mjs"
git commit -m "feat: source Uncle Ed practice assets"
```

---

### Task 3: Original Asset Set and Optimization Pipeline

**Files:**
- Create: `Uncle Ed/assets/generated/hero-welcome.png`
- Create: `Uncle Ed/assets/generated/care-chair-detail.png`
- Create: `Uncle Ed/assets/generated/instruments-still-life.png`
- Create: `Uncle Ed/assets/generated/waiting-room-cadence.png`
- Create: `Uncle Ed/assets/generated/smile-light-texture.png`
- Create: `Uncle Ed/scripts/optimize_assets.py`
- Create by script: `Uncle Ed/assets/optimized/*.webp`
- Modify: `Uncle Ed/assets/SOURCES.md`
- Modify: `Uncle Ed/tests/site.test.mjs`

**Interfaces:**
- Consumes: Five built-in image-generation outputs and Pillow
- Produces: Five named PNG originals plus five page-ready WebP files, all at least `1200px` wide

- [ ] **Step 1: Add a failing generated-asset contract test**

```js
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
```

- [ ] **Step 2: Run the test and confirm generated files are absent**

Run: `node --test tests/site.test.mjs`

Expected: FAIL with `ENOENT` for `assets/optimized/hero-welcome.webp`.

- [ ] **Step 3: Generate the five original images with separate built-in calls**

Use these exact prompts, one call per asset, and copy each selected result into `assets/generated/` with the listed filename:

```text
Use case: photorealistic-natural
Asset type: dental practice website hero
Primary request: an elegant, welcoming dental reception and consultation environment that feels established, warm, artistic, and quietly joyful
Scene/backdrop: refined Modesto family dental office atmosphere with ivory plaster, midnight navy upholstery, muted brass details, warm California daylight, tasteful framed art, and one subtle glimpse of a grand piano edge
Composition/framing: wide editorial landscape with generous calm negative space on the left and architectural depth on the right
Lighting/mood: soft morning light, reassuring, human, premium without looking exclusive
Constraints: environment only; no people; no readable signage; no logos; no text; no watermark; do not imply this is the real office
```

Save as `assets/generated/hero-welcome.png`.

```text
Use case: photorealistic-natural
Asset type: dental care feature image
Primary request: a refined close editorial view of a modern dental treatment chair prepared for a calm patient visit
Scene/backdrop: clean ivory operatory with navy and brass accents, modern equipment, soft linen texture, and warm daylight
Composition/framing: horizontal three-quarter detail, no patient, no clinician, clean negative space
Lighting/mood: gentle, precise, reassuring, naturally lit
Constraints: anatomically and mechanically plausible dental equipment; no blood; no procedure; no logos; no readable text; no watermark
```

Save as `assets/generated/care-chair-detail.png`.

```text
Use case: product-mockup
Asset type: dental technology editorial still life
Primary request: an art-directed still life of a dental mirror, explorer, and modern crown shade guide arranged with exacting care
Scene/backdrop: warm ivory stone surface with subtle sheet-music-like ruled shadows, navy linen edge, muted brass reflection
Composition/framing: wide close-up with instruments grouped to the right and negative space to the left
Lighting/mood: soft studio daylight, clean, elegant, precise
Constraints: realistic dental instruments; no hands; no teeth removed from a mouth; no logos; no readable text; no watermark
```

Save as `assets/generated/instruments-still-life.png`.

```text
Use case: photorealistic-natural
Asset type: dental practice atmosphere image
Primary request: an inviting family dental waiting room detail that feels cheerful, comfortable, and cared for
Scene/backdrop: curved ivory seating, navy cushions, warm wood, muted brass lamp, tasteful colorful art, children’s book and fresh greenery, subtle rhythmic wall lines
Composition/framing: horizontal editorial interior with a lived-in but uncluttered feeling
Lighting/mood: warm afternoon California light, friendly, playful, sophisticated
Constraints: no people; no readable signs; no logos; no text; no watermark; do not imply this is the real office
```

Save as `assets/generated/waiting-room-cadence.png`.

```text
Use case: stylized-concept
Asset type: website background texture
Primary request: abstract luminous arcs suggesting a confident smile and musical phrasing without depicting teeth or piano keys
Scene/backdrop: soft porcelain and warm ivory field with midnight navy hairlines, muted brass glints, and one restrained coral accent
Composition/framing: extra-wide minimal composition with flowing arcs and ample negative space
Lighting/mood: airy, elegant, optimistic, calm
Constraints: abstract only; no people; no teeth; no instruments; no logos; no readable text; no watermark
```

Save as `assets/generated/smile-light-texture.png`.

- [ ] **Step 4: Inspect every generated original**

Use the local image viewer on all five PNGs. Reject and regenerate any image containing malformed dental equipment, text, watermarks, clinical distress, a fabricated doctor, or an apparent real-practice exterior.

- [ ] **Step 5: Create the optimizer**

```python
# scripts/optimize_assets.py
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "generated"
DEST = ROOT / "assets" / "optimized"
DEST.mkdir(parents=True, exist_ok=True)

for source in sorted(SOURCE.glob("*.png")):
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        if image.width > 2200:
            height = round(image.height * 2200 / image.width)
            image = image.resize((2200, height), Image.Resampling.LANCZOS)
        destination = DEST / f"{source.stem}.webp"
        image.save(destination, "WEBP", quality=84, method=6)
        if destination.stat().st_size < 20_000:
            raise RuntimeError(f"Optimized image is unexpectedly small: {destination}")
        print(f"{source.name} -> {destination.name} ({image.width}x{image.height})")
```

- [ ] **Step 6: Optimize and test the asset set**

Run: `python scripts/optimize_assets.py`

Expected: Five output lines ending in `.webp` and exit code `0`.

Run: `node --test tests/site.test.mjs`

Expected: PASS with `3` passing tests.

- [ ] **Step 7: Extend the provenance ledger and commit**

Append to `assets/SOURCES.md`:

```markdown
## Generated originals

- `hero-welcome.png` — built-in image generation; fictional environment; not the real practice
- `care-chair-detail.png` — built-in image generation; fictional operatory detail
- `instruments-still-life.png` — built-in image generation; fictional editorial still life
- `waiting-room-cadence.png` — built-in image generation; fictional environment; not the real practice
- `smile-light-texture.png` — built-in image generation; abstract background texture

Generated on 2026-07-13. Final prompts are preserved in the implementation plan.
```

```powershell
git add -- "Uncle Ed/assets/generated" "Uncle Ed/assets/optimized" "Uncle Ed/assets/SOURCES.md" "Uncle Ed/scripts/optimize_assets.py" "Uncle Ed/tests/site.test.mjs"
git commit -m "feat: create Gentle Maestro image library"
```

---

### Task 4: Semantic Page and Conversion Paths

**Files:**
- Create: `Uncle Ed/index.html`
- Modify: `Uncle Ed/tests/site.test.mjs`

**Interfaces:**
- Consumes: `data/practice.json`, portrait publish candidate, and optimized generated assets
- Produces: Stable section IDs `home`, `care`, `doctor`, `comfort`, `voices`, `questions`, and `visit`; call, map, scheduler, and native FAQ interactions usable without JavaScript

- [ ] **Step 1: Add the failing semantic-page test**

```js
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
```

- [ ] **Step 2: Run the test and confirm `index.html` is missing**

Run: `node --test tests/site.test.mjs`

Expected: FAIL with `ENOENT` for `index.html`.

- [ ] **Step 3: Build the complete semantic document**

Create `index.html` with:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Edward S. Gerodias, D.M.D. | Family Dentistry in Modesto</title>
  <meta name="description" content="Warm, experienced family dentistry in Modesto from Dr. Edward Gerodias and his caring team.">
  <link rel="preload" as="image" href="assets/optimized/hero-welcome.webp" fetchpriority="high">
  <link rel="stylesheet" href="styles.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "Edward S. Gerodias, D.M.D.",
    "telephone": "+1-209-526-4244",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "220 Standiford Ave Ste B",
      "addressLocality": "Modesto",
      "addressRegion": "CA",
      "postalCode": "95350",
      "addressCountry": "US"
    }
  }
  </script>
  <script src="script.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-header>
    <a class="wordmark" href="#home" aria-label="Edward S. Gerodias, D.M.D. home">
      <span>Gerodias</span><small>Dental · Modesto</small>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-toggle>
      <span class="sr-only">Open navigation</span><span aria-hidden="true">Menu</span>
    </button>
    <nav id="site-nav" aria-label="Primary" data-nav>
      <a href="#care">Care</a><a href="#doctor">Meet Dr. G</a><a href="#voices">Patient voices</a><a href="#visit">Visit</a>
    </nav>
    <a class="header-call" href="tel:+12095264244">Call (209) 526-4244</a>
  </header>
  <main id="main">
    <section id="home" class="hero">
      <div class="hero-copy" data-reveal>
        <p class="eyebrow">Family dentistry · Modesto, California</p>
        <h1>Excellent dentistry.<br><em>A genuinely good visit.</em></h1>
        <p>Thoughtful care, modern tools, and the kind of welcome that has kept generations of families coming back.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="https://schedule.solutionreach.com/scheduling/subscriber/48415/scheduler-basic">Request an appointment</a>
          <a class="button button-quiet" href="tel:+12095264244">Call the office</a>
        </div>
      </div>
      <figure class="hero-art" data-reveal><img src="assets/optimized/hero-welcome.webp" alt="An elegant, welcoming dental reception concept" width="1536" height="1024"><figcaption>Concept imagery; not the actual office.</figcaption></figure>
    </section>
    <aside class="trust-score" aria-label="Practice highlights"><strong>4.98</strong><span>from 448 scheduler reviews, captured July 13, 2026</span><a href="#voices">Why patients stay</a></aside>
    <section id="care" class="section care-section"><p class="eyebrow">Care that makes sense</p><h2>Clear answers. Gentle hands. No mystery.</h2><div class="care-grid" data-services></div></section>
    <section id="doctor" class="section doctor-section"><div class="portrait-frame"><img src="assets/source/publish-candidate/dr-edward-gerodias-scheduler.png" alt="Dr. Edward Gerodias" width="300" height="300"></div><div><p class="eyebrow">Meet Dr. G</p><h2>Serious about the work.<br>Never too serious with people.</h2><p>Dr. Edward Gerodias has built his Modesto practice around careful explanations, current dentistry, and treating people like neighbors.</p><p>Outside the operatory, his public story includes volunteer dentistry and years behind the piano and organ—another place where patience, timing, and a gentle touch matter.</p></div></section>
    <section id="comfort" class="section comfort-section"><div><p class="eyebrow">The experience</p><h2>A calmer rhythm from hello to done.</h2><ul><li>We explain the plan before treatment begins.</li><li>Modern tools support precise, efficient visits.</li><li>Families see familiar people who know their history.</li></ul></div><img src="assets/optimized/care-chair-detail.webp" alt="A modern dental treatment chair in a calm operatory concept" loading="lazy" width="1536" height="1024"></section>
    <section id="voices" class="section voices-section"><p class="eyebrow">Patient voices</p><h2>Warmth is the pattern.</h2><div class="voice-grid"><blockquote><p>“Gentle, knowledgeable, and kind” comes up again and again.</p><cite>Paraphrased review theme</cite></blockquote><blockquote><p>Patients describe a team that remembers them and puts them at ease.</p><cite>Paraphrased review theme</cite></blockquote><blockquote><p>Many families say they have stayed for decades—and bring the next generation.</p><cite>Paraphrased review theme</cite></blockquote></div><a class="text-link" href="https://schedule.solutionreach.com/scheduling/subscriber/48415/scheduler-basic">See current scheduler reviews</a></section>
    <section id="questions" class="section questions-section"><p class="eyebrow">Good questions welcome</p><h2>Let’s make the next step easy.</h2><div class="faq-list"><details><summary>Are you accepting new patients?</summary><p>The public scheduler currently includes a new-patient exam option. Call the office to confirm current availability and find the right visit.</p></details><details><summary>What should I bring to my first appointment?</summary><p>Bring a photo ID, current insurance information if applicable, a medication list, and any questions you want the team to address.</p></details><details><summary>What if I have an urgent dental concern?</summary><p>Call the office at (209) 526-4244 so the team can understand the situation and explain the appropriate next step.</p></details></div></section>
    <section id="visit" class="section visit-section"><div><p class="eyebrow">Come say hello</p><h2>Your chair is waiting.</h2><address>220 Standiford Ave Ste B<br>Modesto, CA 95350</address><p>Office hours are available by calling the practice.</p></div><div class="visit-actions"><a class="button button-primary" href="tel:+12095264244">Call (209) 526-4244</a><a class="button button-quiet" href="https://www.google.com/maps/search/?api=1&amp;query=220%20Standiford%20Ave%20Ste%20B%20Modesto%20CA%2095350">Get directions</a><a class="text-link" href="https://schedule.solutionreach.com/scheduling/subscriber/48415/scheduler-basic">Request online</a></div></section>
  </main>
  <footer><p>Edward S. Gerodias, D.M.D. · Modesto, California</p><p class="demo-note">Local website concept. Practice details and image permissions require owner review before publication.</p></footer>
</body>
</html>
```

- [ ] **Step 4: Run the semantic-page test**

Run: `node --test tests/site.test.mjs`

Expected: PASS with `4` passing tests.

- [ ] **Step 5: Commit the semantic page**

```powershell
git add -- "Uncle Ed/index.html" "Uncle Ed/tests/site.test.mjs"
git commit -m "feat: build Uncle Ed semantic landing page"
```

---

### Task 5: Gentle Maestro Responsive Styling

**Files:**
- Create: `Uncle Ed/styles.css`
- Modify: `Uncle Ed/tests/site.test.mjs`

**Interfaces:**
- Consumes: Semantic class names in `index.html`
- Produces: CSS custom properties `--ivory`, `--navy`, `--porcelain`, `--brass`, `--coral`; responsive breakpoints at `900px` and `640px`; reduced-motion behavior

- [ ] **Step 1: Add a failing design-system test**

```js
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
```

- [ ] **Step 2: Run the test and confirm `styles.css` is missing**

Run: `node --test tests/site.test.mjs`

Expected: FAIL with `ENOENT` for `styles.css`.

- [ ] **Step 3: Implement the full visual system**

Create `styles.css` with these required foundations, then style every class present in `index.html` without adding a UI framework:

```css
@font-face { font-family: 'DM Sans'; src: url('assets/fonts/dm-sans-400.ttf') format('truetype'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'DM Sans'; src: url('assets/fonts/dm-sans-500.ttf') format('truetype'); font-weight: 500; font-display: swap; }
@font-face { font-family: 'DM Sans'; src: url('assets/fonts/dm-sans-600.ttf') format('truetype'); font-weight: 600; font-display: swap; }
@font-face { font-family: 'Newsreader'; src: url('assets/fonts/newsreader-400.ttf') format('truetype'); font-weight: 400; font-display: swap; }
@font-face { font-family: 'Newsreader'; src: url('assets/fonts/newsreader-500.ttf') format('truetype'); font-weight: 500; font-display: swap; }

:root {
  --ivory: #f5efe4;
  --navy: #13283a;
  --porcelain: #fffdf8;
  --brass: #aa8251;
  --coral: #c96f5d;
  --ink: #192329;
  --muted: #667079;
  --line: rgba(19, 40, 58, .16);
  --serif: 'Newsreader', Georgia, serif;
  --sans: 'DM Sans', 'Segoe UI', sans-serif;
  --max: 1240px;
  --radius: 28px;
  color-scheme: light;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--ivory); color: var(--ink); font-family: var(--sans); line-height: 1.6; }
img { display: block; max-width: 100%; height: auto; }
a { color: inherit; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.skip-link { position: fixed; z-index: 100; top: 1rem; left: 1rem; transform: translateY(-180%); background: var(--navy); color: white; padding: .75rem 1rem; }
.skip-link:focus { transform: translateY(0); }
:focus-visible { outline: 3px solid var(--coral); outline-offset: 4px; }
.section { width: min(calc(100% - 40px), var(--max)); margin-inline: auto; padding: clamp(5rem, 9vw, 9rem) 0; }
.eyebrow { color: var(--coral); font-size: .76rem; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; }
h1, h2 { font-family: var(--serif); font-weight: 400; line-height: .98; letter-spacing: -.035em; text-wrap: balance; }
h1 { font-size: clamp(3.7rem, 8vw, 7.8rem); margin: 1rem 0 1.5rem; }
h2 { font-size: clamp(2.8rem, 5.4vw, 5.8rem); margin: 1rem 0 2rem; }
h1 em { color: var(--brass); font-weight: 400; }
.button { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: .85rem 1.3rem; font-weight: 600; text-decoration: none; transition: transform .2s ease, background .2s ease, color .2s ease; }
.button:hover { transform: translateY(-2px); }
.button-primary { background: var(--navy); color: white; }
.button-quiet { border: 1px solid var(--line); background: rgba(255,255,255,.45); }
.js [data-reveal] { opacity: 0; transform: translateY(20px); transition: opacity .7s ease, transform .7s ease; }
.js [data-reveal].is-visible { opacity: 1; transform: none; }

@media (max-width: 900px) {
  .site-header { grid-template-columns: 1fr auto auto; }
  .js [data-nav] { position: absolute; inset: 100% 20px auto; display: none; padding: 1rem; background: var(--porcelain); border: 1px solid var(--line); border-radius: 18px; }
  .js [data-nav].is-open { display: grid; }
  .js .menu-toggle { display: inline-flex; min-height: 44px; align-items: center; }
  .hero, .comfort-section { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .header-call { font-size: 0; width: 46px; height: 46px; padding: 0; }
  .header-call::after { content: 'Call'; font-size: .78rem; }
  .section { width: min(calc(100% - 28px), var(--max)); }
  .hero-actions, .visit-actions { align-items: stretch; flex-direction: column; }
  .voice-grid, .care-grid { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  [data-reveal] { opacity: 1; transform: none; }
}
```

Add the remaining component rules exactly as follows:

```css
body::before {
  content: '';
  position: fixed;
  z-index: -1;
  inset: 0;
  background: linear-gradient(120deg, rgba(255,255,255,.3), transparent 45%), url('assets/optimized/smile-light-texture.webp') center top / cover no-repeat;
  opacity: .14;
  pointer-events: none;
}

.site-header {
  position: sticky;
  z-index: 50;
  top: 0;
  display: grid;
  grid-template-columns: minmax(180px, 1fr) auto auto;
  align-items: center;
  gap: clamp(1rem, 3vw, 3rem);
  min-height: 78px;
  padding: .8rem max(20px, calc((100vw - var(--max)) / 2));
  border-bottom: 1px solid var(--line);
  background: rgba(245, 239, 228, .9);
  backdrop-filter: blur(18px);
}

.wordmark { display: inline-grid; width: max-content; color: var(--navy); line-height: 1; text-decoration: none; }
.wordmark span { font-family: var(--serif); font-size: 1.65rem; letter-spacing: -.03em; }
.wordmark small { margin-top: .28rem; font-size: .62rem; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; }
[data-nav] { display: flex; align-items: center; gap: clamp(.9rem, 2vw, 2rem); }
[data-nav] a { min-height: 44px; display: inline-flex; align-items: center; font-size: .88rem; font-weight: 500; text-decoration: none; }
[data-nav] a:hover { color: var(--coral); }
.menu-toggle { display: none; border: 1px solid var(--line); border-radius: 999px; padding: .65rem .85rem; background: var(--porcelain); color: var(--navy); font: inherit; }
.header-call { min-height: 44px; display: inline-flex; align-items: center; border-radius: 999px; padding: .65rem 1rem; background: var(--navy); color: white; font-size: .82rem; font-weight: 600; text-decoration: none; }

.hero {
  width: min(calc(100% - 40px), var(--max));
  min-height: calc(100svh - 78px);
  margin-inline: auto;
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  align-items: center;
  gap: clamp(2rem, 6vw, 6rem);
  padding: clamp(4rem, 8vw, 8rem) 0;
}
.hero-copy > p:not(.eyebrow) { max-width: 42rem; color: var(--muted); font-size: clamp(1.05rem, 1.5vw, 1.3rem); }
.hero-actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem; }
.hero-art { position: relative; margin: 0; }
.hero-art::before { content: ''; position: absolute; z-index: -1; width: 70%; aspect-ratio: 1; top: -8%; right: -8%; border: 1px solid var(--brass); border-radius: 50%; }
.hero-art img { width: 100%; min-height: 560px; object-fit: cover; border-radius: 48% 48% var(--radius) var(--radius); box-shadow: 0 30px 70px rgba(19,40,58,.16); }
.hero-art figcaption { margin-top: .7rem; color: var(--muted); font-size: .72rem; text-align: right; }

.trust-score {
  display: grid;
  grid-template-columns: auto minmax(180px, 1fr) auto;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem max(20px, calc((100vw - var(--max)) / 2));
  background: var(--navy);
  color: var(--porcelain);
}
.trust-score strong { color: var(--brass); font-family: var(--serif); font-size: clamp(2.8rem, 5vw, 5rem); font-weight: 400; line-height: 1; }
.trust-score span { max-width: 26rem; color: rgba(255,255,255,.72); font-size: .84rem; }
.trust-score a { min-height: 44px; display: inline-flex; align-items: center; font-weight: 600; text-underline-offset: .3em; }

.care-section > h2 { max-width: 880px; }
.care-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1rem; }
.care-card { min-height: 280px; grid-column: span 4; display: flex; flex-direction: column; padding: clamp(1.4rem, 2.5vw, 2.4rem); border: 1px solid var(--line); border-radius: var(--radius); background: rgba(255,253,248,.72); }
.care-card:nth-child(1), .care-card:nth-child(5) { grid-column: span 6; }
.care-card:nth-child(5) { position: relative; isolation: isolate; overflow: hidden; color: white; background: var(--navy) url('assets/optimized/instruments-still-life.webp') center / cover no-repeat; }
.care-card:nth-child(5)::before { content: ''; position: absolute; z-index: -1; inset: 0; background: linear-gradient(90deg, rgba(19,40,58,.96), rgba(19,40,58,.5)); }
.care-card span { color: var(--coral); font-size: .72rem; font-weight: 600; letter-spacing: .12em; }
.care-card h3 { margin: auto 0 .75rem; font-family: var(--serif); font-size: clamp(1.8rem, 2.5vw, 2.6rem); font-weight: 400; line-height: 1.05; }
.care-card p { margin: 0; color: var(--muted); }
.care-card:nth-child(5) p { color: rgba(255,255,255,.78); }

.doctor-section { display: grid; grid-template-columns: minmax(300px, .82fr) 1.18fr; align-items: center; gap: clamp(3rem, 8vw, 8rem); }
.doctor-section > div:last-child { max-width: 680px; }
.doctor-section > div:last-child > p:not(.eyebrow) { color: var(--muted); font-size: 1.05rem; }
.portrait-frame { position: relative; padding: clamp(1rem, 2vw, 1.8rem); }
.portrait-frame::before { content: ''; position: absolute; inset: 0 12% 7% 0; border: 1px solid var(--brass); border-radius: 48% 48% var(--radius) var(--radius); transform: rotate(-3deg); }
.portrait-frame img { position: relative; width: 100%; aspect-ratio: 1; object-fit: cover; object-position: center; border-radius: 48% 48% var(--radius) var(--radius); background: var(--porcelain); box-shadow: 0 24px 60px rgba(19,40,58,.14); image-rendering: auto; }

.comfort-section { display: grid; grid-template-columns: .9fr 1.1fr; align-items: center; gap: clamp(2rem, 6vw, 6rem); padding-inline: clamp(1.5rem, 5vw, 5rem); border-radius: calc(var(--radius) * 1.5); background: var(--navy); color: var(--porcelain); }
.comfort-section h2 { max-width: 640px; }
.comfort-section ul { margin: 2rem 0 0; padding: 0; list-style: none; }
.comfort-section li { padding: 1rem 0; border-top: 1px solid rgba(255,255,255,.15); color: rgba(255,255,255,.76); }
.comfort-section img { width: 100%; min-height: 520px; object-fit: cover; border-radius: var(--radius); }

.voices-section { position: relative; isolation: isolate; }
.voices-section::after { content: ''; position: absolute; z-index: -1; width: min(42vw, 560px); height: 68%; right: -8vw; bottom: 5%; border-radius: var(--radius) 0 0 var(--radius); background: linear-gradient(90deg, var(--ivory), transparent), url('assets/optimized/waiting-room-cadence.webp') center / cover no-repeat; opacity: .3; }
.voice-grid { display: grid; grid-template-columns: repeat(3, 1fr); margin: 3rem 0 2rem; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.voice-grid blockquote { margin: 0; padding: clamp(1.5rem, 3vw, 3rem); border-right: 1px solid var(--line); background: rgba(245,239,228,.78); }
.voice-grid blockquote:last-child { border-right: 0; }
.voice-grid p { margin: 0 0 2rem; font-family: var(--serif); font-size: clamp(1.5rem, 2.2vw, 2.2rem); line-height: 1.18; }
.voice-grid cite { color: var(--muted); font-size: .78rem; font-style: normal; letter-spacing: .08em; text-transform: uppercase; }
.text-link { min-height: 44px; display: inline-flex; align-items: center; color: var(--navy); font-weight: 600; text-decoration-thickness: 1px; text-underline-offset: .35em; }

.questions-section { display: grid; grid-template-columns: minmax(260px, .8fr) 1.2fr; column-gap: clamp(2rem, 7vw, 7rem); }
.questions-section > .eyebrow { grid-column: 1; }
.questions-section > h2 { grid-column: 1; align-self: start; }
.faq-list { grid-column: 2; grid-row: 1 / span 2; border-top: 1px solid var(--line); }
.faq-list details { border-bottom: 1px solid var(--line); }
.faq-list summary { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 0; color: var(--navy); font-family: var(--serif); font-size: clamp(1.35rem, 2vw, 1.9rem); cursor: pointer; list-style: none; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list summary::after { content: '+'; width: 2rem; height: 2rem; display: grid; place-items: center; flex: 0 0 auto; border: 1px solid var(--line); border-radius: 50%; font-family: var(--sans); font-size: 1rem; transition: transform .2s ease; }
.faq-list details[open] summary::after { transform: rotate(45deg); }
.faq-list details p { max-width: 680px; margin: 0; padding: 0 3rem 1.5rem 0; color: var(--muted); }

.visit-section { position: relative; overflow: hidden; display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 3rem; margin-bottom: clamp(2rem, 5vw, 5rem); padding-inline: clamp(1.5rem, 5vw, 5rem); border: 1px solid rgba(201,111,93,.24); border-radius: calc(var(--radius) * 1.5); background: rgba(255,253,248,.85) url('assets/optimized/smile-light-texture.webp') right center / auto 100% no-repeat; }
.visit-section h2 { max-width: 760px; }
.visit-section address { color: var(--navy); font-family: var(--serif); font-size: clamp(1.4rem, 2.4vw, 2.3rem); font-style: normal; line-height: 1.25; }
.visit-section > div:first-child > p:last-child { color: var(--muted); }
.visit-actions { min-width: min(100%, 260px); display: flex; flex-direction: column; align-items: stretch; gap: .8rem; }

footer { display: flex; justify-content: space-between; gap: 2rem; padding: 2rem max(20px, calc((100vw - var(--max)) / 2)); background: var(--navy); color: var(--porcelain); }
footer p { margin: 0; }
.demo-note { max-width: 620px; color: rgba(255,255,255,.62); font-size: .76rem; text-align: right; }

@media (max-width: 900px) {
  [data-nav] { grid-column: 1 / -1; flex-wrap: wrap; }
  .hero-art img { min-height: 420px; }
  .care-card, .care-card:nth-child(1), .care-card:nth-child(5) { grid-column: span 6; }
  .doctor-section { grid-template-columns: minmax(240px, .72fr) 1.28fr; gap: 2rem; }
  .questions-section { grid-template-columns: 1fr; }
  .questions-section > .eyebrow, .questions-section > h2, .faq-list { grid-column: 1; grid-row: auto; }
  .visit-section { grid-template-columns: 1fr; align-items: start; }
  .visit-actions { min-width: 0; }
}

@media (max-width: 640px) {
  .site-header { padding-inline: 14px; }
  .hero { width: min(calc(100% - 28px), var(--max)); min-height: auto; }
  .hero-art img { min-height: 360px; }
  .trust-score { grid-template-columns: auto 1fr; padding-inline: 14px; }
  .trust-score a { grid-column: 1 / -1; }
  .care-card, .care-card:nth-child(1), .care-card:nth-child(5) { grid-column: 1 / -1; min-height: 240px; }
  .doctor-section, .comfort-section { grid-template-columns: 1fr; }
  .portrait-frame { width: min(100%, 420px); margin-inline: auto; }
  .comfort-section { padding-block: 3rem; }
  .comfort-section img { min-height: 360px; }
  .voice-grid { grid-template-columns: 1fr; }
  .voice-grid blockquote { border-right: 0; border-bottom: 1px solid var(--line); }
  .voice-grid blockquote:last-child { border-bottom: 0; }
  .voices-section::after { display: none; }
  footer { flex-direction: column; }
  .demo-note { text-align: left; }
}
```

- [ ] **Step 4: Run the design-system test**

Run: `node --test tests/site.test.mjs`

Expected: PASS with `5` passing tests.

- [ ] **Step 5: Commit the responsive visual system**

```powershell
git add -- "Uncle Ed/styles.css" "Uncle Ed/tests/site.test.mjs"
git commit -m "feat: style Gentle Maestro dental experience"
```

---

### Task 6: Progressive Enhancement and Data Hydration

**Files:**
- Create: `Uncle Ed/script.js`
- Modify: `Uncle Ed/index.html`
- Modify: `Uncle Ed/tests/site.test.mjs`

**Interfaces:**
- Consumes: `[data-menu-toggle]`, `[data-nav]`, `[data-reveal]`, `[data-services]`, and `data/practice.json`
- Produces: `renderServices(services)`, mobile navigation state, reveal state, and hardcoded service-card fallback in HTML

- [ ] **Step 1: Add a failing enhancement-contract test**

```js
test('progressive enhancements preserve fallbacks and accessible state', async () => {
  const html = await read('index.html');
  const js = await read('script.js');
  assert.match(html, /data-services>[\s\S]*New-patient exams/);
  assert.match(js, /fetch\(['"]data\/practice\.json['"]\)/);
  assert.match(js, /aria-expanded/);
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /document\.documentElement\.classList\.add\(['"]js['"]\)/);
  assert.match(js, /catch\s*\(/);
});
```

- [ ] **Step 2: Run the test and confirm the script is missing**

Run: `node --test tests/site.test.mjs`

Expected: FAIL with `ENOENT` for `script.js`.

- [ ] **Step 3: Put meaningful fallback services in the HTML**

Replace the empty care grid with:

```html
<div class="care-grid" data-services>
  <article class="care-card"><span>01</span><h3>New-patient exams</h3><p>A clear first visit, careful evaluation, cleaning, and appropriate imaging.</p></article>
  <article class="care-card"><span>02</span><h3>Preventive care</h3><p>Consistent cleanings and practical guidance for long-term oral health.</p></article>
  <article class="care-card"><span>03</span><h3>Fillings</h3><p>Thoughtful restorative care with comfort and communication in the room.</p></article>
  <article class="care-card"><span>04</span><h3>Crowns</h3><p>Careful restoration planning designed around function, fit, and appearance.</p></article>
  <article class="care-card"><span>05</span><h3>Orthodontics</h3><p>Smile-alignment care listed through the practice's public scheduler.</p></article>
</div>
```

- [ ] **Step 4: Implement resilient enhancements**

```js
// script.js
document.documentElement.classList.add('js');

const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

const closeMenu = () => {
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
};

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const renderServices = (services) => services.map((service, index) => `
  <article class="care-card">
    <span>${String(index + 1).padStart(2, '0')}</span>
    <h3>${escape(service.name)}</h3>
    <p>${escape({
      'New-patient exams': 'A clear first visit, careful evaluation, cleaning, and appropriate imaging.',
      'Cleanings and preventive care': 'Consistent care and practical guidance for long-term oral health.',
      'Fillings': 'Thoughtful restorative care with comfort and communication in the room.',
      'Crowns': 'Careful restoration planning designed around function, fit, and appearance.',
      'Orthodontics': 'Smile-alignment care listed through the practice’s public scheduler.'
    }[service.name] || 'Call the office to ask how this care fits your needs.')}</p>
  </article>
`).join('');

fetch('data/practice.json')
  .then((response) => {
    if (!response.ok) throw new Error(`Practice data returned ${response.status}`);
    return response.json();
  })
  .then((practice) => {
    const services = document.querySelector('[data-services]');
    if (services && Array.isArray(practice.services)) services.innerHTML = renderServices(practice.services);
  })
  .catch((error) => console.info('Using embedded practice content.', error.message));

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }), {threshold: .15});
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
```

- [ ] **Step 5: Run the enhancement-contract test**

Run: `node --test tests/site.test.mjs`

Expected: PASS with `6` passing tests.

- [ ] **Step 6: Commit the progressive enhancements**

```powershell
git add -- "Uncle Ed/index.html" "Uncle Ed/script.js" "Uncle Ed/tests/site.test.mjs"
git commit -m "feat: add resilient Uncle Ed interactions"
```

---

### Task 7: Documentation, Content Guardrails, and Full Verification

**Files:**
- Create: `Uncle Ed/README.md`
- Modify: `Uncle Ed/tests/site.test.mjs`
- Modify as needed after visual inspection: `Uncle Ed/index.html`
- Modify as needed after visual inspection: `Uncle Ed/styles.css`
- Modify as needed after visual inspection: `Uncle Ed/script.js`

**Interfaces:**
- Consumes: Complete site, asset ledger, and centralized practice data
- Produces: Repeatable preview instructions, owner-verification checklist, clean automated test run, and desktop/mobile visual evidence

- [ ] **Step 1: Add final content and asset-reference tests**

```js
test('page references only approved asset categories and carries demo disclosure', async () => {
  const html = await read('index.html');
  assert.doesNotMatch(html, /assets\/source\/reference-only/);
  assert.match(html, /Concept imagery; not the actual office\./);
  assert.match(html, /Practice details and image permissions require owner review before publication\./);
  assert.doesNotMatch(html, /best dentist|pain[- ]free|guarantee|board[- ]certified/i);
});

test('all local HTML asset references resolve', async () => {
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
```

- [ ] **Step 2: Run the full suite before documentation**

Run: `node --test tests/*.test.mjs`

Expected: PASS with `8` passing tests.

- [ ] **Step 3: Create the operating README**

```markdown
# Edward S. Gerodias Dental Website Concept

Local-only website concept for Edward S. Gerodias, D.M.D. in Modesto, California.

## Preview

From this folder:

```powershell
python -m http.server 4173
```

Open `http://localhost:4173/`.

## Test

```powershell
node --test tests/*.test.mjs
```

## Asset policy

- `assets/source/publish-candidate/` contains apparent practice-owned material that still requires owner approval before public use.
- `assets/source/reference-only/` is research material and must never be referenced by the public page.
- `assets/generated/` contains original fictional or abstract imagery.
- `assets/optimized/` contains the compressed generated imagery used by the page.
- `assets/SOURCES.md` is the source-of-truth provenance ledger.

## Owner confirmation before publication

- Confirm preferred practice name and wordmark
- Confirm office hours
- Confirm accepted insurance language
- Confirm English, Spanish, and Tagalog availability
- Confirm each listed service and preferred terminology
- Approve portrait use
- Approve biography and music/community details
- Approve direct patient quotations if added
- Confirm scheduler URL and preferred primary conversion action
- Replace the concept disclaimer after every item above is approved

## Privacy

The site contains no custom patient form, stores no patient data, and sends appointment requests only through the existing Solutionreach scheduler.
```

- [ ] **Step 4: Start the local server and smoke-test HTTP delivery**

Run in a background PowerShell process:

```powershell
Start-Process -WindowStyle Hidden python -ArgumentList '-m','http.server','4173' -WorkingDirectory $PWD
```

Run: `curl.exe -I http://localhost:4173/`

Expected: `HTTP/1.0 200 OK` and `Content-type: text/html`.

- [ ] **Step 5: Perform desktop and mobile visual review**

Open `http://localhost:4173/` at approximately `1440x1000`, `768x1024`, and `390x844`.

Confirm:

- no horizontal scrolling
- hero copy remains readable over the ivory field
- portrait is not stretched or clipped through the face
- all five service cards wrap cleanly
- sticky navigation does not cover section headings
- mobile navigation exposes visible focus and closes after a link activates
- phone and appointment actions remain visible and at least `44px` high
- reduced-motion mode shows all reveal content immediately
- reference-only imagery never appears

- [ ] **Step 6: Run the final automated verification**

Run: `node --test tests/*.test.mjs`

Expected: PASS with `8` passing tests, `0` failures.

Run: `git diff --check -- "Uncle Ed"`

Expected: No output and exit code `0`.

- [ ] **Step 7: Commit the verified local site**

```powershell
git add -- "Uncle Ed/README.md" "Uncle Ed/index.html" "Uncle Ed/styles.css" "Uncle Ed/script.js" "Uncle Ed/tests/site.test.mjs"
git commit -m "docs: finish Uncle Ed local website concept"
```

## Completion Evidence

Before reporting completion, capture:

- final `node --test tests/*.test.mjs` output
- final `git status --short -- "Uncle Ed"` output
- downloaded source filenames and byte sizes
- generated and optimized filenames and dimensions
- local preview URL and HTTP status
- explicit list of facts and permissions still requiring owner confirmation
