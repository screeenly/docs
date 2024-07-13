import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({

    srcDir: './src/',

    title: "screeenly Docs",
    description: "The knowledge base and documentation for screeenly v3.",

    cleanUrls: true,

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: {
            src: '/assets/screeenly-3-logo.svg',
            alt: 'screeenly Logo',
        },
        head: [
            ['link', {rel: 'icon', href: '/favicon.ico'}]
        ],

        editLink: {
            pattern: 'https://github.com/screeenly/docs/edit/main/:path'
        },

        nav: [
            {text: 'Guide', link: '/guide/general/what-is-screeenly'},
            {text: 'Reference', link: '/reference/'},
            {text: '3.screeenly.com', link: 'https://3.screeenly.com/'},
            {text: 'Status', link: 'https://status.3.screeenly.com/'},
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
                        text: 'FAQ',
                        collapsed: false,
                        items: [
                            {
                                text: 'How long are images stored on screenly servers?',
                                link: 'faq/how-long-are-images-stored-on-screeenly-servers'
                            },
                            {text: 'Can I extend my trial?', link: 'faq/can-i-extend-my-trial'},
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
