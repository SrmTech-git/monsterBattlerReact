import React from 'react';
import { Link } from 'react-router-dom';


function MonsterPage () {
   

    return (
        <>
        <div >
            <h1>Pick your monster</h1>
        </div>

        <div>
            <Link to="/battle" >Battle</Link>
        </div>
        </>
    );
};

export default MonsterPage;