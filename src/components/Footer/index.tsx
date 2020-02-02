/** @jsx jsx */
import { Layout } from 'antd';
import { css, jsx } from '@emotion/core';

const copyright = css`
  font-size: 16px;
  text-align: center;
  vertical-align: middle;
`;

// bottom: 0;
// position: absolute;

const footerStyle = css`
  margin-top: 10px;
  width: 100%;
`;

export default function Footer() {
  return (
    <Layout.Footer css={footerStyle}>
      <p css={copyright}> &copy; HealthFriend.club </p>
    </Layout.Footer>
  );
}
