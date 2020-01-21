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

  const [postInfo] = useMutation(MUTATE_INFO, {
    // update(cache, { data: { me } }) {
    //   const dataIam: any = cache.readQuery({ query: GET_USERINFO });
    //   // console.log('me, ', me);
    //   cache.writeQuery({
    //     query: GET_USERINFO,
    //     data: { me: { ...dataIam.me, ...me } },
    //   });
    // },
  });
  const [setMotivation] = useMutation(SET_MOTIVATION, {
    // update(cache, { data: { setMotivation } }) {
    //   const dataIam: any = cache.readQuery({ query: GET_USERINFO });
    //   cache.writeQuery({
    //     query: GET_USERINFO,
    //     data: { me: { ...dataIam.me, ...{ motivations: setMotivation } } },
    //   });
    // },
  });
  const [setExerciseAbleDays] = useMutation(SET_EXERCISE_ABLE_DAYS, {
    // update(cache, { data: { setExerciseAbleDay } }) {
    //   const dataIam: any = cache.readQuery({ query: GET_USERINFO });
    //   cache.writeQuery({
    //     query: GET_USERINFO,
    //     data: { me: { ...dataIam.me, ...{ weekdays: setExerciseAbleDay } } },
    //   });
    // },
  });
  const [setAbleDistrict] = useMutation(SET_ABLE_DISTRICT, {
    // update(cache, { data: { setAbleDistrict } }) {
    //   const dataIam: any = cache.readQuery({ query: GET_USERINFO });
    //   cache.writeQuery({
    //     query: GET_USERINFO,
    //     data: { me: { ...dataIam.me, ...{ ableDistricts: setAbleDistrict } } },
    //   });
    // },
  });
  // 왜 setAbleDistrict 붙이고 무한 render가 되는지 잘 모르겠음. cache update 시키면 계속 값이 바뀌면서 CPU loading 올라가는데 이유 모르겠음.
  // mutation시 error도 콜백으로 만들어줘야 함. onError, onComplete 등이 있는듯.

  useEffect(() => {
    // 왜 dataMe와 errorMe가 둘다 동시에 값을 가지고 있을 수 있는지 모르겠음.
    // 더하여 그 grphaql 에러의 빨간 화면 뜨는 건 어느 상황에서 발생하는건지.
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
