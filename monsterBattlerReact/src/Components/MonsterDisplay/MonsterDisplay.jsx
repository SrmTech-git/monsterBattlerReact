import React from 'react';
import styles from './MonsterDisplay.module.css'; // Correct import for module styling

function MonsterDisplay({ monster }) {
    if (!monster) {
        return <div className={styles.noData}>No monster data available</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.name}>{monster.name}</h1>
            <p className={styles.stat}>Health: {monster.health}</p>
            <p className={styles.stat}>Attack: {monster.attack}</p>
            <p className={styles.stat}>Defense: {monster.defense}</p>
            <p className={styles.stat}>Speed: {monster.speed}</p>
        </div>
    );
}

export default MonsterDisplay;
