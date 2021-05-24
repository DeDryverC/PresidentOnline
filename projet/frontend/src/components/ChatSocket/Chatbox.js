import React, {Component} from 'react'
import JoinRoom from './Join/Join'
import ChatRoom from './Chat/Chat'

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state={
           connected: localStorage.getItem('Connect'),
           connectedAsGuest: localStorage.getItem('ConnectedAsGuest'),
           guestPseudo : '',
           roomName : localStorage.getItem('room')

           
        
        
        } 
    }

    render(){
        if(this.state.roomName){
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