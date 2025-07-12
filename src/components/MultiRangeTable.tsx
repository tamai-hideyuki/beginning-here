'use client';

import React, { useEffect, useState } from 'react';

export function MultiRangeTable() {
    const [rows, setRows]       = useState<string[][]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState<string | null>(null);

    useEffect(() => {
        async function fetchRanges() {
            try {
                const SHEET_ID  = process.env.NEXT_PUBLIC_SHEET_ID!;
                const API_KEY   = process.env.NEXT_PUBLIC_SHEETS_API_KEY!;
                const sheetName = process.env.NEXT_PUBLIC_SHEET_NAME!;

                const ranges = [
                    'B3:E3',
                    'B4:E4',
                    'B5:E5',
                    'B6:E6',
                    'B7:E7',
                    'B8:E8',
                    'B9:E9',
                    'B10:E10',
                    'B11:E11',
                ];

                const qs = ranges
                    .map(r => `ranges=${encodeURIComponent(`${sheetName}!${r}`)}`)
                    .join('&');

                const url =
                    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchGet?${qs}&key=${API_KEY}`;

                const res = await fetch(url);
                if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);

                interface BatchGetResponse {
                    valueRanges?: Array<{
                        range: string;
                        values?: string[][];
                    }>;
                }

                const data = (await res.json()) as BatchGetResponse;
                const fetchedRows = data.valueRanges?.map(vr => vr.values?.[0] ?? []) ?? [];
                setRows(fetchedRows);

            } catch (e: any) {
                console.error(e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        fetchRanges();
    }, []);

    if (loading) return <p>読み込み中…</p>;
    if (error)   return <p style={{ color: 'red' }}>エラー: {error}</p>;
    if (rows.length === 0) return <p>データがありません</p>;

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                {rows.map((row, i) => (
                    <tr key={i}>
                        {row.map((cell, j) => (
                            <td
                                key={j}
                                style={{
                                    border: '1px solid #ccc',
                                    padding: '8px',
                                    backgroundColor: i % 2 === 0 ? '#fafafa' : '#fff',
                                }}
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
