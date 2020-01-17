import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import questionList from '../../config/questions';

const { Option } = Select;

type SelectDefaultProps = {
  subject: string;
  options: any[];
  placeholder: string;
  filter: any;
  setFilter: (args: any) => void;
  search: Function;
};

function SelectDefault({
  subject,
  options,
  placeholder,
  filter,
  setFilter,
  search,
}: SelectDefaultProps) {
  const [value, setValue] = useState<any[]>([]);

  const getMatchedValue = (data: string): any => {
    const questionIndex: number = questionList
      .map((oneQ) => oneQ.subject)
      .indexOf(subject);
    const optionIndex: number = questionList[questionIndex].answer.indexOf(
      data,
    );
    return questionList[questionIndex].value[optionIndex];
  };

  useEffect(() => {
    setFilter({
      ...filter,
      [subject]: value,
    });
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, [filter]);

  return (
    <Select
      size="large"
      mode="multiple"
      value={value}
      style={{ width: '100%' }}
      onChange={setValue}
      placeholder={placeholder}
    >
      {options.map((data) => (
        <Option key={getMatchedValue(data)}>{data}</Option>
      ))}
    </Select>
  );
}

export default SelectDefault;
