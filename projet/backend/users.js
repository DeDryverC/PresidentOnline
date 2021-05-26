const users = []

const addUser = ({id, chatName, roomName}) => {
    chatName = chatName.trim().toLowerCase()
    roomName = roomName.trim().toLowerCase()

    const existingUser = users.find((user) => user.roomName === roomName 
    && user.chatName === chatName )

    if(existingUser){
        return { error : 'chatName is taken'}
    }

    const user = {id, chatName, roomName}
    users.push(user)

    return {user}

}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id )
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => users.find((user) => user.id === id)

const getroomNameUsers = (roomName) => users.filter((user) => user.roomName === roomName)

module.exports = {addUser, removeUser, getUser, getroomNameUsers}
