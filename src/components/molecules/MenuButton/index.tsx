'use client';

import React from 'react';
import { IconButton } from '@/components/atoms';

export interface MenuButtonProps {
    isOpen?: boolean;
    onClick: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ isOpen = false, onClick }) => {
    return (
        <IconButton
            icon={isOpen ? '✕' : '≡'}
            size="large"
            variant="ghost"
            onClick={onClick}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
        />
    );
};