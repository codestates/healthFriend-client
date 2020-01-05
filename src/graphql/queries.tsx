import gql from 'graphql-tag';

export const GET_USERINFO = gql`
  {
    me {
      email
      nickname
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
// 위의 부분 fragment로 변경

export const MUTATE_INFO = gql`
  mutation PostInfo(
    $nickname: String!
    $openImageChoice: OpenImageChoiceEnum!
    $levelOf3Dae: LevelOf3DaeEnum!
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
