import gql from 'graphql-tag';

// nested create mutation
// also putting more logic inside resolver for this operation
export default gql`
    mutation updateSnakePositions($snake_positions: snake_positions, $addToTail: Boolean!) {
        updateSnakePositions(snake_positions: $snake_positions, addToTail: $addToTail) @client {
            snake_positions
        }
    }
`;
