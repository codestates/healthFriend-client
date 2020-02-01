/** @jsx jsx */
import { Layout } from 'antd';
import { css, jsx } from '@emotion/core';

const copyright = css`
  font-size: 16px;
  text-align: center;
  vertical-align: middle;
`;

const footerStyle = css`
  margin-top: 10px;
`;

export default function Footer() {
  return (
    <Layout.Footer css={footerStyle}>
      <p css={copyright}> &copy; HealthFriend.com </p>
    </Layout.Footer>
  );
};
