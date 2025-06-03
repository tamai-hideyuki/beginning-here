'use client';

import React, { useState } from 'react';
import pageStyles from './page.module.css';
import sidebarStyles from '@/components/Sidebar.module.css';
import { Sidebar } from '@/components/Sidebar';
import { sidebarLinks, LinkCategory, LinkItem } from '@/components/sidebarLinks';
import { MemoPad } from '@/components/MemoPad';
import { phrases } from '@/utils/motivation';
//import ScrollCarousel from '@/components/ScrollCarousel';
import TempStorageArea from '@/components/TempStorageArea';

/**
 * Home ページコンポーネント
 *  ・やる気スイッチ
 *  ・サイドバー + MemoPad
 *  ・下部にスクロールカルーセル
 *  ・下部に TempStorageArea
 *  → これらすべてをデフォルトエクスポートとしてまとめる
 */
export default function Home() {
    const [message, setMessage] = useState<string>('');
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const generateMessage = () => setMessage(phrases[Math.floor(Math.random() * phrases.length)]);

    return (
        <>
            {/* ─── サイドバー + MemoPad ─── */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
                <nav className={sidebarStyles.nav}>
                    {sidebarLinks.map((cat) => (
                        <CategorySection key={cat.category} category={cat} />
                    ))}
                </nav>
                <div className={sidebarStyles.memoContainer}>
                    <MemoPad className="w-full" />
                </div>
            </Sidebar>

            {/* ─── メインコンテンツ ─── */}
            <main className={pageStyles.main}>
                <header className={pageStyles.header}>
                    <button onClick={toggleSidebar} className={pageStyles.menuButton}>
                        ≡
                    </button>
                    <h1 className={`${pageStyles.title} ${pageStyles.titleGradient}`}>
                        beginning-here
                    </h1>
                </header>

                {/* やる気スイッチ */}
                <button onClick={generateMessage} className={pageStyles.button}>
                    やる気スイッチ
                </button>
                {message && <div className={pageStyles.message}>{message}</div>}

                {/* ─── ここに一時メモ＆画像保管エリアを挿入 ─── */}
                <section>
                    <TempStorageArea />
                </section>
            </main>

            {/* ─── 画面下部に固定して無限ループスクロールする領域 ─── */}
            {/*<ScrollCarousel />*/}
        </>
    );
}

/* ─────────────────────────────────────────────────────────────
   以下は、サイドバー内部で使われる小コンポーネント。
   page.tsx の中に残しても Next.js が怒らない「ファイル内部の名前付き定義」
───────────────────────────────────────────────────────────── */
function LinkList({ category }: { category: LinkCategory }) {
    const links: LinkItem[] = category.items
        ? category.items
        : category.groups
            ? category.groups.flatMap((group) => group.items)
            : [];

    return (
        <div className={sidebarStyles.linkList}>
            {links.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={sidebarStyles.navLink}
                >
                    {link.name}
                </a>
            ))}
        </div>
    );
}

function CategorySection({ category }: { category: LinkCategory }) {
    const [open, setOpen] = useState<boolean>(false);
    const hasContent = Boolean(category.items || category.groups);

    return (
        <section className={sidebarStyles.categorySection}>
            <button
                className={sidebarStyles.categoryToggle}
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
            >
                {open ? '▼' : '▶'} <span>{category.category}</span>
            </button>

            {open && (
                <div className={sidebarStyles.categoryContent}>
                    {hasContent && <LinkList category={category} />}
                    {category.groups &&
                        category.groups.map((group) => (
                            <div key={group.groupName} className={sidebarStyles.subGroup}>
                                <h4 className={sidebarStyles.subGroupTitle}>{group.groupName}</h4>
                                <div className={sidebarStyles.linkList}>
                                    {group.items.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={sidebarStyles.navLink}
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </section>
    );
}
