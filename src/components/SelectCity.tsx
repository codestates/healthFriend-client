import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: '강남구',
    value: '강남구',
    key: '0-0',
    children: [
      {
        title: '역삼동',
        value: '역삼동',
        key: '0-0-0',
      },
      {
        title: '삼성동',
        value: '삼성동',
        key: '0-0-1',
      },
      {
        title: '대치동',
        value: '대치동',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '용산구',
    value: '용산구',
    key: '0-1',
    children: [
      {
        title: '이태원동',
        value: '이태원동',
        key: '0-1-0',
      },
      {
        title: '한남동',
        value: '한남동',
        key: '0-1-1',
      },
    ],
  },
];


function SelectCity() {
  const [value, setValue] = useState([]);

  const onChange = (value) => {
    console.log('onChange ', value);
    setValue(value);
  };

  return (
    <TreeSelect
      size="large"
      treeData={treeData}
      value={value}
      onChange={onChange}
      treeCheckable={true}
      showCheckedStrategy={SHOW_PARENT}
      searchPlaceholder="원하는 지역이 어디신가요?"
      style={{ width: '100%' }}
    />
  );
}

export default SelectCity;
