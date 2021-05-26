import React from 'react'

import './InfoBar.css'

const InfoBar = ({roomName}) => {
    return(
        <div className="infoBar">
        <div className='leftInnerContainer'>
            <h3>{roomName}</h3>
        </div>
        <div className='rightInnerContainer'>
        </div>
        </div>
    )
}

export default InfoBar