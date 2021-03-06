import _ from 'lodash';
import React, { Component } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';

import QueryPosition from '../apollo/graphql/QueryPosition';
import QueryGridSize from '../apollo/graphql/QueryGridSize';
import QueryTime from '../apollo/graphql/QueryTime';
import QueryFoodPosition from '../apollo/graphql/QueryFoodPosition';

import UpdateInitialPosition from '../apollo/graphql/UpdateInitialPosition';

class Grid extends Component {
    componentDidMount() {
        const { width, height, updateInitialPosition } = this.props;
        const x = _.random(0, width - 1);
        const y = _.random(0, height - 1);
        updateInitialPosition({ variables: { x, y }});
    }

    returnClassName({ x, xblock, y, yblock, xfood, yfood }) {
        const isSnakeHead = x === xblock && y === yblock;
        const isFood = xfood === xblock && yfood === yblock; 

        if (isSnakeHead) {
            return 'on-block';
        } else if (isFood) {
            return 'food-block'
        }
        return 'block';
    }

    render() {
        const { x, y, width, height, food } = this.props;
        const { x: xfood, y: yfood } = food;
        const xs = _.range(width);
        const ys = _.range(height);
        return (
            <div className="grid-container">
                {_.map(ys, (yblock) => (
                    _.map(xs, (xblock) => (
                        <div 
                            key={`${xblock}${yblock}`} 
                            // className={x === xblock && y === yblock ? 'on-block' : 'block'}
                            className={this.returnClassName({ x, xblock, y, yblock, xfood, yfood })}
                        />
                    ))
                ))}
            </div>
        );  
    }
}

export default compose(
    withApollo,
    graphql(QueryPosition, {
        props: ({ data }) => data.position
    }),
    graphql(QueryGridSize, {
        props: ({ data }) => data.grid_size
    }),
    graphql(QueryTime, {
        props: ({ data }) => data
    }), 
    graphql(QueryFoodPosition, {
        props: ({ data }) => data
    }),
    graphql(UpdateInitialPosition, {
        name: 'updateInitialPosition'
    })
)(Grid);
