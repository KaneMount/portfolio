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
bun run build:pages
```

This sets `GITHUB_PAGES=true`, which prerenders `/` to static HTML served from `/portfolio/`
and copies `index.html` to `404.html`. The static site is written to **`dist/client/`**.
Without `GITHUB_PAGES=true` the build is unchanged.

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

`.github/workflows/deploy.yml` runs on every push to `main` and on manual dispatch. It
installs with Bun, runs `bun run build:pages` and publishes `dist/client/` with
GitHub's Pages actions. In the repository settings, set Pages → Source to "GitHub Actions".

Add `public/og-image.png` (1200x630) for the share preview image.
