import gql from 'graphql-tag';

export default gql`
    mutation updateTime($interval: int, $tick: int) {
        updateTime(interval: $interval, tick: $tick) @client {
            interval
            tick
        }
    }
`;
