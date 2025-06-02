'use client';

import { useState, useEffect, useRef, memo } from 'react';
import pageStyles from './page.module.css';
import sidebarStyles from '@/components/Sidebar.module.css';
import { Sidebar } from '@/components/Sidebar';
import { sidebarLinks, LinkCategory, LinkItem } from '@/components/sidebarLinks';
import { MemoPad } from '@/components/MemoPad';
import { phrases } from '@/utils/motivation';

/* ─── 1. 画像配列をモジュールスコープに出す ─── */
const IMAGES: string[] = [
    '/images/img1.png',
    '/images/img2.png',
    '/images/img3.png',
    '/images/img4.png',
    '/images/img5.png',
    '/images/img6.png',
    '/images/img7.png',
    // 必要に応じてさらに追加
];

const LinkList: React.FC<{ category: LinkCategory }> = memo(({ category }) => {
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
});
LinkList.displayName = 'LinkList';

const CategorySection: React.FC<{ category: LinkCategory }> = ({ category }) => {
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
};

/* ─── 2. スクロール用カルーセルを描画するコンポーネント ─── */
const ScrollCarousel: React.FC = () => {
    // ── (a) ref で scrollContent の要素を取得
    const carouselRef = useRef<HTMLDivElement>(null);
    // ── (b) 1セット分の幅 (px) を state に保持
    const [carouselWidth, setCarouselWidth] = useState(0);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        /*
          el.scrollWidth = 「実際に並べられた 2 セット分の総幅」
          その半分が → 「1セット分」の幅になるので /2 する
        */
        const totalWidth = el.scrollWidth;
        const singleWidth = totalWidth / 2;
        setCarouselWidth(singleWidth);
    }, []);

    // ── 2セットに結合した配列を一度だけ作成
    const doubledImages = [...IMAGES, ...IMAGES];

    return (
        /*
           (c) CSS 変数 --carousel-width を inline-style で設定
           - Next.js/React では CSS Modules のルールでも var(--carousel-width) が使える
        */
        <div
            className={pageStyles.scrollContainer}
            style={{ '--carousel-width': `${carouselWidth}px` } as React.CSSProperties}
        >
            <div ref={carouselRef} className={pageStyles.scrollContent}>
                {doubledImages.map((src, index) => {
                    // 余計な margin は与えず、自然に並べるだけにする
                    return (
                        <img
                            key={`${src}-${index}`}
                            src={src}
                            alt="スクロール画像"
                            className={pageStyles.carouselImage}
                        />
                    );
                })}
            </div>
        </div>
    );
};
ScrollCarousel.displayName = 'ScrollCarousel';

/* ─── 3. Home コンポーネント本体 ─── */
export default function Home() {
    const [message, setMessage] = useState<string>('');
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const generateMessage = () =>
        setMessage(phrases[Math.floor(Math.random() * phrases.length)]);

    return (
        <>
            {/* ─── サイドバー + メモパッド ─── */}
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

                <button onClick={generateMessage} className={pageStyles.button}>
                    やる気スイッチ
                </button>
                {message && <div className={pageStyles.message}>{message}</div>}
            </main>

            {/* ─── 画面下部に固定して無限ループスクロールする領域 ─── */}
            <ScrollCarousel />
        </>
    );
}
