---
description: Use test_request to build and test your integration without starting a browser and without using your monthly requests.
---

# Test requests

Set `test_request` to `true` and screeenly validates your request and returns a placeholder response without starting a browser. Use it while you build your integration and in your test suite.

## What a test request does

- It runs the same validation as a real request, so a wrong option returns the same `422` error.
- It returns right away with status `200`.
- `/shots` returns a `shot_url` to a placeholder image. `/rendered-html` returns a short placeholder HTML snippet.
- It doesn't count toward your monthly usage and doesn't use credits.
- It does count toward the [rate limits](/guide/api/introduction/rate-limit).
- Once your monthly requests and your credits are used up, test requests return a `403` error like real requests.

## Example request

::: code-group

```bash [curl]
curl --request POST \
  --url https://3.screeenly.com/api/v1/shots \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --data url=https://example.com \
  --data test_request=1
```

```php [PHP]
use Illuminate\Support\Facades\Http;

$response = Http::withToken('YOUR_API_TOKEN')
    ->acceptJson()
    ->post('https://3.screeenly.com/api/v1/shots', [
        'url' => 'https://example.com',
        'test_request' => app()->runningUnitTests(),
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
    body: JSON.stringify({ url: 'https://example.com', test_request: true }),
});
```

```python [Python]
import requests

response = requests.post(
    "https://3.screeenly.com/api/v1/shots",
    headers={"Accept": "application/json", "Authorization": "Bearer YOUR_API_TOKEN"},
    json={"url": "https://example.com", "test_request": True},
)
```

:::

## Response

```json
{
    "data": {
        "url": "https://example.com",
        "expires_at": "3026-11-01T10:00:00.000000Z",
        "shot_url": "https://3.screeenly.com/storage/test-request-screenshot.jpg"
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

`data.url` is always `https://example.com`, and the placeholder image is the same for every request. Don't use test requests to check what a page looks like. Use the [playground](https://3.screeenly.com/app/playground) for that.

## Related

- [Making requests](/guide/api/introduction/)
- [Errors](/guide/api/introduction/request-errors)
