import _ from 'lodash';
import React, { Component } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import QuerySnakePositions from '../apollo/graphql/QuerySnakePositions';
import QueryFoodPosition from '../apollo/graphql/QueryFoodPosition';
import QueryGridSize from '../apollo/graphql/QueryGridSize';
import QueryPosition from '../apollo/graphql/QueryPosition';
import QueryDirection from '../apollo/graphql/QueryDirection';
import UpdateFood from '../apollo/graphql/UpdateFood';
import UpdateNextTail from '../apollo/graphql/UpdateNextTail';

class FoodHandler extends Component {
    // TODO - FOOD THAT GETS EATON

    componentDidUpdate(prevProps) {
        const { 
            food, 
            position, 
            positions, 
            grid_size, 
            direction 
        } = prevProps;

        if (!food.x || !food.y) {
            const openSpaces = this.locateOpenSpaces({ position, positions, grid_size, direction })
            this.spawnFood(openSpaces);
        }

        this.addToSnake(this.foodWasConsumed())

    }

    locateOpenSpaces({ position, positions, grid_size, direction }) {
        const options = [];
        const { x: posX, y: posY } = position;
        const { nextX, nextY } = this.nextPostion({ direction, posX, posY });
        const { width, height } = grid_size;
        const xs = _.range(width);
        const ys = _.range(height);
        _.forEach(xs, x => {
            _.forEach(ys, y => {
                const isTakenPos = y === posY && x === posX;
                const isNextPos = y === nextY && x === nextX;
                let isTakenSnake = _.every(positions, ({ x: snakeX, y: snakeY }) => snakeX !== x && snakeY !== y);
                if (!positions.length) { isTakenSnake = false; }
                if (!isTakenPos && !isTakenSnake && !isNextPos) {
                    options.push({ x, y });
                }
            })
        })
        return options;
    }

    nextPostion({ direction, posX, posY }) {
        let nextX = posX;
        let nextY = posY;

        switch(direction) {
            case 'ArrowUp':
                nextY--;
                break;
            case 'ArrowDown':
                nextY++;
                break;
            case 'ArrowLeft':
                nextX--;
                break;
            case 'ArrowRight':
                nextX++;
                break;
            default: 
                break;
        }

        return { nextX, nextY };
    }

    spawnFood(openSpaces) {
        const { updateFood } = this.props;
        const { x, y } = _.sample(openSpaces);

        updateFood({ variables: { x, y } });
    }

    foodWasConsumed() {
        const { food, position } = this.props;
        return food.x === position.x && food.y === position.y;
    }

    addToSnake(addToTail) {
        const { updateNextTail, position } = this.props;
        const { x, y } = position;
        updateNextTail({ variables: { addToTail, x, y }});
    }

    render() {
        return (
            <div />
        )
    }
}

export default compose(
    withApollo,
    graphql(QueryPosition, {
        props: ({ data }) => data
    }),
    graphql(QueryFoodPosition, {
        props: ({ data }) => data
    }),
    graphql(QuerySnakePositions, {
        props: ({ data }) => data.snake
    }),
    graphql(QueryGridSize, {
        props: ({ data }) => data
    }),
    graphql(QueryDirection, {
        props: ({ data }) => data.direction
    }),
    graphql(UpdateFood, {
        name: 'updateFood'
    }),
    graphql(UpdateNextTail, {
        name: 'updateNextTail'
    }),

)(FoodHandler);
