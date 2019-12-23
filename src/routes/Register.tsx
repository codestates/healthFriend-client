// eslint-disable-next-line
import React, { useState, Fragment } from 'react';
import { Row, Col, Button } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import ProgressBar from '../components/ProgressBar';
import RegisterImage from '../static/registerImage.jpg';
import explanation from '../config/message';
import fakeData from '../config/fakeData';
import RegisterInput from '../components/RegisterInput';

const renderingImage = css`
  width: 100%;
  height: 300px;
  opacity: 100%;
  filter: grayscale(20%);
  object-fit: cover;
`;

const lowerContentWrapper = css`
  padding: 20px;
`;

const progressBar = css`
  padding: 10px;
  margin-bottom: 20px;
`;

type RegisterProps = {
  history: any;
};

function Register({ history }: RegisterProps) {
  const [order, setOrder] = useState<number>(1);

  const currentInput = fakeData.inputRegister.filter(
    (elm) => elm.number === order,
  );
  const { answer } = currentInput[0];
  const [checkArr, setCheckArr] = useState(answer.map(() => false));

  return (
    <Row type="flex" justify="center">
      <Col xs={24} md={24}>
        <img src={RegisterImage} css={renderingImage} alt="" />
      </Col>
      <Col xs={24} md={12} css={lowerContentWrapper}>
        {order === fakeData.inputRegister.length + 1 ? (
          <div>
            축하합니다. 정보 입력이 완료되었습니다.
            <button type="button" onClick={() => history.push('/')}>
              홈으로
            </button>
          </div>
        ) : (
          <div>
            <div css={progressBar}>
              <ProgressBar order={order} />
            </div>

            <RegisterInput
              order={order}
              checkArr={checkArr}
              setCheckArr={setCheckArr}
            />

            <div>
              {order === 1 ? null : (
                <Button
                  type="primary"
                  onClick={() => {
                    setOrder(order - 1);
                    setCheckArr(answer.map(() => false));
                  }}
                >
                  이전
                </Button>
              )}
              &nbsp;
              <Button
                type="primary"
                onClick={() => {
                  setOrder(order + 1);
                  setCheckArr(answer.map(() => false));
                }}
              >
                {order === fakeData.inputRegister.length ? '완료' : '다음'}
              </Button>
            </div>
          </div>
        )}
      </Col>
      <Col xs={24} md={6} css={lowerContentWrapper}>
        <h3>헬스친구란</h3>
        <p>{explanation.introduction}</p>
        <br />

        <h3>친구를 찾는 방법</h3>
        <p>{explanation.howToFind}</p>
      </Col>
    </Row>
  );
}

export default Register;
