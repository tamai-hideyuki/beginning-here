'use client';

import React, { useRef, useState, useEffect } from 'react';
import pageStyles from '@/app/page.module.css';

/**
 * ─────────────────────────────────────────────────────────────
 * ScrollCarousel コンポーネント
 *
 * ・public/images 配下の画像を用いて無限ループスクロールを行う
 * ・CSS 変数 --carousel-width によって横幅を制御
 * ・page.module.css の .scrollContainer/.scrollContent/.carouselImage を参照
 * ─────────────────────────────────────────────────────────────
 */

// 使用する画像パスを定義
const IMAGES: string[] = [
    '/images/img1.png',
    '/images/img2.png',
    '/images/img3.png',
    '/images/img4.png',
    '/images/img5.png',
    '/images/img6.png',
    '/images/img7.png',
];

export const ScrollCarousel: React.FC = () => {
    // ── (a) コンテナ要素への参照を得る
    const carouselRef = useRef<HTMLDivElement>(null);

    // ── (b) 1セット分の幅（pixel）を state で保持
    const [carouselWidth, setCarouselWidth] = useState<number>(0);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        /*
          el.scrollWidth は並べられた全画像（2セット分）の総幅を返す
          その半分を取ることで「1セット分」の幅を算出
        */
        const totalWidth = el.scrollWidth;
        const singleWidth = totalWidth / 2;
        setCarouselWidth(singleWidth);
    }, []);

    // ── 2セットに結合した配列を一度だけ作成する
    const doubledImages = [...IMAGES, ...IMAGES];

    return (
        <div
            className={pageStyles.scrollContainer}
            // CSS 変数 --carousel-width をインラインで設定
            style={{ '--carousel-width': `${carouselWidth}px` } as React.CSSProperties}
        >
            <div ref={carouselRef} className={pageStyles.scrollContent}>
                {doubledImages.map((src, index) => (
                    <img
                        key={`${src}-${index}`}
                        src={src}
                        alt="スクロール画像"
                        className={pageStyles.carouselImage}
                    />
                ))}
            </div>
        </div>
    );
};

export default ScrollCarousel;
