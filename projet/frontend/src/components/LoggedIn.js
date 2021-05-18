import React, {Component, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {ButtonGroup, Button, Container, Col, Row} from 'react-bootstrap'

class LoggedIn extends Component {
    constructor(props) {
        super(props);
        this.state={
           connected: localStorage.getItem('Connect'),
           guestPseudo : '',
        
           } 
        this.logOut = this.logOut.bind(this);
    }

    logOut=() => {
        this.setState({connected: false})
        localStorage.setItem('Connect', false)
    }
    
    render(){
        return (
            <main id="maincomponent">
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
                            <NavLink to="/profile" className="hover" activeClassName='nav-active'>
                                <h4 style={{ textAlign: "center", fontSize: 24 }}>Profile</h4>
                            </NavLink>
                            <Button onClick={this.logOut}>Log out</Button>
                        </Col>
                        <Col />
                    </Row>
                </Container>
            </main>
        )
    }
}

export default LoggedIn