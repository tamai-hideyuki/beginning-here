'use client';

import React, { useState } from 'react';
import pageStyles from './page.module.css';
import sidebarStyles from '@/components/Sidebar.module.css';
import { Sidebar } from '@/components/Sidebar';
import { sidebarLinks, LinkCategory, LinkItem } from '@/components/sidebarLinks';
import { MemoPad } from '@/components/MemoPad';
import { phrases } from '@/utils/motivation';
import { MultiRangeTable } from "@/components/MultiRangeTable";

/**
 * Home ページコンポーネント
 *  ・やる気スイッチ
 *  ・サイドバー + MemoPad
 *  ・「上下 2 画面分」（上段100vh：メインコンテンツ／下段100vh：TempStorageArea）
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

            {/* ─── メイン＆フッター全体をラップするコンテナ ─── */}
            <div className={pageStyles.wrapper}>
                {/* ─── 上段：高さ 100vh のメインコンテンツ ─── */}
                <div className={pageStyles.topSection}>
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
                </div>

                {/* ─── 下段：高さ 100vh の TempStorageArea （フッター相当） ─── */}
                <MultiRangeTable />
            </div>
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
