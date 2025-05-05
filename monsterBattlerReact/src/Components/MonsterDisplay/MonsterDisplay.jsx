import React from 'react';
import styles from './MonsterDisplay.module.css'; 

function MonsterDisplay({ monster, handleMonsterClick, canChoose }) {
    const handleClick = () => {
        if (handleMonsterClick) {
            handleMonsterClick(monster);
        }
    };  

    if (!monster) {
        return <div className={styles.noData}> No monster data available </div>;
    }

    if (canChoose) {    
        return (
            <>
            <div className={styles.container}>
                <h1 className={styles.name}>{monster.name}</h1>
                <p className={styles.stat}>Level: {monster.level}</p>

                <p className={styles.stat}>startingHealth: {monster.startingHealth}</p>
                <p className={styles.stat}>physicalAttack: {monster.physicalAttack}</p>
                <p className={styles.stat}>rangedAttack: {monster.rangedAttack}</p>
                <p className={styles.stat}>physicalDefense: {monster.physicalDefense}</p>
                <p className={styles.stat}>rangedDefense: {monster.rangedDefense}</p>
                <p className={styles.stat}>speed: {monster.speed}</p>

                <pre className={styles.stat}> {JSON.stringify(monster, null, 2)} </pre>

            </div>

                <button className={styles.button} onClick={handleClick}>Choose</button>
            </>
        );
    } else{
        return (
            <>
            <div className={styles.container}>
                <h1 className={styles.name}>{monster.name}</h1>
                <p className={styles.stat}>Level: {monster.level}</p>

                <p className={styles.stat}>startingHealth: {monster.startingHealth}</p>
                <p className={styles.stat}>physicalAttack: {monster.physicalAttack}</p>
                <p className={styles.stat}>rangedAttack: {monster.rangedAttack}</p>
                <p className={styles.stat}>physicalDefense: {monster.physicalDefense}</p>
                <p className={styles.stat}>rangedDefense: {monster.rangedDefense}</p>
                <p className={styles.stat}>speed: {monster.speed}</p>

                <pre className={styles.stat}> {JSON.stringify(monster, null, 2)} </pre>

            </div>

                
            </>
        );
    }
}

export default MonsterDisplay;
