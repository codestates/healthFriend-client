// eslint-disable-next-line
import React from 'react';
import { Checkbox, Input } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import fakeData from '../config/fakeData';
import PlaceSelect from './PlaceSelect'


const checkboxDesign = css`
  border: 0.5px solid gray;
  display: block;
  height: 30px;
  line-height: 30px;
`;

const { TextArea } = Input;

type RegisterInputProps = {
  order: number;
};

export default function RegisterInput({ order }: RegisterInputProps) {
  const currentInput = fakeData.inputRegister.filter(
    (elm) => elm.number === order,
  );
  const { question, answer, subject } = currentInput[0];

  let questionCheckboxes = answer.map((ele, idx) => (
    <Checkbox name={`${question.slice(5)}${idx + 1}`} key={idx + 1} css={checkboxDesign} >
      {ele}
    </Checkbox>
  ));

  return (
    <div>
      <h2>{question}</h2>
      {questionCheckboxes}
      {answer.length === 0 && subject === 'place' ? <PlaceSelect/> : null}
      {answer.length === 0 && subject === 'introduce' ? (
        <TextArea rows={4} />
      ) : null}
    </div>
  );
}
