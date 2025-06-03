'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from './TempStorageArea.module.css';

export const TempStorageArea: React.FC = () => {
    const [memoText, setMemoText] = useState<string>('');
    const [imageData, setImageData] = useState<string>('');

    // ページ読み込み時に localStorage から復元
    useEffect(() => {
        const savedMemo = localStorage.getItem('tempStorage_memo');
        if (savedMemo) setMemoText(savedMemo);

        const savedImage = localStorage.getItem('tempStorage_image');
        if (savedImage) setImageData(savedImage);
    }, []);

    // メモ変更時に保存
    const handleMemoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setMemoText(newText);
        localStorage.setItem('tempStorage_memo', newText);
    };

    // 画像選択時に Base64 化して保存
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string;
            setImageData(base64);
            localStorage.setItem('tempStorage_image', base64);
        };
        reader.readAsDataURL(file);
    };

    // 画像クリア
    const clearImage = () => {
        setImageData('');
        localStorage.removeItem('tempStorage_image');
    };

    // メモクリア
    const clearMemo = () => {
        setMemoText('');
        localStorage.removeItem('tempStorage_memo');
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>一時メモ＆画像保管エリア</h2>

            {/* メモ入力欄 */}
            <textarea
                className={styles.memoArea}
                placeholder="ここにメモを書いてください…"
                value={memoText}
                onChange={handleMemoChange}
            />
            <div className={styles.buttonRow}>
                <button className={styles.clearButton} onClick={clearMemo}>
                    メモをクリア
                </button>
            </div>

            {/* 画像アップロード */}
            <div className={styles.imageSection}>
                <label className={styles.imageLabel}>
                    画像をアップロード：
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.fileInput}
                    />
                </label>

                <div className={styles.previewContainer}>
                    {imageData ? (
                        <>
                            {/* プレビュー表示 */}
                            <img src={imageData} alt="プレビュー" className={styles.previewImage} />

                            <div className={styles.buttonRow}>
                                {/* 画像クリアボタン */}
                                <button className={styles.clearButton} onClick={clearImage}>
                                    画像をクリア
                                </button>

                                {/* 画像ダウンロードリンク */}
                                <a
                                    href={imageData}
                                    download="downloaded_image.png"
                                    className={styles.downloadLink}
                                >
                                    ダウンロード
                                </a>
                            </div>
                        </>
                    ) : (
                        <p className={styles.noImageText}>アップロードされた画像はありません。</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TempStorageArea;
