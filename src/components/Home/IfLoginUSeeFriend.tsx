/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Typography, Row, Col } from 'antd';
// import Login from '../../routes/Login';

const wrapper = css`
  width: 100%;
`;

const lineText = css`
  background: #1e272e;
  padding: 20px;
  opacity: 0.75;

  .ant-typography {
    color: #fff;
    margin: 0;
    text-align: center;
  }
`;

const subText = css`
  margin-top: 40px;
  margin-bottom: 60px;

  div.ant-typography {
    font-size: 1.2em;
    line-height: 2;
  }
`;

function IfLoginUSeeFriend() {
  // 여기다가 가짜 프로필 사진같은 것 몇개 넣어서 보여주기??
  return (
    <Row type="flex" justify="center" css={wrapper}>
      <Col xs={24} css={lineText}>
        <Typography.Title level={4}>
          로그인하시면 당신을 기다리고 있는 헬스친구들의 프로필을 볼 수 있습니다!
        </Typography.Title>
      </Col>

      <Col xs={24} md={12} css={subText}>
        <Typography.Title level={2}>헬스친구 사용법</Typography.Title>
        <Typography.Paragraph>
          1. 우측 상단의 로그인 버튼을 통해 회원가입 겸 로그인을 합니다.<br />
          2. 등록하기 버튼이 나타나면 헬스친구가 날 찾을 수 있도록 정보를 입력합니다.<br />
          3. 친구찾기를 통해 대화 신청을 하고, 연결되면 대화 후 같이 운동을 하러 갑니다.
        </Typography.Paragraph>
      </Col>
    </Row>
  );
}

export default IfLoginUSeeFriend;
