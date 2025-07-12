'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import pageStyles from './page.module.css';
import sidebarStyles from '@/components/Sidebar.module.css';
import Sidebar from '@/components/Sidebar';
import { MemoPad } from '@/components/MemoPad';
import { phrases } from '@/utils/motivation';
import { MultiRangeTable } from '@/components/MultiRangeTable';

// 動的インポート
const SidebarContent = dynamic(
    () => import('@/components/SidebarContent').then(mod => mod.default),
    {
        ssr: false,
        loading: () => <div className={sidebarStyles.loading}>Loading…</div>,
    }
);

const MAX_PHRASES = phrases.length;

export default function Home() {
    const [message, setMessage] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = useCallback(() => setSidebarOpen(v => !v), []);
    const generateMessage = useCallback(
        () => setMessage(phrases[Math.floor(Math.random() * MAX_PHRASES)]),
        []
    );

    return (
        <>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
                <SidebarContent />
                <div className={sidebarStyles.memoContainer}>
                    {/* <MemoPad className="w-full" />*/}
                </div>
            </Sidebar>

            <div className={pageStyles.wrapper}>
                {/* 上段セクション：高さ100vh */}
                <section className={pageStyles.topSection}>
                    {/* ヘッダー */}
                    <header className={pageStyles.header}>
                        <button onClick={toggleSidebar} className={pageStyles.menuButton}>
                            ≡
                        </button>
                        <h1 className={`${pageStyles.title} ${pageStyles.titleGradient}`}>
                            どんな問題を解決しようとしているの？
                        </h1>
                    </header>

                    {/* やる気スイッチ */}
                    <button onClick={generateMessage} className={pageStyles.button}>
                        やる気スイッチ
                    </button>
                    {message && <div className={pageStyles.message}>{message}</div>}
                </section>

                {/* 下段セクション：高さ100vh */}
                <section className={pageStyles.bottomSection}>
                    <MultiRangeTable />
                </section>
            </div>
        </>
    );
}
