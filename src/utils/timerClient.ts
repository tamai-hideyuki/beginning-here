export type TimerState = {
    remainingMs: number;
    running:     boolean;
    lastUpdatedAt: string;
};

/**
 * Timer API から現在状態を取得
 */
export async function fetchTimerState(): Promise<TimerState> {
    const res = await fetch('/api/timer');
    if (!res.ok) throw new Error('Failed to fetch timer state');
    return res.json();
}

/**
 * Timer API へ状態を保存
 * @param remaining 残り時間（ms）
 * @param running    実行中フラグ
 */
export async function persistTimerState(
    remaining: number,
    running:   boolean
): Promise<void> {
    await fetch('/api/timer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ remainingMs: remaining, running }),
    });
}
