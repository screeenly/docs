---
description: Every option of the screenshot, PDF and rendered HTML endpoints, with defaults, limits and the combinations that fail validation.
---

# All options

Every option you can send to `/api/v1/shots` and `/api/v1/rendered-html`. Only `url` or `html` is required.

The last column shows which endpoint uses the option: **S** for screenshots, **P** for PDFs, **H** for rendered HTML. Other endpoints ignore it.

Limits marked "free: …" apply to accounts without a plan and without credits. See [Free plan](/guide/api/introduction/free-plan).

## Source

| Option | Type | Default | Description | Used by |
| --- | --- | --- | --- | --- |
| `url` | string | | The page to load. Must start with `http://` or `https://` and be reachable from the internet. Required without `html`. | S P H |
| `html` | string | | HTML to render instead of a URL. Up to 2,000,000 characters. Required without `url`. | S P H |

If you send both, the `html` is rendered and `url` is ignored.

HTML can't reference `file://` URLs, `localhost`, `127.0.0.1` or `::1`. Images, stylesheets and fonts in your HTML must use absolute public URLs, or be inlined as `data:` URLs.

## Output

| Option | Type | Default | Description | Used by |
| --- | --- | --- | --- | --- |
| `file_type` | string | `png` | `png`, `jpg`, `webp` or `pdf`. | S P |
| `quality` | integer | | Image quality from 1 to 100. Only with `file_type` `jpg` or `webp`. Lower values give smaller files. | S |

## Viewport and area

| Option | Type | Default | Description | Used by |
| --- | --- | --- | --- | --- |
| `window_width` | integer | 800 | Width of the browser window in pixels. 1 to 10,000, free: 1,920. Requires `window_height` unless `full_page` is set. | S H |
| `window_height` | integer | 600 | Height of the browser window in pixels. 1 to 10,000, free: 1,080. Requires `window_width`. | S H |
| `device_scale_factor` | integer | 1 | Pixel density. 1 to 3, free: 1. A width of 1,280 with a factor of 2 gives an image 2,560 pixels wide. | S |
| `full_page` | boolean | `false` | Capture the whole scrollable page instead of the window. Not on the free plan. | S |
| `selector` | string | | CSS selector of one element to capture, for example `#chart`. Can't be combined with `full_page`. | S |
| `clip_x` | integer | | Left edge of the area to capture, in pixels. | S |
| `clip_y` | integer | | Top edge of the area to capture, in pixels. | S |
| `clip_width` | integer | | Width of the area to capture. Free: up to 1,920. | S |
| `clip_height` | integer | | Height of the area to capture. Free: up to 1,080. | S |
| `hide_background` | boolean | `false` | Leave out the page background. | S |
| `transparent_background` | boolean | `false` | Make the default white background transparent. Use with `png` or `webp`. | S |

The final image can be at most 16,384 pixels wide or high, and at most 40 megapixels. Width and height are multiplied by `device_scale_factor`.

`clip_x`, `clip_y`, `clip_width` and `clip_height` must be sent together, and can't be combined with `full_page`.

## PDF

| Option | Type | Default | Description | Used by |
| --- | --- | --- | --- | --- |
| `paper_format` | string | | `A0` to `A6`, `Letter`, `Legal`, `Tabloid` or `Ledger`. Required for PDFs unless you send `paper_width` and `paper_height`. | P |
| `paper_width` | number | | Paper width in millimeters, 1 to 5,000. Requires `paper_height`. | P |
| `paper_height` | number | | Paper height in millimeters, 1 to 5,000. Requires `paper_width`. | P |
| `paper_orientation` | string | `portrait` | `portrait` or `landscape`. | P |
| `paper_margins_top` | number | | Top margin in millimeters, 0 to 250. | P |
| `paper_margins_right` | number | | Right margin in millimeters, 0 to 250. | P |
| `paper_margins_bottom` | number | | Bottom margin in millimeters, 0 to 250. | P |
| `paper_margins_left` | number | | Left margin in millimeters, 0 to 250. | P |
| `pdf_show_background` | boolean | `true` | Print background colors and images. | P |
| `show_browser_header_and_footer` | boolean | `false` | Print a header and a footer on every page. | P |
| `header_html` | string | | HTML for the header. Up to 100,000 characters. Needs `show_browser_header_and_footer`. | P |
| `footer_html` | string | | HTML for the footer. Up to 100,000 characters. Needs `show_browser_header_and_footer`. | P |
| `initial_page_number` | integer | | The number of the first page, for the `pageNumber` placeholder in headers and footers. | P |

Send all four `paper_margins_*` options together. See [Headers and footers in PDFs](/guide/cookbook/print-headers-and-footers-in-pdfs) for the header and footer placeholders.

## Waiting for the page

By default, the capture starts once the page fired its `load` event.

| Option | Type | Default | Description | Used by |
| --- | --- | --- | --- | --- |
| `delay` | integer | 0 | Wait this many milliseconds after the page loaded. 0 to 30,000, free: 2,000. | S P H |
| `wait_for_selector` | string | | Wait until an element matching this CSS selector exists. Fails with a timeout if it never appears. | S P H |
| `wait_until_network_idle` | boolean | `false` | Wait until the page has at most 2 open network connections for 500 ms. Works for pages that keep polling a server. | S P H |
| `wait_until_network_idle_strict` | boolean | `false` | Wait until the page has no open network connections for 500 ms. | S P H |
| `timeout` | integer | 10 | Give up after this many seconds. 0 to 60, free: 15. | S P H |

The `timeout` covers loading the page and all waiting. A `delay` of 8,000 ms with the default `timeout` of 10 seconds leaves 2 seconds to load the page. Raise `timeout` when you add waits.

## Page behavior

| Option | Type | Default | Description | Used by |
| --- | --- | --- | --- | --- |
| `css_media_type` | string | | `screen` or `print`. Without it, screenshots use `screen` styles and PDFs use `print` styles. | S P H |
| `color_scheme` | string | | `light` or `dark`. Sets `prefers-color-scheme` for pages with a dark mode. | S P H |
| `browser_language` | string | `en-GB` | Language of the browser, for example `de` or `fr-CH`. Sites that pick the language from the browser use it. | S P H |
| `disable_javascript` | boolean | `false` | Load the page without running JavaScript. | S P H |
| `disable_images` | boolean | `false` | Load the page without images. | S P H |
| `dismiss_dialogs` | boolean | `false` | Close JavaScript `alert`, `confirm` and `prompt` dialogs. Doesn't close cookie banners. | S P H |
| `block_urls` | array of strings | | Don't load resources whose URL contains one of these strings, for example `["analytics.js"]`. Up to 50 entries. | S P H |
| `block_domains` | array of strings | | Don't load resources from these domains, for example `["googletagmanager.com"]`. Up to 50 entries. | S P H |
| `ignore_https_errors` | boolean | `false` | Load pages with invalid or self-signed certificates. | S P H |
| `disable_web_security` | boolean | `false` | Turn off CORS checks in the browser. | S P H |

## Logins and headers

| Option | Type | Default | Description | Used by |
| --- | --- | --- | --- | --- |
| `http_headers` | array of objects | | Extra headers sent with every request of the page. Each object has a `key` and a `value`. Up to 50. | S P H |
| `cookies` | array of objects | | Cookies to set before the page loads. Each object has a `key`, a `value` and an optional `domain`. Up to 50. | S P H |
| `basic_authentication_username` | string | | Username for HTTP basic authentication. Requires the password. | S P H |
| `basic_authentication_password` | string | | Password for HTTP basic authentication. Requires the username. | S P H |

Arrays need a JSON body, or the `http_headers[0][key]=...` notation in form data:

```json
{
    "url": "https://example.com/dashboard",
    "http_headers": [
        { "key": "X-Preview-Token", "value": "secret" }
    ],
    "cookies": [
        { "key": "session", "value": "abc123", "domain": "example.com" }
    ]
}
```

We don't store cookies or basic authentication credentials. Header values are stored with the request. See [Which data of my requests is stored?](/guide/faq/which-data-of-my-api-request-is-stored-or-logged)

## Request behavior

| Option | Type | Default | Description | Used by |
| --- | --- | --- | --- | --- |
| `test_request` | boolean | `false` | Validate the request and return a placeholder without starting a browser. See [Test requests](/guide/api/introduction/test-requests). | S P H |
| `cache` | boolean | `true` | Set to `false` to render the page again instead of returning a stored result. Not on the free plan. See [Caching](/guide/api/introduction/caching). | S P H |
| `cache_ttl` | integer | 86400 | How long to keep the result, in seconds. 60 to 86,400. Not on the free plan. | S P H |

## Related

- [Screenshots and PDFs](/guide/api/available-endpoints/shots)
- [Rendered HTML](/guide/api/available-endpoints/rendered-html)
- [Errors](/guide/api/introduction/request-errors)
- [API reference](/reference/)
