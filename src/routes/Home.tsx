/** @jsx jsx */
import { Row, Col, Typography } from 'antd';
import { css, jsx } from '@emotion/core';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import cookie from 'js-cookie';

import renderImage from '../static/renderImage.jpg';
import { GET_USERS, IS_LOGGED_IN, GET_USERINFO } from '../graphql/queries';
import ButtonToFind from '../components/Home/ButtonToFind';
import ButtonToRegister from '../components/Home/ButtonToRegister';
import ButtonToSignup from '../components/Home/ButtonToSignup';
import IfLoginUSeeFriend from '../components/Shared/IfLoginUSeeFriend';
import UserCard from '../components/FindFriend/UserCard';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';

const { Title } = Typography;

const renderingImage = css`
  width: 100%;
  object-fit: cover;
  height: 100vh;
  filter: grayscale(20%);
`;

// 가운데로 옮기는 법
const renderingMessage = css`
  position: absolute;
  text-align: center;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  *.ant-typography {
    color: #fff;
  }
`;

// 어디는 history, match, location 다 써줘야 하고, 여긴 아니고 차이는??
type HomeProps = {
  history: any;
};

function Home({ history }: HomeProps) {
  const client = useApolloClient();
  // console.log('token 유무', cookie.get('access-token'));
  const { data: dataMe, error: errorMe } = useQuery(GET_USERINFO, {
    fetchPolicy: 'network-only',
    // errorPolicy: 'all',
  });
  const { data: dataUsers } = useQuery(GET_USERS, {
    // 'network-only', 굳이 중요한 data 아니므로 network-only 안 해줌. 아래 카드를 남길지, 아니면 다른 걸 보여주는게 좋을지도 좀 더 궁리. 이왕 보여줄거면 FindFriend 창처럼 필터해서 보여줘야 할듯.
  });
  const { data: loginData } = useQuery(IS_LOGGED_IN);

  // console.log('dataMe', dataMe);
  // console.log('errorMe', errorMe);
  // console.log('errorUsers', errorUsers);

  // 일단 어쩔수 없이 access-token을 이용했는데 이것보단 차라리 local useMutation을 날려서 로그아웃하면 local에서 me nickname같은걸 바꿔버리고, 그거 값이 이 값이면 로그아웃, 아니면 로그인 이런식으로 가보든가...
  // if (dataMe) {
  if (cookie.get('access-token')) {
    // 이거 대신에 if (dataMe)로 했을 때 token이 이미 지워진 상태임에도 불구하고, dataMe에 올바른 정보가 들어옴. network-only 옵션을 붙였는데도. errorMe는 undefined로 바뀌고, dataMe에 다시 올바른 정보가 생김. 그랬다가 안 그랬다가 하는듯. 지속적 문제는 딴 페이지에서 넘어올땐 되기도 하는데 Home 화면에서 로그아웃 눌렀을 땐 안 지워짐. token 확인하는 지금 방식일 때도 dataMe가 그대로 찍히는 이유 잘 모르겠음.
    client.writeData({ data: { isLoggedIn: true } });
  }

  // 일부러 로그아웃을 하지는 않았는데 token이 만료됐을 때

  if (dataMe) {
    console.log('dataMe', dataMe);
  }

  if (errorMe) {
    console.log('graphQLErrors is ....', errorMe.graphQLErrors);
  }

  if (
    loginData.isLoggedIn === true &&
    errorMe
    //  &&
    // errorMe.extensions.code === 'NO_TOKEN'
  ) {
    client.writeData({ data: { isLoggedIn: false } });
    return <ErrorLoginFirst error={errorMe} />;
  }
  // if (errorMe) return <p>{errorMe.message}</p>;

  function ButtonHome() {
    if (loginData.isLoggedIn === false) {
      return <ButtonToSignup />;
    }
    if (dataMe && dataMe.me.levelOf3Dae) {
      return <ButtonToFind history={history} />;
    }
    return <ButtonToRegister history={history} />;
  }

  return (
    <Row type="flex" justify="center">
      <Col xs={24}>
        <img src={renderImage} alt="" css={renderingImage} />
        <div css={renderingMessage}>
          <Title level={1}>
            10000명의 헬스친구들이
            <br />
            현재 당신을 기다리고 있어요
          </Title>
        </div>
        <ButtonHome />
      </Col>
      {loginData.isLoggedIn === true && dataUsers ? (
        <Col xs={20}>
          <Row type="flex" justify="center" style={{ marginTop: 20 }}>
            <Col xs={24}>
              <Row gutter={24}>
                {dataUsers.users.map((oneData) => (
                  <UserCard
                    id={oneData.id}
                    key={oneData.email}
                    nickname={oneData.nickname}
                    gender={oneData.gender}
                    openImageChoice={oneData.openImageChoice}
                    messageToFriend={oneData.messageToFriend}
                    motivations={oneData.motivations}
                    levelOf3Dae={oneData.levelOf3Dae}
                    weekdays={oneData.weekdays}
                    ableDistricts={oneData.ableDistricts}
                    type="unknown"
                    renewFriends={() => null}
                  />
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
      ) : (
        <IfLoginUSeeFriend />
      )}
    </Row>
  );
}

export default Home;
