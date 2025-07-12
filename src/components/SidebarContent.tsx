'use client';

import React, { FC, useState, useCallback, useMemo } from 'react';
import styles from './Sidebar.module.css';
import { sidebarLinks, LinkCategory, LinkItem, LinkGroup } from './sidebarLinks';

const LinkList: FC<{ links: LinkItem[] }> = React.memo(({ links }) => (
    <ul className={styles.linkList}>
        {links.map(({ name, href }) => (
            <li key={href}>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                >
                    {name}
                </a>
            </li>
        ))}
    </ul>
));

const SubGroup: FC<{ group: LinkGroup }> = React.memo(({ group }) => (
    <div className={styles.subGroup}>
        <h4 className={styles.subGroupTitle}>{group.title}</h4>
        <LinkList links={group.items} />
    </div>
));

export const CategorySection: FC<{ category: LinkCategory }> = React.memo(
    ({ category }) => {
        const [open, setOpen] = useState(false);
        const toggle = useCallback(() => setOpen((v) => !v), []);

        const flatLinks = useMemo<LinkItem[]>(
            () => category.groups.flatMap((g) => g.items),
            [category.groups]
        );

        return (
            <section className={styles.categorySection}>
                <button
                    onClick={toggle}
                    className={styles.categoryToggle}
                    aria-expanded={open}
                >
                    {open ? '▼' : '▶'} <span>{category.category}</span>
                </button>

                {open && (
                    <div className={styles.categoryContent}>

                        <LinkList links={flatLinks} />

                        {category.groups.map((g) => (
                            <SubGroup key={g.title} group={g} />
                        ))}
                    </div>
                )}
            </section>
        );
    }
);

const SidebarContent: FC = React.memo(() => (
    <nav className={styles.nav}>
        {sidebarLinks.map((cat) => (
            <CategorySection key={cat.category} category={cat} />
        ))}
    </nav>
));

export default SidebarContent;
