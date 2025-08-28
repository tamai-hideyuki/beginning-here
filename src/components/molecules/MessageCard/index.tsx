'use client';

import React from 'react';
import { Text } from '@/components/atoms';
import styles from './MessageCard.module.css';

export interface MessageCardProps {
    message: string;
}

export const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
    return (
        <div className={styles.messageCard}>
            <Text variant="h3" align="center" weight="medium">
                {message}
            </Text>
        </div>
    );
};