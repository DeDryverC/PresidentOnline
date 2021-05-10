import React, { Component } from "react";
import { Button, Row, Col, Container } from 'react-bootstrap';
import _default from "react-bootstrap/esm/CardColumns";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
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
        players: [],
        player1: { pseudo: null, cards: [], set: false },
        player2: { pseudo: 'shhesssh', cards: [], set: false },
        player3: { pseudo: null, cards: [], set: false },
        player4: { pseudo: null, cards: [], set: false },
        player5: { pseudo: null, cards: [], set: false },
        playersData: null,
        visible_deck: null,
        token: null,
        data: null,
        playerCard: []
    }


    /* Generate game, initialiser le deck du joueur, l'id du joueur ainsi que le nombre de carte chez les autres joueur, ainsi que l'ID des autre joueurs, a hasher plus tard */





    generatePlayersData = () => {
        const players = this.state.players
        const p1 = this.state.player1
        const p2 = this.state.player2
        const p3 = this.state.player3
        const p4 = this.state.player4
        const p5 = this.state.player5
        players.map(
            (data, key) => {
                console.log(key)
                if (key === 0) {
                    if (p1.set === false) {
                        console.log("?")
                        const dataf = data.split('|')
                        p1.pseudo = dataf[0]
                        for (let i = 0; i < dataf[1]; i++) { p1.cards.push(0) }
                        p1.set = true;
                    }
                } if (key === 1) {
                    if (p2.set === false) {
                        const dataf = data.split('|')
                        p2.pseudo = dataf[0];
                        for (let i = 0; i < dataf[1]; i++) { p2.cards.push(0) }
                        p2.set = true;
                    }
                } if (key === 2) {
                    if (p3.set === false) {
                        const dataf = data.split('|')
                        p3.pseudo = dataf[0];
                        for (let i = 0; i < dataf[1]; i++) { p3.cards.push(0) }
                        p3.set = true;
                    }
                } if (key === 3) {
                    if (p4.set === false) {
                        const dataf = data.split('|')
                        p4.pseudo = dataf[0]
                        for (let i = 0; i < dataf[1]; i++) { p4.cards.push(0) }
                        p4.set = true;
                    }
                } if (key === 4) {
                    if (p5.set === false) {
                        const dataf = data.split('|')
                        p5.pseudo = dataf[0]
                        for (let i = 0; i < dataf[1]; i++) { p5.cards.push(0) }
                        p5.set = true;
                    }
                }
            }
        )
        this.setState({ player1: p1, player2: p2, player3: p3, player4: p4, player5: p5 })
    }

    isThereMorePlayers = () => {
        if(this.state.player4.pseudo === null){
            return;
        }
        if(this.state.player5.pseudo !== null){
            return (
                <Row>
                    <Col><Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{
                            this.state.player4.cards.map((value,key) =>{
                                return <Carte num={value} index={key} identity='othercards'/>
                            })}
                            </Row>
                            <br/>
                            {this.state.player4.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player4.pseudo}</span> : <span></span>}
                            </Col>
                    <Col></Col>
                    <Col><Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{
                            this.state.player5.cards.map((value,key) =>{
                                return <Carte num={value} index={key} identity='othercards'/>
                            })}
                            </Row>
                            <br/>
                            {this.state.player5.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player5.pseudo}</span> : <span></span>}
                            
                    </Col>
                </Row>)
        }
        if(this.state.player5.pseudo === null){
            return (
                <Row>
                    <Col><Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{
                            this.state.player4.cards.map((value,key) =>{
                                return <Carte num={value} index={key} identity='othercards'/>
                            })}
                            </Row>
                            <br/>
                            {this.state.player4.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player4.pseudo}</span> : <span></span>}
                            </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            )
        }
        


    }
    componentWillMount() {

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
            }
            )
        fetch('http://localhost:5000/ccount/GameTest/1')
            .then(response => response.json())
            .then(json => {
                this.setState({ playersData: json })
                json.forEach(({ user, Ncards }) => {
                    const passerelle = user + '|' + Ncards
                    this.setState(state => {
                        const players = state.players.concat(passerelle)
                        return {
                            players,
                        };
                    }, this.generatePlayersData)
                })
            })

    }

    componentDidMount() {

    }


    componentDidUpdate() {
    }


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
                        <Col />
                        <Col><Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{
                            this.state.player2.cards.map((value,key) =>{
                                return <Carte num={value} index={key} identity='othercards'/>
                            })}
                            </Row>
                            <br/>
                            {this.state.player2.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player2.pseudo}</span> : <span></span>}
                            

                        </Col>
                        <Col />
                    </Row>
                    <br />
                    <Row>
                        <Col><Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{
                            this.state.player1.cards.map((value,key) =>{
                                return <Carte num={value} index={key} identity='othercards' />
                            })}</Row>
                            {this.state.player1.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player1.pseudo}</span> : <span></span>}
                                
                            
                        </Col>
                        <Col><span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200%'}}> carte visible </span></Col>
                        <Col><Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{
                            this.state.player3.cards.map((value,key) =>{
                                return <Carte num={value} index={key} identity='othercards' />
                            })}</Row>
                            {this.state.player3.pseudo !== null ? <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{this.state.player3.pseudo}</span> : <span></span>}
                                
                            
                        </Col>
                    </Row><br/>
                    {this.isThereMorePlayers()}                    
                </Container>
                <br></br>
                <Container>
                    <Row>
                        <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Button onClick={() => console.log(this.state.playersData)}>pass</Button></Col>
                        <Col><Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>{
                            this.state.playerCard.map((value, index) => {
                                return <Carte num={value} index={index} identity='cards' />
                            })
                        }</Row></Col>

                        <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Button onClick={() => console.log(this.state.player1)}>PICK</Button></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Game;