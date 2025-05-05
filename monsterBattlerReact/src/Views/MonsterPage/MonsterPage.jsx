import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './MonsterPage.module.css'; 
import axios from 'axios';
import MonsterDisplay from '../../Components/MonsterDisplay/MonsterDisplay';

function MonsterPage() {
    const [teamMonsters, setTeamMonsters] = useState([]);
    const [allMonsters, setAllMonsters] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState('');

    useEffect(() => {
        const fetchAllMonsters = async () => {
            try {
                const response = await axios.get('http://localhost:8080/monsters');
                setAllMonsters(response.data.slice(0, 10)); // This will take only the first 10 monsters
            } catch (error) {
                console.error("Error fetching monsters:", error);
            }
        };
    
        fetchAllMonsters();
    }, []);

    function handleMonsterClick(monster) {
        // Check if the monster is already in the team using filter
        const existingMonsters = teamMonsters.filter(teamMonster => teamMonster.name === monster.name);
        
        if (existingMonsters.length > 0) {
          alert("This monster is already on your team.");
          return;
        }
        
        if (teamMonsters.length < 3) {
          setTeamMonsters((prevMonsters) => [...prevMonsters, monster]);
          // Reset any previous save status messages
          setSaveSuccess(false);
          setSaveError('');
        } else {
          alert("You can only have 3 monsters in your team.");
        }
    }

    async function handleSaveTeam() {
        // Check if we have any monsters in the team
        if (teamMonsters.length === 0) {
            alert("You need to add at least one monster to your team before saving.");
            return;
        }

        // Check if team name is provided
        if (!teamName.trim()) {
            alert("Please give your team a name.");
            return;
        }

        try {
            // Prepare the payload with the team name and monsters
            const payload = {
                name: teamName,
                monsters: teamMonsters.map(monster => monster.id) // We'll just send the IDs
            };

            // Make the POST request to save the team
            const response = await axios.post('http://localhost:8080/teams', payload);
            console.log("Team saved successfully:", response.data);
            
            // Show success message
            setSaveSuccess(true);
            setSaveError('');
            
        } catch (error) {
            console.error("Error saving team:", error);
            setSaveError('Failed to save team. Please try again.');
            setSaveSuccess(false);
        }
    }

    function handleRemoveMonster(index) {
        setTeamMonsters(prevMonsters => prevMonsters.filter((_, i) => i !== index));
        // Reset any previous save status messages
        setSaveSuccess(false);
        setSaveError('');
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.teamMonstersContainer}>
                <h1>Your Monster Team</h1>
                
                <div className={styles.teamNameInput}>
                    <label htmlFor="teamName">Team Name:</label>
                    <input 
                        type="text" 
                        id="teamName" 
                        value={teamName} 
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Enter team name"
                    />
                </div>
                
                {teamMonsters.length > 0 ? (
                    <>
                        <div className={styles.monsterList}>
                            {teamMonsters.map((monster, index) => (
                                <div key={index} className={styles.teamMonsterCard}>
                                    <button 
                                        className={styles.removeButton} 
                                        onClick={() => handleRemoveMonster(index)}
                                    >
                                        ✕
                                    </button>
                                    <MonsterDisplay monster={monster} />
                                </div>
                            ))}
                        </div>
                        
                        <button 
                            className={styles.saveTeamButton} 
                            onClick={handleSaveTeam}
                        >
                            Save Team
                        </button>
                        
                        {saveSuccess && (
                            <div className={styles.successMessage}>
                                Team saved successfully!
                            </div>
                        )}
                        
                        {saveError && (
                            <div className={styles.errorMessage}>
                                {saveError}
                            </div>
                        )}
                    </>
                ) : (
                    <div className={styles.emptyState}>
                        No monsters added to your team yet. Select monsters from below to add them.
                    </div>
                )}
            </div>

            <div className={styles.monsterListContainer}>
                <h1>Pick your monster</h1>
                {allMonsters.length > 0 ? (
                    <div className={styles.monsterList}>
                        {allMonsters.map((monster, index) => (
                            <div key={index}>
                                <MonsterDisplay monster={monster} handleMonsterClick={handleMonsterClick} canChoose={true} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        Loading monsters...
                    </div>
                )}
            </div>

            <div className={styles.battleLinkContainer}>
                <Link to="/battle" className={styles.battleLink}>
                    Battle Arena
                </Link>
            </div>
        </div>
    );
}

export default MonsterPage;