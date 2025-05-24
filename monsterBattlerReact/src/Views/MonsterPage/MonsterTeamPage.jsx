import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './MonsterPage.module.css'; 
import axios from 'axios';
import CustomMonsterDisplay from '../../Components/MonsterDisplay/CustomMonsterDisplay';

function MonsterPage() {
    const [teamMonsters, setTeamMonsters] = useState([]);
    const [allMonsters, setAllMonsters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [saveError, setSaveError] = useState('');

    useEffect(() => {
        fetchAllMonsters();
    }, []);

    async function fetchAllMonsters() {
        try {
            const response = await axios.get('http://localhost:8080/monsters/custom');
            setAllMonsters(response.data.slice(0, 25)); // This will take only the first 25 monsters
            setSearchResults([]); // Clear search results when showing all monsters
        } catch (error) {
            console.error("Error fetching monsters:", error);
        }
    }

    async function fetchSearchMonsters(searchTerm) {
        try {
            console.log("Searching for monsters with term:", searchTerm);
            const response = await axios.get(`http://localhost:8080/monsters/custom/search?name=${searchTerm}&monsterId=${searchTerm}`);
            console.log("Search response:", response.data);
            
            // Check if the response is an array or a single object
            if (Array.isArray(response.data)) {
                setSearchResults(response.data);
            } else if (response.data && typeof response.data === 'object') {
                // If it's a single object, wrap it in an array
                setSearchResults([response.data]);
            } else {
                // Empty array if no results or invalid data
                setSearchResults([]);
            }
        } catch (error) {
            console.error("Error fetching monsters:", error);
            setSearchResults([]);
        }
    }

   function handleMonsterClick(monster) {
    setTeamMonsters((prevMonsters) => {
        // Use prevMonsters (the current state) for all checks
        const existingMonsters = prevMonsters.filter(teamMonster => teamMonster.monsterId === monster.monsterId);
        
        if (existingMonsters.length > 0) {
            alert("This monster is already on your team.");
            return prevMonsters; // Return current state unchanged
        }
        
        if (prevMonsters.length < 3) {
            console.log("Adding monster:", monster.name || monster.monsterId);
            console.log("Previous team size:", prevMonsters.length);
            const newTeam = [...prevMonsters, monster];
            console.log("New team size:", newTeam.length);
            return newTeam;
        } else {
            alert("You can only have 3 monsters in your team.");
            return prevMonsters; // Return current state unchanged
        }
    });
    
    // Reset save status (moved outside the setState)
    setSaveSuccess(false);
    setSaveError('');
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
                                    <CustomMonsterDisplay  monster={monster} handleMonsterClick={null} canChoose={false} />
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
                <input 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value.toLocaleUpperCase())} 
                    placeholder='Search Custom Monsters'
                />
                <button onClick={() => fetchSearchMonsters(searchTerm)}>Search</button>
                <button onClick={() => {
                    // Reset search term and fetch original monsters
                    setSearchTerm('');
                    fetchAllMonsters();
                }}>Reset</button> 
                <h1>Pick your monster</h1>

                {searchResults.length > 0 && (
                    <div className={styles.searchResults}>  
                        {Array.isArray(searchResults) ? (
                            // If searchResults is an array, map through it
                            searchResults.map((monster, index) => (
                                <div key={index}>
                                    <CustomMonsterDisplay 
                                        teamMonsters={teamMonsters} 
                                        monster={monster} 
                                        handleMonsterClick={handleMonsterClick} 
                                        canChoose={true} 
                                    />
                                </div>
                            ))
                        ) : (
                            // If searchResults is a single object, render just one component
                            <CustomMonsterDisplay 
                                teamMonsters={teamMonsters} 
                                monster={searchResults} 
                                handleMonsterClick={handleMonsterClick} 
                                canChoose={true} 
                            />
                        )}
                    </div>
                )}

                {(allMonsters.length > 0 && searchResults.length === 0) ? (
                    <div className={styles.monsterList}>
                        {allMonsters.map((monster, index) => (
                            <div key={index}>
                                <CustomMonsterDisplay teamMonsters={teamMonsters} monster={monster} handleMonsterClick={handleMonsterClick} canChoose={true} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        {allMonsters.length === 0 && "Loading monsters..."}
                    </div>
                )}
            </div>

            <div className={styles.battleLinkContainer}>
                <Link 
                    to="/battle" 
                    state={{ teamMonsters: teamMonsters }}
                    className={styles.battleLink}
                >
                    Battle Arena
                </Link>
            </div>
        </div>
    );
}

export default MonsterPage;