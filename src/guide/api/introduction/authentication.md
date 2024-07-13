---
description: >-
  You need a valid API token to interact with our API. On this page you will
  learn how to create API tokens and how to use them in API requests.
---

# Authentication

You need a valid API token to interact with our API. On this page you will learn how to create API tokens and how to use them in API requests.

## Create a new Token

You can create new API tokens on the [application dashboard](https://3.screeenly.com/home). Name your API token appropriately so you can easly recognize them later.

The API token will be shown to you **only once**. Make sure to store it in a safe place.

## Authenticate against the API

You can now use the received token as a Bearer token in the `Authorization` HTTP header in your requests.

```text
Authorization: Bearer <token>
```

Here is a cURL example to create a screenshot of a random wikipedia page.

```text
curl --request POST \
  --url https://screeenly-3.test/api/v1/shots \
  --header 'accept: application/json' \
  --header 'authorization: Bearer <token>' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data url=https://en.wikipedia.org/wiki/Special:Random \
  --data window_width=1440 \
  --data full_page=1
```

## Revoke existing token

You can revoke an existing API token by clicking on the _Delete_ button next to the API token on the dashboard.

