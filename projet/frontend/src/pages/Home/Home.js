import React from "react";

import { Button, Row, Col, Container } from 'react-bootstrap'

export default function Home(){
    return (
            <Container fluid>
                <Col style = {{
                    border: '2px solid moccasin',
                    borderRadius: '10px',
                    backgroundColor: 'palegoldenrod'
                    }}>
                    <Row> 
                                
                        <Button variant="outline-primary" style={{display: 'block',margin: 'auto'}}>Create Game</Button>
                        <br/>
                    </Row>
                    <Row>
                        {/* Ici un composant réactif qui changera selon ce qu'on touche (Genre le home c'est la liste des games, puis lorsque l'on naviguera sur la barre "menu", cela changera ce qu'il y a ici.) 
                        En attendant je hardcode le listing des game disponible*/}
                        <Container>
                            <Col>
                                <Row>
                                    <h4>Find games</h4>
                                    <br/>
                                </Row>
                                <Row>
                                    <Button variant="success">Joinable</Button><br/>__
                                    <p>  Victor's party</p>
                                    <p>[3/4]</p>
                                </Row>
                                <br/>
                                <Row>
                                    <Button variant="danger" disabled>Full</Button><br/>__
                                    <p>  Gamepass Challenge</p>
                                    <p>[4/4]</p>
                                </Row>
                            </Col>
                        </Container>
                    </Row>
                </Col>
            </Container>      
    )
}