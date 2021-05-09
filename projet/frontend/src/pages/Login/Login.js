
import React from "react";
import NavigationAutres from "../../components/NavigationAutres";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            email:'',
            password:'',
   
        }
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      

      handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:5000/guest', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "true"
            },
            body: JSON.stringify({
                email : this.state.email,
                password : this.state.password
            }),

        }).then(response => response.json())
            .then(json => {

                console.log(json.message)

            }).catch((error) => {
                alert("Echec de connexion'. Réessayez.");

            });
      }


    render() {
        return (
            <html>
                <Row>  
                    <Col>
                        <div class="hautpage">
                            <NavigationAutres />
                        </div> 
                    </Col> 
                </Row>
                <Row>
                    <Col>
                        <form onSubmit={this.handleSubmit}>
                            <Container>
                                <Col>
                            <label style={{textAlign: "center", fontSize: 30, color:'white',marginTop:'10%',marginLeft:'67%'}}>
                                Email :
                            <input type="text" value={this.state.email} onChange={text => this.setState({email: text.target.value})} />
                            </label>
                            </Col>
                            <Col>
                            <label style={{textAlign: "center", fontSize: 30, color:'white',marginTop:'10%',marginLeft:'67%'}}>
                                Password :
                            <input type="text" value={this.state.password} onChange={text => this.setState({password: text.target.value})} />
                            </label>
                            <br></br><br></br><br></br>
                            <input style={{textAlign: "center", fontSize: 45, color:'red',marginTop:'8%', marginLeft:'73%'}} type="submit" value="Connexion" />
                            </Col>
                            </Container>
                        </form>  
                    </Col>
                </Row>     
            </html>
        );
    }
}

export default Signin