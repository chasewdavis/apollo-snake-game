import React, { Component } from 'react';
import Grid from './components/Grid';
import ArrowKeys from './components/ArrowKeys';
import PositionHander from './components/PositionHander';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Grid />
                <ArrowKeys />
                <PositionHander />
            </div>
        );
    }
}

export default App;
