---
description: What screeenly does and what you can build with it.
---

# What is screeenly?

screeenly is an API that loads web pages in a real Chrome browser. You send a URL or your own HTML, and get back:

- a screenshot as PNG, JPG or WebP
- a PDF
- the HTML of the page after its JavaScript ran

AI agents can use the same features through the [MCP server](/guide/mcp/).

## What people build with it

- Thumbnails of links, for example in a bookmarking app.
- PDFs of articles, recipes or reports.
- Invoices and documents designed in HTML and CSS, turned into PDFs.
- [Open Graph images](/guide/cookbook/generate-open-graph-images) for blog posts.
- Reading the content of single page apps, where a plain HTTP request only returns an empty page.
- Screenshots of a page in a pull request or a ticket.

## What it doesn't do

- It doesn't get past bot protection, Cloudflare challenges or CAPTCHAs. If a normal browser sees a challenge, so does screeenly.
- It can't load pages on `localhost` or in a private network. Send the HTML instead.
- It doesn't host your files. Files are deleted after 24 hours.

## Get started

- [Quickstart](/guide/quick-start/from-zero-to-hero)
- [Free plan](/guide/api/introduction/free-plan): 100 requests per month, no credit card.
- [Pricing](https://3.screeenly.com/pricing)
