/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Row } from 'antd';

import Loading from '../Shared/Loading';
import sortByDate from '../../utils/sortByDate';
import MakeCard from '../Cards/MakeCard';

const marginFilterdCards = css`
  margin-top: 40px;
`;

type FilteredCardsProps = {
  loadingFU: boolean | undefined;
  dataFU: any;
  dataMe: any;
  refetch: Function;
};

export default function FilteredCards({
  loadingFU,
  dataFU,
  dataMe,
  refetch,
}: FilteredCardsProps) {
  if (loadingFU) return <Loading />;
  return (
    <Row gutter={24} css={marginFilterdCards}>
      {dataFU && dataFU.filterUsers && dataMe && dataMe.me
        ? dataFU.filterUsers
            .sort(sortByDate)
            .filter((user) => user.id !== dataMe.me.id)
            .filter((user) => {
              const array = dataMe.me.following
                .map((elm) => elm.following)
                .concat(dataMe.me.followers.map((el) => el.follower))
                .concat(dataMe.me.friends.map((ele) => ele.friend))
                .map((one) => one.id);
              return array.indexOf(user.id) === -1;
            })
            .map((oneData) =>
              MakeCard(oneData, 'unknown', refetch, () => null, true),
            )
        : null}
    </Row>
  );
}
