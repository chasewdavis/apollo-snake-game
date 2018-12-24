import gql from 'graphql-tag';

export default gql`
    query next_tail { 
        next_tail @client {
            addToTail
            x
            y
        }
    }
`;
