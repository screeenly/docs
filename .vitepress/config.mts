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
        ['link', {rel: 'icon', href: '/favicon.ico'}]
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

        // Same links as the nav on 3.screeenly.com (resources/views/components/ui/nav.blade.php in screeenly-3).
        nav: [
            {
                text: 'Product',
                items: [
                    {text: 'Screenshots', link: 'https://3.screeenly.com/features/screenshots', target: '_self', noIcon: true},
                    {text: 'PDFs', link: 'https://3.screeenly.com/features/pdf', target: '_self', noIcon: true},
                    {text: 'Your own HTML', link: 'https://3.screeenly.com/features/your-own-html', target: '_self', noIcon: true},
                    {text: 'Rendered HTML', link: 'https://3.screeenly.com/features/rendered-html', target: '_self', noIcon: true},
                    {text: 'MCP for agents', link: 'https://3.screeenly.com/features/mcp', target: '_self', noIcon: true},
                ],
            },
            {text: 'Pricing', link: 'https://3.screeenly.com/pricing', target: '_self', noIcon: true},
            {text: 'Docs', link: '/guide/general/what-is-screeenly', activeMatch: '^/(guide|reference)/'},
            {text: 'Changelog', link: 'https://3.screeenly.com/blog?category=Changelog', target: '_self', noIcon: true},
            {text: 'Blog', link: 'https://3.screeenly.com/blog', target: '_self', noIcon: true},
            {text: 'Status', link: 'https://status.3.screeenly.com/', noIcon: true},
        ],

        sidebar: {
            '/guide/': {
                base: '/guide/',
                items: [
                    {
                        text: 'Introduction',
                        collapsed: false,
                        items: [
                            {text: 'What is screeenly?', link: 'general/what-is-screeenly.md'},
                            {text: 'Changelog', link: 'general/changelog.md'},
                            {text: 'Roadmap', link: 'general/roadmap.md'},
                        ]
                    },
                    {
                        text: 'Quickstart',
                        items: [
                            {text: 'From Zero to Hero', link: 'quick-start/from-zero-to-hero.md'},
                        ]
                    },
                    {
                        text: 'API',
                        collapsed: false,
                        items: [
                            {
                                text: 'Introduction',
                                items: [
                                    {text: 'Introduction', link: 'api/introduction/'},
                                    {text: 'Authentication', link: 'api/introduction/authentication.md'},
                                    {
                                        text: 'Monthly API Usage and Limit',
                                        link: 'api/introduction/monthly-usage-limit.md'
                                    },
                                    {text: 'Credits', link: 'api/introduction/credits.md'},
                                    {text: 'Rate Limit', link: 'api/introduction/rate-limit.md'},
                                    {text: 'Request Errors', link: 'api/introduction/request-errors.md'},
                                    {text: 'Test Requests', link: 'api/introduction/test-requests.md'},
                                    {text: 'Request IDs', link: 'api/introduction/request-ids.md'},
                                ]
                            },
                            {
                                text: 'Available API Endpoints',
                                items: [
                                    {text: 'Shots (Screenshots and PDFs)', link: 'api/available-endpoints/shots.md'},
                                    {text: 'Rendered HTML', link: 'api/available-endpoints/rendered-html.md'},
                                ],
                            },

                        ],
                    },
                    {
                        text: 'Cookbook',
                        collapsed: false,
                        items: [
                            {text: 'Generate Open Graph Images', link: 'cookbook/generate-open-graph-images'},
                            {text: 'Create Full Page Screenshots', link: 'cookbook/create-full-page-screenshots'},
                            {text: 'Print Headers and Footers in PDFs', link: 'cookbook/print-headers-and-footers-in-pdfs'},
                        ]
                    },
                    {
                        text: 'Reference',
                        base: '/',
                        items: [
                            {text: 'API reference', link: 'reference/'},
                        ],
                    },
                    {
                        text: 'FAQ',
                        collapsed: false,
                        items: [
                            {
                                text: 'How long are images stored on screenly servers?',
                                link: 'faq/how-long-are-images-stored-on-screeenly-servers'
                            },
                            {
                                text: 'Which data of my API request is stored or logged?',
                                link: 'faq/which-data-of-my-api-request-is-stored-or-logged'
                            },
                            {
                                text: 'What is screeenly 3.0 doing in my logs?',
                                link: 'faq/why-is-screeenly-3-in-my-logs'
                            },
                            {
                                text: 'What happend to the open source version?',
                                link: 'faq/what-happend-to-the-open-source-version'
                            },
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
