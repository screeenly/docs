---
description: The limits of accounts without a plan and without credits, and how to lift them.
---

# Free plan

Every account can make 100 requests per month for free. You don't need a credit card.

Your account is on the free plan while it has no subscription and a credit balance of 0. A subscription or any credits lift the limits on this page. When your last credit is used up and you have no subscription, the free limits apply again.

## Limits

| | Free plan | With a plan or credits |
| --- | --- | --- |
| Requests per month | 100 | 100 plus the requests of your plan, then credits |
| `window_width`, `clip_width` | up to 1,920 pixels | up to 10,000 pixels |
| `window_height`, `clip_height` | up to 1,080 pixels | up to 10,000 pixels |
| `device_scale_factor` | 1 | up to 3 |
| `full_page` | not available | available |
| `delay` | up to 2,000 ms | up to 30,000 ms |
| `timeout` | up to 15 seconds | up to 60 seconds |
| Requests at the same time | 1 | 10 |
| Requests per minute | 10 | 30 |
| [Caching](/guide/api/introduction/caching) | always on, results kept for 24 hours | `cache=0` and `cache_ttl` available |

Every other option works on the free plan, including PDFs, rendered HTML, your own HTML, cookies, headers and the [MCP server](/guide/mcp/).

## What happens when you hit a limit

A request with an option above a free limit fails with a `422` error. It doesn't count toward your monthly usage. The message names the option and links to the billing page:

```json
{
    "message": "The free plan does not include full page screenshots. Buy credits or subscribe to a plan to raise this limit: https://3.screeenly.com/app/billing",
    "errors": {
        "full_page": [
            "The free plan does not include full page screenshots. Buy credits or subscribe to a plan to raise this limit: https://3.screeenly.com/app/billing"
        ]
    }
}
```

Sending more than 1 request at a time, or more than 10 per minute, returns a `429` error. See [Rate limits](/guide/api/introduction/rate-limit).

## Same request, same result

On the free plan, an identical request returns the stored result from the first request for 24 hours. You can't turn this off. If the page changed in the meantime, you still get the old screenshot. Change an option, for example the `url` query string, to get a new one. See [Caching](/guide/api/introduction/caching).

## Lift the limits

- [Buy credits](https://3.screeenly.com/app/billing/credits). The smallest pack is 1,000 credits for $9. Credits don't expire.
- [Subscribe to a plan](https://3.screeenly.com/pricing).

## Related

- [Monthly usage and limit](/guide/api/introduction/monthly-usage-limit)
- [Credits](/guide/api/introduction/credits)
- [Rate limits](/guide/api/introduction/rate-limit)
- [Caching](/guide/api/introduction/caching)
