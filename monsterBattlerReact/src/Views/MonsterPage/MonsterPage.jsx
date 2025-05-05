import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './MonsterPage.module.css'; 
import axios from 'axios';
import MonsterDisplay from '../../Components/MonsterDisplay/MonsterDisplay';
import CreateMonster from '../../Components/CreateMonster/CreateMonster';

function MonsterPage() {
    const [teamMonsters, setTeamMonsters] = useState([]);
    const [allMonsters, setAllMonsters] = useState([]);

    useEffect(() => {
        const fetchAllMonsters = async () => {
            try {
                const response = await axios.get('http://localhost:8080/monsters');
                setAllMonsters(response.data); 
            } catch (error) {
                console.error("Error fetching monsters:", error);
            }
        };

        fetchAllMonsters();
    }, []); 

    function handleMonsterClick(monster) {  
        if (teamMonsters.length < 3) {
            setTeamMonsters((prevMonsters) => [...prevMonsters, monster]);
        } else {
            alert("You can only have 3 monsters in your team.");
        }
    }

    return (
        <>
     
        <div className='pageContainer'>

            <div className='teamMonstersContainer'>
                <h1>Your Monster Team</h1>
                <div className={styles.monsterList}>
                    {teamMonsters.map((monster, index) => (
                        <div key={index}>
                            < MonsterDisplay monster={monster} />
                        </div>
                    ))}
                </div>

            </div>

            <div className='createMonsterContainer'>
                <h1>Create your monster</h1>
                <CreateMonster />   
             
            </div>

            <div className='monsterListContainer'>
                <h1>Pick your monster</h1>
            
                <div className={styles.monsterList}>
                    {allMonsters.map((monster, index) => (
                        <div key={index}>
                            < MonsterDisplay monster={monster} handleMonsterClick={handleMonsterClick} canChoose={true} />
                        </div>
                    ))}
                </div>
            </div>


            <div>
                <Link to="/battle">Battle</Link>
            </div>
        </div>
        </>
    );
}

export default MonsterPage;
