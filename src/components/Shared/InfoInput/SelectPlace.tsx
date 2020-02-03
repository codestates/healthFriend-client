/** @jsx jsx */
import { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import { TreeSelect } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { GET_PLACES } from '../../../graphql/queries';
import Loading from '../Loading';

const { SHOW_PARENT } = TreeSelect;

type SelectPlaceProps = {
  setPlaces: (args: string[]) => void;
  selectedPlaces: any[];
  search: Function;
  places: string[];
};

function SelectPlace({
  setPlaces,
  selectedPlaces,
  search,
  places,
}: SelectPlaceProps) {
  const guList: string[] = [];
  const placeForTree: any[] = [];
  const finalList: string[] = [];
  const [value, setValue] = useState<any[]>([]);

  useEffect(() => {
    if (value.length > 0) {
      value.forEach((selected) => {
        if (guList.indexOf(selected) === -1) {
          finalList.push(selected);
        } else {
          placeForTree
            .filter((oneGu) => oneGu.value === selected)[0]
            .children.map((oneDong) => oneDong.value)
            .forEach((dongValue) => {
              if (finalList.indexOf(dongValue) === -1) {
                finalList.push(dongValue);
              }
            });
        }
      });
    }
    setPlaces(finalList);
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    if (selectedPlaces) {
      setValue(selectedPlaces);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, [places]);

  const { data: dataPlace, loading: loadingPlace } = useQuery(GET_PLACES);

  if (loadingPlace) return <Loading />;

  if (dataPlace) {
    dataPlace.allDistricts.forEach((onePlace) => {
      const { idOfDong, nameOfDong, idOfGu, nameOfGu } = onePlace;
      if (guList.indexOf(nameOfGu) === -1) {
        guList.push(nameOfGu);
        placeForTree.push({
          title: nameOfGu,
          value: nameOfGu,
          key: idOfGu,
          children: [
            {
              title: nameOfDong,
              value: idOfDong,
              key: idOfDong,
            },
          ],
        });
      } else {
        const targetObj: any = placeForTree.filter(
          (oneGu) => oneGu.title === nameOfGu,
        )[0];
        targetObj.children.push({
          title: nameOfDong,
          value: idOfDong,
          key: idOfDong,
        });
      }
    });
  }

  return (
    <TreeSelect
      size="large"
      treeData={placeForTree}
      value={value}
      onChange={setValue}
      treeCheckable
      showCheckedStrategy={SHOW_PARENT}
      searchPlaceholder="원하는 지역이 어디신가요?"
      style={{ width: '100%' }}
    />
  );
}

export default SelectPlace;
