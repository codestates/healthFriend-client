import { useEffect } from 'react';

const useSubmitButton = ({
  dataUser,
  places,
  data,
  submitVariable,
  submitMotivation,
  submitExerciseDays,
  postInfo,
  setMotivation,
  setExerciseAbleDays,
  setAbleDistrict,
  order,
  setOrder,
  questionList,
  setIntroduction,
  totalCheckArr,
}) => {
  // 이런 식으로 useEffect를 써서 처리해주는 부분이 일반적인가?
  useEffect(() => {
    if (dataUser) {
      if (order === questionList.length) {
        postInfo({
          variables: {
            ...submitVariable,
            nickname: data.me.nickname,
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
  }, [dataUser]);

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
