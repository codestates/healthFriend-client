import gql from 'graphql-tag';
import { ALL_INFO, USERS_INFO, BASE_INFO /* FOLLOW_INFO */ } from './fragments';

export const GET_USERINFO = gql`
  {
    me {
      ...AllInfo
    }
  }
  ${ALL_INFO}
`;

export const GET_USERS = gql`
  {
    users {
      ...UsersInfo
    }
  }
  ${USERS_INFO}
`;

export const GET_PLACES = gql`
  {
    allDistricts {
      idOfDong
      nameOfDong
      idOfGu
      nameOfGu
    }
  }
`;

export const GET_FILTERED_USERS = gql`
  query FilterUsers(
    $openImageChoice: [OpenImageChoiceEnum]
    $levelOf3Dae: [LevelOf3DaeEnum]
    $motivations: [MotivationEnum]
    $weekdays: [WeekdayEnum]
    $districts: [String]
  ) {
    filterUsers(
      openImageChoice: $openImageChoice
      levelOf3Dae: $levelOf3Dae
      motivations: $motivations
      weekdays: $weekdays
      districts: $districts
    ) {
      ...UsersInfo
    }
  }
  ${USERS_INFO}
`;

export const GET_FRIENDS = gql`
  {
    me {
      id
      following {
        id
        following {
          ...UsersInfo
        }
        # ...FollowInfo
        checked
        createdAt
        updatedAt
      }
      followers {
        id
        follower {
          ...UsersInfo
        }
        # ...FollowInfo
        checked
        createdAt
        updatedAt
      }
      friends {
        id
        friend {
          ...UsersInfo
        }
        # ...FollowInfo
        checked
        createdAt
        updatedAt
      }
    }
  }
  ${USERS_INFO}
  ${USERS_INFO}
  ${USERS_INFO}
`;
// 위의 저 Following들도 fragment로 묶었더니 introspectionFragment 쓰라고 에러남.

// 저리 follower 위에 id 를 안 붙이면 query가 안 돌아감. 이유는 모르겠음. graphQL 특성 구분인자 역할

export const GET_USER_COUNT = gql`
  {
    userCount
  }
`;

// local query =============================

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const GET_CHAT_FRIEND = gql`
  query ChatFriend {
    chatFriend @client {
      id
      nickname
    }
  }
`;

// mutation===========================================================

// user =============================

export const MUTATE_INFO = gql`
  mutation PostInfo(
    $nickname: String!
    $gender: GenderEnum!
    $openImageChoice: OpenImageChoiceEnum!
    $levelOf3Dae: LevelOf3DaeEnum!
    $messageToFriend: String
  ) {
    me(
      nickname: $nickname
      gender: $gender
      openImageChoice: $openImageChoice
      levelOf3Dae: $levelOf3Dae
      messageToFriend: $messageToFriend
    ) {
      nickname
      gender
      openImageChoice
      levelOf3Dae
      messageToFriend
    }
  }
`;

export const SET_MOTIVATION = gql`
  mutation SetMotivation($input: [MotivationEnum]) {
    setMotivation(input: $input) {
      id
      motivation
    }
  }
`;

export const SET_EXERCISE_ABLE_DAYS = gql`
  mutation SetExerciseAbleDay($input: [WeekdayEnum]) {
    setExerciseAbleDay(input: $input) {
      id
      weekday
    }
  }
`;

export const SET_ABLE_DISTRICT = gql`
  mutation SetAbleDistrict($dongIds: [String]) {
    setAbleDistrict(dongIds: $dongIds) {
      id
      district {
        idOfGu
        nameOfGu
        idOfDong
        nameOfDong
      }
    }
  }
`;

// friend =============================

export const FOLLOW_USER = gql`
  mutation FollowUser($userId: String!) {
    followingUser(userId: $userId) {
      ...BaseInfo
    }
  }
  ${BASE_INFO}
`;

export const CANCEL_FOLLOWING = gql`
  mutation CancelFollowing($userId: String!) {
    deleteFollowing(userId: $userId) {
      ...BaseInfo
    }
  }
  ${BASE_INFO}
`;

export const DELETE_FOLLOWER = gql`
  mutation DeleteFollower($userId: String!) {
    deleteFollowers(userId: $userId) {
      ...BaseInfo
    }
  }
  ${BASE_INFO}
`;

export const ADD_FRIEND = gql`
  mutation AddFriend($userId: String!) {
    addFriend(userId: $userId) {
      id
      friend {
        ...BaseInfo
      }
    }
  }
  ${BASE_INFO}
`;

export const DELETE_FRIEND = gql`
  mutation DeleteFriend($userId: String!) {
    deleteFriend(userId: $userId) {
      ...BaseInfo
    }
  }
  ${BASE_INFO}
`;

// check userCard ==============================

export const CHECK_FOLLOWERS = gql`
  mutation CheckFollowers($userIds: [String]!) {
    checkFollowers(userIds: $userIds) {
      ...BaseInfo
    }
  }
  ${BASE_INFO}
`;

export const CHECK_FRIENDS = gql`
  mutation CheckFriends($userIds: [String]!) {
    checkFriends(userIds: $userIds) {
      ...BaseInfo
    }
  }
  ${BASE_INFO}
`;

// local mutation =============================

export const SET_CHAT_FRIEND = gql`
  mutation SetChatFriend($id: String!, $nickname: String!) {
    setChatFriend(id: $id, nickname: $nickname) @client {
      id
      nickname
    }
  }
`;

// subscription ===========================================================

export const SUBSCRIBE_FOLLOWERS = gql`
  subscription {
    subscribeRequestFriend {
      ...AllInfo
    }
  }
  ${ALL_INFO}
`;

export const SUBSCRIBE_FRIENDS = gql`
  subscription {
    subscribeAddFriend {
      ...AllInfo
    }
  }
  ${ALL_INFO}
`;
