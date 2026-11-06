---
description: How long screenshots, PDFs and rendered HTML are kept on screeenly servers.
---

# How long are files stored?

Screenshots, PDFs and rendered HTML are deleted 24 hours after the request. The `expires_at` field in the response shows the exact time. After that, `shot_url` stops working.

- With a plan or credits, you can keep files for a shorter time with `cache_ttl`, from 60 seconds to 24 hours. See [Caching](/guide/api/introduction/caching).
- Playground results are deleted after 60 minutes.
- Until a file is deleted, an identical request from the same account returns the stored file instead of rendering the page again.

Download the files you need and store them yourself. Don't link to `shot_url` from your site.

## Related

- [Caching](/guide/api/introduction/caching)
- [Which data of my requests is stored?](/guide/faq/which-data-of-my-api-request-is-stored-or-logged)
