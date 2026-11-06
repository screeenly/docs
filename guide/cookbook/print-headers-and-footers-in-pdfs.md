---
description: Add a header and a footer with page numbers, the date or the title to every page of a PDF.
---

# Headers and footers in PDFs

Set `show_browser_header_and_footer` to `true` to print a header and a footer on every page. Pass your own HTML in `header_html` and `footer_html`. Without them, Chrome prints the date, the title, the URL and the page number.

The header and footer are printed into the page margins. Set margins that are large enough, otherwise they are hidden behind the content.

```json
{
    "html": "<h1>Hello, World!</h1>",
    "file_type": "pdf",
    "paper_format": "A4",
    "paper_margins_top": 25,
    "paper_margins_right": 10,
    "paper_margins_bottom": 25,
    "paper_margins_left": 10,
    "show_browser_header_and_footer": true,
    "header_html": "<h1>Header</h1>",
    "footer_html": "<h1>Footer</h1>"
}
```

## Page numbers, date and title

Add these classes to elements in `header_html` and `footer_html`. Chrome fills in the value.

- `date` formatted print date
- `title` document title
- `url` document location
- `pageNumber` current page number
- `totalPages` total pages in the document

The header and footer don't use the CSS of the page. Set styles inline. The default font size is very small, so set one, for example `font-size: 10px`.

This example prints the date and the title in the header and the page number in the footer:

```json
{
    "url": "https://example.com",
    "file_type": "pdf",
    "paper_format": "A4",
    "paper_margins_top": 25,
    "paper_margins_right": 10,
    "paper_margins_bottom": 25,
    "paper_margins_left": 10,
    "show_browser_header_and_footer": true,
    "header_html": "<div style='width: 100%; font-size: 10px; padding-left: 1cm; padding-right: 1cm;'><span class='date'></span><span class='title'></span></div>",
    "footer_html": "<div style='width: 100%; font-size: 10px; padding-left: 1cm; padding-right: 1cm;'><span class='pageNumber'></span> / <span class='totalPages'></span></div>"
}
```

Set `initial_page_number` to start counting at a different number.

To try it in the [playground](https://3.screeenly.com/app/playground), click **Import payload** and paste one of the payloads above.

## Related

- [Screenshots and PDFs](/guide/api/available-endpoints/shots)
- [All options](/guide/api/available-endpoints/options#pdf)
