import React from 'react'

import ReactEmoji from 'react-emoji'

const Message = ({message: {user, text}, chatName}) => {
    let isSentByCurrentUser = false

    const trimmedName = chatName.trim().toLowerCase()

    if(user === trimmedName){
        isSentByCurrentUser = true
    }
    
    return (
        isSentByCurrentUser ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText">{trimmedName}</p>
                <div className="messageBox backgroundGreen">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ) : (
            <div className="messageContainer justifyStart">
                <p className="sentText">{trimmedName}</p>
                <div className="messageBox backgroundLightgreen">
                    <p className="messageText colorBlack">{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div>
        )
    )
}

export default Message