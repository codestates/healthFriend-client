/** @jsx jsx */
import React, { useState } from 'react';
import { Input, message } from 'antd';
import { css, jsx } from '@emotion/core';
import { useMutation, useQuery } from '@apollo/react-hooks';
import useInfoInput from '../../../hooks/Register/useInfoInput';
import SelectPlace from './SelectPlace';
import ImageForm from './ImageForm';
import { UPLOAD_FILE_STREAM, GET_USERINFO } from '../../../graphql/queries';

const wrapper = css`
  margin-bottom: 20px;
`;
const checkboxDiv = css`
  width: 100%;
  border: 1px solid #ededed;
  border-radius: 5px;
`;

const { TextArea } = Input;

type InfoInputProps = {
  order: number;
  totalCheckArr: [][];
  introduction: string;
  setTotalCheckArr: (...args: any[]) => void;
  setIntroduction: (args: string) => void;
  setPlaces: (args: string[]) => void;
  selectedPlaces: any[];
};

export default function InfoInput({
  order,
  totalCheckArr,
  introduction,
  setTotalCheckArr,
  setIntroduction,
  setPlaces,
  selectedPlaces,
}: InfoInputProps) {
  const { questionCheckboxes, question, subject } = useInfoInput({
    order,
    totalCheckArr,
    setTotalCheckArr,
  });

  const { data: dataI } = useQuery(GET_USERINFO, {
    fetchPolicy: 'network-only',
  });
  const [visible, setVisible] = useState<boolean>(true);
  const [
    profileImageUpload,
    { data: dataImg, loading: loadingImg },
  ] = useMutation(UPLOAD_FILE_STREAM, {
    // image 올린 후엔 default로 선택해놓은 '비공개'상태를 무선택 상태로 바꿔줌. 단, 이전 이미지 올린적있다면 그 상태로.
    onCompleted: (data) => {
      if (data) {
        setTotalCheckArr(
          totalCheckArr.map((elm, idx) =>
            idx + 1 === order &&
            subject === 'openImageChoice' &&
            !(dataI && dataI.me && dataI.me.profileImage)
              ? [false, false, false]
              : elm,
          ),
        );
      }
      message.success('처리되었습니다');
      setVisible(true);
    },
    onError: (error) => console.log(error),
  });

  return (
    <div css={wrapper}>
      <h2>{question}</h2>
      {subject === 'openImageChoice' ? (
        <div>
          <ImageForm
            {...{
              profileImageUpload,
              dataImg,
              loadingImg,
              dataI,
              visible,
              setVisible,
              totalCheckArr,
              setTotalCheckArr,
              order,
              subject,
            }}
          />
          <br />
          {(visible && (dataImg && dataImg.profileImageUpload)) ||
          (visible &&
            dataI &&
            dataI.me &&
            dataI.me.profileImage &&
            dataI.me.profileImage.length > 0) ? (
            <React.Fragment>
              <h2>사진 공개 여부를 선택해주세요</h2>
              <div css={checkboxDiv}>{questionCheckboxes}</div>
            </React.Fragment>
          ) : null}
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
