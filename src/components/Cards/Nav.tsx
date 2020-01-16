import React from 'react';
import { Col, Button } from 'antd';

type NavProps = {
  history: any;
};

export default function Nav({ history }: NavProps) {
  return (
    <>
      <Col xs={24} md={5}>
        <Button
          type="primary"
          onClick={() => {
            history.push('/cards/friends');
          }}
        >
          헬스 친구
        </Button>
      </Col>
      <Col xs={24} md={5}>
        <Button
          type="primary"
          onClick={() => {
            history.push('/cards/following');
          }}
        >
          보낸 요청
        </Button>
      </Col>
      <Col xs={24} md={5}>
        <Button
          type="primary"
          onClick={() => {
            history.push('/cards/followers');
          }}
        >
          받은 요청
        </Button>
      </Col>
      <Col xs={24} md={5}>
        <Button
          type="primary"
          onClick={() => {
            history.push('/cards/chat');
          }}
        >
          채팅창
        </Button>
      </Col>
    </>
  );
}
