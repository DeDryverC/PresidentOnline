import React from "react";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import CookieConsent from 'react-cookie-consent';
import Container from 'react-bootstrap/Container';




class Cookies extends React.Component {

    constructor(props) {
        super(props);
       
        this.state={
            cookies:'false'
        }
        

        
      }

    


    render() {
        return (
            <main>
                <Container fluid="lg">
                    <Row>
                        <Col>
                            <CookieConsent
                                debug={true}
                                location="bottom"
                                style={{ backgroundColor : 'DarkRed', fontSize:20}}
                                buttonStyle={{backgroundColor:"palegoldenrod", fontSize:20}}
                                buttonText="I agree !"
                                expires={182}
                            > 
                                This website uses cookies
                            </CookieConsent>
                        </Col>
                    </Row>
                      
                </Container>
            </main>
        );
    }
}

export default Cookies
