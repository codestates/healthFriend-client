/** @jsx jsx */
import React, { useState } from 'react';
import { Row, Col, Button, Result, Tooltip } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import RegisterInput from '../components/Register/RegisterInput';
import questionList from '../config/questions';
import useShowSelected from '../hooks/Mypage/useShowSelected';
import useLazyMe from '../hooks/Shared/useLazyMe';
import {
  IS_LOGGED_IN,
  // MUTATE_INFO,
  // SET_ABLE_DISTRICT,
  // SET_EXERCISE_ABLE_DAYS,
  // SET_MOTIVATION,
} from '../graphql/queries';
import useSubscript from '../hooks/Shared/useSubscript';
import useEditButton from '../hooks/Mypage/useEditButton';
import redirectWhenError from '../utils/redirectWhenError';
import Loading from '../components/Shared/Loading';

const wrapper = css`
  margin: 20px;
`;

type MyPageProps = {
  history: any;
};

// 불필요하게 render가 여러번 되는 문제!!!
function MyPage({ history }: MyPageProps) {
  const client = useApolloClient();

  const [complete, setComplete] = useState<boolean>(false);
  const { data: loginData } = useQuery(IS_LOGGED_IN);
  const { dataMe, errorMe, getMe } = useLazyMe();

  const {
    setTotalCheckArr,
    setIntroduction,
    setPlaces,
    totalCheckArr,
    data,
    error,
    loading,
    places,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
  } = useShowSelected();

  const { isEditButtonDisable } = useEditButton({
    dataMe,
    errorMe,
    history,
    totalCheckArr,
    setComplete,
    places,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
  });

  useSubscript(history);

  if (loading) return <Loading />;
  if (error) redirectWhenError({ history, client });

  if (!loginData.isLoggedIn) redirectWhenError({ history, client });

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
          graphql playground로 ㄱ
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
                {questionList.map((oneQ, idx) =>
                  oneQ.subject === 'gender' ? null : (
                    <React.Fragment key={oneQ.question}>
                      <RegisterInput
                        order={idx + 1}
                        totalCheckArr={totalCheckArr}
                        setTotalCheckArr={setTotalCheckArr}
                        setIntroduction={setIntroduction}
                        introduction={data.me.messageToFriend}
                        setPlaces={setPlaces}
                        selectedPlaces={data.me.ableDistricts.map(
                          (oneData) => oneData.district.idOfDong,
                        )}
                      />
                      <br />
                    </React.Fragment>
                  ),
                )}
                <Tooltip
                  title={
                    isEditButtonDisable()
                      ? '빠짐없이 적어야 저장가능합니다'
                      : null
                  }
                >
                  <Button
                    type="primary"
                    onClick={() => getMe()}
                    disabled={isEditButtonDisable()}
                  >
                    저장
                  </Button>
                </Tooltip>{' '}
                <Button
                  type="primary"
                  onClick={() => {
                    history.push('/');
                    window.scrollTo(0, 0);
                  }}
                >
                  취소하고 홈으로
                </Button>
              </React.Fragment>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MyPage;
