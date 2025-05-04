import React from 'react';
import styles from './MainNav.module.css';  

function MainNav() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.menu}>
                <li className={styles.menuItem}>
                    <a href="/" className={styles.navLink}>Home</a>
                </li>
                <li className={styles.menuItem}>
                    <a href="/about" className={styles.navLink}>About</a>
                </li>
                <li className={styles.menuItem}>
                    <a href="/contact" className={styles.navLink}>Contact</a>
                </li>
            </ul>
        </nav>
    );
}

export default MainNav;
