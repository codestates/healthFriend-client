// eslint-disable-next-line
import React from 'react';
import { Row, Col, Card, Button } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import renderImage from '../static/renderImage.png';

const renderingImage = css`
  opacity: 80%;
  width: 100%;
`;

// 가운데로 옮기는 법
const renderingMessage = css`
  position: absolute;
  text-align: center;
  top: 40%;
  font: 2rem solid black;
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
`;

function Home() {
  return (
    <div>
      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} md={24}>
          <img src={renderImage} alt="" css={renderingImage} />
          <div css={renderingMessage}>
            10000명의 헬스친구들이 현재 당신을 기다리고 있어요
          </div>
          <Button type="primary" css={startButton}>
            시작하기
          </Button>
        </Col>
        {/* <div css={wrapper}> */}
        <Col xs={24} md={8}>
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
        <Col xs={24} md={8}>
          <Card title="양원석" bordered css={card}>
            <p>3대 200kg</p>
            <p>친구 만들기 위해</p>
            <p>같이 해요</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="이수호" bordered css={card}>
            <p>3대 300kg</p>
            <p>다이어트 하기 위해</p>
            <p>목숨 걸고 합니다</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="하수빈" bordered css={card}>
            <p>3대 500kg</p>
            <p>언더아머 단속 전문</p>
            <p>언더아머 입고오지 마세요</p>
          </Card>
        </Col>
        {/* </div> */}
      </Row>
    </div>
  );
}

export default Home;
