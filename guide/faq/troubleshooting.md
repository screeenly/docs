---
description: Fixes for screenshots that are blank, outdated, cut off or show the wrong content.
---

# Troubleshooting

Fixes for the problems people run into most. For error responses, see [Errors](/guide/api/introduction/request-errors).

Try your request in the [playground](https://3.screeenly.com/app/playground) first. You see the result right away and can change options until it looks right. The [request log](https://3.screeenly.com/app/request-log) shows every request with its options, status and error.

## I get the same screenshot although the page changed

The result came from the [cache](/guide/api/introduction/caching). Identical requests return the stored result for 24 hours. The response has the header `X-Cache: HIT` and the status `200`.

- With a plan or credits, send `cache=0`.
- On the free plan, change the request, for example by adding a query string to the URL.

## The screenshot is blank or content is missing

The capture starts once the page fired its `load` event. Pages that load their content with JavaScript after that are captured too early.

- Send `wait_for_selector` with an element that appears once the content is there, for example `.article-body`.
- Or send `wait_until_network_idle: true`.
- Or add a `delay` in milliseconds. Free accounts can wait up to 2,000 ms.

Raise `timeout` when you add waits. The timeout covers loading and waiting, and is 10 seconds by default.

## Images further down the page are missing

Many pages only load images once they scroll into view. The browser doesn't scroll the page before the capture, also not with `full_page`. Add `wait_until_network_idle: true` and a `delay`, or ask the site to load images without lazy loading for your requests, for example with a query string.

## A cookie banner or a popup covers the page

- Block the script of the banner with `block_domains`, for example `["cdn.cookielaw.org"]`. Check the network tab of your browser for the domain.
- Or set the cookie the banner sets once accepted, with `cookies`.
- `dismiss_dialogs` only closes JavaScript `alert`, `confirm` and `prompt` dialogs. It doesn't close banners built with HTML.

## The page shows a bot check, a CAPTCHA or "Access denied"

screeenly doesn't get past bot protection. If the site shows a challenge to a browser without cookies, the screenshot shows the challenge. If it's your site, allow requests with the user agent `Mozilla/5.0 (compatible; screeenly/3.0; +https://3.screeenly.com/ua)`.

## The page needs a login

- Send the session cookie with `cookies`.
- Send a token in a header with `http_headers`.
- Use `basic_authentication_username` and `basic_authentication_password` for HTTP basic authentication.

If none of these work, render the page in your app and send the HTML with `html`.

## The page is on localhost or in a private network

screeenly loads pages from its own servers, so it can't reach `localhost`, `127.0.0.1` or pages in your network. You get `We can't reach ...` or `net::ERR_NAME_NOT_RESOLVED`. Make the page public, or send its HTML with `html`.

## Fonts, images or styles in my HTML are missing

HTML you send has no base URL. Relative paths such as `/css/app.css` don't load. Use absolute public URLs (`https://example.com/css/app.css`), or inline the CSS and embed images as `data:` URLs. References to `file://`, `localhost` and `127.0.0.1` are rejected.

Web fonts load over the network. Add `wait_until_network_idle: true` or a short `delay` so they finish loading.

## The page has the wrong language or shows a cookie wall for another country

The browser language defaults to `en-GB`. Set `browser_language`, for example `de`. Pages are loaded from servers in the United States and in Germany. Sites that pick content by location may show the version for one of these countries.

## The screenshot is cut off, or has the wrong size

- Without `window_width` and `window_height`, the window is 800 × 600 pixels.
- `full_page` captures the full height. The width still comes from `window_width`.
- Chrome can't capture images higher or wider than 16,384 pixels. Full page screenshots of very long pages can come back cut off or blank.
- On the free plan, the window is at most 1,920 × 1,080 pixels.

## The PDF looks different from the page

PDFs use the `print` styles of the page. Set `css_media_type: "screen"` to use the styles you see in the browser. Use `paper_format` and `paper_margins_*` to change the page size and margins.

## The request times out

- Raise `timeout`. It's 10 seconds by default, up to 15 seconds on the free plan and 60 seconds with a plan or credits.
- Check that `wait_for_selector` matches an element that appears on the page.
- Use `block_domains` to skip slow third-party scripts.
- Set the timeout of your HTTP client to at least 90 seconds.

Requests that time out count toward your monthly usage.

## Still stuck?

Email [support@screeenly.com](mailto:support@screeenly.com) with the request ID from the `X-Request-ID` response header.
