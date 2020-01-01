/** @jsx jsx */
import { Row, Col, Card, Typography } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import renderImage from '../static/renderImage.jpg';
import { GET_USERINFO } from '../graphql/queries';

import ButtonToFind from '../components/Home/ButtonToFind';
import ButtonToRegister from '../components/Home/ButtonToRegister';
import ButtonToSignup from '../components/Home/ButtonToSignup';
import IfLoginUSeeFriend from '../components/Shared/IfLoginUSeeFriend';

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

// background color 조절 ... 이모션으로 가능?
const card = css`
  margin: 10px;
`;

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
  const { data, error } = useQuery(GET_USERINFO);
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
        <ButtonHome history={history} error={error} data={data} />
        {/* 이 윗 부분을 더 축약해서 쓰는 법 없나?  */}
      </Col>
      {data ? (
        <Col xs={20}>
          <Row gutter={24} type="flex" justify="space-between">
            <Col xs={20} md={8}>
              <Card
                title="권용규"
                bordered
                css={card}
                headStyle={{ backgroundColor: '#95a5a6' }}
                bodyStyle={{ backgroundColor: '#ecf0f1' }}
              >
                <p>3대 100kg</p>
                <p>증량이 목표</p>
                <p>반갑습니다</p>
              </Card>
            </Col>
            <Col xs={20} md={8}>
              <Card title="양원석" bordered css={card}>
                <p>3대 200kg</p>
                <p>친구 만들기 위해</p>
                <p>같이 해요</p>
              </Card>
            </Col>
            <Col xs={20} md={8}>
              <Card title="이수호" bordered css={card}>
                <p>3대 300kg</p>
                <p>다이어트 하기 위해</p>
                <p>목숨 걸고 합니다</p>
              </Card>
            </Col>
            <Col xs={20} md={8}>
              <Card title="하수빈" bordered css={card}>
                <p>3대 500kg</p>
                <p>언더아머 단속 전문</p>
                <p>언더아머 입고오지 마세요</p>
              </Card>
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
