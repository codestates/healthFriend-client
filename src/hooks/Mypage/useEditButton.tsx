import { useEffect } from 'react';

import redirectWhenTokenExp from '../../utils/redirectWhenTokenExp';

const useEditButton = ({
  errorUser,
  client,
  history,
  dataUser,
  postInfo,
  submitVariable,
  data,
  setMotivation,
  submitMotivation,
  totalCheckArr,
  places,
  setComplete,
  setAbleDistrict,
  submitExerciseDays,
  setExerciseAbleDays,
}) => {
  useEffect(() => {
    // 왜 dataUser와 errorUser가 둘다 동시에 값을 가지고 있을 수 있는지 모르겠음.
    // 더하여 그 grphaql 에러의 빨간 화면 뜨는 건 어느 상황에서 발생하는건지.
    if (errorUser) {
      redirectWhenTokenExp({ client, history });
    } else if (dataUser) {
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
      setComplete(true);
    }
    // eslint-disable-next-line
  }, [dataUser, errorUser]);

  const isEditButtonDisable = () => {
    if (places.length === 0) {
      return true;
    }
    if (
      totalCheckArr
        .filter((oneQ) => oneQ.length > 0)
        .filter((elm) => elm.every((ele) => ele === false)).length === 0
    ) {
      return false;
    }
    return true;
  };

  return { isEditButtonDisable };
};

export default useEditButton;
