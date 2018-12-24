import gql from 'graphql-tag';

export default gql`
    mutation updateNextTail($addToTail: addToTail, $x: Int!, $y: Int) {
        updateNextTail(addToTail: $addToTail, x: $x, y: $y) @client {
            next_tail
        }
    }
`;
