<script setup lang="ts">
import { withBase } from 'vitepress';
import { useSidebar } from 'vitepress/theme';

/**
 * A shorter version of the footer on 3.screeenly.com (resources/views/components/footer.blade.php in screeenly-3).
 * It only keeps the logo and the legal pages. The guides, the API reference and the playground are in the top bar.
 */
const { hasSidebar } = useSidebar();

const app = 'https://3.screeenly.com';
const year = new Date().getFullYear();

const links = [
    { text: 'Status', href: 'https://status.3.screeenly.com', external: true },
    { text: 'Terms', href: `${app}/terms-of-service` },
    { text: 'Privacy', href: `${app}/privacy-policy` },
    { text: 'Imprint', href: `${app}/about/imprint` },
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
            </div>

        </div>

        <div class="site-footer-bottom">
            <span>
                &copy; 2014–{{ year }} screeenly · Made in Switzerland by
                <a href="https://stefanzweifel.dev" target="_blank" rel="noopener noreferrer">Stefan Zweifel</a>
            </span>
            <span class="site-footer-policies">
                <a
                    v-for="link in links"
                    :key="link.text"
                    :href="link.href"
                    :target="link.external ? '_blank' : undefined"
                    :rel="link.external ? 'noopener noreferrer' : undefined"
                    >{{ link.text }}</a
                >
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
    padding-top: 4.5rem;
    padding-bottom: 2.5rem;
}

.site-footer-brand {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
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
