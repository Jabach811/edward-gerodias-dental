# Edward S. Gerodias Dental Website

Public website for Edward S. Gerodias, D.M.D. in Modesto, California.

Live site: https://jabach811.github.io/edward-gerodias-dental/

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

- `assets/source/publish-candidate/` preserves the original review-stage folder name; its provider portrait is now approved for this public site.
- `assets/source/reference-only/` is local research material and is intentionally excluded from this public repository and the public page.
- `assets/generated/` contains original fictional or abstract imagery.
- `assets/optimized/` contains the compressed generated imagery used by the page.
- `assets/fonts/` contains locally hosted font files (WOFF2 served first, TTF fallback) and their SIL Open Font License text.
- `assets/SOURCES.md` is the source-of-truth provenance ledger.
- `data/practice.json` is the content ledger for practice facts; the test suite fails if the page drifts from it.

## Publication status

The site concept, practice identity, listed services, provider portrait, biography details, scheduler link, and GitHub Pages publication were approved for public use on 2026-07-13.

The following facts remain intentionally omitted until separately confirmed:

- Office hours
- Accepted insurance language
- English, Spanish, and Tagalog availability
- Direct patient quotations

The canonical URL, Open Graph image, and JSON-LD image point to the current GitHub Pages site. Update all three together if the production domain changes.

## Privacy

The site contains no custom patient form, stores no patient data, and sends appointment requests only through the existing Solutionreach scheduler.
