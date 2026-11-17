# Margus Mägi — Portfolio

Single-page portfolio built with TanStack Start, React and Tailwind CSS.
Live: https://kanemount.github.io/portfolio/

## Local setup

Requires [Bun](https://bun.sh).

```sh
bun install
bun run dev        # dev server at http://localhost:8080
bun run build      # normal build (Lovable hosting)
bun run test       # tests
```

## GitHub Pages build

```sh
bun run build:docs
```

This runs the existing `build:pages` command with `GITHUB_PAGES=true`, which prerenders `/`
to static HTML served from `/portfolio/` and copies `index.html` to `404.html` in `dist/client/`.
It then replaces **`docs/`** with all files from `dist/client/` and adds an empty `docs/.nojekyll`.
Without `GITHUB_PAGES=true` the normal build and Lovable preview are unchanged.

After every change to the site, run **`bun run build:docs`** again and commit the updated
`docs/` folder together with the source changes, so GitHub Pages always serves the current site.

## Editing content

All text lives in `src/data/portfolio.ts`. To add a project, copy an existing entry in the
`projects` array and fill in its fields (number, title, category, details, contribution list,
tags, link and `media`). To edit one, change its fields there; components read everything
from this file.

## Project media

Put image and video files in `public/media/` and reference them in a project's `media` array
with a path relative to the site, without a leading slash, e.g.
`{ type: "image", src: "media/cradle-1.jpg", alt: "..." }`. For YouTube, `src` is just the
video ID. Projects with no media show the "MEDIA SLOT" placeholder.

## CV button

Put the PDF in `public/` (e.g. `public/margus-magi-cv.pdf`) and set
`cvUrl: "margus-magi-cv.pdf"` in `profile` in `src/data/portfolio.ts`. While `cvUrl` is
`null`, no CV button is shown.

## Deployment

GitHub Pages serves the pre-built files committed in `docs/`; there is no GitHub Actions
deployment workflow. In the repository settings, set Pages → Source to **Deploy from a branch**,
select **main** and **/docs**, then save. Commit and push the regenerated `docs/` folder
whenever the site changes.

Add `public/og-image.png` (1200x630) for the share preview image.
