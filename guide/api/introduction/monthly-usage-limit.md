---
description: How many API requests you can make each month, which requests count, and what happens when you reach the limit.
---

# Monthly API Usage and Limit

Every account can make a number of API requests per calendar month. This page explains how the limit is calculated, which requests count, and what happens when you reach it.

## Your monthly limit

Every account gets **100 free requests per month**, with or without a plan. A plan adds its requests on top:

| Plan | Requests per month |
| --- | --- |
| No plan | 100 |
| Small | 2,100 |
| Base | 10,100 |
| Medium | 50,100 |
| Large | 100,100 |

Screenshots, PDFs and rendered HTML all count the same: one request each.

## Which requests count

- Requests that return a screenshot, PDF or rendered HTML count.
- Requests that fail while rendering or time out also count, because the browser already ran.
- Requests that fail validation (`422`) don't count.
- [Test requests](/guide/api/introduction/test-requests) don't count.

## When you reach the limit

Once your monthly requests are used up, each further request uses one [credit](/guide/api/introduction/credits). Without credits, the API returns a `403` error until the next month starts:

```json
{
    "message": "The monthly API usage limit has been reached (100 out of 100 requests) and there are no credits left. Upgrade your plan or buy credits under https://3.screeenly.com/app/billing/credits. The limit resets at the start of next month."
}
```

We email you when you've used 75%, 90% and 100% of your monthly requests.

## When the usage resets

The usage resets at 00:00 UTC on the first day of each month. Credits don't reset.

## Where to see your usage

- On the dashboard and the billing page in the app.
- In the response headers of every API request:

| Header | Description |
| --- | --- |
| `X-Usage-Limit` | Your monthly limit. |
| `X-Usage-Usage` | Requests made this month. |
| `X-Usage-Remaining` | Requests left this month. |
| `X-Usage-Resets` | When the usage resets, as an ISO 8601 date. |
| `X-Credits-Remaining` | Your credit balance. |

- In the `meta.usage_limit` object of successful responses:

```json
{
    "meta": {
        "usage_limit": {
            "limit": 2100,
            "usage": 15,
            "remaining": 2085,
            "resets": "2026-12-01T00:00:00+00:00"
        }
    }
}
```

## Related

- [Credits](/guide/api/introduction/credits)
- [Rate Limit](/guide/api/introduction/rate-limit)
- [Request Errors](/guide/api/introduction/request-errors)
