import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
  extend type Mutation {
    changeLoginState(id: ID!): Boolean
  }
`;

export const resolvers = {
  // Query: {
  //   note: (_, variables, {  getCacheKey }) => {
  //     const id = getCacheKey({
  //       __typename: 'Note',
  //       id: variables.id,
  //     });
  //     const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id });
  //     return note;
  //   },
  //   user: () => ({ __typename: 'User', name: 'Trainer' }),
  // },
};
