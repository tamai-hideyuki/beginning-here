import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export type TimerResponse = { remainingMs: number; running: boolean };
const DEFAULT_MS = 10_000n * 3_600n * 1_000n;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TimerResponse>
) {
    const ID = 'singleton';

    if (req.method === 'GET') {
        let rec = await prisma.timer.findUnique({ where: { id: ID } });
        if (!rec) {
            rec = await prisma.timer.create({
                data: { id: ID, remainingMs: DEFAULT_MS, running: false, lastUpdatedAt: new Date() },
            });
        }
        return res.status(200).json({
            remainingMs: Number(rec.remainingMs),
            running: rec.running,
        });
    }

    if (req.method === 'POST') {
        const { remainingMs, running } = req.body as { remainingMs: number; running: boolean };
        const msBigInt = BigInt(Math.floor(remainingMs));

        const rec = await prisma.timer.update({
            where: { id: ID },
            data: { remainingMs: msBigInt, running, lastUpdatedAt: new Date() },
        });

        return res.status(200).json({
            remainingMs: Number(rec.remainingMs),
            running: rec.running,
        });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end();
}
