import React from 'react';
import { Row } from 'antd';
import GoogleLogin from '../components/Login/GoogleLogin';

function Login() {
  // const { data, loading, refetch } = useQuery(GET_USERINFO, {
  //   fetchPolicy: 'network-only',
  // });
  // 사실 page마다 위에처럼 적어서 주소를 치고 들어왔을 때도 무조건 로그인하라 가 아닌 로그인 된 상태면 다시 redirection 시켜버리는 것도 할 수 있는데 그렇게 쓰는건 일반적이지도 않고, 보통 그렇게 안 한다고 하므로 안 쓰기로 함.

  return (
    <div>
      <Row type="flex" justify="center">
        <GoogleLogin />
      </Row>
    </div>
  );
}

export default Login;
