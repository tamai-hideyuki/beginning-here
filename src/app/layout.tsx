'use client';

// PWA 用の Service Worker を一度だけ登録
import 'next-pwa/register';
import '@/app/globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ja">
        <head>
            {/* 基本メタ */}
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, viewport-fit=cover"
            />
            <meta name="theme-color" content="#1f2937" />

            {/* PWA マニフェスト */}
            <link rel="manifest" href="/manifest.json" />

            {/* iOS 用メタ & アイコン */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="black-translucent"
            />
            <link rel="apple-touch-icon" href="/icons/icon-192.png" />
            <link
                rel="apple-touch-icon"
                href="/icons/icon-512.png"
                sizes="512x512"
            />

            {/* ファビコン */}
            <link rel="icon" href="/favicon.ico" sizes="any" />

            {/* ページタイトル */}
            <title>beginning-here</title>
        </head>
        <body>{children}</body>
        </html>
    );
}
