/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Typography, Row, Col } from 'antd';

const wrapper = css`
  width: 100%;
`;

const lineText = css`
  background: #e9e2d0;
  padding: 20px;
  opacity: 0.75;

  .ant-typography {
    color: black;
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

type MainButtonProps = {
  loginData: { isLoggedIn: boolean };
  dataMe: any;
  history: any;
};

function IfLoginUSeeFriend({ loginData }: MainButtonProps) {
  return (
    <Row type="flex" justify="center" css={wrapper}>
      <Col xs={24} css={lineText}>
        {loginData.isLoggedIn ? (
          <Typography.Title level={4}>
            친구를 찾아서 함께 운동해요!
          </Typography.Title>
        ) : (
          <Typography.Title level={4}>
            로그인하시면 당신을 기다리고 있는 친구들의 프로필을 볼 수 있습니다!
          </Typography.Title>
        )}
      </Col>

      <Col xs={24} md={12} css={subText}>
        <Typography.Title level={2}>헬스친구 사용법</Typography.Title>
        <Typography.Paragraph>
          1. 우측 상단의 로그인 버튼을 클릭하여 로그인을 합니다.
          <br />
          2. 등록하기 버튼이 나타나면 다른 친구들이 날 찾을 수 있도록 정보를
          입력합니다.
          <br />
          3. 친구찾기를 통해 대화 신청을 하고, 연결되면 대화 후 같이 운동을 하러
          갑니다.
        </Typography.Paragraph>
      </Col>
    </Row>
  );
}

export default IfLoginUSeeFriend;
