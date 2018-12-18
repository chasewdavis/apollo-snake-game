import gql from 'graphql-tag';

export default gql`
    mutation updateTime($tick: int) {
        updateTime(tick: $tick) @client {
            tick
        }
    }
`;
