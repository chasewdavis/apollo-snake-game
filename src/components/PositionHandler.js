import React, { Component, Fragment } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';

import QueryTime from '../apollo/graphql/QueryTime';
import QueryNextTail from '../apollo/graphql/QueryNextTail';
import QueryDirection from '../apollo/graphql/QueryDirection';
import QuerySnakePositions from '../apollo/graphql/QuerySnakePositions';

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
        const { updatePosition, direction, updateSnakePositions, addToTail, snake_positions } = this.props;

        let coords;

        switch(direction) {
            case 'ArrowUp': 
                coords = { x: 0, y: -1 };
                break;
            case 'ArrowRight':
                coords = { x: 1, y: 0 };
                break;
            case 'ArrowDown':
                coords = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                coords = { x: -1, y: 0 };
                break;
            default:
                coords = { x: 0, y: 0 }
        }

        updatePosition({ variables: coords });

        // TODO - position for snake body
        updateSnakePositions({ variables: { snake_positions, addToTail }});
    }

    shouldUpdatePosition(tick, tock) {
        return tick !== tock;
    }

    render() {
        return <Fragment />
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
    graphql(QueryNextTail, {
        props: ({ data }) => data.next_tail
    }),
    graphql(QuerySnakePositions, {
        props: ({ data }) => data.snake
    }),
    graphql(UpdatePosition, {
        name: 'updatePosition'
    }),
    graphql(UpdateSnakePositions, {
        name: 'updateSnakePositions'
    })
)(PositionHandler);
