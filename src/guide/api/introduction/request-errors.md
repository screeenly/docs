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

If you're receiving a `500` error, an error has occoured on our end. You can gracefully retry your request.

```json
{
    "message": "Server Error"
}
```

If the error persists,  you can [write us](mailto:support@screeenly.com) or check out the status page.

