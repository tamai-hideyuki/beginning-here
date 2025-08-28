'use client';

import React from 'react';
import { Text } from '@/components/atoms';
import styles from './TimerControl.module.css';

export interface TimerControlProps {
    isRunning: boolean;
    onClick: () => void;
}

export const TimerControl: React.FC<TimerControlProps> = ({
    isRunning,
    onClick
}) => {
    return (
        <button className={styles.timerControl} onClick={onClick}>
            <div className={styles.icon}>
                {isRunning ? '■' : '▶'}
            </div>
            <Text variant="body" color="secondary">
                {isRunning ? '停止するにはクリック' : '開始するにはクリック'}
            </Text>
        </button>
    );
};