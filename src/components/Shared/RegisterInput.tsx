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
  ] = useMutation(UPLOAD_FILE_STREAM, {
    // image 올린 후엔 default로 선택해놓은 '비공개'상태를 무선택 상태로 바꿔줌.
    onCompleted: (data) => {
      if (data) {
        setTotalCheckArr(
          totalCheckArr.map((elm, idx) =>
            idx + 1 === order ? [false, false, false] : elm,
          ),
        );
      }
    },
  });

  return (
    <div css={wrapper}>
      <h2>{question}</h2>
      {subject === 'openImageChoice' ? (
        <div>
          <ImageForm {...{ profileImageUpload, dataImg, loadingImg }} />
          <br />
          {dataImg ? <div css={checkboxDiv}>{questionCheckboxes}</div> : null}
        </div>
      ) : null}
      {['ableDistricts', 'messageToFriend', 'openImageChoice'].indexOf(
        subject,
      ) === -1 && <div css={checkboxDiv}>{questionCheckboxes}</div>}
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
