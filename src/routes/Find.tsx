/** @jsx jsx */
// eslint-disable-next-line
import React from 'react';
import { Row, Col, Card } from 'antd';
import { css, jsx } from '@emotion/core';

import SearchSelect from '../components/SearchSelect';

const card = css`
  margin: 10px;
`;

const filterWrapper = css`
  margin: 10px;
  background-color: #7d97ad;
  display: table;
  table-layout: fixed;
  width: 50%;
`;

const filterSpecific = css`
  text-align: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: table-cell;
  color: white;
  text-decoration: none;
  font-size: 0.8 rem;
  &:hover {
    background-color: #485460;
    color: white;
  }
  &:active {
    background-color: #7d97ad;
  }
`;

function Find() {
  return (
    <div>
      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} md={24}>
          <div css={filterWrapper}>
            <span css={filterSpecific}>장소</span>
            <span css={filterSpecific}>요일</span>
            <span css={filterSpecific}>3대 중량</span>
            <span css={filterSpecific}>성별</span>
            <span css={filterSpecific}>운동 목적</span>
          </div>
        </Col>
        <Col xs={24} md={24}>
          <SearchSelect />
        </Col>

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
      </Row>
    </div>
  );
}

export default Find;
