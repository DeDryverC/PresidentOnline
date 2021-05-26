import React, {Component, useState, useEffect} from 'react'
import JoinRoom from './Join/Join'
import ChatRoom from './Chat/Chat'
import CompSwitch from './SwitchComponents'
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
           activeComponent : localStorage.getItem('activeComponent') || 'chatlobby'
        }
    }

    render(){
        if(this.state.activeComponent === 'chatroom'){
            return(
                <ChatRoom/>
            )
        } else {
            return(
                <JoinRoom/>
            )
        }
    }
}

/*
const ChatBox = () => {
    const [connected, setConnected] = useState(`${localStorage.getItem('Connect')}`)
    const [connectedAsGuest, setConnectedAsGuest] = useState(`${localStorage.getItem('ConnectedAsGuest')}`)
    const [guestPseudo, setGuestPseudo] = useState('')
    const [activeComponent, setActiveComponent] = useState(`${localStorage.getItem('activeComponent') || 'chatlobby'}`)
    

    return(
        <CompSwitch active={activeComponent}>
            <JoinRoom name="chatlobby"/>
            <ChatRoom name="chatroom" />
        </CompSwitch>
    )
}
*/

export default ChatBox