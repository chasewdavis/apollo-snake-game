import React, { Component } from 'react';
import UpdatePostion from '../apollo/graphql/UpdatePosition';
import { compose, withApollo, graphql } from 'react-apollo';
import UpdateTime from '../apollo/graphql/UpdateTime';
import QueryTime from '../apollo/graphql/QueryTime';
import UpdateVelocity from '../apollo/graphql/UpdateVelocity';
import QueryVelocity from '../apollo/graphql/QueryVelocity';

let intervalSet;

class ArrowKeys extends Component {
    componentDidMount() {
        window.addEventListener('keydown', (e) => this.handleClick(e.key));
    }

    componentWillUnmount() {
        clearInterval(intervalSet);
    }

    handleClick(direction) {
        if (!intervalSet) { 
            this.initializeTime();
        }
        this.updateVelocity(direction);
    }

    initializeTime() {
        const { updateTime } = this.props;
        const interval = () => this.updateTimeHandler();
        intervalSet = setInterval(interval, 500);
        updateTime({ variables: { interval: intervalSet }});
    }

    updateVelocity(direction) {
        const { updateVelocity } = this.props;
        updateVelocity({ variables: { direction, speed: 1 } });
    }

    updateTimeHandler() {
        const { updateTime, time } = this.props;
        const { tick } = time; 
        const tock = tick ? 0 : 1
        updateTime({ variables: { tick: tock } })
    }

    render() {
        return (
            <div />
        )
    }
}

export default compose(
    withApollo,
    graphql(UpdatePostion, {
        name: 'updatePosition'
    }),
    graphql(UpdateVelocity, {
        name: 'updateVelocity'
    }),
    graphql(UpdateTime, {
        name: 'updateTime'
    }),
    graphql(QueryTime, {
        props: ({ data }) => data
    }),
    graphql(QueryVelocity, {
        props: ({ data }) => data
    })
)(ArrowKeys);
