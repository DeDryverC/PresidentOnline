import e from 'cors'
import React, {useState, useEffect, Component} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import './Join.css'

class Join extends Component{
    constructor(props) {
        super(props);
        this.state={
           connected: localStorage.getItem('Connect'),
           connectedAsGuest: localStorage.getItem('ConnectedAsGuest'),
           guestPseudo : 'testPseudo',
           roomName : '',
           chatName : ''
        }
        this.enterRoom = this.enterRoom.bind(this)
    }

    enterRoom = () => {
        localStorage.setItem('roomName', this.state.roomName)
        localStorage.setItem('chatName', this.state.chatName)
        window.location.reload()
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
                    
                    {/*
                    <Link onClick={
                        e => (!this.state.chatName || !this.state.roomName) 
                        ? e.preventDefault() : null} 
                        to = {`/chat?chatName=${this.state.chatName}&roomName=${this.state.roomName}`}>
                        <button 
                            className="button mt-20" 
                            type="submit"> Enter Room
                        </button>
                    </Link>
                    */}
                   
                    <button type="submit" 
                        onClick={this.enterRoom}
                    >
                        Enter Room
                    </button>
                    
                </div>
            </div>
        )
    }
}

export default Join
