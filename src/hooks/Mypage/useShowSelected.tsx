import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import useProcessSelected from '../Register/useProcessSelected';
import { GET_USERINFO } from '../../graphql/queries';
import questionList from '../../config/questions';

const useShowSelected = () => {
  const {
    setTotalCheckArr,
    setIntroduction,
    setPlaces,
    totalCheckArr,
    places,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
  } = useProcessSelected();

  // console.log('submitVariable', submitVariable);
  // console.log('submitExerciseDays', submitExerciseDays);

  const { data, error, loading } = useQuery(GET_USERINFO, {
    fetchPolicy: 'network-only',
  });

  console.log('data in useShowSelected', data);

  const subjects: string[] = questionList.map((elm) => elm.subject);

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
    totalCheckArr,
    setTotalCheckArr,
    data,
    error,
    loading,
    places,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
  };
};

export default useShowSelected;
