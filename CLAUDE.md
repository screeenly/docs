# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Documentation site for screeenly v3 (screenshot/PDF API service), hosted at https://docs.3.screeenly.com. Built with VitePress, using Scalar for the OpenAPI reference page.

## Commands

- `npm run docs:dev` - Start local dev server
- `npm run docs:build` - Build for production (output: `.vitepress/dist`)
- `npm run docs:preview` - Preview production build locally

Requires Node 24+ and npm 11+ (see `.nvmrc` and `package.json` engines).

## Architecture

- **VitePress config**: `.vitepress/config.mts` - site config, nav, and sidebar structure
- **Content**: Markdown files in `guide/` (organized into `general/`, `quick-start/`, `api/`, `cookbook/`, `faq/`) and `reference/`
- **API Reference**: `reference/index.md` uses `@scalar/api-reference` to render `public/screeenly-api.yaml` (OpenAPI spec)
- **Static assets**: `public/` (favicon, logo, OpenAPI spec), `assets/` (images used in docs)
- **Deployment**: GitHub Pages via `.github/workflows/deploy.yml`, triggered on push to `main`

## Content Conventions

- Sidebar navigation is manually configured in `.vitepress/config.mts` - new pages must be added there
- `cleanUrls: true` is enabled - links omit `.html` extensions
- `srcExclude` prevents `README.md` from being treated as a doc page
