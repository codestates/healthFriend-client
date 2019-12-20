// eslint-disable-next-line
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Select from 'react-select';

const placeOptions = [
  { value: 'chocolate', label: '강남구' },
  { value: 'strawberry', label: '용산구' },
  { value: 'vanilla', label: '송파구' },
];

const selectCss = css`
  width: 300px;
`;

function PlaceSelect() {
  const [values, setValues] = useState({
    selectedOption: null,
  });

  const handleChange = (selectedOption) => {
    setValues({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <Select
      value={values.selectedOption}
      onChange={handleChange}
      options={placeOptions}
      isMulti
      css={selectCss}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      placeholder="장소"
    />
  );
}

export default PlaceSelect;
