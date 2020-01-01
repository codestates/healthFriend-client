/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Login from '../../routes/Login';

const wrapper = css`
  padding: 30px;
`;

function IfLoginUSeeFriend() {
  // 여기다가 가짜 프로필 사진같은 것 몇개 넣어서 보여주기??
  return (
    <div css={wrapper}>
      로그인을 하시면 <br />
      기다리고 있는 헬스 친구들의 프로필을 볼 수 있습니다!!
      <br />
      <br />
      <Login />
      <br />
      <br />
      <h2>헬스친구 사용법</h2>
      1. 우측 상단의 로그인 버튼을 통해 회원가입 겸 로그인을 합니다. <br />
      2. 등록하기 버튼이 나타나면 헬스 친구가 날 찾을 수 있도록 정보를
      입력합니다. <br />
      3. 친구 찾기를 통해 대화 신청을 하고, 연결되면 대화 후 같이 운동을 하러
      갑니다.
    </div>
  );
}

export default IfLoginUSeeFriend;
