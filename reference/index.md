---
aside: false
---

# Reference

Every endpoint, option and response of the screeenly API, from the OpenAPI spec. Paste your API token to send requests from this page.

The [guides](/guide/api/introduction/) explain how the API behaves: [free plan limits](/guide/api/introduction/free-plan), [caching](/guide/api/introduction/caching), [errors](/guide/api/introduction/request-errors) and [all options](/guide/api/available-endpoints/options) with their combinations.

<script setup async>
import { ApiReference } from '@scalar/api-reference';
import '@scalar/api-reference/style.css';

// Uses the fonts and tokens from the docs theme (.vitepress/theme/tokens.css).
const customCss = `
.light-mode,
.light-mode .dark-mode {
    --scalar-font: var(--font-sans);
    --scalar-font-code: var(--font-mono);

    --scalar-background-1: var(--color-paper);
    --scalar-background-2: var(--color-subtle);
    --scalar-background-3: var(--color-zinc-100);
    --scalar-background-card: var(--color-paper);
    --scalar-background-accent: var(--color-purple-tint);

    --scalar-color-1: var(--color-ink);
    --scalar-color-2: var(--color-ink-soft);
    --scalar-color-3: var(--color-muted);
    --scalar-color-accent: var(--color-purple);

    --scalar-border-color: var(--color-line);

    --scalar-button-1: var(--color-ink);
    --scalar-button-1-hover: var(--color-zinc-700);
    --scalar-button-1-color: #ffffff;

    --scalar-link-color: var(--color-purple);
    --scalar-link-color-hover: var(--color-purple-dark);
}

.light-mode {
    --scalar-radius: 0.375rem;
    --scalar-radius-lg: var(--radius-btn);
    --scalar-radius-xl: var(--radius-card);
}
`;

const configuration = {
    url: '/screeenly-api.yaml',
    searchHotKey: 'l',
    withDefaultFonts: false,
    customCss,
    defaultOpenAllTags: true,
    theme: 'default',
    proxyUrl: 'https://proxy.scalar.com',
    layout: "modern",
    showSidebar: false,
    hideDarkModeToggle: true,
    forceDarkModeState: 'light',
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
