import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ButtonGroup, Button, Row, Col, Container } from 'react-bootstrap';
import Home from '../pages/Home/Home';
import Howto from '../pages/Howto/Howto'; 
import Rules from '../pages/Rules/Rules';
import CookieConsent from 'react-cookie-consent';
import Popup from 'reactjs-popup';

//import Login from '../pages/Login/Login'

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state={
           connected: localStorage.getItem('Connect'),
           connectedAsGuest: localStorage.getItem('ConnectedAsGuest'),
           guestPseudo : localStorage.getItem('guestPseudo'),
           cookiesAccept : localStorage.getItem('Cookies'),
           donneesGuest:''
        
        
           } 
        this.handleClick = this.handleClick.bind(this);
        this.handleLoginGuest = this.handleLoginGuest.bind(this);
        
      }
    

  
    pageSwitch= () => {

        const actualPage = this.props.actualPage;
        switch(actualPage){
            
            case 'howto':
                return <Howto/>;
            case 'rules':
                return <Rules/>;
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
        window.location.href= "http://135.125.101.210/"
        
    }

    async handleLoginGuest(event){
        event.preventDefault();
        localStorage.setItem('ConnectedAsGuest', true)
        console.log(this.state.guestPseudo)
        fetch('http://135.125.101.210:5000/guest', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
        }).then(response => response.json())
            .then(json => {
                
            }).catch((error) => {

            });
            
            
            
            
            //afficher en tant qu'user connecté

        console.log(this.state.donneesGuest.Pseudo)
           
        


        await fetch(`http://135.125.101.210:5000/pseudoguest`)
          .then(response => response.json())
          .then(json => {
            this.setState({donneesGuest: json[0].Pseudo})
            
          })
          
          
        
        localStorage.setItem('guestPseudo', this.state.donneesGuest)  
        window.location.href= "http://135.125.101.210/"  
    }

    
    render() {
        
        if(this.state.connected==="true"){
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
                            <Col fluid>
                                {this.pageSwitch()}
                            </Col>
                        </Row>
    
                    </Container>
                    <CookieConsent
                                onAccept={localStorage.setItem('Cookies',true)}
                                location="bottom"
                                style={{ backgroundColor : 'DarkRed', fontSize:20}}
                                buttonStyle={{backgroundColor:"palegoldenrod", fontSize:20}}
                                buttonText="I agree !"
                                expires={365}>
                             
                                This website uses cookies, accept them to remove the banner
                    </CookieConsent> 
                </main>
            );
                                        
        }

        if(this.state.connectedAsGuest==="true"){
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
                            <Col fluid>
                                {this.pageSwitch()}
                            </Col>
                        </Row>
    
                    </Container>

                    <CookieConsent
                                onAccept={localStorage.setItem('Cookies',true)}
                                location="bottom"
                                style={{ backgroundColor : 'DarkRed', fontSize:20}}
                                buttonStyle={{backgroundColor:"palegoldenrod", fontSize:20}}
                                buttonText="I agree !"
                                expires={365}>
                             
                                This website uses cookies, accept them to remove the banner
                    </CookieConsent>
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
                    <Container fluid>
                        <Row fluid="xl"> 
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
                            <Col className="justify-content-xl-center">
                                {this.pageSwitch()}
                            </Col>
                        </Row>
    
                    </Container>
                    
                    <CookieConsent
                                onAccept={localStorage.setItem('Cookies',true)}
                                location="bottom"
                                style={{ backgroundColor : 'DarkRed', fontSize:20}}
                                buttonStyle={{backgroundColor:"palegoldenrod", fontSize:20}}
                                buttonText="I agree !"
                                expires={365}>
                             
                                This website uses cookies, accept them to remove the banner
                    </CookieConsent>
                
                </main>
            );
        }
        
    };
}

export default Navigation;
