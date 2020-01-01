import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

type SelectDefaultProps = {
  dataSource: any[];
  placeholder: string;
};

function SelectDefault({ dataSource, placeholder }: SelectDefaultProps) {
  const [value, setValue] = useState<any[]>([]);

  const onChange = (val) => {
    setValue(val);
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
      {dataSource.map((data) => (
        <Option key={data}>{data}</Option>
      ))}
    </Select>
  );
}

export default SelectDefault;
