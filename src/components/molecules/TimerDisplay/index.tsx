'use client';

import React from 'react';
import { Text } from '@/components/atoms';
import styles from './TimerDisplay.module.css';

export interface TimerDisplayProps {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
    hours,
    minutes,
    seconds,
    milliseconds
}) => {
    const formatNumber = (num: number, digits: number) => {
        return String(num).padStart(digits, '0');
    };

    return (
        <div className={styles.timerDisplay}>
            <div className={styles.timeGroup}>
                <Text variant="h1" weight="bold" className={styles.timeValue}>
                    {formatNumber(hours, 5)}
                </Text>
                <Text variant="label" color="secondary">h</Text>
            </div>
            <div className={styles.timeGroup}>
                <Text variant="h1" weight="bold" className={styles.timeValue}>
                    {formatNumber(minutes, 2)}
                </Text>
                <Text variant="label" color="secondary">m</Text>
            </div>
            <div className={styles.timeGroup}>
                <Text variant="h1" weight="bold" className={styles.timeValue}>
                    {formatNumber(seconds, 2)}
                </Text>
                <Text variant="label" color="secondary">.</Text>
                <Text variant="h2" weight="medium" className={styles.milliseconds}>
                    {formatNumber(milliseconds, 3)}
                </Text>
                <Text variant="label" color="secondary">s</Text>
            </div>
        </div>
    );
};