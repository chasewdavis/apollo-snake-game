import gql from 'graphql-tag';

export default gql`
    query position {
        position @client {
            x
            y
        }
    }
`;
