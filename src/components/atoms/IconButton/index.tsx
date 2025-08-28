'use client';

import React from 'react';
import styles from './IconButton.module.css';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'ghost';
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    size = 'medium',
    variant = 'default',
    className,
    ...props
}) => {
    const classes = [
        styles.iconButton,
        styles[size],
        styles[variant],
        className
    ].filter(Boolean).join(' ');

    return (
        <button className={classes} {...props}>
            {icon}
        </button>
    );
};