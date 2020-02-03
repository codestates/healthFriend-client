/** @jsx jsx */
import { Button } from 'antd';
import { jsx, css } from '@emotion/core';

// 버튼 component 3개가 다 같은 스타일을 공유하므로, emotion에서 방법 찾아서 중복 제거

// 이거 유저가 이 행동 먼저 할 수 있게 불깜빡깜빡 거리게 만드는 애니매이션 같은 것 넣고 싶음.
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

type ButtonToRegisterProps = {
  history: any;
};

export default function ButtonToRegister({ history }: ButtonToRegisterProps) {
  return (
    <Button
      size="large"
      css={startButton}
      onClick={() => history.push('/register')}
    >
      정보등록을 해주세요.
    </Button>
  );
}
