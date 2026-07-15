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
- `assets/source/reference-only/` is local research material and is intentionally excluded from this public repository and the public page.
- `assets/generated/` contains original fictional or abstract imagery.
- `assets/optimized/` contains the compressed generated imagery used by the page.
- `assets/fonts/` contains locally hosted font files (WOFF2 served first, TTF fallback) and their SIL Open Font License text.
- `assets/SOURCES.md` is the source-of-truth provenance ledger.
- `data/practice.json` is the content ledger for practice facts; the test suite fails if the page drifts from it.

## Owner confirmation before publication

- Confirm preferred practice name and wordmark
- Confirm office hours
- Confirm accepted insurance language
- Confirm English, Spanish, and Tagalog availability
- Confirm each listed service and preferred terminology
- Approve portrait use (the page intentionally uses only the single standing portrait)
- Provide a team photograph for the marked swap point in the team section (`TEAM PHOTO SWAP POINT` comment in `index.html`)
- Approve biography and music/community details
- Approve direct patient quotations if added
- Confirm scheduler URL and preferred primary conversion action
- Confirm the production domain, then add a canonical link and switch `og:image` and the JSON-LD `image` to absolute URLs
- Replace the concept disclaimer after every item above is approved

## Privacy

The site contains no custom patient form, stores no patient data, and sends appointment requests only through the existing Solutionreach scheduler.
