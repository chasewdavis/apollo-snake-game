import React, { Component } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import QueryTime from '../apollo/graphql/QueryTime';
import QueryVelocity from '../apollo/graphql/QueryVelocity';
import UpdatePosition from '../apollo/graphql/UpdatePosition';

class PositionHandler extends Component {
    componentDidUpdate(prevProps) {
        const { tick } = prevProps;
        const { tick: tock } = this.props;
        if (this.shouldUpdatePosition(tick, tock)) {
            this.updatePosition();
        }
    }

    updatePosition() {
        const { updatePosition, direction } = this.props;

        let coords;

        switch(direction) {
            case 'ArrowUp': 
                coords = { y: -1 };
                break;
            case 'ArrowRight':
                coords = { x: 1 };
                break;
            case 'ArrowDown':
                coords = { y: 1 };
                break;
            case 'ArrowLeft':
                coords = { x: -1 };
                break;
            default:
                coords = { x: 0, y: 0 }
        }

        updatePosition({ variables: coords });
    }

    shouldUpdatePosition(tick, tock) {
        return tick !== tock;
    }

    render() {
        return <div />
    }
}

export default compose(
    withApollo,
    graphql(QueryTime, {
        props: ({ data }) => data.time
    }),
    graphql(QueryVelocity, {
        props: ({ data }) => data.velocity
    }),
    graphql(UpdatePosition, {
        name: 'updatePosition'
    })
)(PositionHandler);
