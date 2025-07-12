'use client';

import { FC, ReactNode, MouseEvent } from 'react';
import styles from './styles/Sidebar.module.css';

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, children }) => {
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
            onClick={handleOverlayClick}
        >
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                {children}
            </aside>
        </div>
    );
};

export default Sidebar;
