import React, { Component } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import QueryTime from '../apollo/graphql/QueryTime';
import QueryDirection from '../apollo/graphql/QueryDirection';
import UpdatePosition from '../apollo/graphql/UpdatePosition';
import UpdateSnakePositions from '../apollo/graphql/UpdateSnakePositions';

class PositionHandler extends Component {
    componentDidUpdate(prevProps) {
        const { tick } = prevProps;
        const { tick: tock } = this.props;
        if (this.shouldUpdatePosition(tick, tock)) {
            this.updatePosition();
        }
    }

    updatePosition() {
        const { updatePosition, direction, updateSnakePositions } = this.props;

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

        // TODO - explore why typeDefs is not upset if using '2' rather than 2
        updateSnakePositions({ variables: { positions: [{ x: 2, y: 7 }] }});
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
    graphql(QueryDirection, {
        props: ({ data }) => data.direction
    }),
    graphql(UpdatePosition, {
        name: 'updatePosition'
    }),
    graphql(UpdateSnakePositions, {
        name: 'updateSnakePositions'
    })
)(PositionHandler);
