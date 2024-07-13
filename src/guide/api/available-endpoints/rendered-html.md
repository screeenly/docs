---
description: Learn how to get the rendered HTML of a URL or of your provide HTML snippet.
---

# Rendered HTML

The `/api/v1/renderd-html` API endpoints allows you to generate rendered HTML of a given URL or HTML snippet. You can find a detailed list of all available parameters in the [API reference](/reference/#tag/html).

## Create Rendered HTML from URL

The most basic payload to create a rendered HTML of a URL looks like this.

```json
{
    "url": "https://example.com"
}
```

The resulting JSON response will contain the rendered HTML. The meta section contains information about your current usage and limits.

```json
{
  "data": {
    "rendered_html": "<html><head></head><body><h1>Hello World</h1></body></html>"
  },
  "meta": {
    "request_id": null,
    "usage_limit": {
      "limit": 10000,
      "usage": 15,
      "remaining": 9985,
      "resets": "2024-07-01T00:00:00+00:00"
    }
  }
}
```

> [!TIP]
> You can also use the `/api/v1/rendered-html` API to get the rendered HTML of a URL. This can be useful if you want to extract the rendered HTML of a website for further processing. For example, if you need to extract specific information that uses JavaScript to render the content.

## Create Rendered HTML from HTML

If you want to create a rendered HTML from a given HTML snippet, you can use the following payload.

```json
{
    "html": "<html><head></head><body><h1>Hello World</h1></body></html>"
}
```

---

As mentioned, these are just a few examples of how you can use the `/api/v1/rendered-html` API. For a full list of available parameters and responses, please refer to the [API reference](/reference/#tag/html).

> [!NOTE]
> The `/api/v1/rendered-html` and `/api/v1/shots` API endpoints are very similar. The main difference is that the `/api/v1/rendered-html` API returns the rendered HTML of a given URL or HTML snippet, while the `/api/v1/shots` API returns a screenshot or PDF of a given URL or HTML snippet.
> Many of the parameters are the same, so you can use the same payload for both APIs. Note that some parameters like `file_type` are only available in the `/api/v1/shots` API.

You can also try out different parameters in our [playground](https://3.screeenly.com/playground). The playground will also build up the API payload for you, so you can easily copy and paste it into your application.
