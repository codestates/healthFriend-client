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

// 가운데로 옮기는 법
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

// const wrapper = css`
//   padding: 10px;
// `;

// 어디는 history, match, location 다 써줘야 하고, 여긴 아니고 차이는??
type HomeProps = {
  history: any;
};

function Home({ history }: HomeProps) {
  const client = useApolloClient();
  const { data, error } = useQuery(GET_USERINFO, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });
  const { data: dataUsers, error: errorUsers } = useQuery(GET_USERS, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });
  const { data: loginData } = useQuery(IS_LOGGED_IN);

  // home 화면은 왜 아래 if 문이 없어도 알아서 isLoggedIn: true로 되는지 모르겠음.
  if (data) {
    client.writeData({ data: { isLoggedIn: true } });
  }

  if (loginData.isLoggedIn === true && (error || errorUsers)) {
    client.writeData({ data: { isLoggedIn: false } });
    return <ErrorLoginFirst error={error} />;
  }

  function ButtonHome() {
    if (loginData.isLoggedIn === false) {
      return <ButtonToSignup />;
    }
    if (data && data.me.levelOf3Dae) {
      return <ButtonToFind history={history} />;
    }
    return <ButtonToRegister history={history} />;
  }

  return (
    <Row type="flex" justify="center">
      <Col xs={24}>
        <img src={renderImage} alt="" css={renderingImage} />
        <div css={renderingMessage}>
          <Title level={1}>
            10000명의 헬스친구들이
            <br />
            현재 당신을 기다리고 있어요
          </Title>
        </div>
        <ButtonHome />
        {/* 이 윗 부분을 더 축약해서 쓰는 법 없나?  */}
      </Col>
      {loginData.isLoggedIn === true && dataUsers ? (
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
