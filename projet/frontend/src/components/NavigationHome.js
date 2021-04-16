import React from 'react';
import { NavLink } from 'react-router-dom';
import "./NavigationHome.css" 
import { ButtonGroup, Button, Row, Col, Container } from 'react-bootstrap'


const NavigationHome =() => {
    return (
        <main>
            <Container fluid="lg"> 
                <Row>
                    <Col md="auto" style = {{
                        border: '2px solid moccasin',
                        borderRadius: '10px',
                        backgroundColor: 'palegoldenrod'
                        }}>
                        <NavLink to="/" exact className ="hover" activeClassName='nav-active'>
                            <h1 style={{
                                fontSize: 64,
                                }}>Président Online</h1>
                        </NavLink>
                    </Col>
                    <Col/>
                    <Col/>
                    <Col/>
                    <Col md='auto'>

                    {/* On déplacera le contenu de ce container par une fonction Auth qui, lors de la connexion affichera un bouton profil */}
                        <Container fluid="lg" style = {{ 
                            border: '2px solid moccasin',
                            borderRadius: '10px',
                            backgroundColor: 'palegoldenrod'
                            }}>
                            <Row className="justify-content-md-center">
                                <Col md={8}>
                                    <h2 style={{textAlign: "center", fontSize: 32}}> Account </h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm='auto'>
                                    <NavLink to="/signin" className ="hover" activeClassName='nav-active'> 
                                        <h4 style={{textAlign: "center", fontSize: 24}}>Sign In</h4>
                                    </NavLink>
                                </Col>
                                <Col/>
                                <Col sm='auto'>
                                    <NavLink to="/login" className ="hover" activeClassName='nav-active'> 
                                        <h4 style={{textAlign: "center", fontSize: 24}}>Log In</h4>
                                    </NavLink>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
                
                        {/*<li className="nav-profil"> Profile
                            <ul classname="comp-profil">
                                <NavLink to="/stats" className ="hover" activeClassName='nav-active'> 
                                <li>Stats</li>
                                </NavLink>
                                <NavLink to="/myprofile" className ="hover" activeClassName='nav-active'> 
                                <li>Me</li>
                                </NavLink>
                                <NavLink to="/historique" className ="hover" activeClassName='nav-active'> 
                                <li>Historique</li>
                        </NavLink>
                            </ul>
                       </li>*/}
            <br/>
            <Container fluid="lg">
                <Row>
                    <Col fluid="xs" lg={2}>
                    
                       <Container style={{
                           height: 200,
                       }}>
                            <Col md='auto' style = {{
                            border: '2px solid moccasin',
                            borderRadius: '10px',
                            backgroundColor: 'palegoldenrod',
                            height : '500px'
                            }}>
                                <Row>
                                    <h2 style={{
                                    display: 'block',
                                    margin: 'auto'
                                }}> Menu </h2>
                                </Row>
                                <br/><br/>
                                <Row className="justify-content-md-center">
                                    <ButtonGroup vertical center>
                                        <Button variant="outline-info" size="lg">
                                            <NavLink to="/" exact className ="hover" activeClassName='nav-active'> Home </NavLink>
                                        </Button>
                                        <br/>
                                        <Button variant="outline-info" size="lg">
                                            <NavLink to="/howto" exact className ="hover" activeClassName='nav-active'>How to play ?</NavLink>
                                        </Button>
                                        <br/>
                                        <Button variant="outline-info" size="lg">
                                            <NavLink to="/rules" exact className ="hover" activeClassName='nav-active'>Rules</NavLink>
                                        </Button>
                                    </ButtonGroup>
                                </Row>
                            </Col>
                        </Container>
                    </Col>
                    <Col fluid>
                    {/* DYNAMIC CONTAINER FOR RULES, HOW TO PLAY ETC*/}
                        <Container className="Dynamic" fluid="lg">
                            <Col style = {{
                            border: '2px solid moccasin',
                            borderRadius: '10px',
                            backgroundColor: 'palegoldenrod'

                            }}>
                                <Row> 
                                    <Button variant="outline-primary" style={{
                                    display: 'block',
                                    margin: 'auto'
                                }}>Create Game</Button>
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
                    </Col>
                </Row>
            
            </Container>
        </main>
    );
};

export default NavigationHome;