import gql from 'graphql-tag';

export default gql`
    mutation updateDirection($direction: int) {
        updateDirection(direction:$direction) @client {
            direction
        }
    }
`;
