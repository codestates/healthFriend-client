import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { questionList } from '../config/fakeData';
import {
  GET_USERINFO,
  MUTATE_INFO,
  SET_MOTIVATION,
  SET_EXERCISE_ABLE_DAYS,
} from '../graphql/queries';

export default function useRegister() {
  const questions = questionList.inputRegister;
  const subjects = questions.map((elm) => elm.subject);
  const submitVariable = {};
  const availables = questions
    .filter((elm) => elm.isMeMutateAvailable)
    .map((ele) => ele.subject);
  availables.forEach((elm) => {
    submitVariable[elm] = '';
  });

  const [order, setOrder] = useState<number>(1);
  const [introduction, setIntroduction] = useState<string>('');
  const [totalCheckArr, setTotalCheckArr] = useState<any[]>(
    questions.map(() => []),
  );

  const { data, error, loading, refetch } = useQuery(GET_USERINFO);
  const [postInfo] = useMutation(MUTATE_INFO);
  const [setMotivation] = useMutation(SET_MOTIVATION);
  const [setExerciseAbleDays] = useMutation(SET_EXERCISE_ABLE_DAYS);
  // mutation시 error도 콜백으로 만들어줘야 함. onError, onComplete 등이 있는듯.

  // 체크박스에서 선택된 것을 boolean 배열 -> 번호 배열 -> 값 배열로 변경하여 받음.
  const getSelected = (subj: string): undefined | any[] | string => {
    const values = questions.filter((elm) => elm.subject === subj)[0].value;
    const subjBooleans = totalCheckArr[subjects.indexOf(subj)];
    return subjBooleans
      .map((elm, idx) => (elm ? values[idx] : elm))
      .filter((ele) => !!ele === true);
  };

  // 값 배열로 받은 것을 질문에 맞춰 단일 string이나 배열 형태로 return
  Object.keys(submitVariable).forEach((subj) => {
    if (subj === 'messageToFriend') {
      submitVariable[subj] = introduction;
    } else if (questions.filter((elm) => elm.subject === subj)[0].isMultiple) {
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
    setTotalCheckArr,
    totalCheckArr,
    questions,
    order,
    data,
    error,
    loading,
    refetch,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
    postInfo,
    setMotivation,
    setExerciseAbleDays,
  };
}
