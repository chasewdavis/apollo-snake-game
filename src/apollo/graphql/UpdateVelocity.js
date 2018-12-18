import gql from 'graphql-tag';

export default gql`
    mutation updateVelocity($direction: int, $speed: int) {
        updateVelocity(direction:$direction, speed: $speed) @client {
            direction
            speed
        }
    }
`;
