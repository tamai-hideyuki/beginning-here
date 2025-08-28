'use client';

import React, { ReactNode } from 'react';
import styles from './MainLayout.module.css';

export interface MainLayoutProps {
    header: ReactNode;
    main: ReactNode;
    sidebar?: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ header, main, sidebar }) => {
    return (
        <>
            {sidebar}
            <div className={styles.wrapper}>
                <div className={styles.topSection}>
                    {header}
                    {main}
                </div>
            </div>
        </>
    );
};