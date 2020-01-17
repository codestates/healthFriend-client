/** @jsx jsx */
import React, { useEffect } from 'react';
import { Row, Col, Button, Result } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import RegisterInput from '../components/Register/RegisterInput';
import questionList from '../config/questions';
import useMypage from '../hooks/useMypage';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';
import useCheckToken from '../hooks/useCheckToken';
import { IS_LOGGED_IN } from '../graphql/queries';
import redirectWhenTokenExp from '../utils/redirectWhenTokenExp';
import useSubscript from '../hooks/useSubscript';

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

  useEffect(() => {
    // 왜 dataUser와 errorUser가 둘다 동시에 값을 가지고 있을 수 있는지 모르겠음.
    // 더하여 그 grphaql 에러의 빨간 화면 뜨는 건 어느 상황에서 발생하는건지.
    if (errorUser) {
      redirectWhenTokenExp(client, history);
    } else if (dataUser) {
      postInfo({
        variables: {
          ...submitVariable,
          nickname: data.me.nickname,
        },
      });
      setMotivation({
        variables: submitMotivation,
      });
      setExerciseAbleDays({
        variables: submitExerciseDays,
      });
      setAbleDistrict({
        variables: { dongIds: places },
      });
      setComplete(true);
    }
    // eslint-disable-next-line
  }, [dataUser, errorUser]);

  if (!loginData.isLoggedIn) return <ErrorLoginFirst error={null} />;

  const isNextButtonDisable = () => {
    if (places.length === 0) {
      return true;
    }
    if (
      totalCheckArr
        .filter((oneQ) => oneQ.length > 0)
        .filter((elm) => elm.every((ele) => ele === false)).length === 0
    ) {
      return false;
    }
    return true;
  };

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
                <Button
                  type="primary"
                  onClick={() => getInfo()}
                  disabled={isNextButtonDisable()}
                >
                  저장
                </Button>{' '}
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
