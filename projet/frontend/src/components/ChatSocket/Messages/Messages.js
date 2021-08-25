import React, {useEffect, useRef, useState} from 'react';
import './Messages.css'
import Message from './Message/Message';


const Messages = ({ messages, chatName }) => {
  
  return(
    <div className="messages">
      {messages.map((message, i) => <div key={i}><Message message={message} chatName={chatName}/></div>)}
    </div>  
  )
};

export default Messages;