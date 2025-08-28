'use client';

import React from 'react';
import { MenuButton } from '@/components/molecules';
import styles from './Header.module.css';

export interface HeaderProps {
    onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    return (
        <header className={styles.header}>
            <MenuButton onClick={onMenuClick} />
        </header>
    );
};