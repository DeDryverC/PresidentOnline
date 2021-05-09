import React, { Component } from "react";
import { Button, Row, Col, Container } from 'react-bootstrap';
import Carte from '../../components/Carte'
//import Image from 'react-native'
// Recevoir les données du deck visible,
// boucle for sur le length de data abt *
// boucle for sur les length des cartes des autres joueurs
// bouton gauche pass
// bouton droite pick
// les cartes sont clickable
// TODO FAIRE UN COMPONENT CARTE QUI AFFICHE LES CARTES SELON LEURS IDS

class Game extends Component {
    state = {
        player1: null,
        player2: null,
        player3: null,
        player4: null,
        player5: null,
        playersData: null,
        visible_deck: null,
        token: null,
        data: null,
        playerCard: []
    }


    /* Generate game, initialiser le deck du joueur, l'id du joueur ainsi que le nombre de carte chez les autres joueur, ainsi que l'ID des autre joueurs, a hasher plus tard */
    generateGame = () => {
        const rdata = [['player 1',4],['player 2', 5]]
        this.setState({players: rdata})

    }

    playerdata = (number) => {
        const player = this.state.playersData
        console.log(player)
    }

    componentDidMount() {
        this.generateGame();
        fetch(`http://localhost:5000/deck/GameTest/1`)
            .then(response => response.json())
            .then(json => {
                this.setState({ data: json })
                json.forEach(({ user, card }) => {
                    this.setState(state => {
                        const playerCard = state.playerCard.concat(card)

                        return {
                            playerCard,
                        };
                    })
                })
                console.log("sheeesh  " + this.state.playerCard)
                console.log(this.state.players)
            
            }
        )
        fetch('http://localhost:5000/ccount/GameTest/1')
            .then(response => response.json())
            .then(json => {
                this.setState({playersData: json})
                json.forEach(({ user, Ncard}) => { 
                    //trouver une solution jpp de reflechir => Avoir une liste des joueur : cartes serait opti, mais jsp comment faire avec le state
                })
            })    }

    render() {
        return (
            <div style={{
                border: '1px solid black',
                backgroundColor: 'lightgreen',
                width: '100%',
                height: '100%',
            }}>
                <Container>

                    <Row>
                        <Col/>
                        <Col style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} ><span> Joueur 2 </span></Col>
                        <Col/>
                    </Row>
                    <br/>
                    <Row>
                        <Col>{this.playerdata(0)}</Col>
                        <Col><span style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}> carte visible </span></Col>
                        <Col><span style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>joueur 3</span></Col>
                    </Row>

                </Container>
                <br></br>
                <Container>
                    <Row>
                        <Col style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><Button onClick={() => console.log(this.state.data)}>pass</Button></Col>
                        <Col><Row style={{display: 'flex',  justifyContent:'center', alignItems:'center', width:'150%'}}>{
                            this.state.playerCard.map((value, index) => {
                                return <Carte num={value} index={index} />
                            })
                        }</Row></Col>
                        
                        <Col style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><Button onClick={() => console.log(this.state.data)}>PICK</Button></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Game;