/** @jsx jsx */
import { Button } from 'antd';
import { css, jsx } from '@emotion/core';

import google from '../../static/google.jpg';

const loginDiv = css`
  height: 81vh;
  display: table;
`;

const loginButton = css`
  font-size: 30px;
  display: block;
  height: 60px;
`;

const googleImage = css`
  height: 30px;
`;

const atag = css`
  color: black;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

export default function GoogleLogin() {
  return (
    <div css={loginDiv}>
      <a
        href={
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:4000/auth/google'
            : 'https://api.healthfriend.club/auth/google'
        }
        css={atag}
      >
        <Button type="default" css={loginButton}>
          <img src={google} alt="" css={googleImage} />
          &nbsp;&nbsp; 구글 로그인으로 시작하기
        </Button>
      </a>
    </div>
  );
}
