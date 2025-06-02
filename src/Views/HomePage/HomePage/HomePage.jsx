import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
    return (
        <div className={styles.pageContainer}>
            <h1>Welcome to Monster Battler</h1>
            <p>Choose your path:</p>
            <nav className={styles.nav}>
                <div className={styles.navItem}>
                    <Link to="/monsterBattlerReact/create" className={styles.navLink}>
                        <span className={styles.createIcon}>✨</span>
                        Create a monster
                    </Link>
                </div>
                <div className={styles.navItem}>
                    <Link to="/monsterBattlerReact/create-custom" className={styles.navLink}>
                        <span className={styles.createIcon}>✨</span>
                        Create a Custom monster
                    </Link>
                </div>
                <div className={styles.navItem}>
                    <Link to="/monsterBattlerReact/team" className={styles.navLink}>
                        <span className={styles.teamIcon}>👥</span>
                        Pick your Monster team
                    </Link>
                </div>
                <div className={styles.navItem}>
                    <Link to="/monsterBattlerReact/battle" className={styles.navLink}>
                        <span className={styles.battleIcon}>⚔️</span>
                        Random Battle
                    </Link>
                </div>
                <div className={styles.navItem}>
                    <Link to="/monsterBattlerReact/about" className={styles.navLink}>
                        <span className={styles.aboutIcon}>ℹ️</span>
                        About
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default HomePage;