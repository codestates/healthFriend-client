// eslint-disable-next-line
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { questionList } from '../config/fakeData';
import { GET_USERINFO, MUTATE_INFO } from '../graphql/queries';

export default function useRegister() {
  const [order, setOrder] = useState<number>(1);
  const [introduction, setIntroduction] = useState<string>('');

  const { data } = useQuery(GET_USERINFO);
  const [postInfo] = useMutation(MUTATE_INFO);

  const questions = questionList.inputRegister;
  const subjects = questions.map((elm) => elm.subject);
  const [totalCheckArr, setTotalCheckArr] = useState<[][]>(
    questions.map(() => []),
  );

  const getSelected = (subj: string): undefined | string | any[] => {
    const array = totalCheckArr[subjects.indexOf(subj)];
    const arr: number[] = [];
    if (array) {
      array.forEach((elm, idx) => {
        if (elm) {
          arr.push(idx);
        }
      });
      return arr.map((elm) => questions[subjects.indexOf(subj)].value![elm]);
    }
  };

  const submitVariable = {
    levelOf3Dae: '',
    openImageChoice: '',
    messageToFriend: '',
  };

  Object.keys(submitVariable).forEach((elm) => {
    if (['levelOf3Dae', 'openImageChoice'].indexOf(elm) === -1) {
      submitVariable[elm] = getSelected(elm);
    } else if (elm === 'messageToFriend') {
      submitVariable[elm] = introduction;
    } else {
      submitVariable[elm] = getSelected(elm)![0];
    }
  });

  return {
    setOrder,
    setIntroduction,
    setTotalCheckArr,
    totalCheckArr,
    questions,
    order,
    data,
    submitVariable,
    postInfo,
  };
}
