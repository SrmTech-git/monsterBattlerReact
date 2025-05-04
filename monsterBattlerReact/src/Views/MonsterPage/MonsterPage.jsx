import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MonsterDisplay from '../../Components/MonsterDisplay/MonsterDisplay';


function MonsterPage () {
   const [monsters, setMonsters] = useState([])

    return (
        <>
        <div> <h1>Pick your monster</h1> </div>
        <div >
            {monsters.map((monster, index) => (
                <div key={index}>
                    <MonsterDisplay monster={monster} />
                </div>
            ))}
           
        </div>

        <div>
            <Link to="/battle" >Battle</Link>
        </div>
        </>
    );
};

export default MonsterPage;