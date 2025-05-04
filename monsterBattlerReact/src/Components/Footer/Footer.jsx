import React from 'react';
import styles from './Footer.module.css';

function Footer () {
    const currentDate = new Date().toLocaleDateString();

    return (
        <footer>
            <p>&copy; {currentDate} Monster Battler. All rights reserved.</p>
        </footer>
    );
};

export default Footer;