import React from 'react';
import styles from './MonsterDisplay.module.css'; // Correct import for module styling

function MonsterDisplay({ monster }) {
    if (!monster) {
        return <div className={styles.noData}>No monster data available</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.name}>{monster.name}</h1>
            <p className={styles.stat}>Level: {monster.level}</p>
            <pre className={styles.stat} >{JSON.stringify(monster, null, 2)}</pre>

        </div>
    );
}

export default MonsterDisplay;
