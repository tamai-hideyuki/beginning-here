import { persistTimerState, loadTimerState } from '@/utils/persistTimer';

const TICK_MS          = 1_000n;
const DEFAULT_REMAIN_MS = 60_000n;

export type TimerHandle = {
    /** 現在の残り時間を取得 */
    getRemaining: () => bigint;
    /** タイマーを停止する */
    stop: () => bigint;
};

/**
 * タイマーを開始し、１秒ごとに onTick を呼び出す。
 * setInterval の重複実行を避けるため、再帰的 setTimeout を利用。
 * @param onTick 残り時間（ms）を受け取るコールバック
 */
export async function startTimer(onTick: (remaining: bigint) => void): Promise<TimerHandle> {
    const stored = await loadTimerState();
    let remaining: bigint = typeof stored === 'bigint' ? stored : DEFAULT_REMAIN_MS;
    let stopped = false;

    const tick = async () => {
        if (stopped) return;
        remaining = remaining - TICK_MS;
        onTick(remaining);
        await persistTimerState(remaining);
        if (remaining > 0n) {
            setTimeout(tick, Number(TICK_MS));
        }
    };

    // 初回起動
    setTimeout(tick, Number(TICK_MS));

    return {
        getRemaining: () => remaining,
        stop: () => {
            stopped = true;
            return remaining;
        },
    };
}
