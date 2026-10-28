<script setup lang="ts">
import { withBase } from 'vitepress';
import { useSidebar } from 'vitepress/theme';

/**
 * Copy of the footer on 3.screeenly.com (resources/views/components/footer.blade.php in screeenly-3).
 * Update it by hand when the links in the app change.
 */
const { hasSidebar } = useSidebar();

const app = 'https://3.screeenly.com';
const year = new Date().getFullYear();

const columns = [
    {
        title: 'Product',
        links: [
            { text: 'Screenshots', href: `${app}/features/screenshots` },
            { text: 'PDFs', href: `${app}/features/pdf` },
            { text: 'Your own HTML', href: `${app}/features/your-own-html` },
            { text: 'Rendered HTML', href: `${app}/features/rendered-html` },
            { text: 'MCP', href: `${app}/features/mcp` },
            { text: 'Pricing', href: `${app}/pricing` },
        ],
    },
    {
        title: 'Developers',
        links: [
            { text: 'Documentation', href: withBase('/') },
            { text: 'API reference', href: withBase('/reference/') },
            { text: 'Playground', href: `${app}/playground` },
            { text: 'Status', href: 'https://status.3.screeenly.com', external: true },
        ],
    },
    {
        title: 'Compare',
        links: [{ text: 'All comparisons', href: `${app}/compare` }],
    },
    {
        title: 'Company',
        links: [
            { text: 'Blog', href: `${app}/blog` },
            { text: 'Open startup', href: `${app}/open` },
            { text: 'Terms', href: `${app}/terms-of-service` },
            { text: 'Privacy', href: `${app}/privacy-policy` },
            { text: 'Imprint', href: `${app}/about/imprint` },
        ],
    },
];

const policies = [
    { text: 'Refund policy', href: `${app}/refund-policy` },
    { text: 'Cancellation policy', href: `${app}/cancellation-policy` },
    { text: 'Abuse policy', href: `${app}/abuse-policy` },
];
</script>

<template>
    <footer class="site-footer" :class="{ 'has-sidebar': hasSidebar }">
        <div class="site-footer-grid">
            <div class="site-footer-brand">
                <a :href="app" class="site-footer-logo">
                    <img :src="withBase('/screeenly-3-logo.svg')" alt="" />
                    <span>screeenly</span>
                </a>
                <span class="site-footer-tagline">Screenshot and PDF API for developers and their agents.</span>
                <a href="https://github.com/screeenly" target="_blank" rel="noopener noreferrer" class="site-footer-github">
                    <span class="visually-hidden">screeenly on GitHub</span>
                    <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            fill-rule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </a>
            </div>

            <div v-for="column in columns" :key="column.title" class="site-footer-column">
                <span class="site-footer-heading">{{ column.title }}</span>
                <a
                    v-for="link in column.links"
                    :key="link.text"
                    :href="link.href"
                    :target="link.external ? '_blank' : undefined"
                    :rel="link.external ? 'noopener noreferrer' : undefined"
                    >{{ link.text }}</a
                >
            </div>
        </div>

        <div class="site-footer-bottom">
            <span>
                &copy; 2014–{{ year }} screeenly · Made in Switzerland by
                <a href="https://stefanzweifel.dev" target="_blank" rel="noopener noreferrer">Stefan Zweifel</a>
            </span>
            <span class="site-footer-policies">
                <a v-for="link in policies" :key="link.text" :href="link.href">{{ link.text }}</a>
            </span>
        </div>
    </footer>
</template>

<style scoped>
.site-footer {
    position: relative;
    border-top: 1px solid var(--color-line-soft);
    background-color: var(--color-paper);
    color: var(--color-ink);
    font-size: 0.875rem;
    line-height: 1.25rem;
}

/* Pages with a sidebar: keep the footer next to the fixed sidebar, like VPContent does. */
@media (min-width: 960px) {
    .site-footer.has-sidebar {
        padding-left: var(--vp-sidebar-width);
    }
}

@media (min-width: 1440px) {
    .site-footer.has-sidebar {
        padding-left: calc((100vw - var(--vp-layout-max-width)) / 2 + var(--vp-sidebar-width));
        padding-right: calc((100vw - var(--vp-layout-max-width)) / 2);
    }
}

/* Same width and side padding as the VitePress nav bar, so the footer lines up with the logo. */
.site-footer-grid,
.site-footer-bottom {
    box-sizing: content-box;
    margin-inline: auto;
    max-width: calc(var(--vp-layout-max-width) - 64px);
    padding-inline: 24px;
}

@media (min-width: 768px) {
    .site-footer-grid,
    .site-footer-bottom {
        padding-inline: 32px;
    }
}

.site-footer-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
    padding-top: 4.5rem;
    padding-bottom: 2.5rem;
}

@media (min-width: 768px) {
    .site-footer-grid {
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    }
}

.site-footer-brand {
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
}

@media (min-width: 768px) {
    .site-footer-brand {
        grid-column: span 1;
    }
}

.site-footer-logo {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    align-self: flex-start;
    color: var(--color-ink);
}

.site-footer-logo img {
    height: 1.75rem;
    width: auto;
}

.site-footer-logo span {
    font-family: var(--font-logo);
    font-weight: 800;
    font-size: 1.125rem;
    line-height: 1;
    letter-spacing: -0.02em;
}

.site-footer-tagline {
    max-width: 16.25rem;
    color: var(--color-ink-soft);
}

.site-footer-github {
    margin-top: 0.25rem;
    align-self: flex-start;
    color: var(--color-muted);
    transition: color 0.15s;
}

.site-footer-github:hover {
    color: var(--color-ink);
}

.site-footer-github svg {
    width: 1.25rem;
    height: 1.25rem;
}

.site-footer-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.site-footer-heading {
    font-weight: 600;
}

.site-footer-column a {
    color: var(--color-ink-soft);
    transition: color 0.15s;
}

.site-footer-column a:hover,
.site-footer-bottom a:hover {
    color: var(--color-ink);
}

.site-footer-bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5rem 1.5rem;
    padding-bottom: 1.5rem;
    font-size: 0.8125rem;
    color: var(--color-muted);
}

.site-footer-bottom a {
    color: var(--color-muted);
    transition: color 0.15s;
}

.site-footer-policies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1rem;
}
</style>
