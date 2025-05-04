import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className='pageContainer'>
            <h1>Welcome to Monster Battler</h1>
            <p>Choose your path:</p>
            <nav>
                <div>
                <Link to="/monsters" >Pick your Monster team</Link>
                </div>

                <div>       
                <Link to="/battle" >Random Battle</Link>
                </div>

                <div>
                <Link to="/about" >About</Link>
                </div>
            </nav>
        </div>
    );
};

export default HomePage;