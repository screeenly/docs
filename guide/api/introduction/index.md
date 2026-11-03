---
description: The base URL, request format, response format and status codes that apply to every screeenly API request.
---

# Making requests

Everything on this page applies to both endpoints: [Screenshots and PDFs](/guide/api/available-endpoints/shots) and [Rendered HTML](/guide/api/available-endpoints/rendered-html).

## Base URL

```text
https://3.screeenly.com/api/v1
```

| Endpoint | Returns |
| --- | --- |
| `POST /api/v1/shots` | A screenshot (PNG, JPG, WebP) or a PDF. |
| `POST /api/v1/rendered-html` | The HTML of the page after JavaScript ran. |

Both endpoints only accept `POST`.

## Headers

Send these headers with every request:

| Header | Value |
| --- | --- |
| `Authorization` | `Bearer YOUR_API_TOKEN`. See [Authentication](/guide/api/introduction/authentication). |
| `Accept` | `application/json` |
| `Content-Type` | `application/json` if you send JSON. Leave it out for form data. |

Without `Accept: application/json`, validation errors and `401` errors may come back as a redirect instead of a JSON error.

## Request body

Send the options as a JSON body or as form data. Both work the same.

Pass either `url` or `html`. Everything else is optional. [All options](/guide/api/available-endpoints/options) lists them with their defaults and limits.

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

### Boolean options

Boolean options such as `full_page` or `test_request` accept `true`, `false`, `1`, `0`, `"1"` and `"0"`.

The strings `"true"` and `"false"` fail validation. This happens when you send form data with `full_page=true`, or pass a Python `True` with `data=` instead of `json=`. Send `1` and `0` in form data, or use a JSON body.

## Response

A successful request returns JSON with a `data` and a `meta` object.

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

The rendered HTML endpoint returns `data.rendered_html` instead of `url`, `expires_at` and `shot_url`.

### Download the file before it expires

`shot_url` points to the file on our servers. It stops working at `expires_at`, 24 hours after the request by default. Download the file and store it yourself if you need it longer. Don't use `shot_url` in an `<img>` tag on your site.

See [Caching](/guide/api/introduction/caching) for how to change how long a file is kept.

## Status codes

| Status | Meaning |
| --- | --- |
| `201` | The page was rendered. |
| `200` | The result came from the [cache](/guide/api/introduction/caching), or the request was a [test request](/guide/api/introduction/test-requests) or a [replay](/guide/api/introduction/request-ids). |
| `400` | The browser failed to render the page or timed out, or the `X-Request-ID` header is invalid. |
| `401` | The API token is missing or invalid. |
| `403` | Your monthly requests and credits are used up, your email address is not verified, your account is blocked, or the token lacks the `shot:create` ability. |
| `409` | A request with the same `X-Request-ID` is still running. |
| `422` | The request failed validation. |
| `429` | You hit a rate limit or sent too many requests at the same time. |
| `500` | Something failed on our side. |

Treat any `2xx` status as a success. [Errors](/guide/api/introduction/request-errors) shows the response for each error and what to do about it.

## Response headers

| Header | Description |
| --- | --- |
| `X-Request-ID` | The ID of the request. See [Request IDs and retries](/guide/api/introduction/request-ids). |
| `X-Cache` | `HIT` if the result came from the cache, `MISS` if it was rendered. |
| `X-Usage-Limit` | Your monthly limit. |
| `X-Usage-Usage` | Requests made this month. |
| `X-Usage-Remaining` | Requests left this month. |
| `X-Usage-Resets` | When the usage resets, as an ISO 8601 date. |
| `X-Credits-Remaining` | Your credit balance. |
| `X-RateLimit-Limit` | Requests you can make per minute. |
| `X-RateLimit-Remaining` | Requests left in the current minute. |

## How long a request takes

A request returns once the page is rendered. Most requests take a few seconds. Requests with a `delay`, `wait_for_selector` or a slow page can take as long as the `timeout` you set, up to 60 seconds. Set the timeout of your HTTP client higher than that, and send requests from a background job if a user is waiting.

## Related

- [Quickstart](/guide/quick-start/from-zero-to-hero)
- [All options](/guide/api/available-endpoints/options)
- [Errors](/guide/api/introduction/request-errors)
- [API reference](/reference/)
