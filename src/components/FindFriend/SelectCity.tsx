/** @jsx jsx */
// eslint-disable-next-line
import React, { useState } from 'react';
import { jsx } from '@emotion/core';
import { TreeSelect } from 'antd';
import { placeForFindFriends } from '../../config/fakeData';

const { SHOW_PARENT } = TreeSelect;

function SelectCity() {
  const [value, setValue] = useState([]);

  const onChange = (val) => {
    setValue(val);
  };

  return (
    <TreeSelect
      size="large"
      treeData={placeForFindFriends}
      value={value}
      onChange={onChange}
      treeCheckable
      showCheckedStrategy={SHOW_PARENT}
      searchPlaceholder="원하는 지역이 어디신가요?"
      style={{ width: '100%' }}
    />
  );
}

export default SelectCity;
