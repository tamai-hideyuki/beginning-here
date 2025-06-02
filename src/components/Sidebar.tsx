'use client'

import { FC, ReactNode } from 'react'
import styles from './Sidebar.module.css'

type SidebarProps = {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, children }) => {
    return (
        <div
            className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
            onClick={onClose}
        >
            <aside
                className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
                onClick={e => e.stopPropagation()}
            >
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                {children}
            </aside>
        </div>
    )
}
