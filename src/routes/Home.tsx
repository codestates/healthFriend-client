/** @jsx jsx */
import { Row, Col, Typography } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import renderImage from '../static/renderImage.jpg';
import { GET_USERS, IS_LOGGED_IN, GET_USERINFO } from '../graphql/queries';
import ButtonToFind from '../components/Home/ButtonToFind';
import ButtonToRegister from '../components/Home/ButtonToRegister';
import ButtonToSignup from '../components/Home/ButtonToSignup';
import IfLoginUSeeFriend from '../components/Shared/IfLoginUSeeFriend';
import UserCard from '../components/FindFriend/UserCard';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';

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
  const { data: dataUsers } = useQuery(GET_USERS);
  const { data: loginData } = useQuery(IS_LOGGED_IN);

  if (
    dataMe &&
    dataMe.me &&
    dataMe.me.nickname
    // && Cookies.get('access-token')
  ) {
    client.writeData({ data: { isLoggedIn: true } });
  }

  // 일부러 로그아웃을 하지는 않았는데 token이 만료됐을 때
  if (
    loginData.isLoggedIn &&
    errorMe
    //  &&  errorMe.extensions.code === 'NO_TOKEN'
    // 문제2. erroMe의 key의 value값 안들이 비어있어서 에러 분기 처리가 안 됨. Object.keys(errorMe) ...... errorMe.extensions.code가 안 불려서.
  ) {
    client.writeData({ data: { isLoggedIn: false } });
    return <ErrorLoginFirst error={errorMe} />;
  }
  // if (errorMe) return <p>{errorMe.message}</p>;

  function ButtonHome() {
    if (!loginData.isLoggedIn) {
      return <ButtonToSignup />;
    }
    if (dataMe && dataMe.me.levelOf3Dae) {
      return <ButtonToFind history={history} />;
    }
    return <ButtonToRegister history={history} />;
  }

  // 아래 카드를 남길지, 아니면 다른 걸 보여주는게 좋을지도 좀 더 궁리. 이왕 보여줄거면 FindFriend 창처럼 필터해서 보여줘야 할듯.

  return (
    <Row type="flex" justify="center">
      <Col xs={24}>
        <img src={renderImage} alt="" css={renderingImage} />
        <div css={renderingMessage}>
          <Title level={1}>
            {dataUsers ? dataUsers.users.length : 10000}명의 헬스친구들이
            <br />
            당신을 기다리고 있어요
          </Title>
        </div>
        <ButtonHome />
      </Col>
      {loginData.isLoggedIn && dataUsers ? (
        <Col xs={20}>
          <Row type="flex" justify="center" style={{ marginTop: 20 }}>
            <Col xs={24}>
              <Row gutter={24}>
                {dataUsers.users.map((oneData) => (
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
                    renewFriends={() => null}
                    setFriend={() => null}
                    // 위의 것들 같은 것 ts의 ? 나 다른 해결책??
                  />
                ))}
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
