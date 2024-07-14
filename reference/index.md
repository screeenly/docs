---
aside: false
---

# Reference

This page contains the Open API specification for the screeenly API. Checkout all available endpoints and learn what options they support.

Feel free to explore the API documentation below. If you have a valid API key, you can also try out the API directly from this page.

<script setup async>
import { ApiReference } from '@scalar/api-reference';
import '@scalar/api-reference/style.css';

const configuration = {
    spec: {
        url: '/screeenly-api.yaml',
        // url: 'https://3.screeenly.com/screeenly-api.yaml',
    },
    searchHotKey: 'l',
    withDefaultFonts: false,
    theme: 'default',
    proxy: 'https://proxy.scalar.com',
};
</script>

<div style="position: relative;">
<ApiReference :configuration="configuration" />
</div>

<style>
.content {
    max-width: none !important; 
}
</style>
