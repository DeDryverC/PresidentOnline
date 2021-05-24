import React, {Component, useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'

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

const Chat = ({location}) => {
    //const [loggedIn, setLoggedIn] = useState(false)  
    const [room, setRoom] = useState("")
    const [userName, setUserName] = useState('')

    const ENDPOINT = 'localhost:5000'
    
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])  
    
    useEffect(() => {
        const {userName, room} = queryString.parse(location.search)
        
        socket = io.connect(ENDPOINT, connectionConfig)

        setUserName(userName)
        setRoom(room)

        socket.emit('join_room', {userName, room}, () => {
            
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
                <InfoBar room={room} />
                <Messages messages={messages} userName={userName}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat