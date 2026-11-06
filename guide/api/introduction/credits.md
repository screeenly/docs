---
description: How credits pay for API requests once your monthly requests are used up, how to buy them and where to see your balance.
---

# Credits

Credits pay for API requests once your [monthly requests](/guide/api/introduction/monthly-usage-limit) are used up. Use them for the months where you need more requests than your plan includes.

## How credits are used

- One credit pays for one request. Screenshots, PDFs and rendered HTML cost the same.
- Credits are only used after your monthly requests run out. Until then, your balance doesn't change.
- Credits don't expire.
- A request that fails validation (`422`) gives its credit back. Requests that fail while rendering or time out keep the credit, because the browser already ran.
- [Test requests](/guide/api/introduction/test-requests), results from the [cache](/guide/api/introduction/caching) and runs in the playground never use credits.
- While you have at least one credit, the [free plan](/guide/api/introduction/free-plan) limits don't apply, even before your 100 free requests are used up.

When your monthly requests and your credits are both used up, the API returns a `403` error until the next month starts.

## Buy credits

Buy credits on the [Credits page](https://3.screeenly.com/app/billing/credits) in the app. You can buy them with or without a plan.

| Credits | Price |
| --- | --- |
| 1,000 | $9 |
| 2,000 | $16 |
| 5,000 | $35 |
| 10,000 | $60 |
| 20,000 | $100 |
| 50,000 | $200 |

Prices are in USD and exclude tax. Paddle handles the payment and sends the receipt. The credits are added as soon as Paddle confirms the payment, usually within a few seconds.

Need more than 50,000 credits at once? Email [support@screeenly.com](mailto:support@screeenly.com).

::: tip
If you need more requests every month, a plan costs less per request than credits.
:::

## Where to see your balance

- The Credits page in the app shows your balance and every change to it: purchases, credits we added for you, and each request that was paid with a credit.
- The `X-Credits-Remaining` header of every API response contains your balance.

We email you when your balance drops below 10% of the last pack you bought.

## Refunds

If a credit purchase is refunded, the credits you haven't used yet are removed from your balance.

## Related

- [Monthly usage and limit](/guide/api/introduction/monthly-usage-limit)
- [Free plan](/guide/api/introduction/free-plan)
- [Errors](/guide/api/introduction/request-errors)
