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
- **Content**: Markdown files in `guide/` (organized into `general/`, `quick-start/`, `api/`, `mcp/`, `cookbook/`, `faq/`) and `reference/`
- **API Reference**: `reference/index.md` uses `@scalar/api-reference` to render `public/screeenly-api.yaml` (OpenAPI spec)
- **Static assets**: `public/` (favicon, logo, OpenAPI spec), `assets/` (images used in docs)
- **Deployment**: GitHub Pages via `.github/workflows/deploy.yml`, triggered on push to `main`

## Content Conventions

- Sidebar navigation is manually configured in `.vitepress/config.mts` - new pages must be added there
- `cleanUrls: true` is enabled - links omit `.html` extensions
- `srcExclude` prevents `README.md` and `CLAUDE.md` from being treated as doc pages

## Theme

- `.vitepress/theme/` extends the VitePress default theme so the site looks like 3.screeenly.com.
- `tokens.css` is generated from `screeenly-3/resources/css/design/tokens.css`. Don't edit it. Run `npm run sync:design` after design changes in the app (set `SCREEENLY_APP_PATH` if the app repo is not at `../screeenly-3`). The script also copies the logo.
- `custom.css` maps the tokens onto VitePress's `--vp-*` variables. Use the token variables (`--color-ink`, `--color-purple`, ...) instead of hex values.
- The header (`nav` in `config.mts`) only links to the guides, the API reference, the playground and back to 3.screeenly.com. `components/NavCta.vue` adds the sign in and sign up buttons.
- `components/SiteFooter.vue` is a shorter version of `footer.blade.php` in the app: the logo, the status page and the legal pages. Update the legal links by hand when they change in the app.
- Dark mode is off (`appearance: false`) until the app has one.

## Writing docs

### Voice

Write plainly. State the thing and move on.

- Short sentences, active voice, the specific number or option name instead of a description of it.
- No rhetorical flourish, no intensifiers ("simply", "easily", "quietly", "dramatically"), no marketing adjectives.
- Don't announce what comes next ("Let's take a look at..."). Start with the content.
- Don't end a section with a line that repeats what it said.
- Address the reader as "you". Contractions are fine.

### Page template

```md
---
description: One sentence that says what the page covers. Used for search and link previews.
---

# Page title

One or two sentences: what this page helps you do.

## What you need

- An API token ([Authentication](/guide/api/introduction/authentication))
- Anything else the reader needs before starting

## Example request

::: code-group
(curl, PHP, JavaScript, Python, see below)
:::

## Response

(JSON response in a ```json block, trimmed to the fields that matter)

## Options

| Option | Type | Description |
| --- | --- | --- |
| `url` | string | The URL to capture. |

## Related

- [Shots](/guide/api/available-endpoints/shots)
- [API reference](/reference/)
```

Use one H1 per page. Leave out sections that don't apply.

### Examples

Show every endpoint example as a `::: code-group` with these four tabs, in this order:

````md
::: code-group

```bash [curl]
curl --request POST \
  --url https://3.screeenly.com/api/v1/shots \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --data url=https://example.com
```

```php [PHP]
use Illuminate\Support\Facades\Http;

$response = Http::withToken('YOUR_API_TOKEN')
    ->acceptJson()
    ->post('https://3.screeenly.com/api/v1/shots', [
        'url' => 'https://example.com',
    ]);
```

```js [JavaScript]
const response = await fetch('https://3.screeenly.com/api/v1/shots', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer YOUR_API_TOKEN',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: 'https://example.com' }),
});
```

```python [Python]
import requests

response = requests.post(
    "https://3.screeenly.com/api/v1/shots",
    headers={"Accept": "application/json", "Authorization": "Bearer YOUR_API_TOKEN"},
    json={"url": "https://example.com"},
)
```

:::
````

- PHP examples use the Laravel HTTP client. JavaScript uses `fetch`. Python uses `requests`.
- Use `https://example.com` (or another `example.*` domain) as the URL to capture. Never use real customer domains.
- Use `YOUR_API_TOKEN` as the token.

### Callouts

Use `::: tip`, `::: info`, `::: warning` and `::: danger` sparingly. They render in the app's mint, zinc, yellow and pink.

### Screenshots and images

- Put images in `assets/` and link them with a relative path, for example `![Full page screenshot](./../../assets/full-page-screenshot.png)`.
- Name files in kebab-case after the page or topic: `cookbook-open-graph-image.png`.
- Save PNGs at most 1600px wide. Always write alt text.

### Checklist for a new page

- Add the page to the sidebar in `.vitepress/config.mts`. Pages that are not in the sidebar can't be found.
- Endpoint examples use a `::: code-group` with curl, PHP, JavaScript and Python.
- `npm run docs:build` passes.

### OpenAPI spec

`public/screeenly-api.yaml` is maintained by hand. When request options change in `screeenly-3/app/Http/Requests/CreateBrowsershotRequest.php`, update the spec, `guide/api/available-endpoints/options.md` and the guide pages that mention those options.

Limits and defaults come from these files in the app. Check them before you change a number in the docs:

- `app/Domain/Browsershot/ScreenshotLimits.php`: option maxima and free plan limits
- `app/Domain/Browsershot/PendingBrowsershot.php`: option defaults
- `config/screeenly.php`: free monthly requests, cache TTLs, credit packs
- `app/Providers/RateLimitServiceProvider.php`: requests per minute
