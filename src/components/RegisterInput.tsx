// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { Checkbox, Input } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import fakeData from '../config/fakeData';
import PlaceSelect from './PlaceSelect'


const wrapper = css`
  margin-bottom: 20px;
`;

const checkboxDiv = css`
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
  setCheckArr: Function;
};

export default function RegisterInput({ order, checkArr, setCheckArr }: RegisterInputProps) {
  const currentInput = fakeData.inputRegister.filter(
    (elm) => elm.number === order,
  );
  const { question, answer, subject } = currentInput[0];

  // 원석: question.slice(5)는 왜 있는건지 궁금합니다.
  let questionCheckboxes = answer.map((ele, idx) => (
    <Checkbox
      name={`${question.slice(5)}${idx + 1}`}
      key={idx + 1}
      css={checkboxDesign}
      checked={checkArr[idx]}
      onChange={() => setCheckArr(answer.map((ele, i) => {
        if (i === idx) {
          return true;
        }
        return false;
      }
    ))}>
      {ele}
    </Checkbox>
  ));

  return (
    <div css={wrapper}>
      <h2>{question}</h2>
      {(subject !== 'place' && subject !== 'introduce') && (
        <div css={checkboxDiv}>
          {questionCheckboxes}
        </div>
      )}
      {answer.length === 0 && subject === 'place' ? <PlaceSelect/> : null}
      {answer.length === 0 && subject === 'introduce' ? (
        <TextArea rows={4} />
      ) : null}
    </div>
  );
}
