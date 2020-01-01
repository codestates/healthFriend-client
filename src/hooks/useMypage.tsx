import { useState, useEffect } from 'react';
import useRegister from './useRegister';
import { questionList } from '../config/fakeData';

export default function useMypage() {
  const {
    setIntroduction,
    setTotalCheckArr,
    totalCheckArr,
    submitVariable,
    postInfo,
    data,
  } = useRegister();

  const [complete, setComplete] = useState<boolean>(false);

  const subjects: string[] = questionList.inputRegister.map(
    (elm) => elm.subject,
  );

  // 해당 받아온 data의 값을 입력할 때와 같은 boolean array로 변경
  const getSelectedBooleans = (subj: string): boolean[] => {
    const oneQ = questionList.inputRegister![subjects.indexOf(subj)];
    if (oneQ.isAvailable && oneQ.isCheckbox) {
      const selectedArray = [data.me[subj]];
      return oneQ.value.map((elm) => {
        if (selectedArray.indexOf(elm) === -1) {
          return false;
        }
        return true;
      });
    }
    return [];
  };

  // eslint-hook 있을땐 빈배열 넣을 수 없어서 주석처리 해버림.
  useEffect(() => {
    setTotalCheckArr(subjects.map((subj) => getSelectedBooleans(subj)));
    // eslint-disable-next-line
  }, []);

  return {
    setIntroduction,
    setTotalCheckArr,
    totalCheckArr,
    submitVariable,
    postInfo,
    data,
    complete,
    setComplete,
  };
}
