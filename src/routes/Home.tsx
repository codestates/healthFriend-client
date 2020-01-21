/** @jsx jsx */
import { Row, Col, Typography } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import renderImage from '../static/renderImage.jpg';
import IfLoginUSeeFriend from '../components/Home/IfLoginUSeeFriend';
import MainButton from '../components/Home/MainButton';
import {
  GET_USERINFO,
  IS_LOGGED_IN,
  GET_USERS,
  GET_USER_COUNT,
} from '../graphql/queries';
import useSubscript from '../hooks/Shared/useSubscript';
import redirectWhenError from '../utils/redirectWhenError';
import MadeCard from '../components/Shared/MadeCard';

const { Title } = Typography;

const renderingImage = css`
  width: 100%;
  object-fit: cover;
  height: 100vh;
  filter: grayscale(20%);
`;

const renderingMessage = css`
  position: absolute;
  text-align: center;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  *.ant-typography {
    color: #fff;
  }
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
  const { data: dataUsers } = useQuery(GET_USERS);
  const { data: loginData } = useQuery(IS_LOGGED_IN);
  useSubscript(history);

  if (
    dataMe &&
    dataMe.me &&
    dataMe.me.nickname
    // && Cookies.get('access-token')
  ) {
    client.writeData({ data: { isLoggedIn: true } });
  }

  // errorMe!.graphQLErrors[0]!.extensions!.code ----> errorMe에 값들이 잘 들어오므로 분기처리 하기.

  // 일부러 로그아웃을 하지는 않았는데 token이 만료됐을 때
  if (
    loginData.isLoggedIn &&
    errorMe
    //  &&  errorMe.extensions.code === 'NO_TOKEN'
    // 문제2. erroMe의 key의 value값 안들이 비어있어서 에러 분기 처리가 안 됨. Object.keys(errorMe) ...... errorMe.extensions.code가 안 불려서.
  ) {
    client.writeData({ data: { isLoggedIn: false } });
    redirectWhenError({ history, client });
  }

  // 아래 카드를 남길지, 아니면 다른 걸 보여주는게 좋을지도 좀 더 궁리. 이왕 보여줄거면 FindFriend 창처럼 필터해서 보여줘야 할듯. 아니면 예시 카드들만 callosel로 보여주든가.. 아니면 tutorail 처럼 등록하는 사진, 친구 찾는 사진, 찾아서 채팅하는 사진, 같이 헬스하는 사진까지 쭉 이어지게 tutorial로 보여주든가...

  return (
    <Row type="flex" justify="center">
      <Col xs={24}>
        <img src={renderImage} alt="" css={renderingImage} />
        <div css={renderingMessage}>
          <Title level={1}>
            {dataCount ? dataCount.userCount : 1000} 명의 헬스 친구들이
            <br />
            당신을 기다리고 있어요
          </Title>
        </div>
        <MainButton {...{ dataMe, history, loginData }} />
      </Col>
      {loginData.isLoggedIn && dataUsers ? (
        <Col xs={20}>
          <Row type="flex" justify="center" style={{ marginTop: 20 }}>
            <Col xs={24}>
              <Row gutter={24}>
                {dataUsers.users.map((oneData) =>
                  MadeCard(
                    oneData,
                    'unknown',
                    /* () => null, */ () => null,
                    true,
                  ),
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      ) : (
        <IfLoginUSeeFriend />
      )}
    </Row>
  );
}

export default Home;
