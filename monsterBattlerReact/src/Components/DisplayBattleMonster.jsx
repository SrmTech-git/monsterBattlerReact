import React, { useState } from "react";

const DisplayBattleMonster = ({ monster, handleLeadChange }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!monster) return null;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <h2>{monster.name}</h2>
            <img src={monster.imageUrl} alt={monster.name} />
            <p>
                Health: {monster.currentHealth} / {monster.startingHealth}
            </p>

            <button onClick={() => handleLeadChange(monster)}>Switch to {monster.name}</button>

            <button onClick={toggleExpanded}>
                {isExpanded ? 'Hide Details' : 'Show Details'}
            </button>
            
            {isExpanded && (
                <div>
                    <p>Status: {monster.status || 'Active'}</p>
                    <p>
                        Level: {monster.level} / Nature: {monster.nature}
                    </p> 

                    <p>
                        Physical Attack: {monster.physicalAttack} / Physical Defense: {monster.physicalDefense}   
                    </p>
                    <p>
                        Ranged Attack: {monster.rangedAttack} / Ranged Defense: {monster.rangedDefense}
                    </p>
                    <p>
                        Speed: {monster.speed}
                    </p>
                    
                    {monster.abilities && (
                        <p>
                            Abilities: {Array.isArray(monster.abilities) 
                                ? monster.abilities.map((ability, index) => (
                                    <span key={index}>
                                        {ability.name} ({ability.effect})
                                        {index < monster.abilities.length - 1 ? ', ' : ''}
                                    </span>
                                ))
                                : 'None'
                            }
                        </p>
                    )}
                    
                    <p>
                        Attacks: {Object.values(monster.activeAttacks).map((attack, index) => (
                            <span key={index}>
                                {attack.displayName} ({attack.elementType}) - {attack.power} power
                                {index < Object.values(monster.activeAttacks).length - 1 ? ', ' : ''}
                            </span>
                        ))} 
                    </p>
                </div>
            )}
        </div>
    );
};

export default DisplayBattleMonster;