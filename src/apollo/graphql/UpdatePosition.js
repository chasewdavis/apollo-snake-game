import gql from 'graphql-tag';

export default gql`
    mutation updatePosition($x: Int, $y: Int) {
        updatePosition(x: $x, y: $y) @client {
            x
            y
        }
    }
`;