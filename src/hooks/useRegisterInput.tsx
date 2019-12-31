/** @jsx jsx */
// eslint-disable-next-line
import React, { useEffect } from 'react';
import { Checkbox } from 'antd';
import { css, jsx } from '@emotion/core';

import { questionList } from '../config/fakeData';

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

type useRegisterInputProps = {
  order: number;
  totalCheckArr: [][];
  setTotalCheckArr: (...args: any[]) => void;
  // 왜 뒤에가 void고 앞에는 boolean[]가 안되는지 모르겠음.
};

export default function useRegisterInput({
  order,
  totalCheckArr,
  setTotalCheckArr,
}: useRegisterInputProps) {
  const currentInput = questionList.inputRegister.filter(
    (elm) => elm.number === order,
  );
  const { question, answer, subject } = currentInput[0];
  const oneCheckArr = totalCheckArr[order - 1];
  // 왜 let oneCheckArr를 밖에 선언하고 oneCheckArr = totalCheckArr[order - 1];를 useEffect 안에서 했을때 문제가 발생했던 것인지.

  useEffect(() => {
    if (answer.length !== 0 && oneCheckArr.length === 0) {
      setTotalCheckArr(
        totalCheckArr.map((elm, idx) =>
          idx + 1 === order ? Array(answer.length).fill(false) : elm,
        ),
      );
    }
  }, [answer.length, oneCheckArr, order, setTotalCheckArr, totalCheckArr]);

  const onCheck = (e) => {
    // 여기도 e에 : MouseEvent 같은거 붙여줘야 함.
    let array;
    if (['levelOf3Dae', 'gender', 'openImageChoice'].indexOf(subject) !== -1) {
      array = answer.map((_, i) => answer[i] === e.target.value);
    } else {
      array = answer.map((_, i) =>
        answer[i] === e.target!.value ? !oneCheckArr[i] : oneCheckArr[i],
      );
    }
    setTotalCheckArr(
      totalCheckArr.map((elm, i) => (i + 1 === order ? array : elm)),
    );
  };

  const questionCheckboxes = answer.map((ele, idx) => {
    return (
      <Checkbox
        value={ele}
        key={ele}
        css={checkboxDesign}
        checked={oneCheckArr[idx]}
        onChange={onCheck}
      >
        {ele}
      </Checkbox>
    );
  });

  return { questionCheckboxes, question, answer, subject };
}
