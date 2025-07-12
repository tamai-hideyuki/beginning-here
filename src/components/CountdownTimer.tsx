'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './styles/CountdownTimer.module.css';

async function saveState(remaining: number, running: boolean) {
    await fetch('/api/timer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ remainingMs: remaining, running }),
    });
}

export function CountdownTimer() {
    const INITIAL_MS = 10000 * 3600 * 1000;

    const remainingRef = useRef<number>(INITIAL_MS);

    const [remaining, setRemaining] = useState<number>(INITIAL_MS);
    const [running, setRunning]     = useState<boolean>(false);

    const startTimeRef = useRef<number>(0);
    const rafRef       = useRef<number | undefined>(undefined);

    const tick = () => {
        const now     = performance.now();
        const elapsed = now - startTimeRef.current;

        remainingRef.current = Math.max(0, remainingRef.current - elapsed);

        setRemaining(remainingRef.current);

        startTimeRef.current = now;
        rafRef.current       = requestAnimationFrame(tick);
    };

    const toggle = async () => {
        if (running) {
            cancelAnimationFrame(rafRef.current!);
            setRunning(false);
            await saveState(remainingRef.current, false);
        } else {

            remainingRef.current = remaining;
            startTimeRef.current = performance.now();
            rafRef.current       = requestAnimationFrame(tick);
            setRunning(true);
            await saveState(remainingRef.current, true);
        }
    };

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/timer');
            if (!res.ok) return;
            const { remainingMs, running: isRunning, lastUpdatedAt } = await res.json();
            let corrected = remainingMs;
            if (isRunning) {
                const elapsedSince = Date.now() - new Date(lastUpdatedAt).getTime();
                corrected = Math.max(0, remainingMs - elapsedSince);
            }

            remainingRef.current = corrected;
            setRemaining(corrected);
            setRunning(isRunning);
            if (isRunning) {
                startTimeRef.current = performance.now();
                rafRef.current       = requestAnimationFrame(tick);
            }
        })();
        return () => cancelAnimationFrame(rafRef.current!);
    }, []);

    const format = (ms: number) => {
        const h   = Math.floor(ms / 3600000);
        const m   = Math.floor((ms % 3600000) / 60000);
        const s   = Math.floor((ms % 60000)   / 1000);
        const ms3 = Math.floor(ms % 1000);
        return `${String(h).padStart(5,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}.${String(ms3).padStart(3,'0')}s`;
    };

    return (
        <div className={styles.timerContainer} onClick={toggle}>
            <div className={styles.countdownTimer}>{format(remaining)}</div>
            <div className={styles.countdownLabel}>
                {running ? '■ 停止するにはクリック' : '▶ 開始するにはクリック'}
            </div>
        </div>
    );
}
