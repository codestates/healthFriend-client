/** @jsx jsx */
import { Input } from 'antd';
import { css, jsx } from '@emotion/core';

import PlaceSelect from './PlaceSelect';
import useRegisterInput from '../../hooks/useRegisterInput';

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
  introduction: string;
  setTotalCheckArr: (...args: any[]) => void;
  setIntroduction: (args: string) => void;
};

export default function RegisterInput({
  order,
  totalCheckArr,
  introduction,
  setTotalCheckArr,
  setIntroduction,
}: RegisterInputProps) {
  const { questionCheckboxes, question, answer, subject } = useRegisterInput({
    order,
    totalCheckArr,
    setTotalCheckArr,
  });

  return (
    <div css={wrapper}>
      <h2>{question}</h2>
      {subject !== 'place' && subject !== 'messageToFriend' && (
        <div css={checkboxDiv}>{questionCheckboxes}</div>
      )}
      {answer.length === 1 && subject === 'place' ? <PlaceSelect /> : null}
      {answer.length === 1 && subject === 'messageToFriend' ? (
        <TextArea
          rows={4}
          defaultValue={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />
      ) : null}
    </div>
  );
}
