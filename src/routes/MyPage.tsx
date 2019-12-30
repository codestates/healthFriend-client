// eslint-disable-next-line
import React from 'react';
import { Row, Col, Button } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import RegisterInput from '../components/Register/RegisterInput';
import { questionList } from '../config/fakeData';
import useRegister from '../hooks/Register';

const wrapper = css`
  margin: 20px;
`;

function MyPage() {
  const { setIntroduction, setTotalCheckArr, totalCheckArr } = useRegister();

  console.log(totalCheckArr);

  return (
    <div>
      <Button type="primary">
        <a
          href={
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:4000/graphql'
              : 'https://api.healthfriend.club/graphql'
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          graphql
        </a>
      </Button>
      <Row type="flex" justify="center">
        <Col xs={24}>
          <div css={wrapper}>
            {questionList.inputRegister.map((oneQ, idx) => (
              <RegisterInput
                key={oneQ.question}
                order={idx + 1}
                totalCheckArr={totalCheckArr}
                setTotalCheckArr={setTotalCheckArr}
                setIntroduction={setIntroduction}
              />
            ))}
            <Button type="primary">저장</Button>{' '}
            <Button type="primary">취소하고 홈으로</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MyPage;
