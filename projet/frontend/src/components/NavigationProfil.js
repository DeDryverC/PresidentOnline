import React from 'react';
import { NavLink } from 'react-router-dom';
import "./NavigationAutres.css" 
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'



const NavigationProfil =() => {
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
                                    <h2 style={{textAlign: "center", fontSize: 32}}> More </h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm='auto'>
                                    <NavLink to="/historique" className ="hover" activeClassName='nav-active'> 
                                        <h4 style={{textAlign: "center", fontSize: 24}}>Historique</h4>
                                    </NavLink>
                                </Col>
                                <Col/>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default NavigationProfil;