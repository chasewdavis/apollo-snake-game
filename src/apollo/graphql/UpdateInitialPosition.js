import gql from 'graphql-tag';

export default gql`
    mutation ($x: Int!, $y: Int!) {
        updateInitialPosition(x: $x, y: $y) @client {
            x
            y
        }
    }
`;
