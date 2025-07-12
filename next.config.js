import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: { ignoreDuringBuilds: true },
    trailingSlash: true,
};

const pwaOptions = {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: false,
    buildExcludes: [/middleware-manifest\.json$/],
    include: [
        /^\/?index\.html$/,
        /^about\/index\.html$/,
        /^.*\.html$/,
        /^_next\/static\/.*/,
        /^_next\/image\/.*/,
        /^favicon\.ico$/,
        /^manifest\.json$/,
        /^icons\/.*\.(?:png|svg)$/,
    ],
    navigateFallback: '/index.html',

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
};

export default withPWA(pwaOptions)(nextConfig);
