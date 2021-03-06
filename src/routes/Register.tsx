/** @jsx jsx */
import { Row, Col, Button, Result, Tooltip } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import ProgressBar from '../components/Register/ProgressBar';
import RegisterImage from '../static/registerImage.jpg';
import explanation from '../config/Message';
import InfoInput from '../components/Shared/InfoInput/InfoInput';
import useProcessSelected from '../hooks/Register/useProcessSelected';
import useLazyMe from '../hooks/Shared/useLazyMe';
import {
  IS_LOGGED_IN,
  MUTATE_INFO,
  SET_MOTIVATION,
  SET_EXERCISE_ABLE_DAYS,
  SET_ABLE_DISTRICT,
} from '../graphql/queries';
import redirectWhenError from '../utils/Shared/redirectWhenError';
import useSubscript from '../hooks/Shared/useSubscript';
import useSubmitButton from '../hooks/Register/useSubmitButton';
import questionList from '../config/questions';

const renderingImage = css`
  width: 100%;
  height: 140px;
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
const nextButtonCss = css`
  background: #ed9364;
  border-color: #ed9364;
  color: black;
  &:hover {
    background-color: #ffbe76;
    border-color: #ffbe76;
    color: black;
  }
  &:focus {
    background-color: #ed9364;
    border-color: #ed9364;
    color: black;
  }
`;
const rtSideWrapper = css`
  margin-top: 60px;
  margin-left: 30px;
`;
const explanationWrapper = css`
  text-align: justify;
  word-break: keep-all;
  width: 300px;
`;

type RegisterProps = {
  history: any;
};

function Register({ history }: RegisterProps) {
  const client = useApolloClient();
  const { getMe, dataMe, errorMe } = useLazyMe();
  const { data: loginData } = useQuery(IS_LOGGED_IN);

  const [postInfo] = useMutation(MUTATE_INFO);
  const [setMotivation] = useMutation(SET_MOTIVATION);
  const [setExerciseAbleDays] = useMutation(SET_EXERCISE_ABLE_DAYS);
  const [setAbleDistrict] = useMutation(SET_ABLE_DISTRICT);
  // mutation시 error도 콜백으로 만들어줘야 함. onError, onComplete 등이 있는듯.

  const {
    order,
    setOrder,
    introduction,
    setIntroduction,
    places,
    setPlaces,
    totalCheckArr,
    setTotalCheckArr,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
  } = useProcessSelected();

  const { isNextButtonDisable } = useSubmitButton({
    dataMe,
    postInfo,
    setMotivation,
    setExerciseAbleDays,
    setAbleDistrict,
    places,
    order,
    setOrder,
    setIntroduction,
    totalCheckArr,
    submitVariable,
    submitMotivation,
    submitExerciseDays,
  });

  useSubscript(history);

  // 에러의 원인이 token 기한만료 말고, 그외 다른 원인일수 있으므로 error handling 해줘야 함 .
  if ((errorMe && loginData.isLoggedIn) || !loginData.isLoggedIn)
    redirectWhenError({ history, client });

  return (
    <div style={{ height: '81vh' }}>
      <Row type="flex" justify="center">
        <Col xs={24} md={24}>
          <img src={RegisterImage} css={renderingImage} alt="" />
        </Col>
        <Col xs={24} md={12} css={lowerContentWrapper}>
          {order === questionList.length + 1 ? (
            <Result
              status="success"
              title="축하합니다. 정보 입력이 완료되었습니다."
              extra={[
                <Button
                  key="home"
                  onClick={() => history.push('/')}
                  css={nextButtonCss}
                >
                  홈으로
                </Button>,
                <Button
                  key="find"
                  css={nextButtonCss}
                  onClick={() => history.push('/find')}
                >
                  친구 찾기로
                </Button>,
              ]}
            />
          ) : (
            <div>
              <div css={progressBar}>
                <ProgressBar order={order} />
              </div>

              <InfoInput
                order={order}
                totalCheckArr={totalCheckArr}
                setTotalCheckArr={setTotalCheckArr}
                introduction={introduction}
                setIntroduction={setIntroduction}
                setPlaces={setPlaces}
                // selectedPlaces={[]}
                selectedPlaces={places}
              />

              <div>
                {order === 1 ? null : (
                  <Button
                    onClick={() => {
                      setOrder(order - 1);
                    }}
                    css={nextButtonCss}
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
                    onClick={getMe as any}
                    // .then((data) => console.log('data is...', data)); then 붙이려니 typescript 문제 발생. mutation 함수는 promise return하는데 useLazyQuery랑 refetch는 promise return 아닌 듯.
                    // await 안 먹는 이유가 뭐지? promise return 하는 것 아니면 안 먹음.
                    disabled={isNextButtonDisable()}
                    css={nextButtonCss}
                  >
                    {order === questionList.length ? '완료' : '다음'}
                  </Button>
                </Tooltip>
              </div>
            </div>
          )}
        </Col>
        <Col xs={24} md={6} css={lowerContentWrapper}>
          <div css={rtSideWrapper}>
            <h3>헬스친구란</h3>
            <div css={explanationWrapper}>{explanation.introduction}</div>
            <br />
            <br />

            <h3>친구를 찾는 방법</h3>
            <div css={explanationWrapper}>{explanation.howToFind}</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
