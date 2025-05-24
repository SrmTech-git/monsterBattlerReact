import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayBattleMonster from '../../Components/DisplayBattleMonster';

function BattlePage() {
    const location = useLocation();
    const teamMonsters = location.state?.teamMonsters || [];
    const [battleData, setBattleData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chosenAttack, setChosenAttack] = useState(null);
    const [leadMonster, setLeadMonster] = useState(null);

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

    const chooseAttack = (attackId) => {
        setChosenAttack(attackId);
        console.log('Attack chosen:', attackId);
        // TODO: Send attack to backend or handle battle logic
    };

    const handleLeadChange = (monster) => { 
      setLeadMonster(monster);
      console.log('Lead monster changed:', monster.name);
    }


    if (teamMonsters.length === 0) {
        return <div>No team selected. Please go back and select your monsters.</div>;
    }

    return (
        <div className='pageContainer'>
            <h1>Battle Arena</h1>
            {loading && <p>Initializing battle...</p>}
            {error && <p>Error: {error}</p>}
            
            {battleData && (
                <>
                    <div className='opponentTeam'>
                        <h2>Opponent Lead Monster:</h2>
                        <p>{battleData.playerTwoTeam.leadMonster.name}</p>
                    </div>

                    <div className='ourTeam'>
                        <h2>Your Team:</h2>
                        {Object.values(battleData.playerOneTeam.monsterMap).map((monster, index) => (
                            <DisplayBattleMonster monster={monster} handleLeadChange={handleLeadChange}/>
                        ))}
                    </div>
                    
                    <div>
                        <h2>Battle Started!</h2>
                        <p>Lead Monster: {battleData.playerOneTeam.leadMonster.name}</p>
                        {chosenAttack && <p>Selected Attack: {chosenAttack.displayName}</p>}
                    </div>
                    
                    <div>
                        <h2>Choose your attack:</h2>
                        {Object.values(battleData.playerOneTeam.leadMonster.activeAttacks).map((attack, index) => (
                            <button 
                                key={index} 
                                onClick={() => chooseAttack(attack)}
                                className={chosenAttack === attack.attackId ? 'selected' : ''}
                            >
                                <div>{attack.displayName}</div>
                                <div>Power: {attack.power} | Accuracy: {attack.accuracy}%</div>
                                <div>{attack.effectDescription}</div>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default BattlePage;