'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { MainLayout } from '../MainLayout';
import { Header, Sidebar, CountdownTimer, MotivationSection } from '@/components/organisms';
import { MultiRangeTable } from '@/components/MultiRangeTable';
import styles from './HomePage.module.css';

const SidebarContent = dynamic(
    () => import('@/components/SidebarContent').then(mod => mod.default),
    { ssr: false, loading: () => <div>Loading…</div> }
);

export const HomePage: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = useCallback(() => setSidebarOpen(v => !v), []);

    return (
        <MainLayout
            header={<Header onMenuClick={toggleSidebar} />}
            main={
                <div className={styles.mainContent}>
                    <div className={styles.timerSection}>
                        <CountdownTimer />
                    </div>
                    <div className={styles.motivationSection}>
                        <MotivationSection />
                    </div>
                    <div className={styles.tableSection}>
                        <MultiRangeTable />
                    </div>
                </div>
            }
            sidebar={
                <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
                    <SidebarContent />
                </Sidebar>
            }
        />
    );
};