import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

type Data = {
    remainingMs: number;
    running:     boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const id = 'singleton';

    if (req.method === 'GET') {
        let rec = await prisma.timer.findUnique({
            where: { id },
        });

        if (!rec) {
            rec = await prisma.timer.create({
                data: {
                    id,
                    remainingMs:   BigInt(10000 * 3600 * 1000),
                    running:       false,
                    lastUpdatedAt: new Date(),
                },
            });
        }

        return res.status(200).json({
            remainingMs: Number(rec.remainingMs),
            running:     rec.running,
        });
    }

    if (req.method === 'POST') {
        const { remainingMs, running } = req.body as {
            remainingMs: number;
            running:     boolean;
        };

        await prisma.timer.upsert({
            where: { id },
            update: {
                remainingMs:   BigInt(remainingMs),
                running,
                lastUpdatedAt: new Date(),
            },
            create: {
                id,
                remainingMs:   BigInt(remainingMs),
                running,
                lastUpdatedAt: new Date(),
            },
        });

        return res.status(200).json({ remainingMs, running });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end();
}
