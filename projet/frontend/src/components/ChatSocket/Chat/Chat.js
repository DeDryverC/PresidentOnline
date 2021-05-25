import React, {Component, useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import {NavLink} from 'react-router-dom'

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'

let socket

let connectionConfig = {
    "force new connection" : true,
    "reconnectionAttemps" : "Infinity",
    "timeout" : 10000,
    "transports" : ["websocket"]
}

/* 
    const Chat = ({location}) => {
    //const [loggedIn, setLoggedIn] = useState(false)  
    const [roomName, setRoomName] = useState("")
    const [chatName, setChatName] = useState('')

    const ENDPOINT = 'localhost:3000'
    
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])  
    
    useEffect(() => {
        const {chatName, roomName} = queryString.parse(location.search)
        
        socket = io.connect(ENDPOINT, connectionConfig)

        setChatName(chatName)
        setRoomName(roomName)

        socket.emit('join_room', {chatName, roomName}, () => {
            
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        }, [messages])
    })

    const sendMessage = (e) => {
        e.preventDefault()

        if(message){
            socket.emit('send_message', message, () => setMessage(''))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar roomName={roomName} />
                <Messages messages={messages} chatName={chatName}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}
*/

class Chat extends Component{
    constructor(props) {
        super(props);
        this.state={
           connected: localStorage.getItem('Connect'),
           connectedAsGuest: localStorage.getItem('ConnectedAsGuest'),
           guestPseudo : 'testPseudo',
           roomName : localStorage.getItem('roomName'),
           chatName : localStorage.getItem('chatName')
        }
        this.leaveRoom = this.leaveRoom.bind(this)
    }

    leaveRoom = () =>{
        localStorage.removeItem('roomName')
        localStorage.removeItem('chatName')
        window.location.reload()
    }

    render(){
        return (
            <div className="outerContainer">
                <div className="container">
                   <h1>Test ROom</h1>
                   <button onClick={this.leaveRoom}>Leave Room</button>
                </div>
            </div>
        )
    }
}

export default Chat