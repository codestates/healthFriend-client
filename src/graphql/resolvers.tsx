import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
  # extend type Mutation {
  #   changeLoginState(id: ID!): Boolean
  # }
`;

export const resolvers = {
  // Mutation: {
  //   me: (_, variables, { cache, getCacheKey }) => {
  //     const id = getCacheKey({ __typename: 'TodoItem', id: variables.id });
  //     const fragment = gql`
  //       fragment completeTodo on TodoItem {
  //         completed
  //       }
  //     `;
  //   },
  // },
  // Mutation: {
  //   logOut: (_, variables, {cache}) => {
  //     const meStatus = cache.readQuery({
  //       query: GET_USERINFO
  //     })
  //     const newStatus = meStatus.map(item => item === 'nickname'? 'loggedout': item);
  //     cache.writeQuery({})
  //         }
  // }
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
