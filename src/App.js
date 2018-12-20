import React, { Component } from 'react';
import Grid from './components/Grid';
import ArrowKeys from './components/ArrowKeys';
import PositionHandler from './components/PositionHandler';
import FoodHandler from './components/FoodHandler';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Grid />
                <ArrowKeys />
                <PositionHandler />
                <FoodHandler />
            </div>
        );
    }
}

export default App;
