import React from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import ErrorLoginFirst from '../../components/Shared/ErrorLoginFirst';
import useSubscript from '../Shared/useSubscript';
import { GET_USERS, IS_LOGGED_IN, GET_USERINFO } from '../../graphql/queries';

const useHome = ({ history }) => {
  const client = useApolloClient();
  // console.log('token 유무', Cookies.get('access-token'));
  const { data: dataMe, error: errorMe } = useQuery(GET_USERINFO, {
    fetchPolicy: 'network-only',
  });
  // 문제 1. 왜 token을 지워도 dataMe에 데이터가 들어오는 쿼리가 날라갈까? 어디선가 있는지 모르는 cache에서 가져오는 듯한데.
  // console.log('dataMe', dataMe);
  const { data: dataUsers } = useQuery(GET_USERS);
  const { data: loginData } = useQuery(IS_LOGGED_IN);
  useSubscript(history);

  if (
    dataMe &&
    dataMe.me &&
    dataMe.me.nickname
    // && Cookies.get('access-token')
  ) {
    client.writeData({ data: { isLoggedIn: true } });
  }

  // 일부러 로그아웃을 하지는 않았는데 token이 만료됐을 때
  if (
    loginData.isLoggedIn &&
    errorMe
    //  &&  errorMe.extensions.code === 'NO_TOKEN'
    // 문제2. erroMe의 key의 value값 안들이 비어있어서 에러 분기 처리가 안 됨. Object.keys(errorMe) ...... errorMe.extensions.code가 안 불려서.
  ) {
    client.writeData({ data: { isLoggedIn: false } });
    return <ErrorLoginFirst error={errorMe} />;
  }
  // if (errorMe) return <p>{errorMe.message}</p>;

  return { dataUsers, loginData, dataMe };
};

export default useHome;
