// eslint-disable-next-line
import React from 'react';
import { Radio } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import message from '../config/message';

const radioDesign = css`
  border: 0.5px solid gray;
  display: block;
  height: 30px;
  line-height: 30px;
`;

type RegisterInputProps = {
  order: number;
};

export default function RegisterInput({ order }: RegisterInputProps) {
  const currentInput = message.inputRegister.filter(
    (elm) => elm.order === order,
  );
  const { question, answer } = currentInput[0];

  return (
    <div>
      <h2>{question}</h2>

      <Radio.Group>
        <Radio value={1} css={radioDesign}>
          중량 강화
        </Radio>
        <Radio value={2} css={radioDesign}>
          재밌게 운동하고 싶어서
        </Radio>
        <Radio value={3} css={radioDesign}>
          친구 찾기
        </Radio>
        <Radio value={4} css={radioDesign}>
          의지 부족을 이겨내고 싶어서
        </Radio>
      </Radio.Group>
    </div>
  );
}
