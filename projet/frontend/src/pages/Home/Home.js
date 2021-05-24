import React from "react";
import { Component } from "react";

import { ButtonGroup, Button, Row, Col, Container } from 'react-bootstrap'
import App from "../../App";
import Profil from "../Profil/Profil";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameCode: '',
            gameFromCode: '',
            pseudo: 'testPseudo',
            pool: undefined,
            joinedGame: undefined,
            lobby: undefined,
            playerToken: undefined,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:5000/pool')
            .then(response => response.json())
            .then(json => {
                this.setState({ pool: json });
            })

    }


    //handle joining with a code
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
            if (this.state.pool[item].gameId == localStorage.getItem("joinedGame")) {
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
    async handleJoin(gameId) {
        await fetch('http://localhost:5000/lobbyp', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                gameId: gameId,
                pseudo: this.state.pseudo,
                token: 0,
            })
        });
        fetch('http://localhost:5000/icount', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                gameId: gameId,
            })
        });
        fetch(`http://localhost:5000/lobby/${gameId}`)
            .then(response => response.json())
            .then(json => {
                this.setState({ lobby: json });
                console.log(json);
            })



        this.setState({ token: 1 });
        this.setState({ joinedGame: gameId });


    }

    //handle leaving a lobby
    handleLeave(gameId) {
        fetch('http://localhost:5000/lobbyr', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                gameId: gameId,
                pseudo: this.state.pseudo,
            })
        });

        fetch('http://localhost:5000/dcount', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                gameId: gameId,
            })
        });

        this.setState({ joinedGame: undefined });
    }

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
        return (itemsToPush);
    }

    renderLobby() {
        let itemsToPush = []
        for (let item in this.state.lobby) {
            console.log(this.state.lobby[item]);
            if (this.state.lobby[item].token == 1) {
                itemsToPush.push(<Row><p>{this.state.lobby[item].user}</p><p>___</p><p>Owner</p></Row>)
            }
            else {
                itemsToPush.push(<Row><p>{this.state.lobby[item].user}</p><p>___</p><p>Player</p></Row>)
            }

        }
        itemsToPush.push(<Row><Button variant="outline-info" size="lg" onClick={() => this.handleLeave(this.state.joinedGame)}> Leave lobby </Button></Row>)
        return (itemsToPush)
    }

    renderLobbyOwner() {
        if (this.state.playerToken == 1) {
            return (<Row><Button variant="outline-info" size="lg"> Start Game </Button></Row>);
        }

    }

    render() {

        if (this.state.joinedGame) {
            return (
                <Container fluid>
                    <Col style={{
                        border: '2px solid moccasin',
                        borderRadius: '10px',
                        backgroundColor: 'palegoldenrod'
                    }}>
                        <Row>
                            <h4>Lobby: {this.state.joinedGame}</h4>
                            <br />
                        </Row>
                        <Row>

                        </Row>

                        <Row>
                            <h5>Players:</h5>
                        </Row>

                        {this.renderLobby()}
                        {this.renderLobbyOwner()}

                    </Col>
                </Container>
            )
        }
        else {
            return (
                <Container fluid>
                    <Col style={{
                        border: '2px solid moccasin',
                        borderRadius: '10px',
                        backgroundColor: 'palegoldenrod'
                    }}>
                        <Row>
                            <Button
                                variant="outline-info"
                                size="lg"
                                onClick={() => this.props.OnClick("crgame")}
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
                                {this.renderGameChoices()}

                            </Col>

                        </Row>
                    </Col>
                </Container>
            )
        }


    }
}
export default Home