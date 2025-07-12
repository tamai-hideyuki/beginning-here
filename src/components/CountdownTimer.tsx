'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './styles/CountdownTimer.module.css';
import { fetchTimerState, persistTimerState } from '@/utils/timerClient';

/**
 * 高精度タイマー + 永続化コンポーネント
 */
export default function CountdownTimer() {
    // 初期値 10,000h を ms に変換
    const INITIAL_MS = 10_000 * 3_600 * 1_000;

    const remainingRef = useRef<number>(INITIAL_MS);
    const startTimeRef = useRef<number>(0);
    const rafRef       = useRef<number | null>(null);

    const [remaining, setRemaining] = useState<number>(INITIAL_MS);
    const [running, setRunning]     = useState<boolean>(false);

    /**
     * 1フレーム毎のtick
     */
    const tick = () => {
        const now     = performance.now();
        const elapsed = now - startTimeRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
        setRemaining(remainingRef.current);
        startTimeRef.current = now;
        rafRef.current = requestAnimationFrame(tick);
    };

    /**
     * 実行／停止のトグル
     */
    const toggle = async () => {
        if (running) {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            setRunning(false);
            await persistTimerState(remainingRef.current, false);
        } else {
            // 開始
            remainingRef.current = remaining;
            startTimeRef.current = performance.now();
            rafRef.current       = requestAnimationFrame(tick);
            setRunning(true);
            await persistTimerState(remainingRef.current, true);
        }
    };

    /**
     * 初回ロード時の状態復元
     */
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
                rafRef.current       = requestAnimationFrame(tick);
            }
        })();
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    /**
     * ms を "00000h 00m 00.000s" のフォーマットに整形
     */
    const formatTime = (ms: number) => {
        const h   = Math.floor(ms / 3_600_000);
        const m   = Math.floor((ms % 3_600_000) / 60_000);
        const s   = Math.floor((ms % 60_000) / 1_000);
        const ms3 = Math.floor(ms % 1_000);
        return `${String(h).padStart(5,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}.${String(ms3).padStart(3,'0')}s`;
    };

    return (
        <div className={styles.timerContainer} onClick={toggle}>
            <div className={styles.countdownTimer}>{formatTime(remaining)}</div>
            <div className={styles.countdownLabel}>
                {running ? '■ 停止するにはクリック' : '▶ 開始するにはクリック'}
            </div>
        </div>
    );
}
