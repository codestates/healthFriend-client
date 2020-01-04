/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Select from 'react-select';
import { Row, Col, Button } from 'antd';
import useDropdown from '../../hooks/useDropdown-d';

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

export default function OnePlaceDropdown({
  id,
  placeList,
  setPlaceList,
}: OneDropdownProps) {
  const {
    values,
    handleChangeGu,
    handleChangeDong,
    handleDelete,
  } = useDropdown({ placeList, setPlaceList });
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
