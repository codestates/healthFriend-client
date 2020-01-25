import React, { Component } from 'react';
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
import Dialog from '../components/Chat2/Dialog';
import '../css/Chat2/chat2.css';

class Chat2 extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      showLogin: true,
      isLoading: false,
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

  componentDidMount() {}

  render() {
    const {
      userId,
      showLogin,
      rooms,
      currentRoom,
      currentUser,
      messages,
      newMessage,
      roomUsers,
      roomName,
    } = this.state;

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
        {showLogin ? (
          <Dialog
            userId={userId}
            handleInput={this.handleInput}
            connectToChatkit={this.connectToChatkit}
          />
        ) : null}
      </div>
    );
  }
}

export default Chat2;
