# Edward S. Gerodias, D.M.D. Website Design

Date: 2026-07-13  
Status: Awaiting user review  
Working title: The Gentle Maestro

## Purpose

Create a polished local website concept for Edward S. Gerodias, D.M.D. that feels elegant, established, warm, and genuinely fun. The site should make anxious patients feel safe, give families confidence, and convert visitors into phone calls or appointment requests without presenting unverified medical claims.

This is a local-first pitch/demo. Nothing will be published or connected to GitHub during this phase.

## Direction Options Considered

### 1. The Gentle Maestro — selected

Warm ivory, midnight navy, restrained brass, editorial typography, candid personality, and subtle music-inspired rhythm. The visual language communicates experience and precision without feeling formal or cold. This direction best fits Dr. Gerodias's sweet, fun-loving personality, elegant office, musical background, and long patient relationships.

### 2. Bright Modern Family

A lighter cream-and-sky palette, friendly rounded typography, and more obvious family imagery. It would be approachable and accessible, but less distinctive and more similar to common family-dentistry websites.

### 3. Modesto Heritage Practice

Deep green, parchment, serif typography, and community-history storytelling. It would strongly communicate longevity, but could feel too traditional and underplay the practice's modern technology.

## Brand Character

- Experienced, gentle, and trustworthy
- Sweet and welcoming, with genuine humor
- Proud of advanced dentistry without sounding clinical or boastful
- Family-oriented and comfortable across generations
- Quietly artistic: musicality appears through pacing, linework, and language rather than piano-key decoration
- Local and personal rather than corporate

## Visual System

- Primary colors: warm ivory, midnight navy, soft porcelain, muted brass
- Accent color: a restrained warm coral used for small moments of friendliness
- Typography: expressive editorial serif for major statements; clean humanist sans-serif for navigation, body copy, and forms
- Photography: real practice imagery when source rights are clear; otherwise original generated environment/detail imagery that does not impersonate Dr. Gerodias, staff, or patients
- Graphic language: fine rules, gentle arcs, soft light, restrained grain, and a subtle repeating cadence inspired by sheet-music spacing
- Motion: short fades, gentle vertical reveals, and refined hover feedback; no aggressive parallax or novelty animation

## Site Architecture

The first build will be a fast, self-contained static site with separated HTML, CSS, JavaScript, data, and assets so it remains easy to maintain and can later be published anywhere.

Planned structure:

- `index.html` — complete landing experience
- `styles.css` — design tokens, responsive layout, and motion
- `script.js` — navigation, reveal behavior, FAQ, and lightweight interaction
- `data/practice.json` — central source for business details, services, languages, and links
- `assets/source/` — downloaded public business assets retained with provenance
- `assets/generated/` — original AI-generated website imagery
- `assets/optimized/` — compressed production-ready versions used by the page
- `assets/SOURCES.md` — URL, capture date, owner/source, and usage status for every sourced asset
- `README.md` — local preview instructions and fact/permission checklist

## Page Experience

### Header

Simple wordmark, compact navigation, persistent call button, and a primary request-appointment action. On mobile, the call action stays immediately available.

### Hero

An elegant but warm introduction built around calm, experienced care. The copy should sound like Dr. Gerodias is personally welcoming a family into his office. The visual should feature either an authorized real portrait or a non-identifying original environment/detail image; generated imagery must never fabricate his likeness.

### Trust Strip

Concise proof points: Modesto location, family/general dentistry, languages spoken, and verified review reputation. Ratings and counts will include source attribution and capture date because they change over time.

### Care Overview

Clear service categories presented as patient needs rather than a wall of procedures. Any service not confirmed by the practice will be marked for verification in the data file and README before publication.

### Meet Dr. Gerodias

A personal introduction that balances credentials, volunteer dentistry, music, community, warmth, and humor. Public facts will be paraphrased rather than copied wholesale from third-party profiles.

### Comfort and Technology

A focused section explaining the office experience: gentle communication, clear explanations, cleanliness, current technology, and same-practice continuity. Claims will remain grounded in public practice information and review themes.

### Patient Voices

Short excerpts only from attributable public reviews, with source labels and links. The demo may use paraphrased themes until direct testimonial permission is confirmed.

### Visit and Conversion

Address, click-to-call phone number, map link, and the existing external appointment scheduler. Office hours will be omitted until the practice confirms them. No custom form will collect health or patient information in this static demo.

### Footer

Practice details, quick links, accessibility-minded contact actions, and a clear demo disclaimer until owner review is complete.

## Content and Data Rules

- Verified stable facts may appear directly: practice name, address, phone number, general-dentistry classification, and public scheduler URL.
- Drift-prone facts such as hours, insurance participation, service availability, review totals, and language coverage must carry a verification status in `practice.json`.
- No invented board certifications, awards, patient outcomes, insurance guarantees, or medical promises.
- No copied third-party marketing paragraphs.
- No fabricated portraits of Dr. Gerodias, employees, or patients.
- The fun personality should come through in copy, micro-interactions, and art direction—not unprofessional jokes about dental care.

## Asset Strategy

1. Collect public practice-owned or profile assets that can serve as references or demo material.
2. Record source URL, date, apparent owner, and usage status in `assets/SOURCES.md`.
3. Keep uncertain-rights assets under `assets/source/reference-only/` and do not use them in a publishable page.
4. Generate original hero atmosphere, dental-detail still life, waiting-room mood, and abstract smile/light textures that fit the selected theme.
5. Optimize selected assets to WebP or AVIF while retaining originals.
6. Prefer CSS/SVG for linework, marks, and icons so the identity stays sharp and editable.

## Interaction and Data Flow

- Page content reads stable business details from `data/practice.json` where practical, with a small static fallback for local file viewing.
- Calls use `tel:` links; directions use an external map link; appointments open the existing external scheduler.
- The site stores no patient information and sends no data to a custom backend.
- JavaScript enhancements are optional: core content and contact actions remain usable if scripts fail.

## Failure Handling

- Missing imagery falls back to designed color fields rather than broken-image icons.
- If the scheduler changes, the call action remains the reliable primary conversion path.
- If JavaScript is unavailable, navigation, service content, phone, directions, and appointment links still function.
- Unverified content is visibly marked in project data/documentation and excluded from any final publishable version.

## Responsive and Accessibility Requirements

- Mobile-first layout with comfortable tap targets and a visible phone action
- Semantic landmarks and logical heading order
- Keyboard-operable navigation, FAQ, and controls
- Visible focus states and reduced-motion support
- WCAG-aware contrast and readable type sizes
- Useful alternative text for meaningful images; decorative imagery remains ignored by assistive technology

## Verification

- Automated checks for required files, links, accessible names, image paths, and prohibited placeholder text
- Desktop and mobile browser review
- No-horizontal-scroll check at narrow widths
- Keyboard and reduced-motion review
- Link verification for phone, map, and scheduler
- Content audit against the source manifest and practice-data verification flags
- Final visual inspection of generated assets for dental inaccuracies, unwanted text, watermarks, and fabricated identity cues

## Definition of Done

The local folder contains a complete responsive website, sourced and generated asset libraries, provenance records, centralized business data, a fact/permission checklist, and verification notes. The experience should feel unmistakably personal to Dr. Gerodias while remaining honest about what has and has not been owner-approved.
