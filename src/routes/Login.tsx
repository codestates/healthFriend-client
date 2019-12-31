import React from 'react';
import { Button } from 'antd';
import { useQuery } from '@apollo/react-hooks';
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
  const { data, loading } = useQuery(GET_USERINFO);

  if (loading) return <Loading />;

  return data === undefined ? (
    <div>
      <GoogleLoginButton />
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default Login;
