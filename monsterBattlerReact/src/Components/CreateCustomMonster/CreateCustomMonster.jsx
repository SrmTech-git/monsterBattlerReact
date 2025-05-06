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
    
    // Custom monster fields
    const [level, setLevel] = useState(1);
    const [nature, setNature] = useState("NEUTRAL");
    const [abilities, setAbilities] = useState([]);
    const [physicalAttackStage, setPhysicalAttackStage] = useState(0);
    const [rangedAttackStage, setRangedAttackStage] = useState(0);
    const [physicalDefenseStage, setPhysicalDefenseStage] = useState(0);
    const [rangedDefenseStage, setRangedDefenseStage] = useState(0);
    const [speedStage, setSpeedStage] = useState(0);
    const [evasionStage, setEvasionStage] = useState(0);
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
        const payload = {
            baseMonster: baseMonster.monsterId,
            name: baseMonster.monsterId,
            level: level,
            nature: nature,
            abilities: abilities,
            currentHealth: baseMonster.baseStats.health,
            startingHealth: baseMonster.baseStats.health,
            physicalAttack: baseMonster.baseStats.physicalAttack,
            rangedAttack: baseMonster.baseStats.rangedAttack,
            physicalDefense: baseMonster.baseStats.physicalDefense,
            rangedDefense: baseMonster.baseStats.rangedDefense,
            speed: baseMonster.baseStats.speed,
            physicalAttackStage: physicalAttackStage,
            rangedAttackStage: rangedAttackStage,
            physicalDefenseStage: physicalDefenseStage,
            rangedDefenseStage: rangedDefenseStage,
            speedStage: speedStage,
            evasionStage: evasionStage,
            effortStats: effortStats,
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
            const response = await axios.get(`http://localhost:8080/monsters/base/search/${searchName}`);
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
                    {searchResult.map((monster) => (
                        <div key={monster.id} className={styles.monsterCard}>
                            <MonsterDisplay monster={monster} />
                            <button
                                className={styles.button}
                                onClick={() => handleSelectMonster(monster)}
                            >
                                Select Monster
                            </button>
                        </div>
                    ))}
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
                                <option value="NEUTRAL">NEUTRAL</option>
                                <option value="BRAVE">BRAVE</option>
                                <option value="TIMID">TIMID</option>
                                <option value="CALM">CALM</option>
                                <option value="BOLD">BOLD</option>
                                <option value="HASTY">HASTY</option>
                                {/* Add more natures as needed */}
                            </select>
                        </div>
                        
                        <h4>Stat Stages</h4>
                        <div className={styles.stagesContainer}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Physical Attack Stage:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="-6"
                                    max="6"
                                    value={physicalAttackStage}
                                    onChange={(e) => setPhysicalAttackStage(Number(e.target.value))}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Ranged Attack Stage:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="-6"
                                    max="6"
                                    value={rangedAttackStage}
                                    onChange={(e) => setRangedAttackStage(Number(e.target.value))}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Physical Defense Stage:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="-6"
                                    max="6"
                                    value={physicalDefenseStage}
                                    onChange={(e) => setPhysicalDefenseStage(Number(e.target.value))}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Ranged Defense Stage:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="-6"
                                    max="6"
                                    value={rangedDefenseStage}
                                    onChange={(e) => setRangedDefenseStage(Number(e.target.value))}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Speed Stage:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="-6"
                                    max="6"
                                    value={speedStage}
                                    onChange={(e) => setSpeedStage(Number(e.target.value))}
                                />
                            </div>
                            
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Evasion Stage:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min="-6"
                                    max="6"
                                    value={evasionStage}
                                    onChange={(e) => setEvasionStage(Number(e.target.value))}
                                />
                            </div>
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
                        
                        {/* Note: For abilities and active attacks, you might want to implement
                            a more complex UI with a multi-select or add/remove functionality.
                            This is a simplified version. */}
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