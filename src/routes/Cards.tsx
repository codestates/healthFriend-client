import React from 'react';
import { Row, Col } from 'antd';
import { useQuery, useApolloClient, useMutation } from '@apollo/react-hooks';

import {
  IS_LOGGED_IN,
  GET_FRIENDS,
  SET_CHAT_FRIEND,
  GET_CHAT_FRIEND,
} from '../graphql/queries';
import Loading from '../components/Shared/Loading';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';
import redirectWhenTokenExp from '../utils/redirectWhenTokenExp';
import message from '../config/Message';
import useSubscript from '../hooks/Shared/useSubscript';
import Nav from '../components/Cards/Nav';
import MakeCard from '../components/Cards/MakeCard';

type CardsProps = {
  history: any; // match, location을 같이 쓰니 안되고, 얘만 쓰니 되네... withRouter로 붙인 애들은 다 써줘야 하는 것 같고, 아닌 애들은 아닌 듯.
  // 이것처럼 쓰는 것도 좀 아닌것 같고
  match: { params: { state: string } };
};

function Cards({ history, match }: CardsProps) {
  const client = useApolloClient();
  // const [chatFriend, setChatFriend] = useState<any>('');
  const { data: chatFriend, error: errorChat } = useQuery(GET_CHAT_FRIEND);
  const [setChatFriend] = useMutation(SET_CHAT_FRIEND);

  console.log('chatFriend in Cards', chatFriend);
  console.log('errorChat in Cards', errorChat);

  const { data: loginData } = useQuery(IS_LOGGED_IN);
  const { loading, error, data, refetch } = useQuery(GET_FRIENDS, {
    fetchPolicy: 'network-only',
  });
  const { state } = match.params;

  useSubscript(history);

  // react가 SPA이기 때문에 주소창에 주소를 쳐서 들어오면 state가 무조건 initial로 돌아가면서 isLoggedIn = false로 되게 된다. 그래서 로긴 무조건 다시 하라고 뜨게 됨.
  if (!loginData.isLoggedIn) return <ErrorLoginFirst error={null} />;

  function FriendList() {
    if (loading) return <Loading />;
    if (error) redirectWhenTokenExp({ history, client });
    if (data && data.me) {
      const cardRender = (oneData, func) =>
        MakeCard(oneData, state, refetch, func);
      const { following, followers, friends } = data.me;
      if (state === 'following') {
        if (following.length > 0) {
          return following.map((oneData) => cardRender(oneData, () => null));
        }
        return <div>{message.followingEmpty}</div>;
      }
      if (state === 'followers') {
        if (followers.length > 0) {
          return followers.map((oneData) => cardRender(oneData, () => null));
        }
        return <div>{message.followersEmpty}</div>;
      }
      if (state === 'friends') {
        if (friends.length > 0) {
          return friends.map((oneData) => cardRender(oneData, setChatFriend));
        }
        return <p>{message.friendsEmpty}</p>;
      }
    }
  }

  return (
    <div>
      <br />
      <Row type="flex" justify="center">
        <Nav history={history} state={state} />
        <br />
        <br />
        <Col xs={24} md={20}>
          <FriendList />
        </Col>
      </Row>
    </div>
  );
}

export default Cards;
