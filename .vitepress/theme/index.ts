import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import { theme, useTheme } from 'vitepress-theme-openapi'
import 'vitepress-theme-openapi/dist/style.css'

export default {
    ...DefaultTheme,
    async enhanceApp({app, router, siteData}) {
        useTheme().setShowBaseURL(true)

        theme.enhanceApp({ app })
    }
} satisfies Theme
