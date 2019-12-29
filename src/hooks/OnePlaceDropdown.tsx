// eslint-disable-next-line
import React, { useState } from 'react';

type useDropdownProps = {
  placeList: any[];
  setPlaceList: (...args: any[]) => any;
};

export default function useDropdown({
  placeList,
  setPlaceList,
}: useDropdownProps) {
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

  return { values, handleChangeGu, handleChangeDong, handleDelete };
}
