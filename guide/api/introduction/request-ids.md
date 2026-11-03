---
description: Send an X-Request-ID header to trace requests and to retry a request after a network error without paying twice.
---

# Request IDs and retries

Every API request has an ID. Send your own in the `X-Request-ID` header, or screeenly generates one for you.

The ID is returned in the `X-Request-ID` response header and in `meta.request_id`, and it is shown in the [request log](https://3.screeenly.com/app/request-log) in the app. Include it when you contact support about a request.

## Send your own ID

```text
X-Request-ID: 550e8400-e29b-41d4-a716-446655440000
```

The ID can be 1 to 255 printable ASCII characters without spaces. A UUID works well. An invalid ID returns a `400` error:

```json
{
    "message": "The X-Request-ID header must be 1 to 255 printable ASCII characters without spaces."
}
```

## Retry without paying twice

If your connection drops before you get a response, send the same request again with the same `X-Request-ID`. You get the stored response of the first request back. It doesn't count toward your monthly usage and doesn't use a credit.

- A replayed response has the header `X-Request-Replayed: true` and the status code of the first response.
- Only successful responses are stored. A retry after an error renders the page again.
- The stored response is available as long as the file or rendered HTML exists, 24 hours by default.
- If the first request with this ID is still running, the retry returns a `409` error. Wait for the first response, or wait a few seconds and retry again.
- If you send a different request with an ID you already used, the API returns a `422` error. Use a new ID for every new request.

```json
{
    "message": "This X-Request-ID was already used for a different request. Use a new ID for every new request."
}
```

::: code-group

```bash [curl]
curl --request POST \
  --url https://3.screeenly.com/api/v1/shots \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --header 'X-Request-ID: 550e8400-e29b-41d4-a716-446655440000' \
  --data url=https://example.com
```

```php [PHP]
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

$requestId = (string) Str::uuid();

$response = Http::withToken('YOUR_API_TOKEN')
    ->acceptJson()
    ->withHeader('X-Request-ID', $requestId)
    ->retry(3, 1000)
    ->post('https://3.screeenly.com/api/v1/shots', [
        'url' => 'https://example.com',
    ]);
```

```js [JavaScript]
const requestId = crypto.randomUUID();

const response = await fetch('https://3.screeenly.com/api/v1/shots', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer YOUR_API_TOKEN',
        'Content-Type': 'application/json',
        'X-Request-ID': requestId,
    },
    body: JSON.stringify({ url: 'https://example.com' }),
});
```

```python [Python]
import uuid
import requests

request_id = str(uuid.uuid4())

response = requests.post(
    "https://3.screeenly.com/api/v1/shots",
    headers={
        "Accept": "application/json",
        "Authorization": "Bearer YOUR_API_TOKEN",
        "X-Request-ID": request_id,
    },
    json={"url": "https://example.com"},
)
```

:::

Create the ID once, before the first attempt, and reuse it for every retry of that request. IDs that screeenly generates are not stored for replays, so retries without your own ID render the page again.

[Test requests](/guide/api/introduction/test-requests) are never stored for replays.

## Related

- [Caching](/guide/api/introduction/caching)
- [Errors](/guide/api/introduction/request-errors)
