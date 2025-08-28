'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TimerDisplay, TimerControl } from '@/components/molecules';
import { fetchTimerState, persistTimerState } from '@/utils/timerClient';
import styles from './CountdownTimer.module.css';

export const CountdownTimer: React.FC = () => {
    const INITIAL_MS = 10_000 * 3_600 * 1_000;

    const remainingRef = useRef<number>(INITIAL_MS);
    const startTimeRef = useRef<number>(0);
    const rafRef = useRef<number | null>(null);

    const [remaining, setRemaining] = useState<number>(INITIAL_MS);
    const [running, setRunning] = useState<boolean>(false);

    const tick = () => {
        const now = performance.now();
        const elapsed = now - startTimeRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
        setRemaining(remainingRef.current);
        startTimeRef.current = now;
        rafRef.current = requestAnimationFrame(tick);
    };

    const toggle = async () => {
        if (running) {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            setRunning(false);
            await persistTimerState(remainingRef.current, false);
        } else {
            remainingRef.current = remaining;
            startTimeRef.current = performance.now();
            rafRef.current = requestAnimationFrame(tick);
            setRunning(true);
            await persistTimerState(remainingRef.current, true);
        }
    };

    useEffect(() => {
        (async () => {
            const { remainingMs, running: isRunning, lastUpdatedAt } = await fetchTimerState();
            let corrected = remainingMs;
            if (isRunning && lastUpdatedAt) {
                const elapsedSince = Date.now() - new Date(lastUpdatedAt).getTime();
                corrected = Math.max(0, remainingMs - elapsedSince);
            }
            remainingRef.current = corrected;
            setRemaining(corrected);
            setRunning(isRunning);
            if (isRunning) {
                startTimeRef.current = performance.now();
                rafRef.current = requestAnimationFrame(tick);
            }
        })();
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const hours = Math.floor(remaining / 3_600_000);
    const minutes = Math.floor((remaining % 3_600_000) / 60_000);
    const seconds = Math.floor((remaining % 60_000) / 1_000);
    const milliseconds = Math.floor(remaining % 1_000);

    return (
        <div className={styles.container}>
            <TimerDisplay
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                milliseconds={milliseconds}
            />
            <TimerControl isRunning={running} onClick={toggle} />
        </div>
    );
};