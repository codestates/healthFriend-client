// eslint-disable-next-line
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Select from 'react-select';
import { Row, Col, Button } from 'antd';

const btnAdd = css`
  margin-top: 10px;
  height: 38px;
`;

const btnDelete = css`
  height: 38px;
  margin-left: 10px;
`;

const GuOptions = [
  { value: '강남구', label: '강남구' },
  { value: '용산구', label: '용산구' },
  { value: '송파구', label: '송파구' },
];

const DongOptions = [
  { value: '역삼동', label: '역삼동' },
  { value: '삼성동', label: '삼성동' },
  { value: '압구정동', label: '압구정동' },
  { value: '청담동', label: '청담동' },
];

type OneDropdownProps = {
  id: string;
  placeList: any[];
  setPlaceList: (...args: any[]) => any;
};

function OneDropdown({ id, placeList, setPlaceList }: OneDropdownProps) {
  const [values, setValues] = useState({
    // useState안에 tpye 체크해주는 것
    Gu: null,
    Dong: null,
  });

  const handleChangeGu = (selectedOption) => {
    setValues({ ...values, Gu: selectedOption });
  };

  const handleChangeDong = (selectedOption) => {
    setValues({ ...values, Dong: selectedOption });
  };

  const handleDelete = (e) => {
    // e.target과 e.currentTarget이 가리키는게 같은데 id는 currentTarget만 인식함.
    setPlaceList(placeList.filter((elm) => elm !== Number(e.currentTarget.id)));
  };

  return (
    <Row gutter={24}>
      <Col xs={6}>
        <Select
          value={values.Gu}
          onChange={handleChangeGu}
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
      <Button
        css={btnDelete}
        id={id}
        onClick={handleDelete}
        disabled={placeList.length === 1}
      >
        삭제
      </Button>
    </Row>
  );
}

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
        <OneDropdown
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
