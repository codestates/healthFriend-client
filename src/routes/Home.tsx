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

// 여기 type 더 명확하게
type HomeProps = {
  history: any;
  error: any;
  data: any;
};

function ButtonHome({ history, error, data }: HomeProps) {
  if (error !== undefined) {
    return <ButtonToSignup />;
  }
  if (data && data.me.levelOf3Dae) {
    return <ButtonToFind history={history} />;
  }
  return <ButtonToRegister history={history} />;
}

function Home({ history }: HomeProps) {
  const client = useApolloClient();
  const { data: dataUser, error: errorUser, loading: loadingUser } = useQuery(
    GET_USERINFO,
    {
      fetchPolicy: 'network-only',
    },
  );
  const { data: dataUsers } = useQuery(GET_USERS, {
    fetchPolicy: 'network-only',
  });
  const { data: loginData } = useQuery(IS_LOGGED_IN);

  if (!loadingUser && !dataUser && loginData.isLoggedIn === true) {
    client.writeData({ data: { isLoggedIn: false } });
    return <ErrorLoginFirst error={errorUser} />;
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
        <ButtonHome history={history} error={errorUser} data={dataUser} />
        {/* 이 윗 부분을 더 축약해서 쓰는 법 없나?  */}
      </Col>
      {dataUsers && loginData.isLoggedIn === true ? (
        <Col xs={20}>
          <Row type="flex" justify="center" style={{ marginTop: 20 }}>
            <Col xs={20} md={20}>
              <Row gutter={24} type="flex" justify="space-between">
                {dataUsers.users.map((oneData) => (
                  <UserCard
                    key={oneData.email}
                    nickname={oneData.nickname}
                    openImageChoice={oneData.openImageChoice}
                    messageToFriend={oneData.messageToFriend}
                    motivations={oneData.motivations}
                    levelOf3Dae={oneData.levelOf3Dae}
                    weekdays={oneData.weekdays}
                    ableDistricts={oneData.ableDistricts}
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
