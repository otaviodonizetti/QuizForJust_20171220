import React from 'react';

import If from '../If/If';

import './Timer.css';

/**
 * Display the timer
 * time: Remanescent time to answer
 */

export default props => (
    <If test={props.time}>
        <div className="timer">
            <h3 className="timer__title">Bonus:</h3>
            <span className="timer__seconds">{props.time}</span>
        </div>
    </If>
);