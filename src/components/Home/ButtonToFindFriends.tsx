/** @jsx jsx */
import { Button } from 'antd';
import { jsx, css } from '@emotion/core';

const startButton = css`
  background: #2c3e50;
  border-color: #2c3e50;
`;

type ButtonToFindProps = {
  history: any;
};

export default function ButtonToFindFriends({ history }: ButtonToFindProps) {
  return (
    <Button
      type="primary"
      size="large"
      css={startButton}
      onClick={() => history.push('/find')}
    >
      더 많은 친구들이 보고 싶다면?
    </Button>
  );
}
