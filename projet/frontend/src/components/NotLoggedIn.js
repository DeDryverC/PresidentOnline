import React, {Component, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {ButtonGroup, Button, Container, Col, Row} from 'react-bootstrap'


class NotLoggedIn extends Component {
    constructor(props) {
        super(props);
        this.state={
           connected: localStorage.getItem('Connect'),
           guestPseudo : '',
        
           } 
        this.handleGuestLogin = this.handleGuestLogin.bind(this);
      }
    
    handleGuestLogin(event){
        event.preventDefault();
        fetch('http://localhost:5000/guest', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
        }).then(response => response.json())
            .then(json => {
                this.setState({guestPseudo: json["message"]});
            }).catch((error) => {

            });
        
            //afficher en tant qu'user connecté
    }

    render(){
        return(
            <Container fluid="lg" style={{
                border: '2px solid moccasin',
                borderRadius: '10px',
                backgroundColor: 'palegoldenrod'
            }}>
                
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
                <Row>
                    <Col>
                    <Button
                        variant="outline-info"
                        size="lg"
                        onClick={this.handleGuestLogin}    
                    >
                        Log in as a guest
                    </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default NotLoggedIn