import QueryPosition from '../apollo/graphql/QueryPosition';
import QueryNextTail from '../apollo/graphql/QueryNextTail';

const resolvers = {
    Mutation: {
        updateTime: (_, { tick }, { cache }) => {
            const data = {
                time: {
                    __typename: 'time',
                    tick
                }
            }

            cache.writeData({ data })

            return data.time;
        },
        updateDirection: (_, { direction }, { cache }) => {
            const data = {
                direction: {
                    __typename: 'direction',
                    direction
                }
            }

            cache.writeData({ data });

            return data.direction;
        },
        updateInitialPosition: (_, { x, y }, { cache }) => {
            const position = {
                position: {
                    __typename: 'position',
                    x,
                    y
                }
            };

            const next_tail = {
                next_tail: {
                    __typename: 'next_tail',
                    addToTail: false,
                    x,
                    y
                }
            }

            cache.writeData({ data: position });
            cache.writeData({ data: next_tail })

            return position.position;
        },
        updatePosition: (_, { xDirection, yDirection }, { cache }) => {
            const { position } = cache.readQuery({ query: QueryPosition });
            const { x: prevX, y: prevY } = position;

            let nextX = prevX + xDirection;
            let nextY = prevY + yDirection;

            if (nextX > 9) {
                nextX = 9
            } else if (nextX < 0) {
                nextX = 0
            }

            if (nextY > 9) {
                nextY = 9
            } else if (nextY < 0) {
                nextY = 0
            }

            const data = { 
                position: {
                    __typename: 'position',
                    x: nextX,
                    y: nextY
                }
            }

            cache.writeData({ data })

            return data.position;
        },
        updateSnakePositions: (_, { snake_positions, addToTail }, { cache }) => {
            // snake should move with every call, should grow if add to tail is true
            const nextPositions = snake_positions;

            console.log('snake positions', snake_positions, addToTail)
            const { next_tail } = cache.readQuery({ query: QueryNextTail });
            
            if (addToTail) {
                nextPositions.push({ x: next_tail.x, y: next_tail.y });
            }

            if (snake_positions.length) {
                // last snake position
            } else {
                // head position
            }

            const data = {
                snake: {
                    __typename: 'snake_positions',
                    snake_positions: nextPositions
                }
            };

            console.log('data', data);

            cache.writeData({ data });

            return data.snake;
        },
        updateNextTail: (_, { addToTail, x, y }, { cache }) => {

            const data = {
                next_tail: {
                    __typename: 'next_tail',
                    addToTail,
                    x,
                    y
                }
            }

            cache.writeData({ data });

            return data.next_tail;
        },
        updateFood: (_, { x, y }, { cache }) => {
            const data = {
                food: {
                    __typename: 'food',
                    x,
                    y
                }
            }

            cache.writeData({ data });

            return data.food;
        }
    },
    Query: {

    }
}

export default resolvers;