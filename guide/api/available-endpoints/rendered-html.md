---
description: Get the HTML of a page after its JavaScript ran with POST /api/v1/rendered-html.
---

# Rendered HTML

`POST /api/v1/rendered-html` loads a URL or your HTML in Chrome, runs its JavaScript and returns the resulting HTML. Use it for pages that build their content in the browser, where a plain HTTP request only returns an empty app shell.

## What you need

- An API token ([Authentication](/guide/api/introduction/authentication))

## Example request

::: code-group

```bash [curl]
curl --request POST \
  --url https://3.screeenly.com/api/v1/rendered-html \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --data url=https://example.com
```

```php [PHP]
use Illuminate\Support\Facades\Http;

$response = Http::withToken('YOUR_API_TOKEN')
    ->acceptJson()
    ->post('https://3.screeenly.com/api/v1/rendered-html', [
        'url' => 'https://example.com',
    ]);

$html = $response->json('data.rendered_html');
```

```js [JavaScript]
const response = await fetch('https://3.screeenly.com/api/v1/rendered-html', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer YOUR_API_TOKEN',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: 'https://example.com' }),
});

const { data } = await response.json();
```

```python [Python]
import requests

response = requests.post(
    "https://3.screeenly.com/api/v1/rendered-html",
    headers={"Accept": "application/json", "Authorization": "Bearer YOUR_API_TOKEN"},
    json={"url": "https://example.com"},
)

html = response.json()["data"]["rendered_html"]
```

:::

## Response

```json
{
    "data": {
        "rendered_html": "<html><head><title>Example Domain</title></head><body><h1>Example Domain</h1></body></html>"
    },
    "meta": {
        "request_id": "0195f2a4-6c1e-7a51-9d3b-6c0f1e2a9b47",
        "usage_limit": {
            "limit": 100,
            "usage": 16,
            "remaining": 84,
            "resets": "2026-12-01T00:00:00+00:00"
        }
    }
}
```

The HTML is in the response itself. There is no file to download.

## Wait for the content

The HTML is read once the page fired its `load` event. Many single page apps load their data after that. Pick one of these options so the content is there:

| Option | Use it when |
| --- | --- |
| `wait_for_selector` | You know an element that appears once the content loaded, for example `.product-price`. |
| `wait_until_network_idle` | The page loads its data with a few requests and then stops. |
| `delay` | Nothing else works. Wait a fixed number of milliseconds. |

Raise `timeout` (10 seconds by default) when you add waits.

## Options

The rendered HTML endpoint accepts the same options as [Screenshots and PDFs](/guide/api/available-endpoints/shots), except those for images and PDFs such as `file_type`, `full_page` or `paper_format`. They are ignored. [All options](/guide/api/available-endpoints/options) marks which options apply.

## Related

- [All options](/guide/api/available-endpoints/options)
- [Making requests](/guide/api/introduction/)
- [API reference](/reference/)
