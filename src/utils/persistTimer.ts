import { createClient, RedisClientType } from 'redis';

const redis: RedisClientType = createClient({ url: process.env.REDIS_URL! });
redis.on('error', (err: Error) => console.error('Redis Client Error', err));
await redis.connect();

const DEFAULT_MS = 10_000n * 3_600n * 1_000n;

/**
 * 永続化：残り時間を保存
 * @param remaining 残り時間（ms）の bigint
 */
export async function persistTimerState(remaining: bigint): Promise<void> {
    // 整数保証
    const val = remaining < 0n ? '0' : remaining.toString();
    await redis.set('timer:remaining', val);
}

/**
 * 復元：保存された残り時間を取得
 * @returns Promise<bigint>（記録無しは DEFAULT_MS）
 */
export async function loadTimerState(): Promise<bigint> {
    const stored = await redis.get('timer:remaining');
    if (stored && /^[0-9]+$/.test(stored)) {
        return BigInt(stored);
    }
    return DEFAULT_MS;
}
