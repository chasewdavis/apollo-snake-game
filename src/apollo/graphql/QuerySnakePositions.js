import gql from 'graphql-tag';

export default gql`
    query snake {
        snake @client {
            positions
        }
    }
`;
