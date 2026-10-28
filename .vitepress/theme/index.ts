import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import '@fontsource/bricolage-grotesque/latin-800.css';

import './tokens.css';
import './custom.css';

import NavCta from './components/NavCta.vue';
import SiteFooter from './components/SiteFooter.vue';

export default {
    extends: DefaultTheme,
    Layout: () =>
        h(DefaultTheme.Layout, null, {
            'nav-bar-content-after': () => h(NavCta),
            'nav-screen-content-after': () => h(NavCta, { stacked: true }),
            'layout-bottom': () => h(SiteFooter),
        }),
} satisfies Theme;
