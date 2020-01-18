/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Row } from 'antd';

import UserCard from './UserCard';
import Loading from '../Shared/Loading';

const marginFilterdCards = css`
  margin-top: 40px;
`;

type FilteredCardsProps = {
  loading: boolean | undefined;
  data: any;
  dataUser: any;
  refetch: Function;
};

export default function FilteredCards({
  loading,
  data,
  dataUser,
  refetch,
}: FilteredCardsProps) {
  if (loading) return <Loading />;
  console.log('data', data);
  return (
    <Row gutter={24} css={marginFilterdCards}>
      {data && data.filterUsers && dataUser && dataUser.me
        ? data.filterUsers
            .filter((user) => user.id !== dataUser.me.id)
            .filter((user) => {
              const array = dataUser.me.following
                .concat(dataUser.me.followers)
                .concat(dataUser.me.friends)
                .map((one) => one.id);
              return array.indexOf(user.id) === -1;
            })
            .map((oneData) => (
              <UserCard
                id={oneData.id}
                key={oneData.email}
                nickname={oneData.nickname}
                gender={oneData.gender}
                openImageChoice={oneData.openImageChoice}
                messageToFriend={oneData.messageToFriend}
                motivations={oneData.motivations}
                levelOf3Dae={oneData.levelOf3Dae}
                weekdays={oneData.weekdays}
                ableDistricts={oneData.ableDistricts}
                type="unknown"
                renewFriends={refetch}
                setChatFriend={() => null}
              />
            ))
        : null}
    </Row>
  );
}
