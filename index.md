---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "screeenly docs"
  tagline: "Guides and the API reference for the screeenly screenshot and PDF API."
  actions:
    - theme: brand
      text: Quickstart
      link: /guide/quick-start/from-zero-to-hero
    - theme: alt
      text: API reference
      link: /reference/

features:
  - title: Quickstart
    details: Create a token, take your first screenshot and save the file. Examples in curl, PHP, JavaScript and Python.
    link: /guide/quick-start/from-zero-to-hero
    linkText: Start here
  - title: All options
    details: Every option with its default and limits, and which combinations fail validation.
    link: /guide/api/available-endpoints/options
    linkText: See the options
  - title: Free plan
    details: 100 requests per month. Lower limits for some options, and identical requests return the cached result for 24 hours.
    link: /guide/api/introduction/free-plan
    linkText: See the limits
  - title: Troubleshooting
    details: Blank screenshots, missing content, cookie banners, timeouts and outdated results.
    link: /guide/faq/troubleshooting
    linkText: Fix a problem
---
