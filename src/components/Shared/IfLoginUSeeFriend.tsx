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
    </div>
  );
}

export default IfLoginUSeeFriend;
