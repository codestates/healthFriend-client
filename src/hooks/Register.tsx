// eslint-disable-next-line
import React, { useState, useEffect, useCallback } from 'react';
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

  const submitVariable = {
    levelOf3Dae: '',
    openImageChoice: '',
    messageToFriend: '',
  };

  const getSelected = (subj: string): undefined | any[] | string => {
    const subjBooleans = totalCheckArr[subjects.indexOf(subj)];
    const subjNumbers: number[] = [];
    if (subjBooleans.length !== 0) {
      subjBooleans.forEach((elm, idx) => {
        if (elm) {
          subjNumbers.push(idx);
        }
      });
      const selectedSubjNames = subjNumbers.map(
        (elm) => questions[subjects.indexOf(subj)].value![elm],
      );
      return selectedSubjNames;
    }
  };

  Object.keys(submitVariable).forEach((elm) => {
    if (elm === 'messageToFriend') {
      submitVariable[elm] = introduction;
    } else if (getSelected(elm)) {
      if (['levelOf3Dae', 'openImageChoice'].indexOf(elm) !== -1) {
        submitVariable[elm] = getSelected(elm)![0];
      } else {
        submitVariable[elm] = getSelected(elm);
      }
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
