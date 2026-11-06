---
description: Create an account and an API token, take your first screenshot and save the file.
---

# Quickstart

Take your first screenshot in a few minutes. You don't need a plan or a credit card.

## 1. Create an account and a token

1. [Sign up](https://3.screeenly.com/app/register) and verify your email address. Requests fail with a `403` error until you do.
2. Open [API Tokens](https://3.screeenly.com/app/api-tokens) and create a token. Copy it, it's shown only once.
3. Store the token in an environment variable, for example `SCREEENLY_API_TOKEN`. Don't commit it to your repository.

## 2. Send a request

::: code-group

```bash [curl]
curl --request POST \
  --url https://3.screeenly.com/api/v1/shots \
  --header 'Accept: application/json' \
  --header "Authorization: Bearer $SCREEENLY_API_TOKEN" \
  --data url=https://example.com \
  --data window_width=1280 \
  --data window_height=800
```

```php [PHP]
use Illuminate\Support\Facades\Http;

$response = Http::withToken(env('SCREEENLY_API_TOKEN'))
    ->acceptJson()
    ->timeout(90)
    ->post('https://3.screeenly.com/api/v1/shots', [
        'url' => 'https://example.com',
        'window_width' => 1280,
        'window_height' => 800,
    ]);

$response->throw();
```

```js [JavaScript]
const response = await fetch('https://3.screeenly.com/api/v1/shots', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.SCREEENLY_API_TOKEN}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        url: 'https://example.com',
        window_width: 1280,
        window_height: 800,
    }),
});

if (!response.ok) {
    throw new Error((await response.json()).message);
}
```

```python [Python]
import os
import requests

response = requests.post(
    "https://3.screeenly.com/api/v1/shots",
    headers={
        "Accept": "application/json",
        "Authorization": f"Bearer {os.environ['SCREEENLY_API_TOKEN']}",
    },
    json={"url": "https://example.com", "window_width": 1280, "window_height": 800},
    timeout=90,
)

response.raise_for_status()
```

:::

The request takes a few seconds, because a browser loads the page. The response looks like this:

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
            "usage": 1,
            "remaining": 99,
            "resets": "2026-12-01T00:00:00+00:00"
        }
    }
}
```

## 3. Save the file

`shot_url` is deleted after 24 hours. Download the file and store it yourself.

::: code-group

```bash [curl]
curl --output screenshot.png "SHOT_URL_FROM_THE_RESPONSE"
```

```php [PHP]
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

## Before you go to production

- Send requests from a background job. A request can take up to the `timeout` you set, at most 60 seconds.
- Send an [`X-Request-ID`](/guide/api/introduction/request-ids) and reuse it when you retry, so a retry after a network error doesn't count twice.
- Handle `429` errors by waiting for the `Retry-After` header. See [Rate limits](/guide/api/introduction/rate-limit).
- Use [test requests](/guide/api/introduction/test-requests) in your test suite. They don't count toward your usage.
- On the [free plan](/guide/api/introduction/free-plan), identical requests return the same file for 24 hours, and some options are limited.

## Next steps

- [Screenshots and PDFs](/guide/api/available-endpoints/shots)
- [Rendered HTML](/guide/api/available-endpoints/rendered-html)
- [All options](/guide/api/available-endpoints/options)
- Try options in the [playground](https://3.screeenly.com/app/playground). It builds the request for you.
