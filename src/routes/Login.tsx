import React /* { useState, useEffect } */ from 'react';
import { Button } from 'antd';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_USERINFO = gql`
  {
    me {
      id
      email
      nickname
    }
  }
`;

function Login() {
  const { loading, error, data } = useQuery(GET_USERINFO, {
    notifyOnNetworkStatusChange: true,
  });

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error! {error.message}</div>;

  console.log('i am data', loading, error, data);

  return data === undefined ? (
    <div>
      <Button type="primary">
        <a href="http://localhost:4000/auth/google">구글 로그인</a>
      </Button>
    </div>
  ) : (
    <div>
      <h2>hello, {data.me.nickname}</h2>
      <Button type="primary">로그아웃</Button>
    </div>
  );
}

export default Login;
