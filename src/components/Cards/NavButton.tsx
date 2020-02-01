/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Button } from 'antd';

const buttonCss = css`
  width: 200px;
  &:focus {
    background-color: #6f5a7e;
  }
`;

type NavButtonProps = {
  relation: string;
  subject: string;
  history: any;
  state: string;
};

export default function NavButton({
  relation,
  subject,
  history,
  state,
}: NavButtonProps) {
  return (
    <Button
      css={buttonCss}
      type={state === relation ? 'primary' : 'default'}
      onClick={() => {
        history.push(`/cards/${relation}`);
      }}
    >
      {subject}
    </Button>
  );
}
