import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "screeenly docs",
    description: "The knowledge base and documentation for screeenly v3.",
    srcExclude: ['**/README.md', '**/CLAUDE.md', '**/package.json', '**/package-lock.json'],

    cleanUrls: true,

    // The app has no dark mode yet, and tokens.css has no dark values.
    appearance: false,

    markdown: {
        // Code blocks are dark in the app, so use a dark theme in light mode too.
        theme: 'github-dark',
    },

    vite: {
        ssr: {
            noExternal: ['@scalar/api-reference'],
        },
    },

    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}],

        // Social networks need an absolute URL. PNG instead of WebP, because not every network reads WebP.
        ['meta', {property: 'og:image', content: 'https://docs.3.screeenly.com/og-image.png'}],
        ['meta', {property: 'og:image:width', content: '1200'}],
        ['meta', {property: 'og:image:height', content: '630'}],
        ['meta', {property: 'og:image:alt', content: 'screeenly: One request in, one image out.'}],
        ['meta', {name: 'twitter:card', content: 'summary_large_image'}],
        ['meta', {name: 'twitter:image', content: 'https://docs.3.screeenly.com/og-image.png'}],
    ],


    themeConfig: {

        // https://vitepress.dev/reference/default-theme-config
        logo: {
            src: '/screeenly-3-logo.svg',
            alt: '',
        },

        siteTitle: 'screeenly',

        editLink: {
            pattern: 'https://github.com/screeenly/docs/edit/main/:path'
        },

        nav: [
            {text: 'Guides', link: '/guide/general/what-is-screeenly', activeMatch: '^/guide/'},
            {text: 'API reference', link: '/reference/', activeMatch: '^/reference/'},
            {text: 'Playground', link: 'https://3.screeenly.com/app/playground', target: '_self', noIcon: true},
            {text: 'Back to screeenly', link: 'https://3.screeenly.com', target: '_self', noIcon: true},
        ],

        sidebar: {
            '/guide/': {
                base: '/guide/',
                items: [
                    {
                        text: 'Getting started',
                        items: [
                            {text: 'What is screeenly?', link: 'general/what-is-screeenly'},
                            {text: 'Quickstart', link: 'quick-start/from-zero-to-hero'},
                        ]
                    },
                    {
                        text: 'Using the API',
                        items: [
                            {text: 'Making requests', link: 'api/introduction/'},
                            {text: 'Authentication', link: 'api/introduction/authentication'},
                            {text: 'Free plan', link: 'api/introduction/free-plan'},
                            {text: 'Monthly usage and limit', link: 'api/introduction/monthly-usage-limit'},
                            {text: 'Credits', link: 'api/introduction/credits'},
                            {text: 'Rate limits', link: 'api/introduction/rate-limit'},
                            {text: 'Caching', link: 'api/introduction/caching'},
                            {text: 'Request IDs and retries', link: 'api/introduction/request-ids'},
                            {text: 'Test requests', link: 'api/introduction/test-requests'},
                            {text: 'Errors', link: 'api/introduction/request-errors'},
                        ]
                    },
                    {
                        text: 'Endpoints',
                        items: [
                            {text: 'Screenshots and PDFs', link: 'api/available-endpoints/shots'},
                            {text: 'Rendered HTML', link: 'api/available-endpoints/rendered-html'},
                            {text: 'All options', link: 'api/available-endpoints/options'},
                        ],
                    },
                    {
                        text: 'MCP server',
                        items: [
                            {text: 'Connect an AI agent', link: 'mcp/'},
                        ],
                    },
                    {
                        text: 'Cookbook',
                        items: [
                            {text: 'Generate Open Graph images', link: 'cookbook/generate-open-graph-images'},
                            {text: 'Full page and clipped screenshots', link: 'cookbook/create-full-page-screenshots'},
                            {text: 'Headers and footers in PDFs', link: 'cookbook/print-headers-and-footers-in-pdfs'},
                        ]
                    },
                    {
                        text: 'Help',
                        items: [
                            {text: 'Troubleshooting', link: 'faq/troubleshooting'},
                            {text: 'How long are files stored?', link: 'faq/how-long-are-images-stored-on-screeenly-servers'},
                            {text: 'Which data of my requests is stored?', link: 'faq/which-data-of-my-api-request-is-stored-or-logged'},
                            {text: 'What is screeenly doing in my logs?', link: 'faq/why-is-screeenly-3-in-my-logs'},
                            {text: 'What happened to the open source version?', link: 'faq/what-happend-to-the-open-source-version'},
                        ]
                    },
                    {
                        text: 'About',
                        items: [
                            {text: 'Changelog', link: 'general/changelog'},
                        ]
                    },
                ],
            },
            '/reference/': {
                base: '/reference/',
                items: [],
            }
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/screeenly'},
        ],

        search: {
            provider: 'local',
        },
    }
})
