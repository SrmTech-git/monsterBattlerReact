import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './MonsterPage.module.css'; 
import axios from 'axios';
import MonsterDisplay from '../../Components/MonsterDisplay/MonsterDisplay';

function MonsterPage() {
    const [monsters, setMonsters] = useState([]);

    useEffect(() => {
        const fetchMonsters = async () => {
            try {
                const response = await axios.get('http://localhost:8080/monsters');
                setMonsters(response.data); 
            } catch (error) {
                console.error("Error fetching monsters:", error);
            }
        };

        fetchMonsters();
    }, []); 

    return (
        <div className='pageContainer'>
            <div>
                <h1>Pick your monster</h1>
            </div>
            <div className={styles.monsterList}>
                {monsters.map((monster, index) => (
                    <div key={index}>
                        <MonsterDisplay monster={monster} />
                    </div>
                ))}
            </div>
            <div>
                <Link to="/battle">Battle</Link>
            </div>
        </div>
    );
}

export default MonsterPage;
