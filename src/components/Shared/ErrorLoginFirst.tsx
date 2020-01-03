import React from 'react';
import Login from '../../routes/Login';

type ErrorLoginFirstProps = {
  error: any;
};

function ErrorLoginFirst({ error }: ErrorLoginFirstProps) {
  // data를 계속 못 받아오면 에러가 날텐데 이때 에러 메세지 없이 무조건 계속 로그인 먼저 하라고한다?? 로그인 자체도 안 되는 이유가 서버 문제 때문인데??? 서버 쪽에서 에러메시지 보내는 것에 따라 에러 핸들링.
  // useEffect(() => {
  //   window.location.reload(); // header 부분 reset 용도. 왜 여러번 반복실행되는지 모르겠음.
  // }, []);

  return (
    <div>
      {error.message}
      <br />
      <br /> 로그인 먼저 하세요
      <Login />
    </div>
  );
}

export default ErrorLoginFirst;
