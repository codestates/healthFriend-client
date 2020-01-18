/** @jsx jsx */
import { Row, Col, Typography } from 'antd';
import { css, jsx } from '@emotion/core';

import renderImage from '../static/renderImage.jpg';
import IfLoginUSeeFriend from '../components/Home/IfLoginUSeeFriend';
import UserCard from '../components/FindFriend/UserCard';
import MainButton from '../components/Home/MainButton';
import useHome from '../hooks/Home/useHome';

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
  const { dataUsers, loginData, dataMe }: any = useHome({ history });

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
        <MainButton {...{ dataMe, history, loginData }} />
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
                    setChatFriend={() => null}
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
