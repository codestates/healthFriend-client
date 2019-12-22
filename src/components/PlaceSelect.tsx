// eslint-disable-next-line
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Select from 'react-select';
import { Row, Col, Button } from 'antd';

const btnAdd = css`
  height: 38px;
`;

const GuOptions = [
  { value: '강남구', label: '강남구' },
  { value: '용산구', label: '용산구' },
  { value: '송파구', label: '송파구' },
];

const DongOptions = [
  { value: '역삼동', label: '역삼동' },
  { value: '삼성동', label: '삼성동' },
  { value: '압구정동', label: '압구정동'},
  { value: '청담동', label: '청담동'},
];


function PlaceSelect() {
  const [values, setValues] = useState({
    Gu: null,
    Dong: null,
  });

  const handleChange = (selectedOption) => {
    setValues({ Gu: selectedOption, Dong: values.Dong });
    console.log(`Option selected:`, selectedOption);
  };

  const handleChangeDong = (selectedOption) => {
    setValues({ Gu: values.Gu, Dong: selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  return (
    <Row gutter={24}>
      <Col xs={10}>
        <Select
          value={values.Gu}
          onChange={handleChange}
          options={GuOptions}
          hideSelectedOptions={false}
          placeholder="구"
        />
      </Col>
      <Col xs={10}>
        <Select
          value={values.Dong}
          onChange={handleChangeDong}
          options={DongOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          placeholder="동"
        />
      </Col>
      <Button css={btnAdd}>추가</Button>
    </Row>
  );
}

export default PlaceSelect;
