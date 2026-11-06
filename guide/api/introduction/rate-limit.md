---
description: How many requests you can send per minute and at the same time, and how to handle a 429 error.
---

# Rate limits

Rate limits are separate from your [monthly usage](/guide/api/introduction/monthly-usage-limit). They limit how fast you send requests, not how many you send in a month.

## Limits

| | Free plan | With a plan or credits |
| --- | --- | --- |
| Requests per minute | 10 | 30 |
| Requests at the same time | 1 | 10 |

The limits apply per account, across all your API tokens and the [MCP server](/guide/mcp/). Test requests count toward them too.

The `X-RateLimit-Limit` and `X-RateLimit-Remaining` headers show the per-minute limit and how many requests you have left in the current minute.

## When you hit a limit

The API returns a `429` error. The request doesn't count toward your monthly usage.

Too many requests per minute:

```json
{
    "message": "Too Many Attempts."
}
```

On the free plan, the message says when you can try again:

```json
{
    "message": "The free plan allows 10 requests per minute. Try again in 42 seconds. Buy credits or subscribe to a plan to raise this limit: https://3.screeenly.com/app/billing"
}
```

Too many requests at the same time:

```json
{
    "message": "Too many concurrent requests. Give us a few seconds to handle your other requests."
}
```

## Stay below the limits

- Wait for the number of seconds in the `Retry-After` header before you retry. If there is no `Retry-After` header, wait a few seconds and retry with a growing delay.
- Send requests from a queue with a fixed number of workers. Use at most 10 workers, or 1 on the free plan.
- Don't retry a `429` error in a tight loop. Each retry counts toward the per-minute limit.

Need higher limits? Email [support@screeenly.com](mailto:support@screeenly.com).

## Related

- [Free plan](/guide/api/introduction/free-plan)
- [Errors](/guide/api/introduction/request-errors)
