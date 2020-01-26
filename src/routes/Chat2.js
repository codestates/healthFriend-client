import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {
  handleInput,
  connectToChatkit,
  connectToRoom,
  sendMessage,
  sendDM,
} from '../hooks/Chat2/methods';
import RoomList from '../components/Chat2/RoomList';
import ChatSession from '../components/Chat2/ChatSession';
import RoomUsers from '../components/Chat2/RoomUsers';
import '../css/Chat2/chat2.css';
import { GET_USERINFO } from '../graphql/queries';

class Chat2 extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
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
    if (this.props.data.me) {
      connectToChatkit.call(this);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.data.me ||
      this.props.data.me.nickname !== prevProps.data.me.nickname
    ) {
      connectToChatkit.call(this);
    }
  }

  render() {
    const {
      rooms,
      currentRoom,
      currentUser,
      messages,
      newMessage,
      roomUsers,
      roomName,
    } = this.state;

    console.log('state를 보여줘', this.state);

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
            />
          ) : null}
        </aside>
        <section className="chat-screen">
          <header className="chat-header">
            {currentRoom ? <h3>{roomName}</h3> : null}
          </header>
          <ul className="chat-messages">
            <ChatSession messages={messages} />
          </ul>
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
            />
          ) : null}
        </aside>
      </div>
    );
  }
}

const query = graphql(GET_USERINFO);

const Chat2WithApollo = query(Chat2);

export default Chat2WithApollo;
