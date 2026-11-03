---
description: How to create an API token, send it with your requests and revoke it.
---

# Authentication

Every API request needs an API token. You send it as a Bearer token in the `Authorization` header.

## Create a token

1. [Sign up](https://3.screeenly.com/app/register) and verify your email address. Requests from accounts without a verified email address return a `403` error.
2. Open [API Tokens](https://3.screeenly.com/app/api-tokens) in the app and click **Create Token**.
3. Give the token a name, for example the name of the app that uses it.
4. Pick the abilities. Keep the default, `shot:create`, for API requests.
5. Copy the token. It is shown only once.

| Ability | Allows |
| --- | --- |
| `shot:create` | Creating screenshots, PDFs and rendered HTML. Includes `shot:read`. |
| `shot:read` | Listing your captures and reading your usage through the [MCP server](/guide/mcp/). Can't create captures. |

A token without `shot:create` gets a `403` error from the API.

Create one token per app or environment. Then you can revoke one without breaking the others, and the request log shows which app sent a request.

## Send the token

```text
Authorization: Bearer YOUR_API_TOKEN
```

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

Keep the token out of your code repository. Store it in an environment variable or your secret manager. Don't call the API from a browser or a mobile app, because anyone could read the token from there.

A missing or invalid token returns a `401` error:

```json
{
    "message": "Unauthenticated."
}
```

## Revoke a token

Delete the token on the [API Tokens](https://3.screeenly.com/app/api-tokens) page. Requests with that token fail with a `401` error right away.

## Related

- [Making requests](/guide/api/introduction/)
- [Errors](/guide/api/introduction/request-errors)
