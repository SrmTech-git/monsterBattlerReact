import React, { useState } from 'react';
import styles from './MonsterDisplay.module.css';

function MonsterDisplay({ teamMonsters = [], monster, handleMonsterClick, canChoose }) {

    /**
    {
   
     */
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
            <div className={styles.imageContainer}>
                {monster.base64Image ? (
                    <img 
                        className={styles.monsterImage} 
                        src={monster.base64Image} 
                        alt={monster.monsterId} 
                    />
                ) : (
                    <p className={styles.noImage}>No image available</p>
                )}
            </div>
            <p className={styles.stat}>Type 1: {monster.typeOne}</p>
            <p className={styles.stat}>Health: {monster.baseStats.health}</p>
            <p className={styles.stat}>physicalAttack: {monster.baseStats.physicalAttack}</p>
            <p className={styles.stat}>rangedAttack: {monster.baseStats.rangedAttack}</p>
            <p className={styles.stat}>physicalDefense: {monster.baseStats.physicalDefense}</p>
            <p className={styles.stat}>rangedDefense: {monster.baseStats.rangedDefense}</p>
            <p className={styles.stat}>speed: {monster.baseStats.speed}</p>

            {/**/}
            
            <pre className={styles.stat}>{JSON.stringify(monster, null, 2)}</pre>
            
            {canChoose && (
                <button 
                    className={isMonsterInTeam ? styles.buttonGreen : styles.buttonBlue} 
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