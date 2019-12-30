// eslint-disable-next-line
import React from 'react';
import OnePlaceDropdown from './Dropdown';
import usePlaceSelect from '../../hooks/usePlaceSelect';

function PlaceSelect() {
  const { DropdownButton, setPlaceList, placeList } = usePlaceSelect();

  return (
    <div>
      {placeList.map((elm) => (
        <OnePlaceDropdown
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
