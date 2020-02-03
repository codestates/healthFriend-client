/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import emptyImage from '../../static/chat-main.jpg';

const emptyMessageCss = css`
  margin-top: 20px;
  font-size: 1rem;
  line-height: 2rem;
`;
const emptyImgCss = css`
  filter: grayscale(100%);
  border-radius: 50%;
  height: 10%;
  width: 10%;
`;
const emptyImageWrapper = css`
  margin-top: 40px;
`;
const wrapperDivCss = css`
  background-color: #e9e2d0;
  height: 60vh;
  margin-bottom: 0;
  padding: 20px;
  border-radius: 10px;
`;

type EmptyComponentProps = {
  text1: string;
  text2: string;
};

const EmptyComponent = ({ text1, text2 }: EmptyComponentProps) => (
  <div css={wrapperDivCss}>
    <div css={emptyMessageCss}>
      <div>{text1}</div>
      <div>{text2}</div>
    </div>
    <div css={emptyImageWrapper}>
      <img src={emptyImage} css={emptyImgCss} alt="" />
    </div>
  </div>
);

export default EmptyComponent;
