/** @jsx jsx */
import React from 'react';
import { Row, Col, Button, Result, Tooltip } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import RegisterInput from '../components/Register/RegisterInput';
import questionList from '../config/questions';
import useMypage from '../hooks/Mypage/useMypage';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';
import useCheckToken from '../hooks/Shared/useCheckToken';
import { IS_LOGGED_IN } from '../graphql/queries';
import useSubscript from '../hooks/Shared/useSubscript';
import useEditButton from '../hooks/Mypage/useEditButton';

const wrapper = css`
  margin: 20px;
`;

type MyPageProps = {
  history: any;
};

// 불필요하게 render가 여러번 되는 문제!!!
function MyPage({ history }: MyPageProps) {
  const { data: loginData } = useQuery(IS_LOGGED_IN);
  const { client, getInfo, dataUser, errorUser } = useCheckToken();
  const {
    setIntroduction,
    setPlaces,
    setTotalCheckArr,
    totalCheckArr,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
    postInfo,
    setMotivation,
    setExerciseAbleDays,
    setAbleDistrict,
    places,
    data,
    // error,
    complete,
    setComplete,
  } = useMypage(history, client);

  useSubscript(history);

  const { isEditButtonDisable } = useEditButton({
    errorUser,
    client,
    history,
    dataUser,
    postInfo,
    submitVariable,
    data,
    setMotivation,
    submitMotivation,
    totalCheckArr,
    places,
    setComplete,
    setAbleDistrict,
    submitExerciseDays,
    setExerciseAbleDays,
  });

  if (!loginData.isLoggedIn) return <ErrorLoginFirst error={null} />;

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
                    onClick={() => getInfo()}
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
