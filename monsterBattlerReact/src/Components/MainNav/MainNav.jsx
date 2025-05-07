import React, { useState } from 'react';
import styles from './MainNav.module.css';

function MainNav() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={styles.navbar}>
            {/* Hamburger menu button for mobile */}
            <button 
                className={`${styles.menuToggle} ${menuOpen ? styles.open : ''}`} 
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                <span className={styles.menuIcon}></span>
            </button>
            
            <ul className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
                <li className={styles.menuItem}>
                    <a href="/" className={styles.navLink}>Home</a>
                </li>
                <li className={styles.menuItem}>
                    <a href="/create" className={styles.navLink}>Base Monster</a>
                </li>
                <li className={styles.menuItem}>
                    <a href="/create-custom" className={styles.navLink}>Custom Monster</a>
                </li>
                <li className={styles.menuItem}>
                    <a href="/team" className={styles.navLink}>Pick Team</a>
                </li>
                <li className={styles.menuItem}>
                    <a href="/battle" className={styles.navLink}>Battle</a>
                </li>
            </ul>
        </nav>
    );
}

export default MainNav;