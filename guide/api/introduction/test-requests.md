---
description: >-
  Learn more how test requests can help you while implementing the API in your
  project.
---

# Test Requests

The number of requests you can make to the screeenly API is limited by your chosen plan. With that in mind, every successful request to the API costs you something.

When implementing third-party APIs in apps, you would like to make actual requests to the respective API, but often don't want to trigger the business logic yet. Something like "Test Requests" would be really handy …

screeenly has the concept of test requests built in. When you pass `true` to the `test_request`-parameter we will return a dummy response to you and won't boot a real browser.

The request is super fast **and will not count towards your API limit**.   
The reponse will either contain an URL to a test image or a little test HTML snippet.

Test requests allows you to work on your app and implement the screeenly API without worrying about reaching your monthly API limit.

An implementation in PHP and Laravel might look like this

```php
<?php

use Illuminate\Support\Facades\Http;

$response = Http::withToken(config('services.screeenly.api_token'))
    ->post('https://3.screeenly.com/api/v1/shots', [
        'url' => 'https://en.wikipedia.org/wiki/Special:Random',
        'test_request' => app()->runningUnitTests()
    ]);

```

In addition, **you request will go through the same validation step** as a real request. This makes testing different parameter configurations super easy.

### Test Requests in your Test Suite

Your application test suite can also benefit from test requests. If you want to make an API request in your test suite to screeenly but "don't really want to take a screenshot" you can use test requests for that too.

