import React from "react";
import NavigationHowto from "../../components/NavigationHowto";
import { ButtonGroup, Button, Row, Col, Container } from 'react-bootstrap'

export default function Howto(){
    return (
        <html>
            <Container>
                <Col style = {{
                    border: '2px solid moccasin',
                    borderRadius: '10px',
                    backgroundColor: 'palegoldenrod'
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
                                            <li> blabla </li>
                                            <li> blabla2 </li>
                                        </ul>  <br></br>                                          
                                    <li> Play logged : </li><br></br>
                                        <ul>
                                            <li> blabla </li>
                                        </ul><br></br>
                                    <li> Create a game : </li><br></br>
                                        <ul>
                                            <li> blabla </li>
                                        </ul><br></br>
                                    <li> Join a game : </li><br></br>
                                        <ul>
                                            <li> blabla </li>
                                        </ul><br></br>
                                    <li> Join a game with friends : </li>
                                        <ul><br></br>
                                        <li> blabla </li>
                                    </ul><br></br>
                                    <li> Use a card : </li>
                                        <ul><br></br>
                                            <li> blabla </li>
                                        </ul><br></br>
                                    <li> Change cards : </li>
                                        <ul><br></br>
                                            <li> blabla </li>
                                        </ul><br></br>
                                    </ul>
                                </Row>
                            </Col>
                        </Container>
                    </Row>
                </Col>
            </Container>
        </html>

    )
}