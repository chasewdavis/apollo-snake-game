import gql from 'graphql-tag';

export default gql`
    query velocity {
        velocity @client {
            speed
            direction
        }
    }
`;
