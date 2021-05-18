import React, {Component, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {ButtonGroup, Button, Container, Col, Row} from 'react-bootstrap'

import Home from '../pages/Home/Home';
import Howto from '../pages/howto/howto'; 
import CreateGame from '../pages/CreateGame/CreateGame';
import Rules from '../pages/Rules/Rules';
import Login from '../pages/Login/Login'

class HomeView extends Component {
    
    pageSwitch= () => {

        const actualPage = this.props.actualPage;
        switch(actualPage){
            
            case 'howto':
                return <Howto/>;
            case 'rules':
                return <Rules/>;
            case 'crgame':
                return <CreateGame/>;
            default :
                return <Home OnClick = {this.createGame}/>;
        }
    }

    createGame = (name) => {
        this.props.actionSwitchPage(name);
    }
    
    render(){
        return(
            <Container fluid="lg">
                <Row>
                    <Col fluid="md" lg={2}>
                        <Container style={{
                            height: 'auto',
                        }}>
                            <Col md='auto' style={{
                                border: '2px solid moccasin',
                                borderRadius: '10px',
                                backgroundColor: 'palegoldenrod',
                                height: '400px'
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
                    <Col fluid sm='auto'>
                        {this.pageSwitch()}
                    </Col>
                </Row>
    
            </Container>
        )
    }
}

export default HomeView