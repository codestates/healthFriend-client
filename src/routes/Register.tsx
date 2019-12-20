// eslint-disable-next-line
import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ProgressBar from '../components/ProgressBar';
import RegisterImage from '../static/registerImage.jpg';
import message from '../config/message';
import RegisterInput from '../components/RegisterInput';

const wrapper = css`
  padding: 20px;
`;

const renderingImage = css`
  width: 100%;
  height: 300px;
  opacity: 80%;
  filter: grayscale(40%);
`;

const lowerContentWrapper = css`
  padding: 20px;
`;

const progressBar = css`
  padding: 10px;
  margin-bottom: 20px;
`;

function Register() {
  const [order, setOrder] = useState<number>(1);

  return (
    <div css={wrapper}>
      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} md={24}>
          <img src={RegisterImage} css={renderingImage} alt="" />
        </Col>
        <Col xs={24} md={16} css={lowerContentWrapper}>
          <div css={progressBar}>
            <ProgressBar order={order} />
          </div>

          <RegisterInput order={order} />

          <div>
            {order === 1 ? null : (
              <Button type="primary" onClick={() => setOrder(order - 1)}>
                이전
              </Button>
            )}
            &nbsp;
            <Button type="primary" onClick={() => setOrder(order + 1)}>
              다음
            </Button>
          </div>
        </Col>
        <Col xs={24} md={8} css={lowerContentWrapper}>
          <h3>헬스친구란</h3>
          <p>{message.introduction}</p>
          <br />

          <h3>친구를 찾는 방법</h3>
          <p>{message.howToFind}</p>
        </Col>

        {/* </div> */}
      </Row>
    </div>
  );
}

export default Register;
