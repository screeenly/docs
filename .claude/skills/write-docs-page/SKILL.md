---
name: write-docs-page
description: Use when adding or rewriting a page in the screeenly docs (guide, cookbook, FAQ or API pages). Covers the page template, code examples, sidebar entry and build check.
---

# Write a docs page

Read the "Writing docs" section in `CLAUDE.md` first. It has the voice rules, the page template and the example code for each language.

## Steps

1. Pick the folder: `guide/api/` for endpoints and API behaviour, `guide/cookbook/` for task-based guides, `guide/faq/` for single questions, `guide/general/` for everything else.
2. Name the file in kebab-case after the title, for example `guide/cookbook/capture-a-single-element.md`.
3. Write the page from the template in `CLAUDE.md`: front matter with `description`, one H1, a short intro, "What you need", example request, response, options, related pages. Leave out sections that don't apply.
4. Check option names, defaults and limits against `screeenly-3/app/Http/Requests/CreateBrowsershotRequest.php` and `public/screeenly-api.yaml`. Don't document options the API doesn't accept.
5. Add the page to the sidebar in `.vitepress/config.mts`.
6. Run `npm run docs:build`.

## Checklist

- [ ] Front matter has a `description`.
- [ ] One H1.
- [ ] Endpoint examples are a `::: code-group` with curl, PHP (Laravel HTTP client), JavaScript (fetch) and Python (requests), in that order.
- [ ] Examples use `https://example.com` and `YOUR_API_TOKEN`.
- [ ] Images are in `assets/`, have alt text and are at most 1600px wide.
- [ ] The page is in the sidebar in `.vitepress/config.mts`.
- [ ] Links to other docs pages are absolute paths without `.md` (`/guide/api/introduction/authentication`).
- [ ] `npm run docs:build` passes.
- [ ] No flourish, no intensifiers, no closing summary line.
