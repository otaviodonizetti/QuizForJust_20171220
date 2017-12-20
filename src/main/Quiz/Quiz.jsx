import React, {Component} from 'react';
import axios from 'axios';
import {getRandom, clearString, isMobile} from '../../helpers/helpers';

import Timer from '../../components/Timer/Timer';
import Score from '../../components/Score/Score';
import Character from '../../components/Character/Character';
import Form from '../../components/Form/Form';
import ShareWhatsApp from '../../components/ShareWhatsApp/ShareWhatsApp';

import loading from '../../assets/loading.svg';
import './Quiz.css';

export default class Quiz extends Component {
    constructor(props) {
        super(props);
        // Quantity of Characters from Marvel API
        this.characterLength = 0;
        // Characters Sorted
        this.sorted = [];
        // Interval and Timeout for the Countdown
        this.int_countdown;
        this.timeout_countdown;

        this.state = {
            score: 0,
            image: loading,
            answer: '',
            answerResult: '',
            characterName: '',
            show: false,
            countdown: 0
        };

        // Binding the Handlers
        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleGiveUp = this.handleGiveUp.bind(this);
        this.countdown = this.countdown.bind(this);
    };

    /**
     * When componentWillMount executes, the this.characterLength
     * is filled with the 'total' retrieved from the API
     */
    componentWillMount() {
        axios.get(`https://gateway.marvel.com:443/v1/public/characters?&apikey=87ac86e4c1ca243bc070fc12d3eda1d7`)
            .then(result => {
                const total = result.data.data.total;
                this.characterLength = total;
                this.sortCharacter(total);
            });
    };

    // Responsible for decrement the bonus countdown
    countdown() {
        // Avoid that the countdown executes duplicated
        clearInterval(this.int_countdown);
        clearTimeout(this.timeout_countdown);

        this.int_countdown = setInterval(() => {
            this.setState({
                countdown: this.state.countdown - 1
            });
        }, 1000);

        this.timeout_countdown = setTimeout(() => {
            clearInterval(this.int_countdown);
        }, 10000);
    };

    /**
     * Checks if the image is available, if not available
     * sorts a new character.
     * @param {string} image - Image's URL
     */
    validateImage(image) {
        if (image.indexOf('image_not_available') > -1) {
            this.sortCharacter(this.characterLength);
        } else {
            return true;
        };
    };

    /**
     * Checks if the character already been sorted, in positive
     * case, sorts a new character.
     * @param {string} name - Character's Name
     */
    checkSorted(name) {
        if (name.indexOf(this.sorted) > -1 && this.sorted.length) {
            this.sortCharacter(this.characterLength); 
        } else {
            return true;
        };
    };

    /**
     * Sorts a new character.
     * @param {number} max - Number of characters available
     */
    sortCharacter(max) {
        // Gets a random number 
        const offset = getRandom(0,max);

        // Insert Loading and reset character name
        this.setState({
            image: loading,
            characterName: '',
            show: false
        }); 

        axios.get(`https://gateway.marvel.com:443/v1/public/characters?limit=1&offset=${offset}&apikey=87ac86e4c1ca243bc070fc12d3eda1d7`)
            .then(result => {
                const name = result.data.data.results[0].name.split(' (')[0];
                const image = `${result.data.data.results[0].thumbnail.path}.${result.data.data.results[0].thumbnail.extension}`;
                
                // Validate if image is available and the character is not already sorted
                if (this.validateImage(image) && this.checkSorted(name)) {
                    this.setState({
                        image: image,
                        characterName: name,
                        show: false,
                        answer: '',
                        answerResult: '',
                        countdown: 10
                    });

                    // Include the character on sorted list
                    this.sorted.push(name);
                };
            });
    };
    
    /**
     * Checks if the answer is right
     * @param {string} answer - User's Response 
     * @param {*} result - Correct Response
     */
    verifyAnswer(answer, result) {
        return clearString(answer) === clearString(result);
    };

    // Handle with the Answer action
    handleAnswer() {
        this.reset();
        
        // Checks if the answer is right
        if (this.verifyAnswer(this.state.answer, this.state.characterName)) {
            // Checks if user answer before the end of countdown
            const points = this.state.countdown ? 2 : 1;
            
            this.setState({
                score: this.state.score + points,
                answerResult: 'correct'
            });
        } else {
            // To not get, - 1 on score for example
            if (this.state.score > 0) {
                this.setState({
                    score: this.state.score -1,
                });
            };
            
            this.setState({
                answerResult: 'wrong'
            });
        };

        // Sorts a new character
        setTimeout(() => {
            this.sortCharacter(this.characterLength);
        },2000);
    };

    // Set the answer state
    handleInput(e) {
        this.setState({
            answer: e.target.value
        });
    };

    // Sorts a new character
    handleNext() {
        // Show the answer before sort and stopping countdown
        clearInterval(this.int_countdown);
        clearTimeout(this.timeout_countdown);
        this.setState({
            countdown: 0
            // show: false
        });

        // Checks if this.characterLength is setted
        const interval = setInterval(() => {
            if (this.characterLength) {
                clearInterval(interval);
                clearTimeout(timeout);
                // Sorts a new character
                this.sortCharacter(this.characterLength);
            };
        }, 50);

        const timeout = setTimeout(() => {
            clearInterval(interval);
        }, 5000);
    };

    // Set the giveUp state (click on giveup button)
    handleGiveUp() {
        this.reset();
    };

    // Show the answer before sort and stopping countdown
    reset() {
        clearInterval(this.int_countdown);
        clearTimeout(this.timeout_countdown);
        this.setState({
            show: true,
            countdown: 0
        });
    };

    render() {
        return (
            <div className="quiz container">
                <Timer time={this.state.countdown} />
                <Score result={this.state.answerResult} points={this.state.score} />
                <div className="quiz__left">
                    <Character 
                        image={this.state.image} 
                        name={this.state.characterName}
                        giveUp={this.state.show}
                        countdown={this.countdown}
                        handleNext={this.handleNext} /> 
                </div>
                <div className="quiz__right">
                    <Form
                        giveUp={this.state.show}
                        answer={this.state.answer}
                        handleAnswer={this.handleAnswer}
                        handleGiveUp={this.handleGiveUp}
                        handleInput={this.handleInput} />
                </div>
                <ShareWhatsApp testMobile={isMobile(navigator.userAgent)} score={this.state.score} text="Share via Whatsapp"/>
            </div>
        );
    };  
};