import React from "react";
import { Component } from "react";

import { ButtonGroup, Button, Row, Col, Container } from 'react-bootstrap'
import App from "../../App";
import Profil from "../Profil/Profil";

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            gameCode : '',
            gameFromCode: '',
            pseudo: 'testPseudo',
            pool: undefined,

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost:5000/pool')
            .then(response => response.json())
            .then(json => {
                this.setState({pool: json});
            })
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(`http://localhost:5000/game/${this.state.gameCode}`)
            .then(response => response.json())
            .then(json => {
                this.setState({gameFromCode: json[0].gameId});
                console.log(this.state.gameFromCode)
            })
        
        
        fetch('http://localhost:5000/lobbyp', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                gameId: this.state.gameFromCode,
                pseudo: this.state.pseudo,
                token: false,
            })
        })

        fetch('http://localhost:5000/icount', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                gameId: this.state.gameFromCode,
            })
        })

    }


    handleJoin(gameId){
        fetch('http://localhost:5000/lobbyp', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body:{
                gameId: this.state.gameId,
                pseudo: this.state.pseudo,
                token: false,
            }
        })
        fetch('http://localhost:5000/icount', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body:{
                gameId: this.state.gameId,
            }
        })
        
    }

    renderGameChoices(){
        let itemsToPush = []
        for (let item in this.state.pool){
            let gameId = this.state.pool[item].gameId;
            if(this.state.pool[item].currPlayers === this.state.pool[item].maxPlayers){
                itemsToPush.push(<Row><Button variant="danger">Full [{this.state.pool[item].currPlayers}/{this.state.pool[item].maxPlayers}]</Button><p>{gameId}</p></Row>)
            }
            else{
                itemsToPush.push(<Row><Button variant="success" onClick={() => this.handleJoin(gameId)}>Join [{this.state.pool[item].currPlayers}/{this.state.pool[item].maxPlayers}]</Button><p>{gameId}</p></Row>)
            }
            
        }
        return(itemsToPush);
    }

    render() {
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
                                    <br/>
                                </Row>
                            
                                <input type="text" value={this.state.gameCode} onChange={text => this.setState({ gameCode: text.target.value })} />
                            
                                <input type="submit" value="Enter Game" />
                            </form>
                        </Row>
                    </Col>
                    <Row>
                        <Container>
                            <Col>
                                <Row>
                                    <h4>Find games</h4>
                                    <br />
                                </Row>
                                
                                    {this.renderGameChoices()}
                                
                            </Col>
                        </Container>
                    </Row>
                </Col>
            </Container>
        )

    }
}
export default Home