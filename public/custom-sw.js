// public/custom-sw.js
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'

// ビルド時に injectManifest されるリストをプリキャッシュ
precacheAndRoute(self.__WB_MANIFEST)

// 古いキャッシュを自動で掃除
cleanupOutdatedCaches()

// 「_next」や API はオンライン優先
registerRoute(
    ({ url }) => url.pathname.startsWith('/_next/') || url.pathname.startsWith('/api/'),
    new NetworkFirst({ cacheName: 'pages-and-api', networkTimeoutSeconds: 10 })
)

// 画像・フォントなどはキャッシュ優先
registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif|webp|woff2|ttf|eot|otf)$/,
    new CacheFirst({ cacheName: 'static-assets', plugins: [
            // 自動で古いエントリを掃除したいなら Workbox の ExpirationPlugin を追加
        ]})
)

// それ以外は StaleWhileRevalidate
registerRoute(
    ({ request }) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style' || request.destination === 'font',
    new StaleWhileRevalidate({ cacheName: 'others' })
)
