import React from 'react';

const TakeTurn = ({ onTakeTurn, isDisabled, isLoading }) => {
    return (
        <button 
            onClick={onTakeTurn}
            disabled={isDisabled}
            className={`take-turn-button ${isDisabled ? 'disabled' : ''} ${isLoading ? 'loading' : ''}`}
        >
            {isLoading ? 'Taking Turn...' : 'Take Turn'}
        </button>
    );
};

export default TakeTurn;