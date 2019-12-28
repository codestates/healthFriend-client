import React from 'react';
import { Button } from 'antd';
import cookie from 'js-cookie';

type MyPageProps = {
  history: any;
};

function MyPage({ history }: MyPageProps) {
  return (
    <div>
      MyPage
      <Button type="primary">
        <a
          href="http://localhost:4000/graphql"
          target="_blank"
          rel="noopener noreferrer"
        >
          graphql
        </a>
      </Button>
      <Button
        type="primary"
        onClick={() => {
          cookie.remove('access-token');
          history.push('/');
          window.location.reload();
        }}
      >
        로그아웃
      </Button>
    </div>
  );
}

export default MyPage;
