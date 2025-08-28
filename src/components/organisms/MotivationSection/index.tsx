'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/atoms';
import { MessageCard } from '@/components/molecules';
import { phrases } from '@/utils/motivation';
import styles from './MotivationSection.module.css';

export const MotivationSection: React.FC = () => {
    const [message, setMessage] = useState('');
    
    const generateMessage = useCallback(() => {
        setMessage(phrases[Math.floor(Math.random() * phrases.length)]);
    }, []);

    return (
        <div className={styles.container}>
            <Button onClick={generateMessage} size="large">
                やる気スイッチ
            </Button>
            {message && (
                <div className={styles.messageWrapper}>
                    <MessageCard message={message} />
                </div>
            )}
        </div>
    );
};