/** @jsx jsx */
import { Button } from 'antd';
import { jsx, css } from '@emotion/core';

// 버튼 component 3개가 다 같은 스타일을 공유하므로, emotion에서 방법 찾아서 중복 제거
const startButton = css`
  background: #ed9364;
  border-color: #ed9364;
  color: black;
  &:hover {
    background-color: #ffbe76;
    border-color: #ffbe76;
    color: black;
  }
`;

export default function ButtonToSignup() {
  return (
    <Button size="large" css={startButton}>
      <a
        href={
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:4000/auth/google'
            : 'https://api.healthfriend.club/auth/google'
        }
      >
        로그인 후 시작하기
      </a>
    </Button>
  );
}
