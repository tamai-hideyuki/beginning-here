'use client';

import React from 'react';
import styles from './Text.module.css';

export interface TextProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
    color?: 'primary' | 'secondary' | 'tertiary' | 'accent';
    align?: 'left' | 'center' | 'right';
    weight?: 'normal' | 'medium' | 'bold';
    children: React.ReactNode;
    className?: string;
    as?: keyof React.JSX.IntrinsicElements;
}

const defaultTags = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    body: 'p',
    caption: 'span',
    label: 'label'
} as const;

export const Text: React.FC<TextProps> = ({
    variant = 'body',
    color = 'primary',
    align = 'left',
    weight = 'normal',
    children,
    className,
    as
}) => {
    const Component = as || defaultTags[variant] || 'p';
    
    const classes = [
        styles.text,
        styles[variant],
        styles[`color-${color}`],
        styles[`align-${align}`],
        styles[`weight-${weight}`],
        className
    ].filter(Boolean).join(' ');

    return React.createElement(Component, { className: classes }, children);
};