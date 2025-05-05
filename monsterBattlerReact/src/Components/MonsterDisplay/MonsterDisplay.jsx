import React, { useState } from 'react';
import styles from './MonsterDisplay.module.css';

function MonsterDisplay({ teamMonsters = [], monster, handleMonsterClick, canChoose }) {
    const [addSuccess, setAddSuccess] = useState(false);
    
    // Check if teamMonsters exists, if not use an empty array
    const monstersList = teamMonsters || [];
    
    // Using .find() with the safe monstersList
    const foundMonster = monstersList.find(m => m.name === monster.name);
    const isMonsterInTeam = foundMonster !== undefined;

    const handleClick = () => {
        if (handleMonsterClick) {
            handleMonsterClick(monster);
            setAddSuccess(true);
            setTimeout(() => {
                setAddSuccess(false);
            }, 2000);
        }
    };

    if (!monster) {
        return <div className={styles.noData}>No monster data available</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.name}>{monster.name}</h1>
            <p className={styles.stat}>Level: {monster.level}</p>
            <p className={styles.stat}>startingHealth: {monster.startingHealth}</p>
            <p className={styles.stat}>physicalAttack: {monster.physicalAttack}</p>
            <p className={styles.stat}>rangedAttack: {monster.rangedAttack}</p>
            <p className={styles.stat}>physicalDefense: {monster.physicalDefense}</p>
            <p className={styles.stat}>rangedDefense: {monster.rangedDefense}</p>
            <p className={styles.stat}>speed: {monster.speed}</p>
            
            <pre className={styles.stat}>{JSON.stringify(monster, null, 2)}</pre>
            
            {canChoose && (
                <button 
                    className={isMonsterInTeam ? styles.buttonBlue : styles.buttonGreen} 
                    onClick={handleClick}
                >
                    Choose
                </button>
            )}
            
            {addSuccess && <p className={styles.successMessage}>Monster added successfully!</p>}
        </div>
    );
}

export default MonsterDisplay;