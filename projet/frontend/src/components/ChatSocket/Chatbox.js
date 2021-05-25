import React, {Component} from 'react'
import JoinRoom from './Join/Join'
import ChatRoom from './Chat/Chat'
import {Redirect} from 'react-router-dom'

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state={
           connected: localStorage.getItem('Connect'),
           connectedAsGuest: localStorage.getItem('ConnectedAsGuest'),
           guestPseudo : '',
           roomName : localStorage.getItem('roomName'),
           chatName : localStorage.getItem('chatName')
        } 
    }

    render(){
        if(this.state.roomName !== null && this.state.chatName !== null){
            return(
                <ChatRoom />
            )
        } else {
            return(
                <JoinRoom />
            )
        }
    }
}

export default ChatBox