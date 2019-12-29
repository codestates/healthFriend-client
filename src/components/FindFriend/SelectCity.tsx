// eslint-disable-next-line
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { TreeSelect } from 'antd';
import { placeForFindFriends } from '../../config/FakeData';

const { SHOW_PARENT } = TreeSelect;

function SelectCity() {
  const [value, setValue] = useState([]);

  const onChange = (val) => {
    console.log('onChange ', value);
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
