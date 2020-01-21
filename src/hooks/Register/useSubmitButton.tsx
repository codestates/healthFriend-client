import { useEffect } from 'react';
import questionList from '../../config/questions';

const useSubmitButton = ({
  dataMe,
  postInfo,
  setMotivation,
  setExerciseAbleDays,
  setAbleDistrict,
  places,
  order,
  setOrder,
  setIntroduction,
  totalCheckArr,
  submitVariable,
  submitMotivation,
  submitExerciseDays,
}) => {
  // 이런 식으로 useEffect를 써서 처리해주는 부분이 일반적인가?
  useEffect(() => {
    if (dataMe) {
      if (order === questionList.length) {
        postInfo({
          variables: {
            ...submitVariable,
            nickname: dataMe.me.nickname,
          },
        });
        setMotivation({
          variables: submitMotivation,
        });
        setExerciseAbleDays({
          variables: submitExerciseDays,
        });
        setAbleDistrict({
          variables: { dongIds: places },
        });
        setIntroduction('');
      }
      setOrder(order + 1);
    }
    // eslint-disable-next-line
  }, [dataMe]);

  const isNextButtonDisable = (): boolean => {
    if (questionList[order - 1].subject === 'ableDistricts') {
      return places.length === 0;
    }
    if (questionList[order - 1].subject === 'messageToFriend') {
      return false;
    }
    return !totalCheckArr[order - 1].some((elm) => elm === true);
  };
  return { isNextButtonDisable };
};

export default useSubmitButton;
