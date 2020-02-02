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

type ButtonToFindProps = {
  history: any;
};

export default function ButtonToFind({ history }: ButtonToFindProps) {
  return (
    <Button
      // type="primary"
      size="large"
      css={startButton}
      onClick={() => history.push('/find')}
    >
      친구 찾으러 가기
    </Button>
  );
}
