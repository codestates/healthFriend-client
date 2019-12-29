// eslint-disable-next-line
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Button } from 'antd';
import OnePlaceDropdown from './OnePlaceDropdown';

const btnAdd = css`
  margin-top: 10px;
  height: 38px;
`;

function PlaceSelect() {
  const [placeList, setPlaceList] = useState<any[]>([1]);

  const handleAdd = () =>
    setPlaceList(placeList.concat(placeList[placeList.length - 1] + 1));

  const DropdownButton = () => (
    <Button css={btnAdd} onClick={handleAdd}>
      추가
    </Button>
  );

  return (
    <div>
      {placeList.map((elm) => (
        <OnePlaceDropdown
          key={elm}
          id={elm}
          placeList={placeList}
          setPlaceList={setPlaceList}
        />
      ))}
      <DropdownButton />
    </div>
  );
}

export default PlaceSelect;
