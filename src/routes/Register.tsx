/** @jsx jsx */
import { Row, Col, Button, Result, Tooltip } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery } from '@apollo/react-hooks';

import ProgressBar from '../components/Register/ProgressBar';
import RegisterImage from '../static/registerImage.jpg';
import explanation from '../config/Message';
import RegisterInput from '../components/Register/RegisterInput';
import useRegister from '../hooks/Register/useRegister';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';
import Loading from '../components/Shared/Loading';
import useCheckToken from '../hooks/Shared/useCheckToken';
import { IS_LOGGED_IN } from '../graphql/queries';
import redirectWhenTokenExp from '../utils/redirectWhenTokenExp';
import useSubscript from '../hooks/Shared/useSubscript';
import useSubmitButton from '../hooks/Register/useSubmitButton';

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
  const { client, getInfo, dataUser, errorUser } = useCheckToken();

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
    // error,
    loading,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
    postInfo,
    setMotivation,
    setExerciseAbleDays,
    setAbleDistrict,
  } = useRegister(history, client);

  const { data: loginData } = useQuery(IS_LOGGED_IN);
  useSubscript(history);
  const { isNextButtonDisable } = useSubmitButton({
    dataUser,
    places,
    data,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
    postInfo,
    setMotivation,
    setExerciseAbleDays,
    setAbleDistrict,
    order,
    setOrder,
    questionList,
    setIntroduction,
    totalCheckArr,
  });

  // 에러의 원인이 token 기한만료 말고, 그외 다른 원인일수 있으므로 error handling 해줘야 함 .
  if (errorUser && loginData.isLoggedIn)
    redirectWhenTokenExp({ history, client });

  if (!loginData.isLoggedIn) return <ErrorLoginFirst error={null} />;

  // data가 다 있으면 redirection (어차피 header에서 안 보일텐데 굳이 치고 들어오는 경우... 로그인에서 다 걸림. )
  // if (data.me.levelOf3Dae && data.me.gender && data.me.ableDistricts) {
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
                <Tooltip
                  title={
                    isNextButtonDisable()
                      ? '하나라도 선택해야 넘어갈 수 있습니다'
                      : null
                  }
                >
                  <Button
                    type="primary"
                    onClick={getInfo as any}
                    // .then((data) => console.log('data is...', data)); then 붙이려니 typescript 문제 발생. mutation 함수는 promise return하는데 useLazyQuery랑 refetch는 promise return 아닌 듯.
                    // await 안 먹는 이유가 뭐지? promise return 하는 것 아니면 안 먹음.

                    disabled={isNextButtonDisable()}
                  >
                    {order === questionList.length ? '완료' : '다음'}
                  </Button>
                </Tooltip>
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
