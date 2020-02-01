/** @jsx jsx */
import { Button } from 'antd';
import { jsx, css } from '@emotion/core';

// 버튼 component 3개가 다 같은 스타일을 공유하므로, emotion에서 방법 찾아서 중복 제거
const startButton = css`
  background: #2c3e50;
  border-color: #2c3e50;
`;

export default function ButtonToSignup() {
  return (
    <Button type="primary" size="large" css={startButton}>
      <a
        href={
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:4000/auth/google'
            : 'https://api.healthfriend.club/auth/google'
        }
      >
        로그인 후 시작하기 (1.21 저녁5시)
      </a>
    </Button>
  );
}
