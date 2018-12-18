import gql from 'graphql-tag';

export default gql`
    query time {
        time @client {
            interval
            tick
        }
    }
`;