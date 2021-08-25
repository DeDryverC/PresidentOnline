import React from "react";
import { Row, Col, Container } from 'react-bootstrap'

export default function Howto(){
    return (
            <Container fluid>
                <Col style = {{
                    border: '2px solid moccasin',
                    borderRadius: '10px',
                    backgroundColor: 'palegoldenrod',
                    bottom: 0,
                    overflowY: 'scroll',
                    maxHeight: '500px',
                    width: '700px'
                    }}>
                    <Row>        
                        <h2>How to play </h2>
                    </Row>
                    <Row>
                        {/* Ici un composant réactif qui changera selon ce qu'on touche (Genre le home c'est la liste des games, puis lorsque l'on naviguera sur la barre "menu", cela changera ce qu'il y a ici.) 
                                    En attendant je hardcode le listing des game disponible*/}
                        <Container>
                            <Col>
                                <Row>
                                    <ul>
                                    <li> Play as guest : </li><br></br>
                                        <ul>
                                            <li> first click on the right top button, log as guest </li>
                                            <li> You can now play President Online by clicking on create a game or join a game ! </li>
                                        </ul>  <br></br>                                          
                                    <li> Play logged : </li><br></br>
                                        <ul>
                                            <li> Click on the right top button, Sign in, to create an account and fill the fields with your information </li>
                                            <li> If you already have an account, click on the right top button, Log in, insert your information, and then click on the log button   </li>
                                        </ul><br></br>
                                    <li> Create a game : </li><br></br>
                                        <ul>
                                            <li> Click on the create a game button, insert the name of the lobby and select the amount of players that you want to play with </li>
                                        </ul><br></br>
                                    <li> Join a game : </li><br></br>
                                        <ul>
                                            <li> Check that the lobby is not full </li>
                                            <li> If it's not, just click on the button " join " and you will be redirect to the lobby </li>
                                        </ul><br></br>
                                    <li> Join a game with friends : </li>
                                        <ul><br></br>
                                        <li> Every game has a code, just give this code to your friends, they insert this code and then, click on "enter the game"</li>
                                    </ul><br></br>
                                    <li> Use a card : </li>
                                        <ul><br></br>
                                            <li> Select the card(s) that you want to play with, then click on play </li>
                                        </ul><br></br>
                                    
                                    </ul>
                                </Row>
                            </Col>
                        </Container>
                    </Row>
                </Col>
            </Container>

    )
}
