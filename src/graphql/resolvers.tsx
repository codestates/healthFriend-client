import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    chatFriend: ChatFriend!
    unread: Number!
    unreadFriends: Number!
    unreadFollowers: Number!
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
};
