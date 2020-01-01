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
