/** @jsx jsx */
import { Input } from 'antd';
import { css, jsx } from '@emotion/core';

import { useMutation } from '@apollo/react-hooks';
import useRegisterInput from '../../hooks/Register/useRegisterInput';
import SelectPlace from './SelectPlace';
import ImageForm from './ImageForm';
import { UPLOAD_FILE_STREAM } from '../../graphql/queries';

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

  const [
    profileImageUpload,
    { data: dataImg, loading: loadingImg },
  ] = useMutation(UPLOAD_FILE_STREAM);

  return (
    <div css={wrapper}>
      <h2>{question}</h2>
      {subject === 'openImageChoice' ? (
        <div>
          사진을 올려주세요
          <ImageForm {...{ profileImageUpload, dataImg, loadingImg }} />
        </div>
      ) : null}
      {['ableDistricts', 'messageToFriend'].indexOf(subject) === -1 && (
        <div css={checkboxDiv}>{questionCheckboxes}</div>
      )}
      {subject === 'ableDistricts' ? (
        <SelectPlace
          setPlaces={setPlaces}
          selectedPlaces={selectedPlaces}
          search={() => null}
          places={[]}
        />
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
