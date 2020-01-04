import React from 'react';
import OnePlaceDropdown from './Dropdown-d';
import usePlaceSelect from '../../hooks/usePlaceSelect-d';

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
