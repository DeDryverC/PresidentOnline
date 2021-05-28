
import React from "react";
import { Button, Row, Col, Container } from 'react-bootstrap'
import Select from 'react-select'


const options = [
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },

]


class CreateGame extends React.Component {



    // TODO : deplacer les states que ça ne fasse pas de pb de collision
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "testPseudo",
            gameId: undefined,
            maxPlayers: undefined,
            playerToken: undefined,
            lobby: undefined,
            joinedGame: undefined,
            pool: undefined,
        }
        this.handleCreate = this.handleCreate.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:5000/pool')
            .then(response => response.json())
            .then(json => {
                this.setState({ pool: json });
            })

    }

    /* sendCards = () =>{
        fetch('http://localhost:5000/deck',{
             
              method:'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"true"
              },
              body: JSON.stringify({
                gameId:this.state.gameId,
                lobby:this.state.lobby               
              }),
              
              
            }).then(response => response.json())
            .then(json => {
                    console.log(json.message)
                
        
                
              }).catch((error) => {
               
                
                
                alert("Echec sending cards");
                
          });
          alert("cards send")
          
    };*/

    handleCreate(event) {
        event.preventDefault();
        let isIn = false;
        for (let item of this.state.pool) {
            if (this.state.gameId === item.gameId) { isIn = true }
        }


        if (!isIn) {

            //creating table for the game
            fetch('http://localhost:5000/table', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Acces-Control-Allow-Origin": "true"
                },
                body: JSON.stringify({
                    gameId: this.state.gameId,
                }),

            })

            //setting the game in the game pool
            fetch('http://localhost:5000/spool', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Acces-Control-Allow-Origin": "true"
                },
                body: JSON.stringify({
                    gameId: this.state.gameId,
                    maxPlayers: this.state.maxPlayers.value,
                }),

            })

            //creates lobby for the game
            fetch('http://localhost:5000/lobby', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Acces-Control-Allow-Origin": "true"
                },
                body: JSON.stringify({
                    gameId: this.state.gameId,
                }),

            })

            //increments player count in gamepool
            fetch('http://localhost:5000/icount', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    "Acces-Control-Allow-Origin": "true"
                },
                body: JSON.stringify({
                    gameId: this.state.gameId,
                })
            });

            this.putPlayerInLobby(this.state.gameId, this.state.pseudo);
            localStorage.setItem("gameId", this.state.joinedGame);
            localStorage.setItem("pseudo", this.state.pseudo);
        }
        else {
            alert("This name is already used");
        }

    };

    async putPlayerInLobby(gameId, pseudo) {
        //puts himself in the lobby as owner
        await fetch('http://localhost:5000/lobbyp', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                gameId: gameId,
                pseudo: pseudo,
                token: 1,
            })
        })
            .then(response => response.json())
            .then(json => {


            })

        this.setState({ playerToken: 1 });


        //fetches the lobby
        await fetch(`http://localhost:5000/lobby/${gameId}`)
            .then(response => response.json())
            .then(json => {
                this.setState({ lobby: json });
                console.log(json)
            })

        this.setState({ joinedGame: gameId });
    }


    async handleRefresh(gameId) {
        await fetch(`http://localhost:5000/lobby/${gameId}`)
            .then(response => response.json())
            .then(json => {
                this.setState({ lobby: json });
            })
    }

    handleLeave(gameId) {
        fetch('http://localhost:5000/delete', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                gameId: gameId,
            })
        })

        fetch('http://localhost:5000/delete', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                gameId: (gameId + "Lobby"),
            })
        })

        fetch('http://localhost:5000/poold', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                gameId: (gameId),
            })
        })


        this.setState({ joinedGame: undefined });
    }

    renderLobby() {
        let itemsToPush = []
        for (let item in this.state.lobby) {
            console.log(this.state.lobby[item]);
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
                <Button variant="outline-info" size="lg" onClick={() => this.handleRefresh(this.state.joinedGame)}> Refresh </Button>
            </Row>
        )
        return (itemsToPush)
    };

    renderLobbyOwner() {
        if (this.state.playerToken === 1) {
            return (<Row><Button variant="outline-info" size="lg"> Start Game </Button></Row>);
        }

    };

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
                <Container>
                    <Col style={{
                        border: '2px solid moccasin',
                        borderRadius: '10px',
                        backgroundColor: 'palegoldenrod'
                    }}>

                        <Row>
                            {/* Ici un composant réactif qui changera selon ce qu'on touche (Genre le home c'est la liste des games, puis lorsque l'on naviguera sur la barre "menu", cela changera ce qu'il y a ici.) 
                                            En attendant je hardcode le listing des game disponible*/}
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
                                    </form>



                                </Col>
                            </Container>
                        </Row>
                    </Col>
                </Container>
            );
        }



    }
}

export default CreateGame;