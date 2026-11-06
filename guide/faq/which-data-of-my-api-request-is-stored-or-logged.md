---
description: Which data of your API requests screeenly stores and when it is deleted.
---

# Which data of my requests is stored?

For every request, we store:

- the URL or the HTML you sent
- the options, including the values of `http_headers`
- the IP address and the user agent of the request
- the request ID, the status and the error message, if there was one

We don't store `cookies` or the basic authentication username and password.

You see these records in the [request log](https://3.screeenly.com/app/request-log) in the app.

## When it's deleted

- Screenshots, PDFs and rendered HTML: 24 hours after the request, or earlier with `cache_ttl`. See [How long are files stored?](/guide/faq/how-long-are-images-stored-on-screeenly-servers)
- Request records: 6 months after the result expired.

Details are in the [privacy policy](https://3.screeenly.com/privacy-policy).

::: warning
Don't send secrets in `http_headers` that you don't want stored for 6 months. Use short-lived tokens, or send login data as `cookies`.
:::
