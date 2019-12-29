// eslint-disable-next-line
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Select } from 'antd';

const { Option } = Select;

function SelectDefault({ dataSource, placeholder }) {
  const [value, setValue] = useState([]);

  const onChange = (value) => {
    console.log('onChange ', value);
    setValue(value);
  };

  return (
    <Select
      size="large"
      mode="multiple"
      defaultValue={value}
      style={{ width: '100%' }}
      onChange={onChange}
      placeholder={placeholder}
    >
      {dataSource.map(data => (
        <Option key={data}>{data}</Option>
      ))}
    </Select>
  );
}

export default SelectDefault;
