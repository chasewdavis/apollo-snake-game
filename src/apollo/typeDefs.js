import gql from 'graphql-tag';

// local type definitions
// https://www.apollographql.com/docs/react/essentials/local-state.html
// Clinet-side schema

const typeDefs = gql`
    type position {
        x: Int!
        y: Int!
    }

    type snake_positions {
        positions: [position]!
    }
`;

export default typeDefs;