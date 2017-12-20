import React, {Component} from 'react';

import If from '../If/If';
import Button from '../Button/Button';

import './Character.css';

/**
 * Displays the character:
 * image: Get the image of the character
 * giveUp: Conditionally show the character name
 * handleNext: Used to sort a new character
 */

export default class Character extends Component {
    constructor(props) {
        super(props);
    };

    shouldComponentUpdate(nextProps) {
        // Verify if image change or giveUp has been triggered
        return nextProps.image !== this.props.image || nextProps.giveUp;
    };

    render() {
        // Verify if image is loading and giveUp is not triggered
        if (this.props.image.indexOf('loading') === -1 && !this.props.giveUp)
            // Starts the countdown
            this.props.countdown();
        
        return (
            <div className="character">
                <div className="character__image">
                    <img src={this.props.image} alt="Character" onClick={this.props.countdown}/>
                </div>    
                <If test={this.props.giveUp}>
                    <span className="character__name">{this.props.name}</span>
                </If>
                <Button text="Next" type="default" onClick={this.props.handleNext} />
            </div>
        );
    };
};