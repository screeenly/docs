---
aside: false
description: >-
  A "Shot" represents the request to generate a screenshot or PDF of a given URL
  or HTML snippet.
---

<script setup lang="ts">
import { useData } from 'vitepress'
import spec from '../../../public/openapi.json'

const { isDark } = useData()
</script>

<OAOperation :spec="spec" operationId="createShot" :isDark="isDark">

<template #description>

The `/api/v1/shots` API endpoints allows you to generate screenshots or PDFs of a given URL or HTML snippet. You can find a detailed list of all available parameters in the [API reference](/reference/#tag/shots).

## Create a screenshot from URL

The most basic payload to create a screenshot of a URL looks like this.

```json
{
    "url": "https://en.wikipedia.org/wiki/Special:Random"
}
```

The resulting JSON response will contain a URL to download the screenshot or PDF, as well as the expiration date of the generated file. The meta section contains information about your current usage and limits.

```json
{
    "data": {
        "url": "https://en.wikipedia.org/wiki/Special:Random",
        "expires_at": "2024-06-28T19:20:50+00:00",
        "screenshot_url": "https://3.screeenly.com/storage/153449/3e23f899-ba17-44ac-a089-48382db7fc7c.jpg"
    },
    "meta": {
        "request_id": null,
        "usage_limit": {
            "limit": 1000,
            "usage": 15,
            "remaining": 985,
            "resets": "2024-07-01T00:00:00+00:00"
        }
    }
}
```

## Create a screenshot from HTML

If you want to create a screenshot from a given HTML snippet, you can use the following payload.

```json
{
    "html": "<html><head></head><body><h1>Hello World</h1></body></html>"
}
```

## Create a PDF from a URL

To create a PDF from a given URL, you can use the following payload.

```json
{
    "url": "https://en.wikipedia.org/wiki/Special:Random",
    "file_type": "pdf"
}
```

## Create a PDF from HTML

To create a PDF from a given HTML snippet, you can use the following payload.

```json
{
    "html": "<html><head></head><body><h1>Hello World</h1></body></html>",
    "file_type": "pdf"
}
```

---

As mentioned, these are just a few examples of how you can use the `/api/v1/shots` API. For a full list of available parameters and responses, please refer to the [API reference](/reference/#tag/shots).

You can also try out different parameters in our [playground](https://3.screeenly.com/playground). The playground will also build up the API payload for you, so you can easily copy and paste it into your application.

</template>

</OAOperation>
