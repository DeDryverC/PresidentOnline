import React, {Component, useState} from 'react'
import JoinRoom from './Join/Join'
import ChatRoom from './Chat/Chat'
import CompSwitch from './SwitchComponents'
import {Redirect} from 'react-router-dom'

/*
class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state={
           connected: localStorage.getItem('Connect'),
           connectedAsGuest: localStorage.getItem('ConnectedAsGuest'),
           guestPseudo : '',
           roomName : localStorage.getItem('roomName') || null,
           chatName : localStorage.getItem('chatName') || null,
           activeComponent : 'chatlobby'
        }
    }

    render(){
        return(
            <CompSwitch active={this.state.activeComponent}>
                <JoinRoom name="chatlobby"/>
                <ChatRoom name="chatroom" />
            </CompSwitch>
        )
    }
}
*/

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

export default ChatBox