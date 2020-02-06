/** @jsx jsx */
import { Row, Col, Typography } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import renderImage from '../static/h2.jpeg';
import IfLoginUSeeFriend from '../components/Home/IfLoginUSeeFriend';
import MainButton from '../components/Home/MainButton';
import {
  GET_USERINFO,
  IS_LOGGED_IN,
  GET_RANDOM_USERS,
  GET_USER_COUNT,
} from '../graphql/queries';
import useSubscript from '../hooks/Shared/useSubscript';

import redirectWhenError from '../utils/Shared/redirectWhenError';
import MadeCard from '../components/Shared/UserCard/MadeCard';
import useChatkitRegister from '../hooks/Home/useChatkitRegister';

import Chatbot from '../components/Chatbot/Chatbot';
const { Title } = Typography;

const renderingImage = css`
  width: 100%;
  object-fit: cover;
  object-position: 50% 20%;
  height: 85vh;
`;
const renderingMessage = css`
  position: absolute;
  text-align: center;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  *.ant-typography {
    color: white;
  }
`;
const mainButtonCss = css`
  margin: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type HomeProps = {
  history: any;
};

function Home({ history }: HomeProps) {
  const client = useApolloClient();
  // console.log('token 유무', Cookies.get('access-token'));
  const { data: dataMe, error: errorMe } = useQuery(GET_USERINFO, {
    fetchPolicy: 'network-only',
  });
  // 문제 1. 왜 token을 지워도 dataMe에 데이터가 들어오는 쿼리가 날라갈까? 어디선가 있는지 모르는 cache에서 가져오는 듯한데.
  // console.log('dataMe', dataMe);
  const { data: dataCount } = useQuery(GET_USER_COUNT, {
    fetchPolicy: 'network-only',
  });
  const { data: dataUsers } = useQuery(GET_RANDOM_USERS);
  const { data: loginData } = useQuery(IS_LOGGED_IN);

  useChatkitRegister({ dataMe, client });
  useSubscript(history);

  if (errorMe && errorMe!.graphQLErrors[0]!.extensions!.code) {
    console.log('errorMe', errorMe.graphQLErrors[0]!.extensions);
  }

  if (
    loginData.isLoggedIn &&
    errorMe
    //  &&  errorMe.extensions.code === 'NO_TOKEN'
  ) {
    // errorMe!.graphQLErrors[0]!.extensions!.code ----> errorMe에 값들이 잘 들어오므로 분기처리 하기.

    // 일부러 로그아웃을 하지는 않았는데 token이 만료됐을 때
    client.writeData({ data: { isLoggedIn: false } });
    redirectWhenError({ history, client });
  }

  return (
    <Row type="flex" justify="center">
      <Col xs={24}>
        <img src={renderImage} alt="" css={renderingImage} />
        <div css={renderingMessage}>
          <Title level={1}>
            {dataCount ? dataCount.userCount : 1000} 명의 친구들이
            <br />
            당신을 기다리고 있어요
          </Title>
        </div>
        <div css={mainButtonCss}>
          <MainButton {...{ dataMe, history, loginData }} />
        </div>
      </Col>
      <IfLoginUSeeFriend {...{ dataMe, history, loginData }} />
      {dataUsers && (
        <Col xs={20}>
          <Row type="flex" justify="center" style={{ marginTop: 20 }}>
            <Col xs={24}>
              <Row gutter={24}>
                {dataUsers.randomUsers.map((oneData) =>
                  MadeCard(oneData, 'unknown', () => null, true, false),
                )}
              </Row>
            </Col>
            <div style={{ margin: '10px' }}>
              <MainButton {...{ dataMe, history, loginData }} />
            </div>
          </Row>
          <Chatbot />
        </Col>
      )}
    </Row>
  );
}

export default Home;
