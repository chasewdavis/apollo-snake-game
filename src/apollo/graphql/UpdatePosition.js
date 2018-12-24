import gql from 'graphql-tag';

export default gql`
    mutation updatePosition($x: Int, $y: Int) {
        updatePosition(xDirection: $x, yDirection: $y) @client {
            x
            y
        }
    }
`;