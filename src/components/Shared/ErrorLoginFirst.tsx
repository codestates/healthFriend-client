import React from 'react';
import Login from '../../routes/Login';

function ErrorLoginFirst() {
  // data를 계속 못 받아오면 에러가 날텐데 이때 에러 메세지 없이 무조건 계속 로그인 먼저 하라고한다?? 로그인 자체도 안 되는 이유가 서버 문제 때문인데???
  return (
    <div>
      로그인 먼저 하세요
      <Login />
    </div>
  );
}

export default ErrorLoginFirst;
