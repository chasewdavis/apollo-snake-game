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
        updateVelocity: (_, { direction, speed = 1 }, { cache }) => {
            const data = {
                velocity: {
                    __typename: 'velocity',
                    direction,
                    speed // TODO - may be able to delete
                    // time is handling this?
                }
            }

            cache.writeData({ data });

            return data.velocity;
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
        }
    },
    Query: {

    }
}

export default resolvers;