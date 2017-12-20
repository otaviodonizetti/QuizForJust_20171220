import React from 'react';

import './Form.css';

import Button from '../Button/Button';

/**
 * Form used by the user to answer the quiz
 * giveUp: Disable the buttons and the input
 * handleInput: Handle with the text entry
 * handleGiveup: Handle with the user give up action
 * handleAnswer: Handle with the user answer action
 */

export default props => {
    const keyHandler = e => {
        if (e.key === 'Enter') {
            props.handleAnswer();
        } else if (e.key === 'Escape') {
            props.handleGiveUp();
        };
    };  

    return (
        <div className="form">
            <h3 className="form__title">What is the name of this Marvel Character ?</h3>
            <input type="text" className="form__input" placeholder="Character's Name" disabled={props.giveUp} value={props.answer} onKeyUp={keyHandler} onChange={props.handleInput} />
            <div className="form__buttons">
                <Button text="I give up, who's it ?" type="secondary" disabled={props.giveUp} onClick={props.handleGiveUp}/>
                <Button text="Answer" type="default" disabled={props.giveUp} onClick={props.handleAnswer} />
            </div>
        </div>
    );
};