/** @jsx jsx */
import { Input } from 'antd';
import { css, jsx } from '@emotion/core';

// import PlaceSelect from './PlaceSelect';
import useRegisterInput from '../../hooks/useRegisterInput';
import SelectPlace from '../FindFriend/SelectPlace';

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
  setPlaces: (args: string[]) => void;
  selectedPlaces: any[];
};

export default function RegisterInput({
  order,
  totalCheckArr,
  introduction,
  setTotalCheckArr,
  setIntroduction,
  setPlaces,
  selectedPlaces,
}: RegisterInputProps) {
  const { questionCheckboxes, question, subject } = useRegisterInput({
    order,
    totalCheckArr,
    setTotalCheckArr,
  });

  return (
    <div css={wrapper}>
      <h2>{question}</h2>
      {['place', 'messageToFriend'].indexOf(subject) === -1 && (
        <div css={checkboxDiv}>{questionCheckboxes}</div>
      )}
      {subject === 'place' ? (
        <SelectPlace setPlaces={setPlaces} selectedPlaces={selectedPlaces} />
      ) : null}
      {subject === 'messageToFriend' ? (
        <TextArea
          rows={4}
          defaultValue={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />
      ) : null}
    </div>
  );
}
