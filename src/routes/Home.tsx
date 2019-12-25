// eslint-disable-next-line
import React from 'react';
import { Row, Col, Card, Button, Typography } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import renderImage from '../static/renderImage.jpg';

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

// 버튼 사이즈 조절
const startButton = css`
  background: #2c3e50;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type HomeProps = {
  history: any;
};

function Home({ history }: HomeProps) {
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
        <Button
          type="primary"
          size="large"
          css={startButton}
          onClick={() => history.push('/register')}
        >
          바로 등록후 시작하기
        </Button>
      </Col>
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
    </Row>
  );
}

export default Home;
