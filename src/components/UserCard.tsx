// eslint-disable-next-line
import React from 'react';
/** @jsx jsx */
import { Row, Col, Card } from 'antd';
import { jsx, css } from '@emotion/core';

const margin = css`
  margin-bottom: 20px;
`;

type dataSourceProps = {
  nickname: string,
  levelOf3Dae: string,
  messageToFriend: string,
}

function UserCard({ nickname, levelOf3Dae, messageToFriend }: dataSourceProps) {
  return (
    <Col xs={20} md={8} css={margin}>
      <Card
        title={nickname}
        bordered
      >
        <p>{levelOf3Dae}</p>
        <p>{messageToFriend}</p>
      </Card>
    </Col>
  );
}

UserCard.defaultProps = {
  nickname: '',
  levelOf3Dae: '',
  messageToFriend: '',
};

export default UserCard;
