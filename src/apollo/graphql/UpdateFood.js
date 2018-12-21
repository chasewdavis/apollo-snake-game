import gql from 'graphql-tag';

export default gql`
    mutation updateFood($x: Int!, $y: Int!) {
        updateFood(x: $x, y: $y) @client {
            x
            y
        }
    }
`;
