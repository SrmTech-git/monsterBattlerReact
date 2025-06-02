import React, { useState } from "react";
import axios from "axios";
import styles from "./CreateCustomMonster.module.css";
import MonsterDisplay from "../MonsterDisplay/MonsterDisplay";

function CreateCustomMonster() {
    const [searchName, setSearchName] = useState("");
    const [baseMonster, setBaseMonster] = useState(null);
    const [formData, setFormData] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });
    const [searchResult, setSearchResult] = useState(null);
    

    const [level, setLevel] = useState(1);
    const [nature, setNature] = useState("HARDY");
    const [abilities, setAbilities] = useState([]);
    const [baseStats, setBaseStats] = useState({
        rangedDefense: baseMonster ? baseMonster.baseStats.rangedDefense : 0,
        health: baseMonster ? baseMonster.baseStats.health : 0,
        rangedAttack: baseMonster ? baseMonster.baseStats.rangedAttack : 0, 
        physicalDefense: baseMonster ? baseMonster.baseStats.physicalDefense : 0,
        physicalAttack: baseMonster ? baseMonster.baseStats.physicalAttack : 0, 
        speed: baseMonster ? baseMonster.baseStats.speed : 0
    });

    const [effortStats, setEffortStats] = useState({
        health: 0,
        physicalAttack: 0,
        rangedAttack: 0,
        physicalDefense: 0,
        rangedDefense: 0,
        speed: 0
    });
    const [potentialStats, setPotentialStats] = useState({
        health: 0,
        physicalAttack: 0,
        rangedAttack: 0,
        physicalDefense: 0,
        rangedDefense: 0,
        speed: 0
    });
    const [activeAttacks, setActiveAttacks] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!baseMonster) {
            setNotification({
                show: true,
                message: "Please select a base monster first",
                type: "error"
            });
            
            setTimeout(() => {
                setNotification({ show: false, message: "", type: "" });
            }, 3000);
            return;
        }

        // Create the payload using the base monster's properties and custom properties
        // Adjusted to match the example payload structure
        const payload = {
            monsterId: baseMonster.monsterId,
            name: baseMonster.monsterId, // Using monsterId as name per requirements
            level: level,
            base64Image: baseMonster.base64Image,
            nature: nature,
            abilities: abilities,
            effortStats: effortStats,
            baseStats: baseStats,
            potentialStats: potentialStats,
            activeAttacks: activeAttacks
        };

        setFormData(payload);

        try {
            const response = await axios.post("http://localhost:8080/monsters/create/custom", payload);
            console.log("Custom monster created successfully:", response.data);
            setNotification({
                show: true,
                message: `Custom monster based on ${baseMonster.monsterId} was created successfully!`,
                type: "success"
            });

            setTimeout(() => {
                setNotification({ show: false, message: "", type: "" });
            }, 3000);
        } catch (error) {
            console.error("Error creating custom monster:", error);
            setNotification({
                show: true,
                message: `Error creating custom monster: ${error.response?.data?.message || error.message}`,
                type: "error"
            });

            setTimeout(() => {
                setNotification({ show: false, message: "", type: "" });
            }, 5000);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/monsters/base/search?monsterId=${searchName}`);
            setSearchResult(response.data);
        } catch (error) {
            console.error("Error fetching monster:", error);
            setSearchResult(null);
        }
    };

    const handleSelectMonster = (monster) => {
        setBaseMonster(monster);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create Custom Monster</h1>

            <div className={styles.searchContainer}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Search Monster:</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="Enter monster name to search"
                    />
                </div>

                <button type="button" onClick={handleSearch} className={styles.button}>
                    Search Base Monsters
                </button>
            </div>

            {searchResult && (
                <div className={styles.searchResult}>
                    <h3>Search Results:</h3>
                    
                        <div key={searchResult.id} className={styles.monsterCard}>
                            <MonsterDisplay monster={searchResult} />
                            <button
                                className={styles.button}
                                onClick={() => handleSelectMonster(searchResult)}
                            >
                                Select Monster
                            </button>
                        </div>
                    
                </div>
            )}

            {baseMonster && (
                <div className={styles.customMonsterForm}>
                    <h2>Create Custom Monster Based On: {baseMonster.monsterId}</h2>
                    
                    <div className={styles.baseMonsterDetails}>
                        <h3>Base Monster Details</h3>
                        
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Name:</span>
                            <span className={styles.detailValue}>{baseMonster.monsterId}</span>
                        </div>
                        
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Type One:</span>
                            <span className={styles.detailValue}>{baseMonster.typeOne || "NORMAL"}</span>
                        </div>
                        
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Type Two:</span>
                            <span className={styles.detailValue}>{baseMonster.typeTwo || "None"}</span>
                        </div>
                        
                        <div className={styles.statsContainer}>
                            <h4>Base Stats</h4>
                            
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Health:</span>
                                <span className={styles.detailValue}>{baseMonster.baseStats.health}</span>
                            </div>
                            
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Physical Attack:</span>
                                <span className={styles.detailValue}>{baseMonster.baseStats.physicalAttack}</span>
                            </div>
                            
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Ranged Attack:</span>
                                <span className={styles.detailValue}>{baseMonster.baseStats.rangedAttack}</span>
                            </div>
                            
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Physical Defense:</span>
                                <span className={styles.detailValue}>{baseMonster.baseStats.physicalDefense}</span>
                            </div>
                            
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Ranged Defense:</span>
                                <span className={styles.detailValue}>{baseMonster.baseStats.rangedDefense}</span>
                            </div>
                            
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Speed:</span>
                                <span className={styles.detailValue}>{baseMonster.baseStats.speed}</span>
                            </div>
                        </div>
                    </div>

                    {baseMonster.base64Image && (
                        <div className={styles.imagePreview}>
                            <h4>Monster Image:</h4>
                            <img
                                src={baseMonster.base64Image}
                                alt="Monster preview"
                                className={styles.previewImage}
                                style={{ maxWidth: "200px", maxHeight: "200px" }}
                            />
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <h3>Custom Monster Properties</h3>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Level:</label>
                            <input
                                className={styles.input}
                                type="number"
                                min="1"
                                max="100"
                                value={level}
                                onChange={(e) => setLevel(Number(e.target.value))}
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nature:</label>
                            <select
                                className={styles.input}
                                value={nature}
                                onChange={(e) => setNature(e.target.value)}
                            >
                                <option value="ADAMANT">ADAMANT</option>
                                <option value="BASHFUL">BASHFUL</option>
                                <option value="BOLD">BOLD</option>
                                <option value="BRAVE">BRAVE</option>
                                <option value="CALM">CALM</option>
                                <option value="CAREFUL">CAREFUL</option>
                                <option value="DOCILE">DOCILE</option>
                                <option value="GENTLE">GENTLE</option>
                                <option value="HARDY">HARDY</option>
                                <option value="HASTY">HASTY</option>
                                <option value="IMPISH">IMPISH</option>
                                <option value="JOLLY">JOLLY</option>
                                <option value="LAX">LAX</option>
                                <option value="LONELY">LONELY</option>
                                <option value="MILD">MILD</option>
                                <option value="MODEST">MODEST</option>
                                <option value="NAIVE">NAIVE</option>
                                <option value="NAUGHTY">NAUGHTY</option>
                                <option value="QUIET">QUIET</option>
                                <option value="QUIRKY">QUIRKY</option>
                                <option value="RASH">RASH</option>
                                <option value="RELAXED">RELAXED</option>
                                <option value="SASSY">SASSY</option>
                                <option value="SERIOUS">SERIOUS</option>
                                <option value="TIMID">TIMID</option>
                            </select>
                        </div>
                        

                        
                        <h4>Effort Stats</h4>
                        <div className={styles.effortStatsContainer}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Health:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="0"
                                    max="255"
                                    value={effortStats.health}
                                    onChange={(e) => setEffortStats({...effortStats, health: Number(e.target.value)})}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Physical Attack:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="0"
                                    max="255"
                                    value={effortStats.physicalAttack}
                                    onChange={(e) => setEffortStats({...effortStats, physicalAttack: Number(e.target.value)})}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Ranged Attack:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="0"
                                    max="255"
                                    value={effortStats.rangedAttack}
                                    onChange={(e) => setEffortStats({...effortStats, rangedAttack: Number(e.target.value)})}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Physical Defense:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="0"
                                    max="255"
                                    value={effortStats.physicalDefense}
                                    onChange={(e) => setEffortStats({...effortStats, physicalDefense: Number(e.target.value)})}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Ranged Defense:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="0"
                                    max="255"
                                    value={effortStats.rangedDefense}
                                    onChange={(e) => setEffortStats({...effortStats, rangedDefense: Number(e.target.value)})}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Speed:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="0"
                                    max="255"
                                    value={effortStats.speed}
                                    onChange={(e) => setEffortStats({...effortStats, speed: Number(e.target.value)})}
                                />
                            </div>
                        </div>
                        
                        <h4>Potential Stats</h4>
                        <div className={styles.potentialStatsContainer}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Health:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="0"
                                    max="31"
                                    value={potentialStats.health}
                                    onChange={(e) => setPotentialStats({...potentialStats, health: Number(e.target.value)})}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Physical Attack:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="0"
                                    max="31"
                                    value={potentialStats.physicalAttack}
                                    onChange={(e) => setPotentialStats({...potentialStats, physicalAttack: Number(e.target.value)})}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Ranged Attack:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="0"
                                    max="31"
                                    value={potentialStats.rangedAttack}
                                    onChange={(e) => setPotentialStats({...potentialStats, rangedAttack: Number(e.target.value)})}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Physical Defense:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="0"
                                    max="31"
                                    value={potentialStats.physicalDefense}
                                    onChange={(e) => setPotentialStats({...potentialStats, physicalDefense: Number(e.target.value)})}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Ranged Defense:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="0"
                                    max="31"
                                    value={potentialStats.rangedDefense}
                                    onChange={(e) => setPotentialStats({...potentialStats, rangedDefense: Number(e.target.value)})}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Speed:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="0"
                                    max="31"
                                    value={potentialStats.speed}
                                    onChange={(e) => setPotentialStats({...potentialStats, speed: Number(e.target.value)})}
                                />
                            </div>
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Abilities (comma-separated):</label>
                            <input
                                className={styles.input}
                                type="text"
                                value={abilities.join(",")}
                                onChange={(e) => setAbilities(e.target.value.split(",").map(a => a.trim()).filter(a => a))}
                                placeholder="Enter abilities, separated by commas"
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Active Attacks (comma-separated):</label>
                            <input
                                className={styles.input}
                                type="text"
                                value={activeAttacks.join(",")}
                                onChange={(e) => setActiveAttacks(e.target.value.split(",").map(a => a.trim()).filter(a => a))}
                                placeholder="Enter active attacks, separated by commas"
                            />
                        </div>
                        
                        <button type="submit" className={styles.button}>
                            Create Custom Monster
                        </button>
                    </form>
                </div>
            )}

            <div className={styles.previewContainer}>
                <h3 className={styles.previewTitle}>Preview Data:</h3>
                <pre className={styles.preview}>
                    {formData ? JSON.stringify(formData, null, 2) : "No data submitted yet"}
                </pre>
            </div>

            {notification.show && (
                <div className={`${styles.notification} ${styles[notification.type]}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
}

export default CreateCustomMonster;