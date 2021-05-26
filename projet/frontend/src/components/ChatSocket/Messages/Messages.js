import React from 'react';

import scrollToBottom from 'react-scroll';

import Message from './Message/Message';


const Messages = ({ messages, chatName }) => (
  <scrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} chatName={chatName}/></div>)}
  </scrollToBottom>
);

export default Messages;