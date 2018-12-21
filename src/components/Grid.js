import _ from 'lodash';
import React, { Component } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import QueryPosition from '../apollo/graphql/QueryPosition';
import QueryGridSize from '../apollo/graphql/QueryGridSize';
import QueryTime from '../apollo/graphql/QueryTime';
import QueryFoodPosition from '../apollo/graphql/QueryFoodPosition';

class Grid extends Component {
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
        // TODO - food
        console.log('props', this.props);
        const { x, y, width, height, food } = this.props;
        const { x: xfood, y: yfood } = food;

        const xs = _.range(width);
        const ys = _.range(height);
        return (
            <div className="grid-container">
                {_.map(ys, (yblock, iy) => (
                    _.map(xs, (xblock, ix) => (
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
    }) 
)(Grid);
