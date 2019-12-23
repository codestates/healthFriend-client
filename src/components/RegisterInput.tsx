// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { Checkbox, Input } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import fakeData from '../config/fakeData';
import PlaceSelect from './PlaceSelect';

const wrapper = css`
  margin-bottom: 20px;
`;

const checkboxGroup = css`
  width: 100%;
  border: 1px solid #ededed;
  border-radius: 5px;
`;

const checkboxDesign = css`
  border-bottom: 1px solid #ededed;
  padding: 10px 20px;
  display: block;
  line-height: 30px;
  margin: 0 !important;

  &:last-child {
    border-bottom: 0;
  }
`;

const { TextArea } = Input;

type RegisterInputProps = {
  order: number;
  checkArr: Array<boolean>;
  // setCheckArr: Function;
  setCheckArr: (...args: any[]) => void;
  // 왜 뒤에가 void고 앞에는 boolean[]가 안되는지 모르겠음.
};

export default function RegisterInput({
  order,
  checkArr,
  setCheckArr,
}: RegisterInputProps) {
  const currentInput = fakeData.inputRegister.filter(
    (elm) => elm.number === order,
  );
  const { question, answer, subject } = currentInput[0];

  const questionCheckboxes = answer.map((ele, idx) => (
    <Checkbox
      value={ele}
      key={ele}
      css={checkboxDesign}
      checked={checkArr[idx]}
      onChange={(e) => {
        setCheckArr(answer.map((_, i) => answer[i] === e.target.value));
      }}
    >
      {ele}
    </Checkbox>
  ));

  return (
    <div css={wrapper}>
      <h2>{question}</h2>
      {subject !== 'place' && subject !== 'introduce' && (
        <Checkbox.Group css={checkboxGroup}>
          {questionCheckboxes}
        </Checkbox.Group>
      )}
      {answer.length === 0 && subject === 'place' ? <PlaceSelect /> : null}
      {answer.length === 0 && subject === 'introduce' ? (
        <TextArea rows={4} />
      ) : null}
    </div>
  );
}
