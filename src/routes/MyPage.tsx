/** @jsx jsx */
import React, { useEffect } from 'react';
import { Row, Col, Button, Result } from 'antd';
import { css, jsx } from '@emotion/core';
import { Redirect } from 'react-router-dom';

import RegisterInput from '../components/Register/RegisterInput';
import questionList from '../config/fakeData';
import useMypage from '../hooks/useMypage';
import Loading from '../components/Shared/Loading';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';
import useCheckToken from '../utils/useCheckToken';

const wrapper = css`
  margin: 20px;
`;

type MyPageProps = {
  history: any;
};

// 불필요하게 render가 여러번 되는 문제
function MyPage({ history }: MyPageProps) {
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
    error,
    loading,
    complete,
    setComplete,
  } = useMypage();

  const { client, getInfo, dataUser, errorUser } = useCheckToken();

  useEffect(() => {
    if (dataUser) {
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
  }, [dataUser]);
  if (errorUser) {
    client.writeData({ data: { isLoggedIn: false } });
    alert('로그인 기한 만료로 저장 실패');
    return <Redirect to="/" />;
  }
  if (data) {
    client.writeData({ data: { isLoggedIn: true } });
  }
  if (loading) return <Loading />;
  if (error) {
    client.writeData({ data: { isLoggedIn: false } });
    return <ErrorLoginFirst error={error} />;
  }

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
                <Button type="primary" onClick={() => getInfo()}>
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
