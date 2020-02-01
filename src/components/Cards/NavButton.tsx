/** @jsx jsx */
// import React from 'react';
import { jsx, css } from '@emotion/core';
import { Button } from 'antd';

// const buttonCss = css`
//   display: inline-block;
//   width: 60%;
// `;

const buttonCss = css`
  width: 200px;
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
