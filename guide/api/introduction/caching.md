---
description: When screeenly returns a stored result instead of rendering the page again, and how to control it with cache and cache_ttl.
---

# Caching

When you send the same request twice, screeenly returns the stored result of the first request instead of rendering the page again. Cached results are free: they don't count toward your monthly usage and don't use credits.

## When a request is the same

Two requests return the same result when all of these are the same:

- the account. Results are never shared between accounts.
- the endpoint (`/shots` or `/rendered-html`).
- the `url` or `html`.
- every option. An option you leave out and an option set to its default count as the same.

Cookies, HTTP headers and basic authentication credentials are part of the comparison. Upper or lower case in the scheme and the host of the URL don't matter, and neither does the `#fragment`. The path and the query string must match exactly.

A request only gets a cached result while the stored file or HTML exists. Failed requests are not cached.

## How to tell

| | Rendered | From the cache |
| --- | --- | --- |
| Status code | `201` | `200` |
| `X-Cache` header | `MISS` | `HIT` |

A cached response has the same `shot_url` and `expires_at` as the first response.

## How long results are kept

Results are kept for 24 hours. During that time, identical requests return the stored result, and `shot_url` works. After that, the file is deleted and the next identical request renders the page again.

## Control the cache

With a plan or credits you can change both:

| Option | Description |
| --- | --- |
| `cache` | Set to `0` or `false` to render the page again. The new result is stored and used for later identical requests. |
| `cache_ttl` | How long to keep the result, in seconds. From 60 to 86,400 (24 hours). Also sets `expires_at`. |

::: code-group

```bash [curl]
curl --request POST \
  --url https://3.screeenly.com/api/v1/shots \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --data url=https://example.com \
  --data cache=0 \
  --data cache_ttl=600
```

```php [PHP]
use Illuminate\Support\Facades\Http;

$response = Http::withToken('YOUR_API_TOKEN')
    ->acceptJson()
    ->post('https://3.screeenly.com/api/v1/shots', [
        'url' => 'https://example.com',
        'cache' => false,
        'cache_ttl' => 600,
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
    body: JSON.stringify({ url: 'https://example.com', cache: false, cache_ttl: 600 }),
});
```

```python [Python]
import requests

response = requests.post(
    "https://3.screeenly.com/api/v1/shots",
    headers={"Accept": "application/json", "Authorization": "Bearer YOUR_API_TOKEN"},
    json={"url": "https://example.com", "cache": False, "cache_ttl": 600},
)
```

:::

On the free plan, the cache is always on and results are kept for 24 hours. Sending `cache=0` or `cache_ttl` returns a `422` error.

## Get a fresh render on the free plan

If a page changes often, for example a dashboard, change the request so it no longer matches the earlier one. Add a query string that changes, such as `https://example.com/?v=2026-11-01T10`. The page receives the query string too, so only use one the page ignores.

## Related

- [Free plan](/guide/api/introduction/free-plan)
- [Request IDs and retries](/guide/api/introduction/request-ids)
- [How long are files stored?](/guide/faq/how-long-are-images-stored-on-screeenly-servers)
