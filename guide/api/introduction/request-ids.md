# Request IDs

If you want to keep track of outgoing requests in your application, we recommend passing a UUID value in the `X-Request-ID` header to screeenly.

We will log this value and return the ID back to you in the API response.

For example, if you pass the following value to the X-Request-ID Header in your request

```text
X-Request-ID: 550e8400-e29b-11d4-a716-446655440000
```

We will return the ID back to you in the response like this.

```javascript
{
    "data": {
        "url": "https://en.wikipedia.org/wiki/Special:Random",
        "request_options": {},
        "expires_at": "2020-06-14T16:58:03+00:00",
        "shot_url": "http://3.screeenly.com/storage/browsershots/c5d3b49b-b30b-4b4e-b8c4-2fca35eda4ac.png"
    },
    "meta": {
        "request_id": "550e8400-e29b-11d4-a716-446655440000",
        "usage_limit": {
            "limit": 1000,
            "usage": 1,
            "remaining": 999,
            "resets": "2020-07-01T00:00:00+00:00"
        }
    }
}
```

If you want to report a bug or have a problem with the API, please include the request IDs.

