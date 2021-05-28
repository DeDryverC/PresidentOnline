import React from "react";
//import { Component } from "react";
import { Link } from 'react-router-dom';
import { Button, Row, Col, Container, Alert } from 'react-bootstrap'
import Lobby from './components/Lobby'
import Pool from './components/Pool'
import Select from 'react-select'
import io, { Socket } from "socket.io-client";
//import App from "../../App";
//import Profil from "../Profil/Profil";



const options = [
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
]

let lobbySocket

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameCode: '',
            gameFromCode: '',
            pseudo: undefined,
            gameId: undefined,
            maxPlayers: undefined,
            playerToken: 0,
            lobby: undefined,
            joinedGame: undefined,
            createGame: undefined,
            pool: undefined,
            connectionConfig: {
                "force new connection": true,
                "reconnectionAttemps": "Infinity",
                "timeout": 10000,
                "transports": ["websocket"]
            },
            endpoint: 'localhost:5003',
            message: { type: undefined, title: undefined, txt: undefined, variant: undefined },
            defStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },

        }
        this.launchGame = this.launchGame.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLeave = this.handleLeave.bind(this)
        lobbySocket = io(this.state.endpoint, this.state.connectionConfig);
    }
    /**************  HOME **************/

    /**********  HANDLE  **********/

    //handle joining with a code
    handleCreate(event) {
        event.preventDefault();
        let isIn = false;
        if (this.state.pseudo === undefined) {
            if (localStorage.getItem('Pseudo') === undefined) {
                if (localStorage.getItem('guestPseudo') !== undefined) {
                    this.setState({ pseudo: localStorage.getItem('guestPseudo') })
                }
                else {
                    alert('VOUS DEVEZ VOUS ENREGISTRER EN GUEST OU AVEC VOTRE COMPTE.')
                }
                this.setState({ pseudo: localStorage.getItem('Pseudo') })
                alert("Votre pseudo n'a pas été pris en compte, veuillez réessayer")
                return 0;
            }
        }
        for (let item of this.state.pool) {
            if (this.state.gameId === item.gameId) { isIn = true }
        }
        if (!isIn) {
            lobbySocket.emit('createLobby', { gid: this.state.gameId, mpv: this.state.maxPlayers.value })
        }
        else {
            alert("This name is already used");
        }
    };
    async handleOwnerJoin(gameId, pseudo) {
        //puts himself in the lobby as owner

        lobbySocket.emit('repGameCreated', { user: pseudo, gid: gameId, token: 1 })
        this.setState({ playerToken: 1, gameId: gameId, createGame: undefined });
        localStorage.setItem("gameId", gameId);
        localStorage.setItem("pseudo", pseudo);
    }

    handleLobby() {
        this.setState({ createGame: true })
    }
    handleExitCreate() {
        this.setState({ createGame: undefined })
    }
    async handleSubmit(event) {
        event.preventDefault();
        await fetch(`http://localhost:5000/game/${this.state.gameCode}`)
            .then(response => response.json())
            .then(json => {
                localStorage.setItem("joinedGame", json[0].gameId);
            })
        this.setState({ gameFromCode: localStorage.getItem("joinedGame") });

        await fetch(`http://localhost:5000/lobby/${localStorage.getItem("joinedGame")}`)
            .then(response => response.json())
            .then(json => {
                this.setState({ lobby: json });

            })


        let index = undefined;
        for (let item in this.state.pool) {
            if (this.state.pool[item].gameId === localStorage.getItem("joinedGame")) {
                index = item
            }
        }

        if (this.state.pool[index].currPlayers >= this.state.pool[index].maxPlayers) {
            localStorage.removeItem("joinedGame");
            this.setState({ gameFromCode: undefined });
            alert('lobby is full');
        }
        else {
            await fetch('http://localhost:5000/lobbyp', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Acces-Control-Allow-Origin": "true"
                },
                body: JSON.stringify({
                    gameId: localStorage.getItem("joinedGame"),
                    pseudo: this.state.pseudo,
                    token: 1,
                })
            })


            await fetch('http://localhost:5000/icount', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Acces-Control-Allow-Origin": "true"
                },
                body: JSON.stringify({
                    gameId: localStorage.getItem("joinedGame"),
                })
            })


            await fetch(`http://localhost:5000/token/${localStorage.getItem("joinedGame")}/${this.state.pseudo}`)
                .then(response => response.json())
                .then(json => {
                    this.setState({ playerToken: json[0].token });
                })

            this.setState({ joinedGame: localStorage.getItem("joinedGame") });

            await fetch(`http://localhost:5000/lobby/${localStorage.getItem("joinedGame")}`)
                .then(response => response.json())
                .then(json => {
                    this.setState({ lobby: json });

                })
        }
    }

    //handle joining a game
    handleJoin = async (gameId) => {
        console.log('eoh ?')
        await fetch(`http://localhost:5000/exist/${gameId}`)
            .then(response => response.json())
            .then(json => {
                console.log('bool + + + + ')
                console.log(json[0].bool)
                console.log('bool - - - - ')
                if (json[0].bool === 0) {
                    const msg = { type: 'pool', title: "Lobby not found", txt: "The lobby you want to join no longer exists, if the lobby is still displayed, please contact an administrator", variant: 'danger' }
                    this.setState({ message: msg });
                    return 0;
                }
            })
        if (this.state.pseudo === undefined) {
            if (localStorage.getItem('Pseudo') === undefined) {
                if (localStorage.getItem('guestPseudo') !== undefined) {
                    this.setState({ pseudo: localStorage.getItem('guestPseudo') })
                }
                else {
                    alert('VOUS DEVEZ VOUS ENREGISTRER EN GUEST OU AVEC VOTRE COMPTE.')
                }
                this.setState({ pseudo: localStorage.getItem('Pseudo') })
                alert("Votre pseudo n'a pas été pris en compte, veuillez réessayer")
                return 0;
            }
        }
        if (this.state.message.txt === undefined) {
            console.log('here ?')
            lobbySocket.emit('playerJoin', { gid: gameId, user: this.state.pseudo, token: 0 })
            this.setState({ gameId: gameId })

        }

    }

    //handle leaving a lobby
    handleLeave(event) {
        event.preventDefault();
        const gameId = this.state.joinedGame;
        if (this.state.playerToken === 0) {
            lobbySocket.emit('playerLeaving', { gid: gameId, user: this.state.pseudo })
            this.setState({ joinedGame: undefined, gameId: undefined });
        }
        else if (this.state.playerToken === 1) {
            lobbySocket.emit('ownerLeaving', { gid: gameId })
            this.setState({ joinedGame: undefined, playerToken: 0, gameId: undefined });
        }
    }

    async handleRefresh(gameId) {
        await fetch(`http://localhost:5000/lobby/${gameId}`)
            .then(response => response.json())
            .then(json => {
                this.setState({ lobby: json });
            })
    }

    async handleRefreshGames() {
        await fetch('http://localhost:5000/pool')
            .then(response => response.json())
            .then(json => {
                this.setState({ pool: Object.values(json) });
            })
    }

    /*********** Rendering **********/

    renderGameChoices() {
        let itemsToPush = []
        for (let item in this.state.pool) {
            let gameId = this.state.pool[item].gameId;
            if (this.state.pool[item].currPlayers >= this.state.pool[item].maxPlayers) {
                itemsToPush.push(<Row><Button variant="danger">Full [{this.state.pool[item].currPlayers}/{this.state.pool[item].maxPlayers}]</Button><p>{gameId}</p></Row>)
            }
            else {
                itemsToPush.push(<Row><Button variant="success" onClick={() => this.handleJoin(gameId)}>Join [{this.state.pool[item].currPlayers}/{this.state.pool[item].maxPlayers}]</Button><p>{gameId}</p></Row>)
            }

        }
        itemsToPush.push(<Row><Button variant="outline-info" size="lg" onClick={() => console.log(this.state.joinedGame)}> Refresh </Button></Row>)
        return (itemsToPush);
    }

    /*renderLobby() {
        let itemsToPush = []
        for (let item in this.state.lobby) {
            if (this.state.lobby[item].token === 1) {
                itemsToPush.push(<Row><p>{this.state.lobby[item].user}</p><p>___</p><p>Owner</p></Row>)
            }
            else {
                itemsToPush.push(<Row><p>{this.state.lobby[item].user}</p><p>___</p><p>Player</p></Row>)
            }

        }
        itemsToPush.push(
            <Row>
                <Button variant="outline-info" size="lg" onClick={() => this.handleLeave(this.state.joinedGame)}> Leave lobby </Button>
            </Row>

        )
        return (itemsToPush)*/


    launchGame = () => {

        const lobby = this.state.lobby
        const gameId = this.state.gameId
        console.log('======== LOBBY ==========')
        console.log('======== +LOBBY+ ==========')
        console.log(lobby)
        console.log('======== -LOBBY- ==========')
        console.log('======== LOBBY ==========')

        fetch('http://localhost:5000/deck', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                gameId: gameId,
                lobby: lobby,
            })
        })

        const copyLobby = this.state.lobby
        const user = this.state.pseudo
        let index;
        copyLobby.map((data, keys) => {
            if (data.user === user) {
                index = keys
            }
        })
        let orderedLobby;
        switch (index) {
            case 0:
                copyLobby.splice(index, 1)
                orderedLobby = copyLobby.slice()
                break;
            case 1:
                copyLobby.splice(index, 1)
                orderedLobby = copyLobby.slice()
                copyLobby.map((data, keys) => {
                    if (keys === 0) {
                        orderedLobby[copyLobby.length - 1] = data
                    }
                    else {
                        orderedLobby[keys - 1] = data
                    }
                })
                break;
            case 2:
                copyLobby.splice(index, 1)
                orderedLobby = copyLobby.slice()
                copyLobby.map((data, keys) => {
                    if (keys === 0) {
                        orderedLobby[copyLobby.length - 2] = data
                    } else if (keys === 1) {
                        orderedLobby[copyLobby.length - 1] = data
                    }
                    else {
                        orderedLobby[keys - 1] = data
                    }
                })
                break;
            case 3:
                copyLobby.splice(index, 1)
                orderedLobby = copyLobby.slice()
                copyLobby.map((data, keys) => {
                    if (keys === 0) {
                        orderedLobby[copyLobby.length - 3] = data
                    } else if (keys === 1) {
                        orderedLobby[copyLobby.length - 2] = data
                    }
                    else if (keys === 2) {
                        orderedLobby[copyLobby.length - 1] = data
                    }
                    else {
                        orderedLobby[keys - 1] = data
                    }
                })
                break;
            case 4:
                copyLobby.splice(index, 1)
                orderedLobby = copyLobby.slice()
                copyLobby.map((data, keys) => {
                    if (keys === 0) {
                        orderedLobby[copyLobby.length - 4] = data
                    } else if (keys === 1) {
                        orderedLobby[copyLobby.length - 3] = data
                    } else if (keys === 2) {
                        orderedLobby[copyLobby.length - 2] = data
                    } else if (keys === 3) {
                        orderedLobby[copyLobby.length - 1] = data
                    }
                    else {
                        orderedLobby[keys - 1] = data
                    }
                })
                break;
            case 5:
                copyLobby.split(index, 1)
                orderedLobby = copyLobby.slice()
                copyLobby.map((data, keys) => {
                    if (keys === 0) {
                        orderedLobby[copyLobby.length - 5] = data
                    } else if (keys === 1) {
                        orderedLobby[copyLobby.length - 4] = data
                    } else if (keys === 2) {
                        orderedLobby[copyLobby.length - 3] = data
                    } else if (keys === 3) {
                        orderedLobby[copyLobby.length - 2] = data
                    } else if (keys === 4) {
                        orderedLobby[copyLobby.length - 1] = data
                    }
                    else {
                        orderedLobby[keys - 1] = data
                    }
                })
                break;
            default:
                break;
        }


        localStorage.setItem('user', user)
        localStorage.setItem('gameId', gameId)
        localStorage.setItem('turn', orderedLobby)
        lobbySocket.emit('launchGame', gameId)
        window.location.href = "http://localhost:3000/game"
    }




    /******* OTHERS FUNCTIONS *********/

    resetMessage = () => {
        const error = { title: undefined, txt: undefined, variant: undefined }
        this.setState({ message: error })
    }
    showMessage = () => {
        if (this.state.message.type === 'pool') {
            console.log('eeeeee')
            lobbySocket.emit('refreshPool',)
        }
        return (
            <Row style={this.state.defStyle}>
                <Alert variant={this.state.message.variant} onClose={() => this.resetMessage()} dismissible>
                    <Alert.Heading>{this.state.message.title}</Alert.Heading>
                    {this.state.message.txt}
                </Alert>
            </Row>
        )
    }


    connexion = () => {
        lobbySocket.on('connection', () => {
            if (this.state.pseudo !== undefined)
                lobbySocket.emit('repconnection', { user: this.state.pseudo })
        })

    }



    componentDidMount() {
        fetch('http://localhost:5000/pool')
            .then(response => response.json())
            .then(json => {
                this.setState({ pool: Object.values(json) });
            })

        if (localStorage.getItem("Pseudo") === undefined) {
            if (localStorage.getItem("guestPseudo") !== undefined) {
                lobbySocket.on('connection', (data) => {
                    lobbySocket.emit('repconnexion', { user: localStorage.getItem("guestPseudo") })
                    this.setState({ pseudo: localStorage.getItem("guestPseudo") })
                })
            }
        }

        this.setState({ pseudo: localStorage.getItem("Pseudo") })
        const pseudo = this.state.pseudo
        const gameId = this.state.gameId


        /*lobbySocket.on('playerDisconnect', (sdata) => {
            const userDisc = sdata.id
            const copyLobby = this.state.lobby
            const index = copyLobby.indexOf(userDisc);
            copyLobby.splice(index, 1)
            this.setState({ lobby: copyLobby })
        })*/

        lobbySocket.on('lobbyCreated', (sdata) => {
            this.handleOwnerJoin(sdata.gid, this.state.pseudo);
        })
        lobbySocket.on('ownerInfoLobby', (data) => {
            const gameId = this.state.gameId
            console.log('Owner join + + + +')
            console.log(data)
            console.log(gameId)
            console.log('Owner join - - - -')
            this.setState({ joinedGame: gameId, lobby: data });
        })
        lobbySocket.on('playerJoinLobby', (data) => {
            const gameId = this.state.gameId
            this.setState({ lobby: data, joinedGame: gameId })


        })
        lobbySocket.on('repPlayerJoin', (data) => {
            console.log(data)
            this.setState({ joinedGame: gameId, lobby: data, playerToken: 0 })
        })
        lobbySocket.on('chanPlayerLeaving', (data) => {
            this.setState({ lobby: data })
        })
        lobbySocket.on('createLobby', (data) => {
            this.setState({ pool: Object.values(data) })
        })
        lobbySocket.on('closeLobby', (sdata) => {
            lobbySocket.emit('closedLobby', sdata)
            this.handleRefreshGames();
            this.setState({ pool: Object.values(sdata) })
        })
        lobbySocket.on('refreshedPool', (sdata) => {
            console.log(sdata)
            this.setState({ pool: Object.values(sdata) })
        })
        lobbySocket.on('joinGame', (sdata) => {
            const user = this.state.pseudo
            const gameId = sdata
            const copyLobby = this.state.lobby.slice()
            let index;
            copyLobby.map((data, keys) => {
                if (data.user === user) {
                    index = keys
                }
            })
            let orderedLobby;
            switch (index) {
                case 0:
                    copyLobby.splice(index, 1)
                    orderedLobby = copyLobby.slice()
                    copyLobby.map((data, keys)=>{
                        orderedLobby.splice(keys,1,data.user)
                    })
                    break;
                case 1:
                    copyLobby.splice(index, 1)
                    orderedLobby = copyLobby.slice()
                    copyLobby.map((data, keys) => {
                        if (keys === 0) {
                            orderedLobby.splice(copyLobby.length - 1 ,1,data.user)
                        }
                        else {
                            orderedLobby.splice(keys - 1 ,1,data.user)
                        }
                    })
                    break;
                case 2:
                    copyLobby.splice(index, 1)
                    orderedLobby = copyLobby.slice()
                    copyLobby.map((data, keys) => {
                        if (keys === 0) {
                            orderedLobby.splice(copyLobby.length - 2 ,1,data.user)
                        } else if (keys === 1) {
                            orderedLobby.splice(copyLobby.length - 1 ,1,data.user)
                        }
                        else {
                            orderedLobby.splice(keys - 1 ,1,data.user)
                        }
                    })
                    break;
                case 3:
                    copyLobby.splice(index, 1)
                    orderedLobby = copyLobby.slice()
                    copyLobby.map((data, keys) => {
                        if (keys === 0) {
                            orderedLobby.splice(copyLobby.length - 3 ,1,data.user)
                        } else if (keys === 1) {
                            orderedLobby.splice(copyLobby.length - 2 ,1,data.user)
                        }
                        else if (keys === 2) {
                            orderedLobby.splice(copyLobby.length - 1 ,1,data.user)
                        }
                        else {
                            orderedLobby.splice(keys - 1 ,1,data.user)
                        }
                    })
                    break;
                case 4:
                    copyLobby.splice(index, 1)
                    orderedLobby = copyLobby.slice()
                    copyLobby.map((data, keys) => {
                        if (keys === 0) {
                            orderedLobby.splice(copyLobby.length - 4 ,1,data.user)
                        } else if (keys === 1) {
                            orderedLobby.splice(copyLobby.length - 3 ,1,data.user)
                        } else if (keys === 2) {
                            orderedLobby.splice(copyLobby.length - 2 ,1,data.user)
                        } else if (keys === 3) {
                            orderedLobby.splice(copyLobby.length - 1 ,1,data.user)
                        }
                        else {
                            orderedLobby.splice(keys - 1 ,1,data.user)
                        }
                    })
                    break;
                case 5:
                    copyLobby.split(index, 1)
                    orderedLobby = copyLobby.slice()
                    copyLobby.map((data, keys) => {
                        if (keys === 0) {
                            orderedLobby.splice(copyLobby.length - 5 ,1,data.user)
                        } else if (keys === 1) {
                            orderedLobby.splice(copyLobby.length - 4 ,1,data.user)
                        } else if (keys === 2) {
                            orderedLobby.splice(copyLobby.length - 3 ,1,data.user)
                        } else if (keys === 3) {
                            orderedLobby.splice(copyLobby.length - 2 ,1,data.user)
                        } else if (keys === 4) {
                            orderedLobby.splice(copyLobby.length - 1 ,1,data.user)
                        }
                        else {
                            orderedLobby.splice(keys - 1 ,1,data.user)
                        }
                    })
                    break;
                default:
                    break;
            }
            console.log('==========')
            console.log(orderedLobby)
            console.log('==========')
            localStorage.setItem('turn', orderedLobby)
            localStorage.setItem('user', user)
            localStorage.setItem('gameId', gameId)

            window.location.href = "http://localhost:3000/game"
        })

    }


    render() {

        if (this.state.joinedGame) {
            return (
                <Container fluid>
                    <Col style={{
                        border: '2px solid moccasin',
                        borderRadius: '10px',
                        backgroundColor: 'palegoldenrod'
                    }}> {this.state.message.txt === undefined ? <a></a> : this.showMessage()}
                        <Row>
                            <h4>Lobby: {this.state.joinedGame}</h4>
                            <br />
                        </Row>
                        <Row>

                        </Row>

                        <Row>
                            <h5>Players:</h5>
                        </Row>

                        <Lobby
                            userLobby={Object.values(this.state.lobby)}
                            actionLaunchGame={this.launchGame}
                        />
                        <br />
                        <Row>
                            <Container fluid>
                                <Row className="justify-content-md-center">
                                    <Col fluid>
                                        <Button variant="outline-info" onClick={this.handleLeave} block>Leave</Button>
                                    </Col>
                                    <Col fluid>
                                        {this.state.playerToken === 1 ? this.state.lobby.length >= 4 ? <Button variant="outline-info" onClick={() => this.launchGame()}> Start Game </Button> : <Button variant="outline-secondary" onClick={() => console.log(this.state.lobby)} block > Start Game </Button> : <p></p>}
                                    </Col>
                                </Row>
                            </Container>
                        </Row>



                    </Col>
                </Container>
            )
        }
        else if (this.state.createGame) {
            return (
                <Container>
                    <Col style={{
                        border: '2px solid moccasin',
                        borderRadius: '10px',
                        backgroundColor: 'palegoldenrod'
                    }}> {this.state.message.txt === undefined ? <a></a> : this.showMessage()}

                        <Row>
                            <Container>
                                <Col>
                                    <h2>Create a game</h2>
                                    <br /><br />


                                    <form onSubmit={this.handleCreate}>

                                        <label>
                                            <p>Lobby's name :</p>
                                            <input type="text" value={this.state.gameId} onChange={text => this.setState({ gameId: text.target.value })} />
                                        </label>
                                        <br /><br />

                                        <label>
                                            <p>Amount of player : </p>
                                            <Select options={options} value={this.state.maxPlayers} onChange={value => this.setState({ maxPlayers: value })} />
                                        </label>
                                        <br /><br />
                                        <input type="submit" value="Create lobby" />
                                        <Button variant="outline-info" size="lg" onClick={() => this.handleExitCreate()}>exit</Button>
                                    </form>



                                </Col>
                            </Container>
                        </Row>
                    </Col>
                </Container>
            );
        }
        else {
            return (
                <Container fluid>
                    <Col style={{
                        border: '2px solid moccasin',
                        borderRadius: '10px',
                        backgroundColor: 'palegoldenrod'
                    }}> {this.state.message.txt === undefined ? <a></a> : this.showMessage()}
                        <Row>
                            <Button
                                variant="outline-info"
                                size="lg"
                                onClick={() => this.handleLobby()}
                            >
                                Create Game
                            </Button>
                            <br />
                        </Row>
                        <Col>
                            <Row>
                                <form onSubmit={this.handleSubmit}>

                                    <Row>
                                        <h4>Join with a code</h4>
                                        <br />
                                    </Row>

                                    <input type="text" value={this.state.gameCode} onChange={text => this.setState({ gameCode: text.target.value })} />

                                    <input type="submit" value="Enter Game" />
                                </form>
                            </Row>
                        </Col>
                        <Row>

                            <Col>
                                <Row>
                                    <h4>Find games</h4>
                                    <br />
                                </Row>
                                {this.state.pool === undefined ? <br /> : <Pool
                                    pool={this.state.pool}
                                    actionJoin={this.handleJoin}
                                />}

                            </Col>
                        </Row>
                    </Col>
                </Container>
            )
        }


    }
}
export default Home