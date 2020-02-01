/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import ChatComponent from '../components/Chat';

const chatDiv = css`
  height: 80vh;
`;

function Chat() {
  return (
    <div css={chatDiv}>
      <ChatComponent />
    </div>
  );
}

export default Chat;
