import React, {Component, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {ButtonGroup, Button, Container, Col, Row} from 'react-bootstrap'
import NotLoggedIn from './NotLoggedIn'
import LoggedIn from './LoggedIn'


class Header extends Component{
    
    constructor(props) {
        super(props);
        this.state={
           connected: localStorage.getItem('Connect'),
           guestPseudo : '',
        
           } 
    }
    
    render(){
        if(this.state.connected=="true"){
            return(
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
                            <LoggedIn />
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            return(
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
                            <NotLoggedIn />
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default Header