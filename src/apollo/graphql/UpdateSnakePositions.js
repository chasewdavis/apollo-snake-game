import gql from 'graphql-tag';

// nested create mutation
export default gql`
    mutation updateSnakePositions($positions: snake_positions) {
        updateSnakePositions(snake_positions: $positions) @client {
            snake_positions
        }
    }
`;
