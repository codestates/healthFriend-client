/** @jsx jsx */
// eslint-disable-next-line
import React from 'react';
import { Row, Col, Button, Result } from 'antd';
import { css, jsx } from '@emotion/core';

import ProgressBar from '../components/Register/ProgressBar';
import RegisterImage from '../static/registerImage.jpg';
import explanation from '../config/Message';
import RegisterInput from '../components/Register/RegisterInput';
import useRegister from '../hooks/useRegister';

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
  const {
    setOrder,
    setIntroduction,
    setTotalCheckArr,
    totalCheckArr,
    questions,
    order,
    data,
    submitVariable,
    postInfo,
  } = useRegister();

  return (
    <Row type="flex" justify="center">
      <Col xs={24} md={24}>
        <img src={RegisterImage} css={renderingImage} alt="" />
      </Col>
      <Col xs={24} md={12} css={lowerContentWrapper}>
        {order === questions.length + 1 ? (
          <Result
            status="success"
            title="축하합니다. 정보 입력이 완료되었습니다."
            extra={[
              <Button
                type="primary"
                key="home"
                onClick={() => history.push('/')}
              >
                홈으로
              </Button>,
              <Button key="find" onClick={() => history.push('/find')}>
                친구 찾기로
              </Button>,
            ]}
          />
        ) : (
          <div>
            <div css={progressBar}>
              <ProgressBar order={order} />
            </div>

            <RegisterInput
              order={order}
              totalCheckArr={totalCheckArr}
              setTotalCheckArr={setTotalCheckArr}
              setIntroduction={setIntroduction}
            />

            <div>
              {order === 1 ? null : (
                <Button
                  type="primary"
                  onClick={() => {
                    setOrder(order - 1);
                  }}
                >
                  이전
                </Button>
              )}
              &nbsp;
              <Button
                type="primary"
                onClick={() => {
                  if (order === questions.length) {
                    postInfo({
                      variables: {
                        ...submitVariable,
                        nickname: data.me.nickname,
                      },
                    });
                  }
                  setOrder(order + 1);
                  setIntroduction('');
                }}
                // disabled={!totalCheckArr[order - 1].some((elm) => elm === true)}
              >
                {order === questions.length ? '완료' : '다음'}
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
