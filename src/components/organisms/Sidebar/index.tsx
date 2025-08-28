'use client';

import React, { ReactNode, MouseEvent } from 'react';
import { IconButton } from '@/components/atoms';
import styles from './Sidebar.module.css';

export interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children }) => {
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
            onClick={handleOverlayClick}
        >
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.closeButtonWrapper}>
                    <IconButton
                        icon="×"
                        size="large"
                        variant="ghost"
                        onClick={onClose}
                        aria-label="Close sidebar"
                    />
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </aside>
        </div>
    );
};