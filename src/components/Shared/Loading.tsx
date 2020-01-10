/** @jsx jsx */
import { Spin, Icon, Row, Col } from 'antd';
import { jsx, css } from '@emotion/core';

const loading = css`
  font-size: 6rem;
`;

function Loading() {
  const loadingIcon = <Icon type="loading" css={loading} spin />;
  return (
    <Row type="flex" justify="center">
      <Col xs={3}>
        <Spin indicator={loadingIcon} />
      </Col>
    </Row>
  );
}

export default Loading;

// 이걸 투명도랑 절대 좌표를 줘서 내용이랑 같이 병용해서 보이게 만들기?? 아님 모달 느낌으로 주변에 투명도 주기??
