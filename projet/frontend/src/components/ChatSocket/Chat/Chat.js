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


const Chat = () => {
    const [roomName, setRoomName] = useState(`${localStorage.getItem('roomName')}`)
    const [chatName, setChatName] = useState(`${localStorage.getItem('chatName')}`)

    const ENDPOINT = 'localhost:5001'
    
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])  
    
    useEffect(() => {
        socket = io.connect(ENDPOINT, connectionConfig)

        setChatName(chatName)
        setRoomName(roomName)

        socket.emit('join_room', {chatName, roomName}, () => {
            
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [ENDPOINT])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        }, [messages])
    })

    const leaveRoom = () => {
        localStorage.removeItem('roomName')
        localStorage.removeItem('chatName')
        localStorage.removeItem('activeComponent')
        window.location.reload()
    }

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
            <button onClick={leaveRoom}>Leave Room</button>
        </div>
    )
}


/*
class Chat extends Component{
    constructor(props) {
        super(props);
        this.state={
           connected: localStorage.getItem('Connect'),
           connectedAsGuest: localStorage.getItem('ConnectedAsGuest'),
           guestPseudo : 'testPseudo',
           activeComponent : 'chatroom',
           
           roomName : localStorage.getItem('roomName') || 'test',
           chatName : localStorage.getItem('chatName') || 'tester',

           message: "",
           messages: []

        }
        this.leaveRoom = this.leaveRoom.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount(){
        socket = io.connect(`localhost:5001`, connectionConfig)
        let chatName = this.state.chatName
        let roomName = this.state.roomName
        socket.emit('join_room', {chatName, roomName})
    }

    componentWillUnmount(){
        let chatName = this.state.chatName
        let roomName = this.state.roomName
        socket.emit('leave_room', {chatName, roomName})
    }


    sendMessage = (e) => {
        let message = this.state.message
        e.preventDefault()

        if(message){
            socket.emit('send_message', message, () => this.setState({message : ''}))
        }
    }

    leaveRoom = () =>{
        localStorage.removeItem('roomName')
        localStorage.removeItem('chatName')
        localStorage.removeItem('activeComponent')
        window.location.reload()
    }

    render(){
        return (
            <div className="outerContainer">
                <div className="container">
                    <InfoBar roomName={this.state.roomName} />
                    <Messages messages={this.state.messages} chatName={this.state.chatName}/>
                    <Input message={this.state.message} 
                    setMessage={onChange = (e)=>{
                        this.setState({message : e.target.value})
                    }} 
                    sendMessage={this.sendMessage} />
                </div>
                <button onClick={this.leaveRoom}>Leave Room</button>
            </div>
        )
    }
}
*/

export default Chat