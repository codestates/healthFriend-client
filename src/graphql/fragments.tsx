import gql from 'graphql-tag';

export const USERS_INFO = gql`
  fragment UsersInfo on User {
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
    createdAt
    profileImage {
      id
      filename
    }
  }
`;

export const BASE_INFO = gql`
  fragment BaseInfo on User {
    id
    email
    nickname
  }
`;

export const ALL_INFO = gql`
  fragment AllInfo on User {
    ...UsersInfo
    following {
      id
      following {
        ...BaseInfo
      }
    }
    followers {
      id
      follower {
        ...BaseInfo
      }
      checked
    }
    friends {
      id
      friend {
        ...BaseInfo
        profileImage {
          id
          filename
        }
        openImageChoice
      }
      checked
    }
    profileImage {
      id
      filename
    }
  }
  ${USERS_INFO}
  ${BASE_INFO}
  ${BASE_INFO}
  ${BASE_INFO}
`;

export const BADGE_INFO = gql`
  fragment BadgeInfo on User {
    ...BaseInfo
    followers {
      id
      checked
    }
    friends {
      id
      checked
    }
  }
  ${BASE_INFO}
`;
