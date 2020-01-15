import gql from 'graphql-tag';
import { USERS_INFO } from './fragments';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    logoutMe: (_, { id }, { cache, getCacheKey }) => {
      const meId = cache.config.dataIdFromObject({ __typename: 'User', id });
      const meInfo = cache.readFragment({ fragment: USERS_INFO, id: meId });
      const updatedMe = {
        ...meInfo,
        nickname: 'fool',
      };
      cache.writeFragment({
        id: meId,
        fragment: USERS_INFO,
        data: updatedMe,
      });
      return updatedMe;
    },
  },
};
