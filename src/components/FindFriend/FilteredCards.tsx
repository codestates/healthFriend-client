/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Row } from 'antd';

import Loading from '../Shared/Loading';
import sortByDate from '../../utils/sortByDate';
import MadeCard from '../Shared/MadeCard';

const marginFilterdCards = css`
  margin-top: 40px;
`;

type FilteredCardsProps = {
  loadingFU: boolean | undefined;
  dataFU: any;
  dataMe: any;
};

export default function FilteredCards({
  loadingFU,
  dataFU,
  dataMe,
}: FilteredCardsProps) {
  if (loadingFU) return <Loading />;

  console.log('dataFU', dataFU);

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
              MadeCard(oneData, 'unknown', () => null, true, false),
            )
        : null}
    </Row>
  );
}
