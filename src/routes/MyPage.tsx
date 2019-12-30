// eslint-disable-next-line
import React, { useState } from 'react';
import { Row, Col, Button, Result } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import RegisterInput from '../components/Register/RegisterInput';
import { questionList } from '../config/fakeData';
import useRegister from '../hooks/Register';

const wrapper = css`
  margin: 20px;
`;

type MyPageProps = {
  history: any;
};

function MyPage({ history }: MyPageProps) {
  const {
    setIntroduction,
    setTotalCheckArr,
    totalCheckArr,
    submitVariable,
    postInfo,
    data,
  } = useRegister();

  const [complete, setComplete] = useState<boolean>(false);

  console.log(submitVariable);

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
          graphql playground로 ㄱㄱ
        </a>
      </Button>
      <Row type="flex" justify="center">
        <Col xs={12}>
          <div css={wrapper}>
            {complete === true ? (
              <Result
                status="success"
                title="축하합니다. 정보 수정이 완료되었습니다."
                extra={[
                  <Button
                    type="primary"
                    key="home"
                    onClick={() => {
                      history.push('/');
                      setComplete(false);
                    }}
                  >
                    홈으로
                  </Button>,
                  <Button
                    key="find"
                    onClick={() => {
                      history.push('/find');
                      setComplete(false);
                    }}
                  >
                    친구 찾기로
                  </Button>,
                ]}
              />
            ) : (
              <React.Fragment>
                {questionList.inputRegister.map((oneQ, idx) => (
                  <RegisterInput
                    key={oneQ.question}
                    order={idx + 1}
                    totalCheckArr={totalCheckArr}
                    setTotalCheckArr={setTotalCheckArr}
                    setIntroduction={setIntroduction}
                  />
                ))}
                <Button
                  type="primary"
                  onClick={() => {
                    postInfo({
                      variables: {
                        ...submitVariable,
                        nickname: data.me.nickname,
                      },
                    });
                    setComplete(true);
                  }}
                >
                  저장
                </Button>{' '}
                <Button type="primary">취소하고 홈으로</Button>
              </React.Fragment>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MyPage;
