---
description: What happens to the old open source screeenly on screeenly.com, and how to move to screeenly v3.
---

# What happened to the open source version?

The old version of screeenly still runs on [screeenly.com](https://screeenly.com/). It will be shut down at the end of March 2027.

We'll email everyone who uses the old version with the exact date. Until then, the old API keeps working.

## Move to screeenly v3

screeenly v3 is a new API with new tokens. Your old API key doesn't work with it.

1. [Sign up](https://3.screeenly.com/app/register) and create an API token. See [Authentication](/guide/api/introduction/authentication).
2. Send requests to `https://3.screeenly.com/api/v1/shots` with the token in the `Authorization` header. See the [Quickstart](/guide/quick-start/from-zero-to-hero).
3. Download the files you need. v3 deletes them after 24 hours.

Every account can make [100 requests per month for free](/guide/api/introduction/free-plan).

Questions about the move? Email [support@screeenly.com](mailto:support@screeenly.com).

## The source code

The code of the original screeenly stays available in the [GitHub repository](https://github.com/stefanzweifel/screeenly).
