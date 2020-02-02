/** @jsx jsx */
import React, { useState } from 'react';
import { Row, Col, Button, Result, Tooltip } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import InfoInput from '../components/Shared/InfoInput';
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
    dataI,
    errorI,
    loadingI,
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

  if (loadingI) return <Loading />;
  if (errorI) redirectWhenError({ history, client });

  if (!loginData.isLoggedIn) redirectWhenError({ history, client });

  return (
    <div>
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
                      <InfoInput
                        order={idx + 1}
                        totalCheckArr={totalCheckArr}
                        setTotalCheckArr={setTotalCheckArr}
                        setIntroduction={setIntroduction}
                        introduction={dataI.me.messageToFriend}
                        setPlaces={setPlaces}
                        selectedPlaces={dataI.me.ableDistricts.map(
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
