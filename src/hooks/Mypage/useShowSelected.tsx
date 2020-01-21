import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import useProcessSelected from '../Register/useProcessSelected';
import { GET_USERINFO } from '../../graphql/queries';
import questionList from '../../config/questions';

const useShowSelected = () => {
  const {
    setIntroduction,
    totalCheckArr,
    setTotalCheckArr,
    places,
    setPlaces,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
  } = useProcessSelected();

  const { data: dataI, error: errorI, loading: loadingI } = useQuery(
    GET_USERINFO,
    {
      fetchPolicy: 'network-only',
    },
  );

  const subjects: string[] = questionList.map((elm) => elm.subject);

  // 해당 받아온 data의 값을 입력할 때와 같은 boolean array로 변경
  const getSelectedBooleans = (subj: string): boolean[] | undefined => {
    if (dataI && dataI.me) {
      const oneQ = questionList![subjects.indexOf(subj)];
      let selectedArray;
      if (oneQ.isMeQueryAvailable && oneQ.isCheckbox) {
        if (!oneQ.isMultiple) {
          selectedArray = [dataI.me[subj]];
        } else {
          selectedArray = dataI.me[subj].map((elm) => elm[subj.slice(0, -1)]);
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
    if (dataI) {
      setTotalCheckArr(subjects.map((subj) => getSelectedBooleans(subj)));
    }
    // eslint-disable-next-line
  }, [dataI]);

  return {
    setIntroduction,
    setPlaces,
    totalCheckArr,
    setTotalCheckArr,
    dataI,
    errorI,
    loadingI,
    places,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
  };
};

export default useShowSelected;
