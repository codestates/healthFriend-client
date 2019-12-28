// eslint-disable-next-line
import React from 'react';
/** @jsx jsx */
import { Row, Col, Card } from 'antd';
import { jsx, css } from '@emotion/core';

const margin = css`
  margin-bottom: 20px;
`;

function ShowFriendList({ dataSource }) {

  return (
    <Row gutter={24} type="flex" justify="space-between">
      {dataSource.map(data => (
        <Col xs={20} md={8} css={margin}>
            <Card
              title={data.name}
              bordered
            >
              <p>{data.samDae}</p>
              <p>{data.purpose}</p>
              <p>{data.comment}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ShowFriendList;
