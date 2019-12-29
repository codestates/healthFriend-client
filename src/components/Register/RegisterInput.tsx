// eslint-disable-next-line
import React from 'react';
import { Input } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import PlaceSelect from './PlaceSelect';
import useRegisterInput from '../../hooks/RegisterInput';

const wrapper = css`
  margin-bottom: 20px;
`;

const checkboxDiv = css`
  width: 100%;
  border: 1px solid #ededed;
  border-radius: 5px;
`;

const { TextArea } = Input;

type RegisterInputProps = {
  order: number;
  totalCheckArr: [][];
  setTotalCheckArr: (...args: any[]) => void;
};

export default function RegisterInput({
  order,
  totalCheckArr,
  setTotalCheckArr,
}: RegisterInputProps) {
  const { questionCheckboxes, question, answer, subject } = useRegisterInput({
    order,
    totalCheckArr,
    setTotalCheckArr,
  });

  return (
    <div css={wrapper}>
      <h2>{question}</h2>
      {subject !== 'place' && subject !== 'introduce' && (
        <div css={checkboxDiv}>{questionCheckboxes}</div>
      )}
      {answer.length === 0 && subject === 'place' ? <PlaceSelect /> : null}
      {answer.length === 0 && subject === 'introduce' ? (
        <TextArea rows={4} />
      ) : null}
    </div>
  );
}
