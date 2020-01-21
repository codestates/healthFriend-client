import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    chatFriend: ChatFriend!
    unread: Number!
  }

  extend type ChatFriend {
    id: String!
    nickname: String!
  }

  extend type Mutation {
    setChatFriend(id: String!, nickname: String!): ChatFriend
  }
`;

export const resolvers = {
  Mutation: {
    setChatFriend: (_, { id, nickname }, { cache }) => {
      const newFriend = {
        __typename: 'ChatFriend',
        id,
        nickname,
      };
      cache.writeData({
        data: {
          chatFriend: newFriend,
        },
      });
      return newFriend;
    },
  },
  // Mutation: {
  //   logoutMe: (_, { id }, { cache, getCacheKey }) => {
  //     const meId = cache.config.dataIdFromObject({ __typename: 'User', id });
  //     const meInfo = cache.readFragment({ fragment: USERS_INFO, id: meId });
  //     const updatedMe = {
  //       ...meInfo,
  //       nickname: 'fool',
  //     };
  //     cache.writeFragment({
  //       id: meId,
  //       fragment: USERS_INFO,
  //       data: updatedMe,
  //     });
  //     return updatedMe;
  //   },
  // },
};
