import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import questionList from '../config/questions';
import {
  GET_USERINFO,
  MUTATE_INFO,
  SET_MOTIVATION,
  SET_EXERCISE_ABLE_DAYS,
  SET_ABLE_DISTRICT,
} from '../graphql/queries';

export default function useRegister() {
  const [order, setOrder] = useState<number>(1);
  const [introduction, setIntroduction] = useState<string>('');
  const [places, setPlaces] = useState<string[]>([]);
  const [totalCheckArr, setTotalCheckArr] = useState<any[]>(
    questionList.map(() => []),
  );

  const { data, error, loading } = useQuery(GET_USERINFO, {
    // fetchPolicy: 'network-only' --> 굳이 network only 필요 없는듯.
    // 쓰게 되면 비동기라 useMypage에서 이어질때 데이터 못 받아오고, 이미 useEffect 딱 한번 실행되고 끝남.
  });

  const [postInfo] = useMutation(MUTATE_INFO);
  const [setMotivation] = useMutation(SET_MOTIVATION);
  const [setExerciseAbleDays] = useMutation(SET_EXERCISE_ABLE_DAYS);
  const [setAbleDistrict] = useMutation(SET_ABLE_DISTRICT);
  // mutation시 error도 콜백으로 만들어줘야 함. onError, onComplete 등이 있는듯.

  const subjects = questionList.map((elm) => elm.subject);
  const submitVariable = {};
  const availables = questionList
    .filter((elm) => elm.isMeMutateAvailable)
    .map((ele) => ele.subject);
  availables.forEach((elm) => {
    submitVariable[elm] = '';
  });

  // 체크박스에서 선택된 것을 boolean 배열 -> 번호 배열 -> 값 배열로 변경하여 받음.
  const getSelected = (subj: string): undefined | any[] | string => {
    const values = questionList.filter((elm) => elm.subject === subj)[0].value;
    const subjBooleans = totalCheckArr[subjects.indexOf(subj)];
    return subjBooleans
      .map((elm, idx) => (elm ? values[idx] : elm))
      .filter((ele) => !!ele === true);
  };

  // 값 배열로 받은 것을 질문에 맞춰 단일 string이나 배열 형태로 return
  Object.keys(submitVariable).forEach((subj) => {
    if (subj === 'messageToFriend') {
      submitVariable[subj] = introduction;
    } else if (
      questionList.filter((elm) => elm.subject === subj)[0].isMultiple
    ) {
      submitVariable[subj] = getSelected(subj);
    } else {
      submitVariable[subj] = getSelected(subj)![0];
    }
  });
  // motivation은 postInfo로 날릴게 아니므로 따로 할당.
  const submitMotivation = { input: getSelected('motivations') };
  const submitExerciseDays = { input: getSelected('weekdays') };

  return {
    setOrder,
    introduction,
    setIntroduction,
    places,
    setPlaces,
    setTotalCheckArr,
    totalCheckArr,
    questionList,
    order,
    data,
    error,
    loading,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
    postInfo,
    setMotivation,
    setExerciseAbleDays,
    setAbleDistrict,
  };
}
