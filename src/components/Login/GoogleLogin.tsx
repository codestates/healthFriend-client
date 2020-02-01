/** @jsx jsx */
import { Button } from 'antd';
import { css, jsx } from '@emotion/core';

import google from '../../static/google.jpg';

const loginDiv = css`
  height: 80vh;
`;

const loginButton = css`
  font-size: 30px;
  display: block;
  height: 100px;
  top: 40%;
`;

const googleImage = css`
  height: 30px;
`;

const atag = css`
  color: black;
`;

export default function GoogleLogin() {
  return (
    <div css={loginDiv}>
      <Button type="default" css={loginButton}>
        <img src={google} alt="" css={googleImage} />
        &nbsp;&nbsp;
        <a
          href={
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:4000/auth/google'
              : 'https://api.healthfriend.club/auth/google'
          }
          css={atag}
        >
          구글 로그인
        </a>
      </Button>
    </div>
  );
}
