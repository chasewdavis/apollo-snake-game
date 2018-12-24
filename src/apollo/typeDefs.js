import gql from 'graphql-tag';

// local type definitions
// https://www.apollographql.com/docs/react/essentials/local-state.html
// From Apollo --- This schema is not used for validation (yet!)
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