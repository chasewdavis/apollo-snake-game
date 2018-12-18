import React, { Component } from 'react';
import UpdatePostion from '../apollo/graphql/UpdatePosition';
import { compose, withApollo, graphql } from 'react-apollo';
import UpdateTime from '../apollo/graphql/UpdateTime';
import QueryTime from '../apollo/graphql/QueryTime';
let intervalSet;

class ArrowKeys extends Component {
    componentDidMount() {
        window.addEventListener('keydown', (e) => this.handleClick(e.key));
    }

    componentWillUnmount() {
        clearInterval(intervalSet);
    }

    handleClick(direction) {
        const { updatePosition } = this.props;

        if (!intervalSet) { 
            this.initializeTime(); 
        }
        
        switch(direction) {
            case 'ArrowUp':
                return updatePosition({ variables: { y: -1 } });
            case 'ArrowLeft':
                return updatePosition({ variables: { x: -1 } });
            case 'ArrowDown':
                return updatePosition({ variables: { y: 1 } });    
            case 'ArrowRight':
                return updatePosition({ variables: { x: 1 } });
            default:
                console.log('no direction found');
                break;
        }
    }

    initializeTime() {
        const { updateTime } = this.props;
        const interval = () => this.updateTimeHandler();
        intervalSet = setInterval(interval, 1000);
        updateTime({ variables: { interval: intervalSet }});
    }

    updateTimeHandler() {
        const { updateTime, time } = this.props;
        const { tick } = time; 
        const tock = tick ? 0 : 1
        updateTime({ variables: { tick: tock } })
    }

    render() {
        return (
            <div className="arrow-keys">
                <div className="upper-keys">
                    <button onClick={() => this.handleClick('ArrowUp')}/>
                </div>
                <div className="lower-keys">
                    <button onClick={() => this.handleClick('ArrowLeft')}/>
                    <button onClick={() => this.handleClick('ArrowDown')}/>
                    <button onClick={() => this.handleClick('ArrowRight')}/>
                </div>
            </div>
        )
    }
}

export default compose(
    withApollo,
    graphql(UpdatePostion, {
        name: 'updatePosition'
    }),
    graphql(UpdateTime, {
        name: 'updateTime'
    }),
    graphql(QueryTime, {
        props: ({ data }) => data
    })
)(ArrowKeys);
