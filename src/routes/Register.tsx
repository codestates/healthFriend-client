// eslint-disable-next-line
import React from 'react';
import { Row, Col, Radio, Button } from 'antd';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ProgressBar from '../components/ProgressBar';

const wrapper = css`
  padding: 20px;
`;

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

function Register() {
  return (
    <div css={wrapper}>
      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} md={16}>
          등록 캐로셀
          <ProgressBar />
          <h2>헬스 친구를 찾는 이유는?</h2>
          <Radio.Group>
            <Radio style={radioStyle} value={1}>
              중량 강화
            </Radio>
            <Radio style={radioStyle} value={2}>
              재밌게 운동하고 싶어서
            </Radio>
            <Radio style={radioStyle} value={3}>
              친구 찾기
            </Radio>
            <Radio style={radioStyle} value={4}>
              의지 부족을 이겨내고 싶어서
            </Radio>
          </Radio.Group>
          <div>
            <Button type="primary">이전</Button>
            &nbsp;
            <Button type="primary">다음</Button>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <h3>헬스친구란</h3>
          <p>
            헬스 친구는 같이 헬스하는 친구를 말합니다. 운동을 하겠다고 결심을
            했다가 작심삼일로 끝나거나, 아무리 끙끙대며 해도 중량이 늘지 않거나,
            일 마치고 지쳐서 헬스가기 싫어서 집에서 그냥 쉰날... 그럴 때
            필요한게 뭘까요? 바로 헬스 친구입니다. 헬스친구가 있다면 운동을 더
            재밌게 하면서, 더 좋아진 몸과 건강도 챙기고, 친구까지 만들 수
            있습니다
          </p>
          <br />

          <h3>친구를 찾는 방법</h3>
          <p>
            내가 등록한 프로필 정보가 곧 친구가 나를 찾을 수 있게 되는 정보가
            됩니다. 운동을 아무나와 같이 할 수는 없습니다. 원하는 경력, 실력,
            위치, 날짜, 성별까지 모두 다 맞추기는 쉽지 않습니다. 헬스 친구가
            나를 잘 찾을 수 있도록, 나에 대한 정보를 잘 입력해주시고, 친구
            찾기를 통해서 헬스 친구를 찾아보세요!
          </p>
        </Col>

        {/* </div> */}
      </Row>
    </div>
  );
}

export default Register;
