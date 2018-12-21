import gql from 'graphql-tag';

export default gql`
    query food {
        food @client {
            x
            y
        }
    }
`;
