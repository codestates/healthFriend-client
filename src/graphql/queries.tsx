import gql from 'graphql-tag';

export const GET_USERINFO = gql`
  {
    me {
      email
      nickname
      openImageChoice
      levelOf3Dae
      messageToFriend
    }
  }
`;

export const GET_USERS = gql`
  {
    users {
      id
      nickname
      levelOf3Dae
      messageToFriend
    }
  }
`;

export const MUTATE_INFO = gql`
  mutation PostInfo(
    $nickname: String!
    $openImageChoice: OpenImageChoice!
    $levelOf3Dae: LevelOf3Dae!
    $messageToFriend: String
  ) {
    me(
      messageToFriend: $messageToFriend
      nickname: $nickname
      openImageChoice: $openImageChoice
      levelOf3Dae: $levelOf3Dae
    ) {
      messageToFriend
    }
  }
`;

// export const SET_MOTIVATION = gql``;
// export const SET_EXERCISE_ABLE_DAYS = gql``;
