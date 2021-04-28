import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonGroup, Button, Row, Col, Container } from 'react-bootstrap';
import { useState } from 'react';
import Home from '../pages/Home/Home';
import Howto from '../pages/howto/howto'; 
import Rules from '../pages/Rules/Rules';

class Navigation extends Component {

    pageSwitch= () => {

        const actualPage = this.props.actualPage;
        
        switch(actualPage){
            case 'home':
                return <Home/>;
            case 'howto':
                return <Howto/>;
            case 'rules':
                return <Rules/>;
            default :
                return <Home/>;
        }
        
      }

    render() {
        return (
            <main>
                <Container fluid="lg">
                    <Row>
                        <Col md="auto" style={{
                            border: '2px solid moccasin',
                            borderRadius: '10px',
                            backgroundColor: 'palegoldenrod'
                        }}>
                            <NavLink to="/" exact className="hover" activeClassName='nav-active'>
                                <h1 style={{
                                    fontSize: 64,
                                }}>Président Online</h1>
                            </NavLink>
                        </Col>
                        <Col />
                        <Col />
                        <Col />
                        <Col md='auto'>

                            {/* On déplacera le contenu de ce container par une fonction Auth qui, lors de la connexion affichera un bouton profil */}
                            <Container fluid="lg" style={{
                                border: '2px solid moccasin',
                                borderRadius: '10px',
                                backgroundColor: 'palegoldenrod'
                            }}>
                                <Row className="justify-content-md-center">
                                    <Col md={8}>
                                        <h2 style={{ textAlign: "center", fontSize: 32 }}> Account </h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='auto'>
                                        <NavLink to="/signin" className="hover" activeClassName='nav-active'>
                                            <h4 style={{ textAlign: "center", fontSize: 24 }}>Sign In</h4>
                                        </NavLink>
                                    </Col>
                                    <Col />
                                    <Col sm='auto'>
                                        <NavLink to="/login" className="hover" activeClassName='nav-active'>
                                            <h4 style={{ textAlign: "center", fontSize: 24 }}>Log In</h4>
                                        </NavLink>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <br/>
                <Container fluid="lg">
                    <Row>
                        <Col fluid="xs" lg={2}>
                            <Container style={{
                                height: 200,
                            }}>
                                <Col md='auto' style={{
                                    border: '2px solid moccasin',
                                    borderRadius: '10px',
                                    backgroundColor: 'palegoldenrod',
                                    height: '500px'
                                }}>
                                    <Row>
                                        <h2 style={{
                                            display: 'block',
                                            margin: 'auto'
                                        }}> Menu </h2>
                                    </Row>
                                    <br /><br />
                                    <Row className="justify-content-md-center">
                                        <ButtonGroup vertical center>
                                            <Button
                                                variant="outline-info"
                                                size="lg"
                                                onClick={() => this.props.actionSwitchPage("home")}
                                            >Home</Button>
                                            <br />
                                            <Button
                                                variant="outline-info"
                                                size="lg"
                                                onClick={() => this.props.actionSwitchPage("howto")}
                                            >How to play ?</Button>
                                            <br />
                                            <Button
                                                variant="outline-info"
                                                size="lg"
                                                onClick={() => this.props.actionSwitchPage("rules")}
                                            >Rules</Button>
                                        </ButtonGroup>
                                    </Row>
                                </Col>
                            </Container>
                        </Col>
                        <Col fluid="lg">
                            {this.pageSwitch()}
                        </Col>
                    </Row>

                </Container>
            </main>
        );
    };
}

export default Navigation;