import React, { Component } from 'react';

import './App.css';

import Header from '../components/Header/Header';
import Quiz from './Quiz/Quiz';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header title="Marvel Quiz"/>
                <Quiz />
            </div>
        );
    }
}

export default App;
