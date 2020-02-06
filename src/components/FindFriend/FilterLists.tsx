/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Col } from 'antd';
import SelectPlace from '../Shared/InfoInput/SelectPlace';
import SelectDefault from './SelectDefault';
import questionList from '../../config/questions';

const questionsCSS = css`
  margin-top: 10px;
`;

type FilterListsProps = {
  getFilteredUsers: Function;
  filter: any;
  places: string[];
  setPlaces: (args: string[]) => void;
  setFilter: (args: any) => void;
};

export default function FilterLists({
  getFilteredUsers,
  filter,
  places,
  setPlaces,
  setFilter,
}: FilterListsProps) {
  const filterList = questionList
    .filter((elm) => elm.isFilterList)
    .map((ele) => ele.subject);

  const search = () => {
    getFilteredUsers({
      variables: { ...filter, districts: places },
    });
  };

  return filterList.map((filterQ) => {
    const [{ subject, forFind, answer }] = questionList.filter(
      (elm) => elm.subject === filterQ,
    );
    return subject === 'ableDistricts' ? (
      <Col md={16} key={forFind} css={questionsCSS}>
        <SelectPlace
          setPlaces={setPlaces}
          selectedPlaces={[]}
          search={search}
          places={places}
        />
      </Col>
    ) : (
      <Col md={8} key={forFind} css={questionsCSS}>
        <SelectDefault
          subject={subject}
          options={answer}
          placeholder={forFind as string}
          filter={filter}
          setFilter={setFilter}
          search={search}
        />
      </Col>
    );
  }) as any;
}
