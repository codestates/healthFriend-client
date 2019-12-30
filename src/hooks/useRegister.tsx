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

  const submitVariable = {
    levelOf3Dae: '',
    openImageChoice: '',
    messageToFriend: '',
  };

  // 체크박스에서 선택된 것을 boolean 배열 -> 번호 배열 -> 값 배열로 변경하여 받음.
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

  // 값 배열로 받은 것을 질문에 맞춰 단일 string이나 배열 형태로 return
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
    introduction,
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
