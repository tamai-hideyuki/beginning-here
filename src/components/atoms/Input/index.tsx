'use client';

import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'outlined' | 'filled';
    fullWidth?: boolean;
    error?: boolean;
}

export const Input: React.FC<InputProps> = ({
    variant = 'default',
    fullWidth = false,
    error = false,
    className,
    ...props
}) => {
    const classes = [
        styles.input,
        styles[variant],
        fullWidth ? styles.fullWidth : '',
        error ? styles.error : '',
        className
    ].filter(Boolean).join(' ');

    return <input className={classes} {...props} />;
};