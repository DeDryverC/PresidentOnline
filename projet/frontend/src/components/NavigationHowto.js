import React from 'react';
import { NavLink } from 'react-router-dom';
import "./NavigationHome.css" 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'


const NavigationHowto =() => {
    return (
        <main>
            <Container fluid="lg"> 
                <Row>
                    <Col md="auto" fluid="md" style = {{
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
            <Container>
                <Row>
                    <Col>
                       <Container>
                            <Col md= 'auto' style = {{
                            border: '2px solid moccasin',
                            borderRadius: '10px',
                            backgroundColor: 'palegoldenrod'
                            }}>
                                <Row>
                                    <h2 style={{
                                    display: 'block',
                                    margin: 'auto'
                                }}> Menu </h2>
                                </Row>
                                <Row>
                                    <NavLink to="/howto" exact className ="hover" activeClassName='nav-active'>How to play ?</NavLink>
                                </Row>
                                <Row>
                                    <NavLink to="/rules" exact className ="hover" activeClassName='nav-active'>Rules</NavLink>
                                </Row>
                            </Col>
                        </Container>
                    </Col>
                    <Col>
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
                    </Col>
                </Row>
            
            </Container>
        </main>
    );
};

export default NavigationHowto;