/** @jsx jsx */
import { useEffect } from 'react';
import { Row, Col, Button, Result } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import { Redirect } from 'react-router-dom';
import ProgressBar from '../components/Register/ProgressBar';
import RegisterImage from '../static/registerImage.jpg';
import explanation from '../config/Message';
import RegisterInput from '../components/Register/RegisterInput';
import useRegister from '../hooks/useRegister';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';
import Loading from '../components/Shared/Loading';
import useCheckToken from '../utils/useCheckToken';
import { IS_LOGGED_IN } from '../graphql/queries';

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
    introduction,
    setIntroduction,
    places,
    setPlaces,
    setTotalCheckArr,
    totalCheckArr,
    questionList,
    order,
    data,
    error,
    loading,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
    postInfo,
    setMotivation,
    setExerciseAbleDays,
    setAbleDistrict,
  } = useRegister();

  const { client, getInfo, dataUser, errorUser } = useCheckToken();
  const { data: loginData } = useQuery(IS_LOGGED_IN);

  useEffect(() => {
    if (dataUser) {
      if (order === questionList.length) {
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
        setIntroduction('');
      }
      setOrder(order + 1);
    }
    // eslint-disable-next-line
  }, [dataUser]);

  if (errorUser) {
    client.writeData({ data: { isLoggedIn: false } });
    alert('로그인 기한 만료로 저장 실패');
    return <Redirect to="/" />;
    // history.push('/');
  }

  if (data) {
    client.writeData({ data: { isLoggedIn: true } });
    // 이게 동기로 일어나는 줄 알았는데 비동기인듯. 잠깐 아래 if 문으로 들어갔다가 나옴.
  }

  if (!loading && loginData.isLoggedIn === false) {
    return <ErrorLoginFirst error={error} />;
  }

  if (error) {
    client.writeData({ data: { isLoggedIn: false } });
    return <ErrorLoginFirst error={error} />;
  }

  // if (data.me.levelOf3Dae && data.me.messageToFriend) {
  //   return <Redirect to="/" />;
  // }
  return (
    <Row type="flex" justify="center">
      <Col xs={24} md={24}>
        <img src={RegisterImage} css={renderingImage} alt="" />
      </Col>
      {loading ? (
        <Loading />
      ) : (
        <Col xs={24} md={12} css={lowerContentWrapper}>
          {order === questionList.length + 1 ? (
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
                introduction={introduction}
                setIntroduction={setIntroduction}
                setPlaces={setPlaces}
                selectedPlaces={[]}
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
                    getInfo();
                    // await 안 먹는 이유가 뭐지?
                  }}
                  // disabled={!totalCheckArr[order - 1].some((elm) => elm === true)}... place에 대해서도 체크가 돼야 함.
                >
                  {order === questionList.length ? '완료' : '다음'}
                </Button>
              </div>
            </div>
          )}
        </Col>
      )}
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
