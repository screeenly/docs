---
aside: false
---

# Reference

This page contains the Open API specification for the screeenly API. Checkout all available endpoints and learn what options they support.

Feel free to explore the API documentation below. If you have a valid API key, you can also try out the API directly from this page.

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
