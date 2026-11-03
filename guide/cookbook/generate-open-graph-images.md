---
description: Design an Open Graph image in HTML and CSS and turn it into a JPG with the screeenly API.
---

# Generate Open Graph images

Send your own HTML to screeenly and get an image back. This example creates an Open Graph image for a blog post.

![This is the Open Graph Image we would like to create in this tutorial.](./../../assets/cookbook-open-graph-image.png)

The layout uses [Tailwind CSS](https://tailwindcss.com/) and the font [Inter](https://rsms.me/inter/).

This HTML creates the image above. There's an interactive version on [CodePen](https://codepen.io/stefanzweifel/pen/MWyoEwN?editors=1000).

```html
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.7.0/tailwind.min.css">
<link rel="stylesheet" type="text/css" href="https://rsms.me/inter/inter.css">

<style>
#container {
  font-family: 'Inter';
  width: 1200px;
  height: 600px;
}
</style>

<section id="container" class="flex flex-col justify-between p-12 bg-gray-900">
  <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-100">example.com</h2>
  <h1 class="text-6xl font-extrabold tracking-tight text-gray-100">The Title of your Article</h1>
  <footer class="text-gray-300 text-xl font-medium">
    5 min read
  </footer>
</section>
```

To try it in the [playground](https://3.screeenly.com/app/playground), click **Import payload** and paste this payload:

```json
{
    "file_type": "jpg",
    "window_width": 1200,
    "window_height": 600,
    "timeout": 10,
    "css_media_type": "screen",
    "html": "<link rel=\"stylesheet\" type=\"text\/css\" href=\"https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/tailwindcss\/1.7.0\/tailwind.min.css\">\n<link rel=\"stylesheet\" type=\"text\/css\" href=\"https:\/\/rsms.me\/inter\/inter.css\">\n\n<style>\n#container {\n  font-family: 'Inter';\n  width: 1200px;\n  height: 600px;\n}\n<\/style>\n\n<section id=\"container\" class=\"flex flex-col justify-between p-12 bg-gray-900\">\n  <h2 class=\"text-2xl font-bold leading-10 tracking-tight text-gray-100\">example.com<\/h2>\n  <h1 class=\"text-6xl font-extrabold tracking-tight text-gray-100\">The Title of your Article<\/h1>\n  <footer class=\"text-gray-300 text-xl font-medium\">\n    5 min read\n  <\/footer>\n<\/section>",
    "delay": 1000
}
```


Tailwind's flexbox classes position the site name, the title and the reading time. The CSS sets the font to Inter and the size of the image.

The API request:

```shell
curl --request POST \
  --url https://3.screeenly.com/api/v1/shots \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer YOUR_API_TOKEN' \
  --data 'html=<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.7.0/tailwind.min.css">
<link rel="stylesheet" type="text/css" href="https://rsms.me/inter/inter.css">

<style>
#container {
  font-family: '\''Inter'\'';
  width: 1200px;
  height: 600px;
}
</style>

<section id="container" class="flex flex-col justify-between p-12 bg-gray-900">
  <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-100">example.com</h2>
  <h1 class="text-6xl font-extrabold tracking-tight text-gray-100">The Title of your Article</h1>
  <footer class="text-gray-300 text-xl font-medium">
    5 min read
  </footer>
</section>' \
  --data file_type=jpg \
  --data window_height=600 \
  --data window_width=1200 \
  --data delay=1000
```

`window_width` and `window_height` match the size in the `<style>` tag, so the image is exactly 1200 × 600 pixels.

`delay` waits 1,000 ms so the stylesheet and the font finish loading. `wait_until_network_idle: true` works too and doesn't wait longer than needed.

## Use the image

Download the file from `shot_url` and store it with your post. Don't use `shot_url` in your `og:image` tag: the file is deleted after 24 hours.

The same HTML returns the same image for 24 hours from the [cache](/guide/api/introduction/caching), without counting toward your usage.
