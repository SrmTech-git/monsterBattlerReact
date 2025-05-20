import React, { useState } from 'react';
import styles from './MonsterDisplay.module.css';
import PropTypes from 'prop-types';

const CustomMonsterDisplay = ({ teamMonsters, monster, handleMonsterClick, canChoose }) => {
    const [addSuccess, setAddSuccess] = useState(false);
    
    // Check if teamMonsters exists, if not use an empty array
    const monstersList = teamMonsters || [];
    
    // Using .find() with the safe monstersList
    const foundMonster = monstersList.find(m => m.monsterId === monster.monsterId);
    const isMonsterInTeam = foundMonster !== undefined;

    const handleClick = () => {
        if (handleMonsterClick) {
            handleMonsterClick(monster);
            setAddSuccess(true);
            console.log("Monster team", teamMonsters);
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
            <h1 className={styles.name}>{monster.name} (ID: {monster.monsterId})</h1>
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
            <p className={styles.stat}>Level: {monster.level}</p>
            <p className={styles.stat}>Nature: {monster.nature}</p>
            <p className={styles.stat}>Health: {monster.currentHealth} / {monster.startingHealth}</p>
            <p className={styles.stat}>Physical Attack: {monster.physicalAttack} (Stage: {monster.physicalAttackStage})</p>
            <p className={styles.stat}>Ranged Attack: {monster.rangedAttack} (Stage: {monster.rangedAttackStage})</p>
            <p className={styles.stat}>Physical Defense: {monster.physicalDefense} (Stage: {monster.physicalDefenseStage})</p>
            <p className={styles.stat}>Ranged Defense: {monster.rangedDefense} (Stage: {monster.rangedDefenseStage})</p>
            <p className={styles.stat}>Speed: {monster.speed} (Stage: {monster.speedStage})</p>
            <p className={styles.stat}>Evasion Stage: {monster.evasionStage}</p>
            
            <h3 className={styles.statHeader}>Effort Stats</h3>
            <p className={styles.stat}>Health: {monster.effortStats.health}</p>
            <p className={styles.stat}>Physical Attack: {monster.effortStats.physicalAttack}</p>
            <p className={styles.stat}>Ranged Attack: {monster.effortStats.rangedAttack}</p>
            <p className={styles.stat}>Physical Defense: {monster.effortStats.physicalDefense}</p>
            <p className={styles.stat}>Ranged Defense: {monster.effortStats.rangedDefense}</p>
            <p className={styles.stat}>Speed: {monster.effortStats.speed}</p>
            
            <h3 className={styles.statHeader}>Potential Stats</h3>
            <p className={styles.stat}>Health: {monster.potentialStats.health}</p>
            <p className={styles.stat}>Physical Attack: {monster.potentialStats.physicalAttack}</p>
            <p className={styles.stat}>Ranged Attack: {monster.potentialStats.rangedAttack}</p>
            <p className={styles.stat}>Physical Defense: {monster.potentialStats.physicalDefense}</p>
            <p className={styles.stat}>Ranged Defense: {monster.potentialStats.rangedDefense}</p>
            <p className={styles.stat}>Speed: {monster.potentialStats.speed}</p>
            
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
};

CustomMonsterDisplay.propTypes = {
    monster: PropTypes.shape({
        monsterId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        nature: PropTypes.string.isRequired,
        abilities: PropTypes.any,
        currentHealth: PropTypes.number.isRequired,
        startingHealth: PropTypes.number.isRequired,
        physicalAttack: PropTypes.number.isRequired,
        rangedAttack: PropTypes.number.isRequired,
        physicalDefense: PropTypes.number.isRequired,
        rangedDefense: PropTypes.number.isRequired,
        speed: PropTypes.number.isRequired,
        physicalAttackStage: PropTypes.number.isRequired,
        rangedAttackStage: PropTypes.number.isRequired,
        physicalDefenseStage: PropTypes.number.isRequired,
        rangedDefenseStage: PropTypes.number.isRequired,
        speedStage: PropTypes.number.isRequired,
        evasionStage: PropTypes.number.isRequired,
        effortStats: PropTypes.shape({
            health: PropTypes.number.isRequired,
            physicalAttack: PropTypes.number.isRequired,
            rangedAttack: PropTypes.number.isRequired,
            physicalDefense: PropTypes.number.isRequired,
            rangedDefense: PropTypes.number.isRequired,
            speed: PropTypes.number.isRequired,
        }).isRequired,
        potentialStats: PropTypes.shape({
            health: PropTypes.number.isRequired,
            physicalAttack: PropTypes.number.isRequired,
            rangedAttack: PropTypes.number.isRequired,
            physicalDefense: PropTypes.number.isRequired,
            rangedDefense: PropTypes.number.isRequired,
            speed: PropTypes.number.isRequired,
        }).isRequired,
        base64Image: PropTypes.string,
    }).isRequired,
    teamMonsters: PropTypes.array,
    handleMonsterClick: PropTypes.func,
    canChoose: PropTypes.bool,
};

export default CustomMonsterDisplay;