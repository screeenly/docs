---
description: The errors the screeenly API returns, what causes them and how to fix them.
---

# Errors

Errors return a JSON body with a `message`. Validation errors also contain an `errors` object with a list of messages per option.

```json
{
    "message": "Error message"
}
```

Send the `Accept: application/json` header. Without it, some errors return a redirect instead of JSON.

| Status | Cause | Counts toward usage | Retry? |
| --- | --- | --- | --- |
| `400` | The page failed to render or timed out. | Yes | After changing the request |
| `400` | Invalid `X-Request-ID` header. | No | After fixing the header |
| `401` | Missing or invalid API token. | No | No |
| `403` | Monthly requests and credits used up, email not verified, account blocked, or token without `shot:create`. | No | No |
| `409` | A request with the same `X-Request-ID` is still running. | No | Yes, after a few seconds |
| `422` | The request failed validation. | No | After fixing the request |
| `429` | Rate limit or too many requests at the same time. | No | Yes, after `Retry-After` |
| `500` | Error on our side. | Depends | Yes |

## 400: Rendering failed or timed out

The browser started but couldn't finish the page. These requests count toward your monthly usage, because the browser already ran.

The page didn't load within `timeout`:

```json
{
    "message": "The request to https://example.com timed out after 10 seconds. Check that the server is available, increase the timeout and try again."
}
```

The default `timeout` is 10 seconds. Raise it, up to 15 seconds on the free plan and 60 seconds with a plan or credits. If you use `wait_for_selector`, check that the element appears on the page. If it never appears, the request runs until the timeout.

The browser crashed:

```json
{
    "message": "The given configuration crashed the browser. Error: net::ERR_NAME_NOT_RESOLVED at https://example.com Update your configuration and try again."
}
```

The message contains the error from Chrome. Common causes:

- `net::ERR_NAME_NOT_RESOLVED`, `net::ERR_CONNECTION_REFUSED`: the domain doesn't exist or the server doesn't accept connections from the internet.
- `net::ERR_CERT_*`: the site has an invalid certificate. Set `ignore_https_errors` to `true` if you trust the site.
- A `selector` that matches no element on the page.

See [Troubleshooting](/guide/faq/troubleshooting) for pages that load but look wrong.

## 401: Unauthenticated

```json
{
    "message": "Unauthenticated."
}
```

The `Authorization` header is missing, isn't in the form `Bearer YOUR_API_TOKEN`, or the token was deleted. Create a new token on the [API Tokens](https://3.screeenly.com/app/api-tokens) page.

## 403: Forbidden

Your monthly requests and credits are used up:

```json
{
    "message": "The monthly API usage limit has been reached (100 out of 100 requests) and there are no credits left. Upgrade your plan or buy credits under https://3.screeenly.com/app/billing/credits. The limit resets at the start of next month."
}
```

[Buy credits](/guide/api/introduction/credits) or [upgrade your plan](https://3.screeenly.com/app/billing). Otherwise requests work again at 00:00 UTC on the first day of the next month.

Other messages:

| Message | Fix |
| --- | --- |
| `Your email address is not verified.` | Click the link in the verification email. You can send it again from the app. |
| `Your account has been blocked. Contact support@screeenly.com.` | Email [support@screeenly.com](mailto:support@screeenly.com). |
| `Invalid ability provided.` | The token doesn't have the `shot:create` ability. Create a new token with it. |

## 409: Request still running

```json
{
    "message": "A request with this X-Request-ID is still running. Wait for its response before you send it again."
}
```

You retried a request while the first one with the same `X-Request-ID` was still running. See [Request IDs and retries](/guide/api/introduction/request-ids).

## 422: Validation failed

```json
{
    "message": "The window height field is required.",
    "errors": {
        "window_height": [
            "The window height field is required."
        ]
    }
}
```

The `errors` object lists every invalid option. Requests that fail validation don't count toward your monthly usage and don't use credits.

Common validation errors:

| Message | Fix |
| --- | --- |
| `The url field is required when html is not present.` | Send `url` or `html`. Check that you send a JSON body with `Content-Type: application/json`, or form data. |
| `The url field must be a valid URL.` | Include the scheme: `https://example.com`, not `example.com`. |
| `We can't reach https://example.com` | The host doesn't respond from the internet within 5 seconds. Pages on `localhost` or in a private network don't work. Send the page as `html` instead. |
| `Requests to example.com are not allowed.` | The site owner asked us to block requests to this domain. Email [support@screeenly.com](mailto:support@screeenly.com) for details. |
| `The url field must not end with one of the following: .pdf.` | screeenly can't capture PDF files. |
| `The window height field is required.` or `The window width field is required when window height is present.` | Send `window_width` and `window_height` together, or add `full_page`. |
| `The paper format field is required.` | PDFs need `paper_format`, or `paper_width` and `paper_height`. |
| `The full page field must be true or false.` | Send `1`, `0`, `true` or `false` as a JSON boolean. The string `"true"` fails. See [Boolean options](/guide/api/introduction/#boolean-options). |
| `selector can not be used together with 'full_page'.` | Leave out `full_page`, even when it's `false`, if you send `selector`. |
| `The free plan ...` | The option is above a [free plan limit](/guide/api/introduction/free-plan). |
| `This X-Request-ID was already used for a different request.` | Use a new `X-Request-ID` for every new request. |

## 429: Too many requests

You sent more requests per minute than your [rate limit](/guide/api/introduction/rate-limit) allows, or more requests at the same time than your account allows.

```json
{
    "message": "Too Many Attempts."
}
```

Wait for the number of seconds in the `Retry-After` header, then retry.

## 500: Server error

```json
{
    "message": "Server Error"
}
```

Something failed on our side. Retry the request with the same [`X-Request-ID`](/guide/api/introduction/request-ids). If the error persists, check the [status page](https://status.3.screeenly.com/) and email [support@screeenly.com](mailto:support@screeenly.com) with the request ID.

## Related

- [Troubleshooting](/guide/faq/troubleshooting)
- [Request IDs and retries](/guide/api/introduction/request-ids)
- [Rate limits](/guide/api/introduction/rate-limit)
