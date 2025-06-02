// next.config.js
import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: { ignoreDuringBuilds: true },

    // ここで “完全静的エクスポート” モードに切り替え
    // build → export すると /out 以下に *.html が生成される
    output: 'export',
    // トップページは index.html、他のページも about/index.html などに出力
    trailingSlash: true,
}

const pwaConfig = {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: false,
    buildExcludes: [/middleware-manifest\.json$/],

    // static export で出力される .html とアセットをまとめてプリキャッシュ
    include: [
        // 静的 HTML
        /^\/?index\.html$/,
        /^about\/index\.html$/,
        // 他のページも同様に
        // or 汎用パターン:
        /^.*\.html$/,
        // JS/CSS/画像 etc.
        /^_next\/static\/.*/,
        /^_next\/image\/.*/,
        /^favicon\.ico$/,
        /^manifest\.json$/,
        /^icons\/.*\.(?:png|svg)$/,
    ],

    // オフライン時にページ失敗したら index.html (SPA っぽく振る舞わせる)
    fallbacks: {
        document: '/index.html',
    },

    runtimeCaching: [
        {
            urlPattern: /^https?:.*\.(?:json)$/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'api-data',
                networkTimeoutSeconds: 10,
                expiration: { maxEntries: 50, maxAgeSeconds: 24 * 3600 },
            },
        },
        {
            urlPattern: /^https?:.*\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'static-resources',
                expiration: { maxEntries: 100, maxAgeSeconds: 7 * 24 * 3600 },
            },
        },
        {
            urlPattern: /^https?:.*\.(?:png|jpg|jpeg|svg|gif|webp|woff2|ttf)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'media-assets',
                expiration: { maxEntries: 200, maxAgeSeconds: 7 * 24 * 3600 },
            },
        },
        {
            urlPattern: /^https?:.*$/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'others',
                expiration: { maxEntries: 100, maxAgeSeconds: 2 * 24 * 3600 },
            },
        },
    ],
}

export default withPWA(pwaConfig)(nextConfig)
