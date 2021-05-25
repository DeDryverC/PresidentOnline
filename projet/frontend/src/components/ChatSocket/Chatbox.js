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
           roomName : localStorage.getItem('roomName') || null,
           chatName : localStorage.getItem('chatName') || null,
        }
        this.enterOrExitRoom = this.enterOrExitRoom.bind(this)
    }

    enterOrExitRoom = () => {
        let hasRoom = this.state.hasRoom !== null ? true : false
        
        switch(hasRoom){
            case "true":
                return <ChatRoom/>
            default: return <JoinRoom/>
       }
    }

    render(){
        return(
            <>
                {this.enterOrExitRoom()}
                <button onClick={
                    this.enterOrExitRoom()
                }>Toggle Chat</button>
            </>
        )
    }
}

export default ChatBox