/** @jsx jsx */
// eslint-disable-next-line
import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import {
  handleInput,
  connectToChatkit,
  connectToRoom,
  sendMessage,
  sendDM,
  // grantPermission,
} from '../../utils/Chat/chatMethods';
import RoomList from './RoomList';
import ChatSession from './ChatSession';
import '../../css/Chat/chat.css';
import { GET_USERINFO, GET_CHAT_FRIEND } from '../../graphql/queries';
import Loading from '../Shared/Loading';
import chatMainImg from '../../static/chat-main.jpg';

// 여기 typescript로 바꾸기

const chatMainImgCss = css`
  filter: grayscale(100%);
  border-radius: 50%;
  height: 20%;
  width: 20%;
`;
const chatMainCss = css`
  background-color: #e9e2d0;
  height: 100%;
  margin-bottom: 0;
  text-align: center;
  border-radius: 0px 0px 10px 0px;
`;
const chatDiv = css`
  .ant-row-flex-center .ant-row-flex-center {
    height: 80vh;
  }
`;
const noFriendMsg = css`
  margin-top: 20px;
  margin-left: 20px;

  font-size: 1rem;
  line-height: 2rem;
`;
const noSelectedRoomMsg = css`
  font-size: 1rem;
  line-height: 2rem;
  margin-top: 40px;
`;

class ChatComponent extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      isLoading: true,
      currentUser: null,
      currentRoom: null,
      rooms: [],
      roomUsers: [],
      roomName: null,
      messages: [],
      newMessage: '',
      // showNotificationToast: false,
    };

    this.handleInput = handleInput.bind(this);
    this.connectToChatkit = connectToChatkit.bind(this);
    this.connectToRoom = connectToRoom.bind(this);
    this.sendMessage = sendMessage.bind(this);
    this.sendDM = sendDM.bind(this);
    // this.grantPermission = grantPermission.bind(this);
  }

  // 왜 나갔다가 들어오면 state 날라가고, 다시 didMount때 값을 넣어줘야하는지 모르겠음.
  componentDidMount() {
    const {
      me: { me },
    } = this.props;
    if (me) {
      connectToChatkit.call(this);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.me.me ||
      this.props.me.me.nickname !== prevProps.me.me.nickname
    ) {
      connectToChatkit.call(this);
    }
    if (this.messagesEnd) this.messagesEnd.scrollIntoView({ behavior: 'auto' });
  }

  render() {
    const {
      rooms,
      isLoading,
      currentRoom,
      currentUser,
      messages,
      newMessage,
      roomUsers,
      roomName,
      // showNotificationToast,
    } = this.state;

    if (isLoading) return <Loading />;

    // console.log('data', this.props);
    // console.log('state를 보여줘', this.state);

    const {
      me: { me },
    } = this.props;

    return (
      <div className="App" css={chatDiv}>
        <div className="App__chatwindow">
          <div className="chat-wrapper">
            {/* {showNotificationToast ? (
          <div className="notification-toast">
            채팅 알람을 이용하기 위해서{' '}
            <span onClick={this.grantPermission}>알림 허용을 해주세요</span>
          </div>
        ) : null} */}
            <aside className="sidebar left-sidebar">
              <header
                className="chat-header"
                style={{
                  backgroundColor: '#CCC',
                  borderRadius: '10px 0px 0px 0px',
                }}
              >
                <h3>채팅방</h3>
              </header>
              {currentRoom &&
              rooms
                .filter((room) => room.isPrivate)
                .filter(
                  (room) => room.customData.userIds.indexOf(me.nickname) !== -1,
                ).length > 0 ? (
                <div className="UserList__container">
                  <ul className="UserList__container__list">
                    <RoomList
                      rooms={rooms}
                      currentRoom={currentRoom}
                      sendDM={this.sendDM}
                      currentUser={currentUser}
                      me={me}
                      messages={messages}
                      roomUsers={roomUsers}
                    />
                  </ul>
                </div>
              ) : (
                <div css={noFriendMsg}>
                  아직 채팅하는 친구가 없어요.
                  <br />
                  친구를 만들고, 대화를 해보세요!
                </div>
              )}
            </aside>
            <section className="chat-screen">
              <header
                className="chat-header"
                style={{
                  borderRadius: '0px 10px 0px 0px',
                }}
              >
                {currentRoom.id !== '92c49eb7-fe76-42bf-a85b-37e30a31cabb' ? (
                  <h3>{roomName}님과의 대화</h3>
                ) : null}
              </header>
              {currentRoom.id !== '92c49eb7-fe76-42bf-a85b-37e30a31cabb' ? (
                <>
                  <div className="Chat__messages">
                    <ChatSession messages={messages} me={me} />
                    <div
                      style={{ float: 'left', clear: 'both' }}
                      ref={(el) => {
                        this.messagesEnd = el;
                      }}
                    />
                  </div>
                </>
              ) : (
                <div css={chatMainCss}>
                  <div css={noSelectedRoomMsg}>선택된 채팅방이 없습니다</div>
                  <br />
                  <br />
                  <div>
                    <img src={chatMainImg} css={chatMainImgCss} alt="" />
                  </div>
                </div>
              )}
              {currentRoom.id !== '92c49eb7-fe76-42bf-a85b-37e30a31cabb' ? (
                <footer className="chat-footer">
                  <div className="Chat__compose">
                    <input
                      type="text"
                      value={newMessage}
                      name="newMessage"
                      className="Chat__compose__input"
                      placeholder="내용을 입력하세요"
                      onChange={this.handleInput}
                      onKeyPress={(e) => {
                        // e.keyCode는 안먹고, e.key만 먹는 현상...console.log('e', e); 정작 이렇게 찍어도 잘 보이지 않음.
                        if (e.key === 'Enter') this.sendMessage(e);
                      }}
                    />
                    <button
                      className={
                        this.state.newMessage.length > 0
                          ? 'Chat__compose__button__ready'
                          : 'Chat__compose__button'
                      }
                      onClick={this.sendMessage}
                    >
                      전송
                    </button>
                  </div>
                </footer>
              ) : null}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(GET_USERINFO, {
    name: 'me',
  }),
  graphql(GET_CHAT_FRIEND, {
    name: 'chatFriend',
  }),
)(ChatComponent);
