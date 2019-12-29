// eslint-disable-next-line
import React from 'react';
import OnePlaceDropdown from './OnePlaceDropdown';
import usePlaceSelect from '../../hooks/PlaceSelect';

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
