import QueryPosition from '../apollo/graphql/QueryPosition';

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
        updatePosition: (_, { x = 0, y = 0 }, { cache }) => {
            const { position } = cache.readQuery({ query: QueryPosition });
            const { x: prevX, y: prevY } = position;
            let nextX = prevX + x;
            let nextY = prevY + y;
            // nextX = nextX > 9 || nextX < 0 ? prevX : nextX;
            // nextY = prevY > 9 || nextY < 0 ? prevY : nextY;
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
        updateSnakePositions: (_, {x, y}, { cache }) => {
            

            return [];
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