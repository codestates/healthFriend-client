import React from 'react';
import { Row, Col, Card } from 'antd';

function Home() {
  return (
    <div>
      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} md={24}>
          헬친 랜더 헬스 사진
        </Col>

        <Col xs={24} md={8}>
          <Card title="Card title" bordered style={{ width: 300 }}>
            <p>유저 1 카드</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Card title" bordered style={{ width: 300 }}>
            <p>유저 2 카드</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Card title" bordered style={{ width: 300 }}>
            <p>유저 3 카드</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
