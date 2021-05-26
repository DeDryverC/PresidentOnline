import e from 'cors'
import React, {useState, useEffect, Component} from 'react'
import {NavLink, Link, Redirect} from 'react-router-dom'
import './Join.css'

/* 
class Join extends Component{
    constructor(props) {
        super(props);
        this.state={
           connected: localStorage.getItem('Connect'),
           connectedAsGuest: localStorage.getItem('ConnectedAsGuest'),
           guestPseudo : 'testPseudo',
           roomName : '',
           chatName : '',
           activeComponent : 'chatlobby'
        }
        this.enterRoom = this.enterRoom.bind(this)
    }

    enterRoom = () => {
        localStorage.setItem('roomName', this.state.roomName)
        localStorage.setItem('chatName', this.state.chatName)
        localStorage.setItem('activeComponent', 'chatroom')
    }

    
    render(){
        return(
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Chatroom List</h1>

                    <div>
                        <input 
                            placeholder="Name" 
                            className="joinInput mt-20" 
                            type="text" 
                            onChange={(e) => this.setState({
                                chatName : e.target.value
                            })}/>
                    </div>

                    <div>
                        <input 
                            placeholder="Room" 
                            className="joinInput mt-20" 
                            type="text" 
                            onChange={(e) => this.setState({
                                roomName : e.target.value
                            })}/>
                    </div>

                    <button onClick={this.enterRoom()}>
                        Enter Room
                    </button>
                    
                    {
                    <Link onClick={
                        e => (!this.state.chatName || !this.state.roomName) 
                        ? e.preventDefault() : null} 
                        to = {`/chat?chatName=${this.state.chatName}&roomName=${this.state.roomName}`}>
                        <button 
                            className="button mt-20" 
                            type="submit"> Enter Room
                        </button>
                    </Link>
                    }
                    
                    </div>
                    </div>
                )
            }
        }
*/

const Join = () => {
    const [chatName, setChatName] = useState('')
    const [roomName, setRoomName] = useState('')
    const [activeComponent, setActiveComponent] = useState('chatlobby')

    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Chatroom List</h1>
                <div>
                    <input 
                        placeholder="Name" 
                        className="joinInput" 
                        type="text" 
                        onChange={(e) => {
                            setChatName(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <input 
                        placeholder="Room" 
                        className="joinInput mt-20" 
                        type="text" 
                        onChange={(e) => {
                            setRoomName(e.target.value)
                        }}/>
                </div>
               
                    <button onClick={
                        e => (!chatName || !roomName) 
                        ? e.preventDefault() : setActiveComponent('chatroom')}
                        className="button mt-20" 
                        type="submit">Enter Room
                    </button>

                </div>
        </div>
    )
}

export default Join
