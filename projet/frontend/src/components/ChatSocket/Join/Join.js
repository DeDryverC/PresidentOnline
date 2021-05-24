import e from 'cors'
import React, {useState, useEffect, Component} from 'react'
import {Link} from 'react-router-dom'
import './Join.css'

class Join extends Component{
    constructor(props) {
        super(props);
        this.state={
           connected: localStorage.getItem('Connect'),
           connectedAsGuest: localStorage.getItem('ConnectedAsGuest'),
           guestPseudo : 'testPseudo',
           roomName : ''
        } 
    }
    
    
    render(){
        return(
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Chatroom List</h1>

                    <div>
                        <input 
                            placeholder="Room" 
                            className="joinInput mt-20" 
                            type="text" 
                            onChange={(e) => {
                                this.state.roomName = e.target.value
                            }}/>
                    </div>
                   
                   {/* 
                   
                     <Link onClick={
                        e => (!userName || !this.state.roomName) 
                        ? e.preventDefault() : null} 
                        to = {`/chat?userName=${userName}&room=${room}`}>
                        <button 
                            className="button mt-20" 
                            type="submit">Sign In
                        </button>
                    </Link>

                   */}

                </div>
            </div>
        )
    }
}

export default Join
