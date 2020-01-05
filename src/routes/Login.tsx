import React from 'react';
import { Button } from 'antd';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';

import { GET_USERINFO } from '../graphql/queries';
import Loading from '../components/Shared/Loading';

function GoogleLoginButton() {
  return (
    <Button type="primary">
      <a
        href={
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:4000/auth/google'
            : 'https://api.healthfriend.club/auth/google'
        }
      >
        구글 로그인
      </a>
    </Button>
  );
}

function Login() {
  const { data, loading } = useQuery(GET_USERINFO, {
    fetchPolicy: 'network-only',
  });

  const client = useApolloClient();

  // useQuery도 비동기일 텐데 아래 loading, data 등에서 어떻게 다 걸리나?
  if (loading) return <Loading />;
  if (data) client.writeData({ data: { isLoggedIn: true } });

  // 이미 로그인한 사람이 임의로 주소 쳐서 들어올것 대비
  return data === undefined ? (
    <div>
      <GoogleLoginButton />
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default Login;
