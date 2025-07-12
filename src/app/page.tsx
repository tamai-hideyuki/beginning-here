'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import pageStyles from './page.module.css';
import sidebarStyles from '@/components/styles/Sidebar.module.css';
import Sidebar from '@/components/Sidebar';
import { phrases } from '@/utils/motivation';
import { MultiRangeTable } from '@/components/MultiRangeTable';
import CountdownTimer from '@/components/CountdownTimer';

const SidebarContent = dynamic(
    () => import('@/components/SidebarContent').then(mod => mod.default),
    { ssr: false, loading: () => <div className={sidebarStyles.loading}>Loading…</div> }
);

export default function Home() {
    const [message, setMessage] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = useCallback(() => setSidebarOpen(v => !v), []);
    const generateMessage = useCallback(
        () => setMessage(phrases[Math.floor(Math.random() * phrases.length)]),
        []
    );

    return (
        <>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
                <SidebarContent />
                <div className={sidebarStyles.memoContainer}>
                    {/* <MemoPad className="w-full" /> */}
                </div>
            </Sidebar>

            <div className={pageStyles.wrapper}>
                <section className={pageStyles.topSection}>
                    <header className={pageStyles.header}>
                        <button onClick={toggleSidebar} className={pageStyles.menuButton}>
                            ≡
                        </button>
                        {/*<h1 className={`${pageStyles.title} ${pageStyles.titleGradient}`}>
                            どんな問題を解決しようとしているの？
                        </h1> */}
                    </header>

                    <div className={pageStyles.timerContainer}>
                        <CountdownTimer />
                    </div>

                    <button onClick={generateMessage} className={pageStyles.button}>
                        やる気スイッチ
                    </button>
                    {message && <div className={pageStyles.message}>{message}</div>}
                </section>

                <section className={pageStyles.bottomSection}>
                    <MultiRangeTable />
                </section>
            </div>
        </>
    );
}
