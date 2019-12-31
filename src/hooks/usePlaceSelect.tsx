/** @jsx jsx */
// eslint-disable-next-line
import React, { useState } from 'react';
import { jsx, css } from '@emotion/core';
import { Button } from 'antd';

const btnAdd = css`
  margin-top: 10px;
  height: 38px;
`;

export default function usePlaceSelect() {
  const [placeList, setPlaceList] = useState<any[]>([1]);

  const handleAdd = () =>
    setPlaceList(placeList.concat(placeList[placeList.length - 1] + 1));

  const DropdownButton = () => (
    <Button css={btnAdd} onClick={handleAdd}>
      추가
    </Button>
  );

  return {
    DropdownButton,
    setPlaceList,
    placeList,
  };
}
