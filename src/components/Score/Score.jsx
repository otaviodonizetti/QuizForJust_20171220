import React from 'react';

import './Score.css';

/**
 * Display the user's score
 * result: String that informs if the answer is correct or wrong
 * points: The user's points
 */

export default props => {
    const result_class = props.result === '' ? '' : `score--${props.result}`;

    return (
        <div className={`score ${result_class}`}>
            <h3 className="score__title">Score</h3>
            <span className="score__points">{props.points}</span>
        </div>
    );
};