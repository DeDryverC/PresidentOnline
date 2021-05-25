import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonGroup, Button, Row, Col, Container } from 'react-bootstrap';
import Home from '../pages/Home/Home';
import Howto from '../pages/howto/howto'; 
import CreateGame from '../pages/CreateGame/CreateGame';
import Rules from '../pages/Rules/Rules';
import Login from '../pages/Login/Login'
import Chatbox from './ChatSocket/Chatbox'

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state={
           connected: localStorage.getItem('Connect'),
           connectedAsGuest: localStorage.getItem('ConnectedAsGuest'),
           guestPseudo : '',
           roomName : localStorage.getItem('roomName'),
           chatName : localStorage.getItem('chatName')
        
        
           } 
        this.handleClick = this.handleClick.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        
    }
    

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


    handleClick=() => {
        this.setState({connected: false})
        localStorage.setItem('Connect', false)
        this.setState({connectedAsGuest: false})
        localStorage.setItem('ConnectedAsGuest', false)
        
    }
    

    handleLogin(event){
        event.preventDefault();
        localStorage.setItem('ConnectedAsGuest', true)
       
        fetch('http://localhost:5000/guest', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
        }).then(response => response.json())
            .then(json => {
                console.log(json["message"]);
                this.setState({guestPseudo: json["message"]})
                localStorage.setItem('guestPseudo',this.state.guestPseudo)
                
            }).catch((error) => {

            });
            
            
            
            //console.log(this.state.connectedAsGuest)
            
            //afficher en tant qu'user connecté
            //console.log(this.state.guestPseudo)
            
            //window.location.href= "http://localhost:3000/"
            
            
    }

    render() {
        console.log(this.state.pseudo)
        if(this.state.connected==="true"){
            console.log(this.state.connected)
            return (
                <main id="maincomponent">
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
                                            <NavLink to="/profile" className="hover" activeClassName='nav-active'>
                                                <h4 style={{ textAlign: "center", fontSize: 24 }}>Profile</h4>
                                            </NavLink>
                                            <Button onClick={this.handleClick}>Log out</Button>
                                        </Col>
                                        <Col />
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                    <br/>
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
                    <Container>
                        <Row>
                            <Col>
                                <Chatbox />
                            </Col>
                        </Row>
                    </Container>
                </main>
            );
                                        
        }

        if(this.state.connectedAsGuest==="true"){
            console.log(this.state.connectedAsGuest)
            return (
                <main id="maincomponent">
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
                                    
                                    <Row>
                                        <Col sm='auto'>
                                            <Button onClick={this.handleClick}>Log out</Button>
                                        </Col>
                                        <Col />
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                    <br/>
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
                </main>
            );
                                        
        } 

        else{
            return (
                <main id="maincomponent">
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
                                            onClick={this.handleLoginGuest}    
                                        >
                                            Log in as a guest
                                        </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                    <br/>
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
                </main>
            );
        }
        
    };
}

export default Navigation;