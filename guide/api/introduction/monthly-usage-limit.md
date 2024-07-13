---
description: Learn about how many API request you're allowed to make each month.
---

# Monthly API Usage and Limit

Before you get started using the API, it's important to understand what the monthly API usage limits is, how the usage is calculated and what happens when you reach the limit.

## What is the Monthly API usage?

The monthly API usage is the number of **successfull** API requests you make during a calendar month \(first day of the month until last day of the month\).

API requests which fail validation or can't be successfully completed do not count towards your API usage.

How many requests you can make \(your _API limit_\) depends on your chosen plan. Users which aren't subscribed to a plan and are still on our 14-day trial can make up to **1000 API** requests.

## What happens if you reach the monthly API usage limit?

If you exceed the API usage limit defined by your plan, the API will return with a `403`-error. Subsequent requests will also return the same `403`-error.

We will send you a notification to your account email address when you've used 75% and 90% of your limit and a final notification when you've reached 100% usage.

## When is the monthly API usage reset?

The monthly API usage is automatically reset at 00:00 \(UTC\) on the first day of each month.

## Where can I see my current usage and limit?

The usage and limits are shown in the following places:

* In the app dashboard
* In the `x-usage-limit`, `x-usage-usage` and `x-usage-remaining` HTTP headers in all successful API responses
* In the `meta.usage` API response object.

