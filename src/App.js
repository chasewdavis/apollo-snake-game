import React, { Component } from 'react';
import Grid from './components/Grid';
import ArrowKeys from './components/ArrowKeys';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Grid />
                <ArrowKeys />
            </div>
        );
    }
}

export default App;
