/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Button } from 'antd';

const buttonCss = css`
  width: 200px;
  &:hover {
    background-color: #5075af;
    color: white;
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
  const [backgroundColor, textColor] =
    state === relation ? ['#5075af', 'white'] : ['white', 'black'];
  return (
    <Button
      css={buttonCss}
      style={{
        backgroundColor,
        color: textColor,
        border: state === relation ? 'none' : '1px solid #cccå',
      }}
      onClick={() => {
        history.push(`/cards/${relation}`);
      }}
    >
      {subject}
    </Button>
  );
}
