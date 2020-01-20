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
    }
    friends {
      id
      friend {
        ...BaseInfo
      }
    }
  }
  ${USERS_INFO}
  ${BASE_INFO}
  ${BASE_INFO}
  ${BASE_INFO}
`;

// export const FOLLOW_INFO = gql`
//   fragment FollowInfo on Follow {
//     checked
//     createdAt
//     updatedAt
//   }
// `;
