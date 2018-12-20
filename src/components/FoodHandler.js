import React, { Component } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import QuerySnakePositions from '../apollo/graphql/QuerySnakePositions';
import QueryGridSize from '../apollo/graphql/QueryGridSize';

class FoodHandler extends Component {
    // food should randomly appear when direction is not null
    // food must appear anywhere on the grid 
    // other than the the snake's current positions 

    render() {
        console.log('food handler props', this.props);
        return (
            <div />
        )
    }
}

export default compose(
    withApollo,
    graphql(QuerySnakePositions, {
        props: ({ data }) => data.snake
    }),
    graphql(QueryGridSize, {
        props: ({ data }) => data.grid_size
    })
)(FoodHandler);
