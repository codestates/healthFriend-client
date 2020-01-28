import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import {
  handleInput,
  connectToChatkit,
  connectToRoom,
  sendMessage,
  sendDM,
} from '../utils/chatMethods';
import RoomList from '../components/Chat/RoomList';
import ChatSession from '../components/Chat/ChatSession';
import RoomUsers from '../components/Chat/RoomUsers';
import '../css/Chat/chat.css';
import { GET_USERINFO, GET_CHAT_FRIEND } from '../graphql/queries';
import Loading from '../components/Shared/Loading';

// 여기 typescript로 바꾸기

class Chat extends Component {
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
    };

    this.handleInput = handleInput.bind(this);
    this.connectToChatkit = connectToChatkit.bind(this);
    this.connectToRoom = connectToRoom.bind(this);
    this.sendMessage = sendMessage.bind(this);
    this.sendDM = sendDM.bind(this);
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
    } = this.state;

    if (isLoading) return <Loading />;

    console.log('data', this.props);
    console.log('state를 보여줘', this.state);

    const {
      me: { me },
    } = this.props;

    return (
      <div className="chat-wrapper">
        <aside className="sidebar left-sidebar">
          {currentUser ? (
            <div className="user-profile">
              <span className="username">{currentUser.name}</span>
              <span className="user-id">{`@${currentUser.id}`}</span>
            </div>
          ) : null}
          {currentRoom ? (
            <RoomList
              rooms={rooms}
              currentRoom={currentRoom}
              connectToRoom={this.connectToRoom}
              currentUser={currentUser}
              me={me}
            />
          ) : null}
        </aside>
        <section className="chat-screen">
          <header className="chat-header">
            {currentRoom ? <h3>{roomName}</h3> : null}
          </header>
          {this.state.currentRoom.id !==
          '92c49eb7-fe76-42bf-a85b-37e30a31cabb' ? (
            <ul className="chat-messages">
              <ChatSession messages={messages} />
            </ul>
          ) : (
            <p>채팅방입니다. 우측의 유저를 클릭하여 대화를 시작해보세요</p>
          )}
          <footer className="chat-footer">
            <form onSubmit={this.sendMessage} className="message-form">
              <input
                type="text"
                value={newMessage}
                name="newMessage"
                className="message-input"
                placeholder="내용을 입력하세요"
                onChange={this.handleInput}
              />
            </form>
          </footer>
        </section>
        <aside className="sidebar right-sidebar">
          {currentRoom ? (
            <RoomUsers
              currentUser={currentUser}
              sendDM={this.sendDM}
              roomUsers={roomUsers}
              me={me}
            />
          ) : null}
        </aside>
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
)(Chat);
