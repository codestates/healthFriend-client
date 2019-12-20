// eslint-disable-next-line
import React from 'react';
import { Row, Col, Radio, Button } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ProgressBar from '../components/ProgressBar';
import RegisterImage from '../static/registerImage.jpg';
import message from '../config/message';

const wrapper = css`
  padding: 20px;
`;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const renderingImage = css`
  width: 100%;
  height: 80%;
  opacity: 80%;
  filter: grayscale(40%);
`;

const lowerContentWrapper = css`
  padding: 10px;
`;

const progressBar = css`
  padding: 10px;
  margin-bottom: 20px;
`;

function Register() {
  return (
    <div css={wrapper}>
      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} md={24}>
          <img src={RegisterImage} css={renderingImage} alt="" />
        </Col>
        <Col xs={24} md={16} css={lowerContentWrapper}>
          <div css={progressBar}>
            <ProgressBar />
          </div>

          <h2>헬스 친구를 찾는 이유는?</h2>
          <Radio.Group>
            <Radio style={radioStyle} value={1}>
              중량 강화
            </Radio>
            <Radio style={radioStyle} value={2}>
              재밌게 운동하고 싶어서
            </Radio>
            <Radio style={radioStyle} value={3}>
              친구 찾기
            </Radio>
            <Radio style={radioStyle} value={4}>
              의지 부족을 이겨내고 싶어서
            </Radio>
          </Radio.Group>
          <div>
            <Button type="primary">이전</Button>
            &nbsp;
            <Button type="primary">다음</Button>
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
