'use client'

import React from 'react'

type MemoPadProps = {
    className?: string
}

// PWAビルド手順を永続メモとして表示
const initialMemo = `

./buildAndServe.sh

HTTPS通信を試みたい場合は：
ngrok http 3000

`

export function MemoPad({ className = '' }: MemoPadProps) {
    return (
        <div className={`mt-6 ${className}`}>
            <textarea
                readOnly
                rows={initialMemo.split('\n').length}
                className="w-full p-2 bg-gray-900 text-white rounded resize-none overflow-auto whitespace-pre-wrap"
                value={initialMemo}
                aria-label="PWA build steps"
            />
        </div>
    )
}
