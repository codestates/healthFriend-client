/** @jsx jsx */
import React from 'react';
import { Button } from 'antd';
import { css, jsx } from '@emotion/core';

import google from '../../static/google.jpg';

const loginButton = css`
  font-size: 50px;
  text-decoration: none;
  display: inline-block;
  height: 100px;
  top: 40%;
  position: absolute;
`;

const googleImage = css`
  height: 50px;
`;

const atag = css`
  color: black;
`;

export default function GoogleLogin() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
