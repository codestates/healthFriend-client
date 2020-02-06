import React from 'react';
import { Row } from 'antd';
import GoogleLogin from '../components/Login/GoogleLogin';

function Login() {
  return (
    <div>
      <Row type="flex" justify="center">
        <GoogleLogin />
      </Row>
    </div>
  );
}

export default Login;
