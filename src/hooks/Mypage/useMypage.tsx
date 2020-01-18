import { useState, useEffect } from 'react';
import useRegister from '../Register/useRegister';
import redirectWhenTokenExp from '../../utils/redirectWhenTokenExp';

const useMypage = (history, client) => {
  const {
    setIntroduction,
    setPlaces,
    setTotalCheckArr,
    totalCheckArr,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
    postInfo,
    setMotivation,
    setExerciseAbleDays,
    setAbleDistrict,
    places,
    data,
    error,
    loading,
    questionList,
  } = useRegister(history, client);

  const [complete, setComplete] = useState<boolean>(false);

  const subjects: string[] = questionList.map((elm) => elm.subject);

  if (error) redirectWhenTokenExp({ history, client });

  // 해당 받아온 data의 값을 입력할 때와 같은 boolean array로 변경
  const getSelectedBooleans = (subj: string): boolean[] | undefined => {
    if (data && data.me) {
      const oneQ = questionList![subjects.indexOf(subj)];
      let selectedArray;
      if (oneQ.isMeQueryAvailable && oneQ.isCheckbox) {
        if (!oneQ.isMultiple) {
          selectedArray = [data.me[subj]];
        } else {
          selectedArray = data.me[subj].map((elm) => elm[subj.slice(0, -1)]);
        }

        return oneQ.value.map((elm) => {
          if (selectedArray.indexOf(elm) === -1) {
            return false;
          }
          return true;
        });
      }
      return [];
    }
  };

  useEffect(() => {
    if (data) {
      setTotalCheckArr(subjects.map((subj) => getSelectedBooleans(subj)));
    }
    // eslint-disable-next-line
  }, [data]);

  return {
    setIntroduction,
    setPlaces,
    setTotalCheckArr,
    totalCheckArr,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
    postInfo,
    setMotivation,
    setExerciseAbleDays,
    setAbleDistrict,
    places,
    data,
    error,
    loading,
    complete,
    setComplete,
  };
};

export default useMypage;
