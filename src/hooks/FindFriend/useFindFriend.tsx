import { useState, useEffect } from 'react';
import { useLazyQuery, useQuery, useApolloClient } from '@apollo/react-hooks';

import {
  GET_FILTERED_USERS,
  IS_LOGGED_IN,
  GET_USERINFO,
} from '../../graphql/queries';
import useSubscript from '../Shared/useSubscript';
import redirectWhenTokenExp from '../../utils/redirectWhenTokenExp';

const useFindFriend = ({ history }) => {
  const [filter, setFilter] = useState<any>({
    openImageChoice: [],
    levelOf3Dae: [],
    motivations: [],
    weekdays: [],
  });
  const [places, setPlaces] = useState<string[]>([]);

  const [getFilteredUsers, { loading, data, error }] = useLazyQuery(
    GET_FILTERED_USERS,
  );
  const { data: loginData } = useQuery(IS_LOGGED_IN);
  const client = useApolloClient();
  const { data: dataUser, error: errorUser, refetch } = useQuery(GET_USERINFO, {
    fetchPolicy: 'network-only',
    // errorPolicy: 'ignore', 어떤 효과 있는지 모르겠음. 확인.
  });
  useSubscript(history);

  console.log('errorUser', errorUser);
  // if (errorUser || error) redirectWhenTokenExp(history, client);

  // refetch 할때의 error는 아래의 error나 errorUser에 안 잡히는 듯.

  // alert창이 2번 불리는 것 때문에 useEffect 붙여버림.
  useEffect(() => {
    // console.log('여기로 오나?');
    if (errorUser || error) redirectWhenTokenExp({ history, client });
    // eslint-disable-next-line
  }, [errorUser, error]);
  // 여기도 서버에서 나오는 에러 종류에 따라서 꼭 로그인 만료 문제가 아닐 수 있으므로 Login 먼저 하세요를 보여줄지, 혹은 다른 에러 메세지를 보여줄지

  return {
    filter,
    setFilter,
    places,
    setPlaces,
    getFilteredUsers,
    loading,
    data,
    loginData,
    dataUser,
    refetch,
  };
};

export default useFindFriend;
