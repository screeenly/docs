---
description: Learn about the different responses screeenly returns when an error occurs.
---

# Request Errors

If you're request failed to pass validation, you've exceeded your API limit or something on our end fails, the API will return an appropriate error response.

The API response will look similar to the following example.

```json
{
    "message": "Error Message"
}
```

Common errors are

* Validation error
* Rate Limit reached
* Usage Limit reached
* Trial expired

## 400 - Invalid Request ID

The `X-Request-ID` header must be 1 to 255 printable ASCII characters without spaces. See [Request IDs](/guide/api/introduction/request-ids).

```json
{
    "message": "The X-Request-ID header must be 1 to 255 printable ASCII characters without spaces."
}
```

## 401 - Unauthenticated

If you're receiving a `401`-error from the API, you did not provide a valid API token or the given token is no longer valid.

You can create a new API token in the application dashboard.

```json
{
    "message": "Unauthenticated."
}
```

## 403 - Forbidden

You can receive a `403`-error from the API for the following reasons:

* You've reached your monthly API usage limit. You can upgrade your plan if you need more API requests.
* Your trial as expired. Upgrade your account to regain access to the API

```json
{
    "message": "Access denied. Your trial has expired and you did not subscribe to a plan. Subscribe to a plan here: https://3.screeenly.com/billing/subscriptions."
}
```

## 4xx - Domain Blocked

If you're receiving a `4xx`-error from the API the domain owner has requested us to block screeenly from making requests to their domain.

If you would like to know more information why access to a domain has been blocked, please [contact us](mailto:support@screeenly.com).


## 409 - Request ID In Use

A request with the same `X-Request-ID` is still running. Wait for its response before you send the request again.

```json
{
    "message": "A request with this X-Request-ID is still running. Wait for its response before you send it again."
}
```

## 422 - Validation Failed

If you're receiving a `422`-error from the API, the request you made did not pass our validation.   
The response should contain clear instructions on how to fix the validation errors.

```json
{
    "message": "The given data was invalid.",
    "errors": {
        "url": [
            "The url field is required when html is not present."
        ],
        "html": [
            "The html field is required when url is not present."
        ]
    }
}
```

A `422` is also returned when you reuse an `X-Request-ID` for a different request within 60 minutes:

```json
{
    "message": "This X-Request-ID was already used for a different request. Use a new ID for every new request."
}
```

## 429 - Too Many Attempts

If you're receiving a `429`-error from the API, you made to many requests into a short amount of time and exceeded the rate limit.

Please slow down the number of requests you make and wait for at least 60 seconds before making additional API requests.   
You can check the `retry-after`, `x-ratelimit-limit`, `x-ratelimit-reset`, `x-ratelimit-remaining`-headers to get information, for when you can make API requests again.

```json
{
    "message": "Too Many Attempts."
}
```

## 500 - Server Error

If you're receiving a `500` error, an error has occoured on our end. You can retry your request with the same `X-Request-ID`.

```json
{
    "message": "Server Error"
}
```

If the error persists,  you can [write us](mailto:support@screeenly.com) or check out the status page.

