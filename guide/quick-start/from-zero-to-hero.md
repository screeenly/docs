---
description: >-
  Learn how to make a HTTP Request to our API and store the generated screenshot
  in your app
---

# From Zero to Hero

::: info
This example uses PHP and the Laravel framework to showcase how you can integrate screeenly into your application.

If you user other software than PHP or Laravel, we suggest reading through the tutorial anyway. We tried to keep the code as simple to read as possible. 
:::

First you need so [sign up](https://3.screeenly.com/register), verify your email address and [create an API token](../api/introduction/authentication.md#create-a-new-token). You don't have to subscribe to a paid plan to follow this tutorial.

We recommend adding a new entry to the `config/services.php` file to store your API token in there. We also recommend storing the API key in your `.env` file and not commit the API key to your code repository. 

Add the following code to your config/services.php file

```php
// config/services.php
// ...
'screeenly' => [
    'api_token' => env('SCREEENLY_API_TOKEN')
],
```

Next add your API token as an environment variable to `.env`

```php
SCREEENLY_API_TOKEN=<token>
```

The API token is now available to us when we call `config('services.screeenly.api_token')`.

### Implement the API

For this example we're creating a new Artisan command called "screeenly" to make an API request to screeenly and generate a full page screenshot of a random Wikipedia page.

> [!TIP]
> In a real production API you should probably place this bit of code into [a queued Job](https://laravel.com/docs/master/queues). It can take several seconds for screeenly to generate a screenshot. Better not to let your users waiting.

The following code snippet uses Larvel's [HTTP Client](https://laravel.com/docs/master/http-client) to make a request to the screeenly API.   
After a successful response, the screenshot is downloaded from screeenly servers and stored in the apps file system.

```php
// routes/console.php
<?php

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

Artisan::command('screeenly', function () {

    // Make a HTTP POST request to screeenly to generate 
    // a full page screenshot of a Wikipedia page.
    $response = Http::withToken(config('services.screeenly.api_token'))
        ->post('https://3.screeenly.com/api/v1/shots', [
            'url' => 'https://en.wikipedia.org/wiki/Special:Random',
            'full_page' => true,
        ]);

    if ($response->successful()) {

        // Extract the asset URL of our screenlshot
        $urlToDownloadFrom = $response->json()['data']['shot_url'];

        // Download and store the screenshot as "screenshot.jpg"
        Storage::put(
            "screenshot.jpg",
            file_get_contents($urlToDownloadFrom)
        );
    }

});
```

You can run this Artisan command by executing `php artisan screeenly` in your terminal. If everything works as expected, you should see a new file called "screenshot.jpg" in your "storage/app" directory.
