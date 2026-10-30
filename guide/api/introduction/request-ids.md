---
description: Every API request has an ID. Send your own in the X-Request-ID header to find requests in your logs and to retry them safely.
---

# Request IDs

Every request to the screeenly API has an ID. You can send your own in the `X-Request-ID` header. If you don't, screeenly generates one.

The ID helps in two ways:

- **Finding a request.** We store the ID with the request and add it to our logs. If you contact support about a request, send us its ID and we can look it up directly. Logging the same ID in your application connects your logs with ours.
- **Retrying without paying twice.** If a request times out on your side or the connection drops, you don't know whether the screenshot was created. Send the request again with the same ID. If the first request succeeded, you get its response back and the retry doesn't count toward your usage.

## What you need

- An API token ([Authentication](/guide/api/introduction/authentication))

## Example request

Generate a new ID for every screenshot you want, for example a UUID, and store it before you send the request. Use the same ID when you retry.

::: code-group

```bash [curl]
curl --request POST \
  --url https://3.screeenly.com/api/v1/shots \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --header 'X-Request-ID: 0192f3c5-6d1e-7a8b-9c0d-1e2f3a4b5c6d' \
  --data url=https://example.com
```

```php [PHP]
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

$requestId = (string) Str::uuid();

$response = Http::withToken('YOUR_API_TOKEN')
    ->acceptJson()
    ->withHeader('X-Request-ID', $requestId)
    // Retries with the same ID when the connection fails.
    ->retry(3, 1000, fn (Throwable $exception): bool => $exception instanceof ConnectionException, throw: false)
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

## Response

The ID is returned in the `X-Request-ID` response header and in `meta.request_id`. The header is part of every response, including errors.

```text
X-Request-ID: 0192f3c5-6d1e-7a8b-9c0d-1e2f3a4b5c6d
```

```json
{
    "data": {
        "url": "https://example.com",
        "expires_at": "2026-10-30T11:12:23+00:00",
        "shot_url": "https://3.screeenly.com/storage/browsershots/c5d3b49b-b30b-4b4e-b8c4-2fca35eda4ac.png"
    },
    "meta": {
        "request_id": "0192f3c5-6d1e-7a8b-9c0d-1e2f3a4b5c6d"
    }
}
```

If you didn't send an ID, the response contains the one screeenly generated. Log it together with your own request so you can find it later.

## Repeated requests

When you send a request with an ID that you already used:

| Case | Response |
| --- | --- |
| The first request succeeded less than 60 minutes ago, with the same endpoint and options | The response of the first request, with the same status code and the header `X-Request-Replayed: true`. It doesn't count toward your usage. |
| The first request succeeded less than 60 minutes ago, with a different endpoint or options | `422`. Use a new ID for a new request. |
| The first request is still running | `409`. Wait for its response, then send the request again. |
| The first request failed (validation error, rate limit, render error) | The request runs again. Failed requests aren't stored. |
| The first request is older than 60 minutes | The request runs again and counts toward your usage. Its files expired after 60 minutes. |

IDs are scoped to your account. Another account using the same ID doesn't affect your requests.

[Test requests](/guide/api/introduction/test-requests) are never stored, since they don't count toward your usage.

## Rules for IDs

- 1 to 255 characters.
- Printable ASCII only, without spaces. UUIDs, ULIDs and IDs like `order-42` work.
- An invalid ID returns `400` with the message `The X-Request-ID header must be 1 to 255 printable ASCII characters without spaces.`

## Related

- [Request errors](/guide/api/introduction/request-errors)
- [Test requests](/guide/api/introduction/test-requests)
- [API reference](/reference/)
