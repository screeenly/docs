---
description: Take a screenshot or create a PDF of a URL or of your own HTML with POST /api/v1/shots.
---

# Screenshots and PDFs

`POST /api/v1/shots` takes a screenshot (PNG, JPG or WebP) or creates a PDF of a URL or of HTML you send. The response contains a URL to download the file.

## What you need

- An API token ([Authentication](/guide/api/introduction/authentication))

## Screenshot of a URL

::: code-group

```bash [curl]
curl --request POST \
  --url https://3.screeenly.com/api/v1/shots \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --data url=https://example.com \
  --data window_width=1280 \
  --data window_height=800
```

```php [PHP]
use Illuminate\Support\Facades\Http;

$response = Http::withToken('YOUR_API_TOKEN')
    ->acceptJson()
    ->post('https://3.screeenly.com/api/v1/shots', [
        'url' => 'https://example.com',
        'window_width' => 1280,
        'window_height' => 800,
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
    body: JSON.stringify({
        url: 'https://example.com',
        window_width: 1280,
        window_height: 800,
    }),
});
```

```python [Python]
import requests

response = requests.post(
    "https://3.screeenly.com/api/v1/shots",
    headers={"Accept": "application/json", "Authorization": "Bearer YOUR_API_TOKEN"},
    json={"url": "https://example.com", "window_width": 1280, "window_height": 800},
)
```

:::

Without `window_width` and `window_height`, the browser window is 800 × 600 pixels. Send both together.

## Response

```json
{
    "data": {
        "url": "https://example.com",
        "expires_at": "2026-11-02T14:30:00+00:00",
        "shot_url": "https://3.screeenly.com/storage/149032/0c8532c6-38da-4389-a038-5e73e2c42304.png"
    },
    "meta": {
        "request_id": "0195f2a4-6c1e-7a51-9d3b-6c0f1e2a9b47",
        "usage_limit": {
            "limit": 100,
            "usage": 15,
            "remaining": 85,
            "resets": "2026-12-01T00:00:00+00:00"
        }
    }
}
```

| Field | Description |
| --- | --- |
| `data.url` | The URL you sent. `null` for HTML. |
| `data.shot_url` | Where to download the file. Download it before `expires_at`. |
| `data.expires_at` | When the file is deleted, 24 hours after the request by default. |
| `meta.request_id` | The ID of the request. See [Request IDs and retries](/guide/api/introduction/request-ids). |
| `meta.usage_limit` | Your monthly usage. See [Monthly usage and limit](/guide/api/introduction/monthly-usage-limit). |

## Download the file

The API returns a URL, not the file. Download it in a second request:

::: code-group

```bash [curl]
curl --output screenshot.png "SHOT_URL_FROM_THE_RESPONSE"
```

```php [PHP]
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

Storage::put('screenshot.png', Http::get($response->json('data.shot_url'))->body());
```

```js [JavaScript]
import { writeFile } from 'node:fs/promises';

const { data } = await response.json();
const file = await fetch(data.shot_url);

await writeFile('screenshot.png', Buffer.from(await file.arrayBuffer()));
```

```python [Python]
shot_url = response.json()["data"]["shot_url"]

with open("screenshot.png", "wb") as file:
    file.write(requests.get(shot_url).content)
```

:::

## Screenshot of your own HTML

Send `html` instead of `url`:

```json
{
    "html": "<html><body><h1>Hello World</h1></body></html>",
    "window_width": 1200,
    "window_height": 630
}
```

Load images, fonts and stylesheets from absolute public URLs. See [Generate Open Graph images](/guide/cookbook/generate-open-graph-images) for a full example.

## PDF of a URL

Set `file_type` to `pdf` and pick a `paper_format`, or send `paper_width` and `paper_height` in millimeters.

```json
{
    "url": "https://example.com",
    "file_type": "pdf",
    "paper_format": "A4"
}
```

PDFs use the `print` styles of the page. Set `css_media_type` to `screen` if the page looks wrong in print. Background colors and images are printed by default. Set `pdf_show_background` to `false` to leave them out.

## PDF of your own HTML

```json
{
    "html": "<html><body><h1>Invoice 2026-001</h1></body></html>",
    "file_type": "pdf",
    "paper_format": "A4",
    "paper_margins_top": 20,
    "paper_margins_right": 15,
    "paper_margins_bottom": 20,
    "paper_margins_left": 15
}
```

Margins are in millimeters. Send all four together. Use CSS like `page-break-before: always` to control where pages break.

## Common options

| Goal | Options |
| --- | --- |
| Capture the whole page, not only the window | `full_page: true` (not on the free plan) |
| Capture one element | `selector: "#chart"` |
| Capture an area | `clip_x`, `clip_y`, `clip_width`, `clip_height` |
| Sharper images for retina screens | `device_scale_factor: 2` |
| Smaller files | `file_type: "jpg"` or `"webp"` with `quality: 80` |
| Wait for content that loads late | `wait_for_selector`, `wait_until_network_idle` or `delay` |
| Capture the dark mode | `color_scheme: "dark"` |
| Hide ads and trackers | `block_domains` |
| Capture a page behind a login | `cookies`, `http_headers` or `basic_authentication_*` |

[All options](/guide/api/available-endpoints/options) lists every option with its default and limits. The [playground](https://3.screeenly.com/app/playground) builds the request for you and shows the result.

## Related

- [Making requests](/guide/api/introduction/)
- [All options](/guide/api/available-endpoints/options)
- [Full page and clipped screenshots](/guide/cookbook/create-full-page-screenshots)
- [Headers and footers in PDFs](/guide/cookbook/print-headers-and-footers-in-pdfs)
- [API reference](/reference/)
