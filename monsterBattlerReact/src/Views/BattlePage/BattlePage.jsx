import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayBattleMonster from '../../Components/DisplayBattleMonster';
import TakeTurn from '../../Components/TakeTurn';

function BattlePage() {
    const location = useLocation();
    const teamMonsters = location.state?.teamMonsters || [];
    const [battleData, setBattleData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chosenAttack, setChosenAttack] = useState(null);
    const [leadMonster, setLeadMonster] = useState(null);
    const [isTakingTurn, setIsTakingTurn] = useState(false);

    const shortTeamMonsters = teamMonsters.map(monster => ({
        monsterId: monster.monsterId,
        name: monster.name
    }));
    
    const initializeBattle = async () => {
        setLoading(true);
        setError(null);
        try {
            const monsterResponse = await axios.post(
                'http://localhost:8080/createBattleTeam/easy',
                shortTeamMonsters
            );
            console.log('Monster team created:', monsterResponse.data);
            
            const battleResponse = await axios.post(
                'http://localhost:8080/startAIBattle',
                monsterResponse.data
            );
            console.log('Battle started:', battleResponse.data);
            
            setBattleData(battleResponse.data);
            setLeadMonster(battleResponse.data.playerOneTeam.leadMonster);
            console.log('leadMonster:', battleResponse.data.playerOneTeam.leadMonster);
            return battleResponse.data;
            
        } catch (error) {
            console.error('Error initializing battle:', error);
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (teamMonsters.length > 0) {
            initializeBattle();
        }
    }, []);

    const chooseAttack = (attack) => {
        setChosenAttack(attack);
        console.log('Attack chosen:', attack);
    };

    const handleLeadChange = (monster) => { 
        setLeadMonster(monster);
        setChosenAttack(null); // Reset chosen attack when changing lead
        console.log('Lead monster changed:', monster.name);
    };

    const handleTakeTurn = async () => {
        if (!chosenAttack) {
            alert('Please choose an attack first!');
            return;
        }

        setIsTakingTurn(true);
        setError(null);

        try {
            // Create the battle state to send to the backend
            const battleState = {
                ...battleData,
                playerAction: {
                    type: 'ATTACK',
                    attack: chosenAttack,
                    // If you've changed the lead monster, include that information
                    leadMonster: leadMonster || battleData.playerOneTeam.leadMonster
                }
            };

            console.log('Sending battle state:', battleState);

            // Send the turn to the backend
            const response = await axios.post(
                'http://localhost:8080/takeTurn', // Adjust endpoint as needed
                battleState
            );

            console.log('Turn result:', response.data);

            // Update the battle data with the new state
            setBattleData(response.data);
            
            // Reset chosen attack for next turn
            setChosenAttack(null);
            
            // If the lead monster changed in the response, update it
            if (response.data.playerOneTeam.leadMonster.monsterId !== 
                (leadMonster || battleData.playerOneTeam.leadMonster).monsterId) {
                setLeadMonster(response.data.playerOneTeam.leadMonster);
            }

        } catch (error) {
            console.error('Error taking turn:', error);
            setError(error.message);
        } finally {
            setIsTakingTurn(false);
        }
    };

    if (teamMonsters.length === 0) {
        return <div>No team selected. Please go back and select your monsters.</div>;
    }

    return (
        <div className='pageContainer'>
            <h1>Battle Arena</h1>
            {loading && <p>Initializing battle...</p>}
            {error && <p className="error">Error: {error}</p>}
            
            {battleData && (
                <>
                    <div className='opponentTeam'>
                        <h2>Opponent Lead Monster:</h2>
                        <p>{battleData.playerTwoTeam.leadMonster.name}</p>
                        <p>HP: {battleData.playerTwoTeam.leadMonster.currentHealth}/{battleData.playerTwoTeam.leadMonster.startingHealth}</p>
                    </div>

                    <div className='ourTeam'>
                        <h2>Your Team:</h2>
                        {Object.values(battleData.playerOneTeam.monsterMap).map((monster, index) => (
                            <DisplayBattleMonster 
                                key={index}
                                monster={monster} 
                                handleLeadChange={handleLeadChange}
                                isCurrentLead={(leadMonster || battleData.playerOneTeam.leadMonster).monsterId === monster.monsterId}
                            />
                        ))}
                    </div>
                    
                    <div>
                        <h2>Battle Status</h2>
                        <p>Lead Monster: {(leadMonster || battleData.playerOneTeam.leadMonster).name}</p>
                        <p>HP: {(leadMonster || battleData.playerOneTeam.leadMonster).currentHealth}/{(leadMonster || battleData.playerOneTeam.leadMonster).startingHealth}</p>
                        {chosenAttack && <p>Selected Attack: {chosenAttack.displayName}</p>}
                    </div>
                    
                    <div>
                        <h2>Choose your attack:</h2>
                        {Object.values((leadMonster || battleData.playerOneTeam.leadMonster).activeAttacks).map((attack, index) => (
                            <button 
                                key={index} 
                                onClick={() => chooseAttack(attack)}
                                className={chosenAttack?.attackId === attack.attackId ? 'selected' : ''}
                                disabled={isTakingTurn}
                            >
                                <div>{attack.displayName}</div>
                                <div>Power: {attack.power} | Accuracy: {attack.accuracy}%</div>
                                <div>{attack.effectDescription}</div>
                            </button>
                        ))}
                    </div>

                    <div className="turnActions">
                        <TakeTurn 
                            onTakeTurn={handleTakeTurn}
                            isDisabled={!chosenAttack || isTakingTurn}
                            isLoading={isTakingTurn}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default BattlePage;