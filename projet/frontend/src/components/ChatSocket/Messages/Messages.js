import React from 'react';

import scrollToBottom from 'react-scroll';

import Message from './Message/Message';


const Messages = ({ messages, userName }) => (
  <scrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} userName={userName}/></div>)}
  </scrollToBottom>
);

export default Messages;