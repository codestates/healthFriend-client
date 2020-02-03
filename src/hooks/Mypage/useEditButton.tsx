import { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import redirectWhenError from '../../utils/redirectWhenError';
import {
  SET_ABLE_DISTRICT,
  SET_MOTIVATION,
  SET_EXERCISE_ABLE_DAYS,
  MUTATE_INFO,
  // GET_USERINFO,
} from '../../graphql/queries';

const useEditButton = ({
  dataMe,
  errorMe,
  history,
  totalCheckArr,
  setComplete,
  places,
  submitVariable,
  submitMotivation,
  submitExerciseDays,
}) => {
  const client = useApolloClient();

  const [postInfo] = useMutation(MUTATE_INFO);
  const [setMotivation] = useMutation(SET_MOTIVATION);
  const [setExerciseAbleDays] = useMutation(SET_EXERCISE_ABLE_DAYS);
  const [setAbleDistrict] = useMutation(SET_ABLE_DISTRICT, {
    // update(cache, { data: { setAbleDistrict } }) {
    //   const dataIam: any = cache.readQuery({ query: GET_USERINFO });
    //   cache.writeQuery({
    //     query: GET_USERINFO,
    //     data: { me: { ...dataIam.me, ...{ ableDistricts: setAbleDistrict } } },
    //   });
    // },
  });
  // 왜 setAbleDistrict 붙이고 무한 render가 되는지 잘 모르겠음. 위에처럼 각 mutation들에 cache update 시키면 계속 값이 바뀌면서 CPU loading 올라가는데 이유 모르겠음.
  // mutation시 error도 콜백으로 만들어줘야 함. onError, onComplete 등이 있는듯.

  useEffect(() => {
    if (errorMe) {
      redirectWhenError({ client, history });
    } else if (dataMe) {
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
      setComplete(true);
    }
    // eslint-disable-next-line
  }, [dataMe, errorMe]);

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
