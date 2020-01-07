import gql from 'graphql-tag';

export const GET_USERINFO = gql`
  {
    me {
      id
      email
      nickname
      gender
      openImageChoice
      levelOf3Dae
      messageToFriend
      motivations {
        id
        motivation
      }
      weekdays {
        id
        weekday
      }
      ableDistricts {
        district {
          idOfGu
          nameOfGu
          idOfDong
          nameOfDong
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  {
    users {
      id
      email
      nickname
      gender
      openImageChoice
      levelOf3Dae
      messageToFriend
      motivations {
        id
        motivation
      }
      weekdays {
        id
        weekday
      }
      ableDistricts {
        district {
          idOfGu
          nameOfGu
          idOfDong
          nameOfDong
        }
      }
    }
  }
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
      id
      email
      nickname
      gender
      openImageChoice
      levelOf3Dae
      messageToFriend
      motivations {
        id
        motivation
      }
      weekdays {
        id
        weekday
      }
      ableDistricts {
        district {
          idOfGu
          nameOfGu
          idOfDong
          nameOfDong
        }
      }
    }
  }
`;
// 위, 아래의 부분들  fragment로 변경

export const GET_FOLLOWING = gql`
  {
    me {
      id
      following {
        id
        email
        nickname
        gender
        openImageChoice
        levelOf3Dae
        messageToFriend
        motivations {
          id
          motivation
        }
        weekdays {
          id
          weekday
        }
        ableDistricts {
          district {
            idOfGu
            nameOfGu
            idOfDong
            nameOfDong
          }
        }
      }
    }
  }
`;

// 이상하게 저리 follower 위에 id 를 안 붙이면 query가 안 돌아감. 이유는 모르겠음. graphQL 특성인듯 한데.

export const GET_FOLLOWERS = gql`
  {
    me {
      id
      followers {
        id
        email
        nickname
        gender
        openImageChoice
        levelOf3Dae
        messageToFriend
        motivations {
          id
          motivation
        }
        weekdays {
          id
          weekday
        }
        ableDistricts {
          district {
            idOfGu
            nameOfGu
            idOfDong
            nameOfDong
          }
        }
      }
    }
  }
`;

export const GET_FRIENDS = gql`
  {
    me {
      id
      friends {
        id
        email
        nickname
        gender
        openImageChoice
        levelOf3Dae
        messageToFriend
        motivations {
          id
          motivation
        }
        weekdays {
          id
          weekday
        }
        ableDistricts {
          district {
            idOfGu
            nameOfGu
            idOfDong
            nameOfDong
          }
        }
      }
    }
  }
`;

// local query =============================

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
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
      messageToFriend: $messageToFriend
      nickname: $nickname
      gender: $gender
      openImageChoice: $openImageChoice
      levelOf3Dae: $levelOf3Dae
    ) {
      messageToFriend
    }
  }
`;

export const SET_MOTIVATION = gql`
  mutation SetMotivation($input: [MotivationEnum]) {
    setMotivation(input: $input) {
      motivation
    }
  }
`;

export const SET_EXERCISE_ABLE_DAYS = gql`
  mutation SetExerciseAbleDay($input: [WeekdayEnum]) {
    setExerciseAbleDay(input: $input) {
      weekday
    }
  }
`;

export const SET_ABLE_DISTRICT = gql`
  mutation SetAbleDistrict($dongIds: [String]) {
    setAbleDistrict(dongIds: $dongIds) {
      id
      district {
        nameOfGu
        nameOfDong
      }
    }
  }
`;

// friend =============================

export const FOLLOW_USER = gql`
  mutation FollowUser($userId: String!) {
    followingUser(userId: $userId) {
      id
      nickname
      email
    }
  }
`;

export const CANCEL_FOLLOWING = gql`
  mutation CancelFollowing($userId: String!) {
    deleteFollowing(userId: $userId) {
      id
      nickname
      email
    }
  }
`;

export const DELETE_FOLLOWER = gql`
  mutation DeleteFollower($userId: String!) {
    deleteFollowers(userId: $userId) {
      id
      nickname
      email
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation AddFriend($userId: String!) {
    addFriend(userId: $userId) {
      id
      nickname
      email
    }
  }
`;

export const DELETE_FRIEND = gql`
  mutation DeleteFriend($userId: String!) {
    deleteFriend(userId: $userId) {
      id
      nickname
      email
    }
  }
`;
