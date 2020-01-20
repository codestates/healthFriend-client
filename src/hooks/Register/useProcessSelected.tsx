import { useState } from 'react';

import questionList from '../../config/questions';

const useProcessSelected = () => {
  const [order, setOrder] = useState<number>(1);
  const [introduction, setIntroduction] = useState<string>('');
  const [places, setPlaces] = useState<string[]>([]);
  const [totalCheckArr, setTotalCheckArr] = useState<any[]>(
    questionList.map(() => []),
  );

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

  // motivation, ableDays는 postInfo로 날릴게 아니므로 따로 할당.
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
    submitVariable,
    submitMotivation,
    submitExerciseDays,
  };
};

export default useProcessSelected;
