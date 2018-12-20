import React, { Component } from 'react';
import UpdatePostion from '../apollo/graphql/UpdatePosition';
import { compose, withApollo, graphql } from 'react-apollo';
import UpdateTime from '../apollo/graphql/UpdateTime';
import QueryTime from '../apollo/graphql/QueryTime';
import UpdateDirection from '../apollo/graphql/UpdateDirection';
import QueryDirection from '../apollo/graphql/QueryDirection';

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
        this.updateDirection(direction);
    }

    initializeTime() {
        const { updateTime } = this.props;
        const interval = () => this.updateTimeHandler();
        intervalSet = setInterval(interval, 500);
        updateTime({ variables: { interval: intervalSet }});
    }

    updateDirection(direction) {
        const { updateDirection } = this.props;
        updateDirection({ variables: { direction } });
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
    graphql(UpdateDirection, {
        name: 'updateDirection'
    }),
    graphql(UpdateTime, {
        name: 'updateTime'
    }),
    graphql(QueryTime, {
        props: ({ data }) => data
    }),
    graphql(QueryDirection, {
        props: ({ data }) => data
    })
)(ArrowKeys);
